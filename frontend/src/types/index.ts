export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
  author: string;
}