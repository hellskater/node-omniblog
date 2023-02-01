import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { REFRESH_SECRET_KEY, SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData.toJSON();
  }

  public async login(userData: CreateUserDto): Promise<{ user: User; 'access-token': string; 'refresh-token': string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createTokens(findUser);

    return {
      user: findUser.toJSON(),
      'access-token': tokenData['access-token'],
      'refresh-token': tokenData['refresh-token'],
    };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser.toJSON();
  }

  public async refreshToken(refreshToken: string): Promise<{ 'access-token': string; 'refresh-token': string }> {
    try {
      const decoded: DataStoredInToken = verify(refreshToken, REFRESH_SECRET_KEY) as DataStoredInToken;
      const user: User = await this.users.findById(decoded._id);
      if (!user) throw new HttpException(401, 'User not found');

      const tokenData = this.createTokens(user);

      return {
        'access-token': tokenData['access-token'],
        'refresh-token': tokenData['refresh-token'],
      };
    } catch (error) {
      throw new HttpException(401, 'Refresh token is invalid or expired');
    }
  }

  public createTokens(user: User): TokenData {
    // const dataStoredInToken = { _id: user._id };
    // const secretKey: string = SECRET_KEY;
    // const expiresIn: string = '1h';

    // return { expiresIn, 'access-token': sign(dataStoredInToken, secretKey, { expiresIn }) };

    const dataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const refreshSecretKey: string = REFRESH_SECRET_KEY;
    const expiresIn = '30s';

    return {
      expiresIn,
      'access-token': sign(dataStoredInToken, secretKey, { expiresIn }),
      'refresh-token': sign(dataStoredInToken, refreshSecretKey, { expiresIn: '1m' }),
    };
  }
}

export default AuthService;
