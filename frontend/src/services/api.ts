import axios from 'axios';
import { BlogPost, CreatePostData, UpdatePostData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blogAPI = {
  // Get all posts
  getPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get<BlogPost[]>('/posts');
    return response.data;
  },

  // Get single post
  getPost: async (id: string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/posts/${id}`);
    return response.data;
  },

  // Create new post
  createPost: async (postData: CreatePostData): Promise<BlogPost> => {
    const response = await api.post<BlogPost>('/posts', postData);
    return response.data;
  },

  // Update post
  updatePost: async (id: string, postData: UpdatePostData): Promise<BlogPost> => {
    const response = await api.put<BlogPost>(`/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },
};