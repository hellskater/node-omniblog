import { NextFunction, Request, Response } from 'express';
import postService from '@/services/posts.service';
import { Post } from '@/interfaces/posts.interface';
import { getUserIdFromRequest } from '@/utils/util';

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
      const userId = getUserIdFromRequest(req);

      const createPostData: Post = await this.postsService.createPost(postData, userId);

      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public findAllPostsByAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = getUserIdFromRequest(req);
      const findAllPostsByAuthorData: Post[] = await this.postsService.findPostsByAuthor(userId);

      res.status(200).json({ data: findAllPostsByAuthorData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostsController;
