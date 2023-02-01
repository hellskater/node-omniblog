import { NextFunction, Request, Response } from 'express';
import postService from '@/services/posts.service';
import { Post } from '@/interfaces/posts.interface';
import { verify } from 'jsonwebtoken';
import { DataStoredInToken } from '@/interfaces/auth.interface';

class PostsController {
  public postsService = new postService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPostsData: Post[] = await this.postsService.findAllPost();

      res.status(200).json({ data: findAllPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: Post = req.body;
      //   Add author id to post data by extracting it from the jwt token in the request header Authorization
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verify(token, process.env.JWT_SECRET) as DataStoredInToken;
      postData.author._id = decodedToken._id;
      const createPostData: Post = await this.postsService.createPost(postData);

      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public findAllPostsByAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verify(token, process.env.JWT_SECRET) as DataStoredInToken;
      const findAllPostsByAuthorData: Post[] = await this.postsService.findPostsByAuthor(decodedToken._id);

      res.status(200).json({ data: findAllPostsByAuthorData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostsController;
