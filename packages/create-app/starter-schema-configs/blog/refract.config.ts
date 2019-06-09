import { configure, FileSystemImageSchema } from '@refract-cms/core';
import { BlogPostSchema } from './schemas/blog-post.schema';
import { BlogPostCategorySchema } from './schemas/blog-post-category.schema';
import { AuthorSchema } from './schemas/author.schema';

export default configure({
  schema: [BlogPostSchema, AuthorSchema, BlogPostCategorySchema, FileSystemImageSchema]
});
