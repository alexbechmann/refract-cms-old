import { composeSchema, createTextEditor, createDatePickerEditor, propertyBuilder } from '@refract-cms/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { BlogPostCategorySchema } from './blog-post-category.schema';
import { AuthorSchema } from './author.schema';

export const BlogPostSchema = composeSchema({
  options: {
    alias: 'blogPost',
    displayName: 'Blog post',
    icon: DescriptionIcon,
    instanceDisplayProps: blogPost => ({
      primaryText: blogPost.title
    })
  },
  properties: {
    title: {
      displayName: 'Title',
      editorComponent: createTextEditor(),
      type: String
    },
    date: {
      displayName: 'Date',
      editorComponent: createDatePickerEditor(),
      type: Date
    },
    category: propertyBuilder.multipleReferences(BlogPostCategorySchema, {
      displayName: 'Categories'
    }),
    author: propertyBuilder.singleReference(AuthorSchema, {
      displayName: 'Author'
    })
  }
});
