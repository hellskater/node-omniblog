import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import PostsController from '@/controllers/posts.controller';
import { CreatePostDto } from '@/dtos/posts.dto';

class PostsRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.postsController.getPosts);
    this.router.get(`${this.path}/author`, authMiddleware, this.postsController.findAllPostsByAuthor);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreatePostDto, 'body'), this.postsController.createPost);
  }
}

export default PostsRoute;
