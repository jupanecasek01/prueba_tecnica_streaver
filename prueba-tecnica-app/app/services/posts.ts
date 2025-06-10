import { fetchApi } from './api';
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export class PostsService {
  static async getAllPosts(): Promise<Post[]> {
    return fetchApi<Post[]>('/posts');
  }

  static async getPostsByUserId(userId: string): Promise<Post[]> {
    return fetchApi<Post[]>(`/posts?userId=${userId}`);
  }

  static async getPostById(id: number): Promise<Post> {
    return fetchApi<Post>(`/posts/${id}`);
  }
} 