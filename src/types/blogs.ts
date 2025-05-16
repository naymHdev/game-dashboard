export interface TBlogs {
  _id: string;
  title: string;
  description: string;
  author: string;
  blogImage: string;
  createdAt: Date;
  isDeleted: boolean;
}

export type BlogFormInputs = {
  author: string;
  title: string;
  description: string;
};
