import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const data = await this.authService.login(userData);

      res.status(200).json({ data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const RefreshAuthorization = req.header('RefreshAuthorization') ? req.header('RefreshAuthorization').split('Bearer ')[1] : null;
      const data = await this.authService.refreshToken(RefreshAuthorization);

      res.status(200).json({ data, message: 'refresh' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
