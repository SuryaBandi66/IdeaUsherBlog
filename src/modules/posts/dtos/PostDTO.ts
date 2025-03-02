export interface IPostDTO {
  title: string;
  description: string;
  image?: string;
  tags: string[];
}

export interface IPostUpdateDTO {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
}
