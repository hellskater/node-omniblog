import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import postModel from '@models/posts.model';
import { isEmpty } from '@utils/util';
import { Post } from '@/interfaces/posts.interface';
import userModel from '@/models/users.model';

class PostService {
  public posts = postModel;
  public users = userModel;

  public async findAllPost(): Promise<Post[]> {
    const posts: Post[] = await this.posts.find();
    return posts;
  }

  // create a new post
  public async createPost(postData: Post, authorId: string): Promise<Post> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');

    const author = await this.users.findOne({ _id: authorId });
    if (!author) throw new HttpException(409, "Author doesn't exist");

    const createPostData: Post = await this.posts.create({ ...postData, author: authorId });
    return createPostData;
  }

  //  Find all posts by author
  public async findPostsByAuthor(authorId: string): Promise<Post[]> {
    if (isEmpty(authorId)) throw new HttpException(400, 'AuthorId is empty');

    const findPosts: Post[] = await this.posts.find({ author: authorId });
    if (!findPosts) throw new HttpException(409, "Posts doesn't exist");
    return findPosts;
  }
}

export default PostService;
