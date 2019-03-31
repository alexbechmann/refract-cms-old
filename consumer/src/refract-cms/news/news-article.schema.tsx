import React from 'react';
import {
  Entity,
  defineEntity,
  createTextEditor,
  createDatePickerEditor,
  createListEditor,
  RefractTypes,
  createImagePickerEditor,
  ImageRef,
  PropertyEditorProps,
  createSingleEntityPickerEditor,
  createMultipleEntityPickerEditor
} from '@refract-cms/core';
import { NewsArticleModel } from './news-article.model';
import DescriptionIcon from '@material-ui/icons/Description';
import { Button, Checkbox } from '@material-ui/core';
import moment from 'moment';
import { Product, ProductSchema } from '../products/product.model';
import { SettingsSchema } from '../settings/settings.model';
import { NewsArticleEntity } from './news-article.entity';

export const NewsArticleSchema = defineEntity<NewsArticleEntity>({
  options: {
    alias: 'newsArticle',
    displayName: 'News Article',
    instanceDisplayProps: newsArticle => ({
      primaryText: newsArticle.title,
      secondaryText: moment(newsArticle.articleDate).format('ll')
      // imageUrl: newsArticle.image ? newsArticle.image.crops.profile : undefined
    }),
    icon: DescriptionIcon,
    defaultSort: {
      orderByDirection: 'DESC',
      orderByField: 'articleDate'
    }
  },
  properties: {
    title: {
      displayName: 'Headline',
      editorComponent: createTextEditor({
        maxLength: 100
      }),
      defaultValue: 'default headline',
      type: RefractTypes.string
    },
    articleText: {
      displayName: 'Article text',
      editorComponent: createTextEditor({
        maxLength: 100,
        multiline: true
      }),
      defaultValue: '',
      type: RefractTypes.string
    },
    extraText: {
      displayName: 'Extra text',
      editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} />,
      type: RefractTypes.string
    },
    articleDate: {
      displayName: 'Article date',
      editorComponent: createDatePickerEditor(),
      type: RefractTypes.date
    },
    listOfStrings: {
      editorComponent: createListEditor({
        itemComponent: createTextEditor(),
        max: 4,
        displayNameFormat: s => s
      }),
      defaultValue: ['s1', 's2'],
      type: RefractTypes.arrayOf(RefractTypes.string)
    },
    item: {
      editorComponent: props => (
        <Button
          onClick={() =>
            props.setValue({
              id: '234234',
              meta: {
                location: 'asdfafsd',
                count: 3,
                deep: {
                  level: 4
                }
              }
            })
          }
        >
          {JSON.stringify(props.value) || 'Click'}
        </Button>
      ),
      type: RefractTypes.shape({
        id: RefractTypes.string,
        meta: RefractTypes.shape({
          location: RefractTypes.string,
          count: RefractTypes.number,
          deep: RefractTypes.shape({
            level: RefractTypes.number
          })
        })
      })
    },
    image: {
      displayName: 'Image',
      editorComponent: createImagePickerEditor({
        cropDefinitions: {
          profile: {
            aspectRatio: 4 / 4
          },
          large: {
            aspectRatio: 16 / 9
          }
        }
      }),
      type: RefractTypes.imageShape({
        profile: RefractTypes.cropShape,
        large: RefractTypes.cropShape
      })
    },
    primary: {
      displayName: 'Primary',
      editorComponent: (props: PropertyEditorProps<boolean>) => (
        <Checkbox checked={props.value} onChange={(e, checked) => props.setValue(checked)} />
      ),
      type: RefractTypes.bool
    },
    // highlightedProduct: {
    //   displayName: 'Highlighted Product',
    //   type: RefractTypes.ref(ProductSchema)
    // }
    highlightedProductId: {
      displayName: 'Highlighted product',
      type: RefractTypes.string,
      editorComponent: createSingleEntityPickerEditor({
        schema: ProductSchema
      })
    },
    otherRelatedProductIds: {
      displayName: 'More products',
      type: RefractTypes.arrayOf(RefractTypes.string),
      editorComponent: createMultipleEntityPickerEditor({
        schema: ProductSchema,
        max: 2
      })
    }
  }
});
