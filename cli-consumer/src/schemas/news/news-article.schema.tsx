import React from 'react';
import {
  Entity,
  composeSchema,
  createTextEditor,
  createDatePickerEditor,
  createListEditor,
  propertyBuilder
} from '@refract-cms/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { Button, Checkbox } from '@material-ui/core';
import moment from 'moment';
import { ProductSchema } from '../products/product.schema';

export const NewsArticleSchema = composeSchema({
  options: {
    alias: 'newsArticle',
    displayName: 'News Article',
    mongoCollectionName: 'news-articles',
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
      type: String
    },
    articleText: {
      displayName: 'Article text',
      editorComponent: createTextEditor({
        maxLength: 100,
        multiline: true
      }),
      defaultValue: '',
      type: String
    },
    extraText: {
      displayName: 'Extra text',
      editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} />,
      type: String
    },
    articleDate: {
      displayName: 'Article date',
      editorComponent: createDatePickerEditor(),
      type: Date
    },
    listOfStrings: {
      editorComponent: createListEditor({
        itemComponent: createTextEditor(),
        max: 4,
        displayNameFormat: s => s
      }),
      defaultValue: ['s1', 's2'],
      type: [String]
    },
    // item: {
    //   editorComponent: props => (
    //     <Button
    //       onClick={() =>
    //         props.setValue({
    //           id: '234234',
    //           meta: {
    //             location: 'asdfafsd',
    //             count: 3,
    //             deep: {
    //               level: 4
    //             }
    //           }
    //         })
    //       }
    //     >
    //       {JSON.stringify(props.value) || 'Click'}
    //     </Button>
    //   ),
    //   type: RefractTypes.shape({
    //     id: String,,
    //     meta: RefractTypes.shape({
    //       location: String,,
    //       count: RefractTypes.number,
    //       deep: RefractTypes.shape({
    //         level: RefractTypes.number
    //       })
    //     })
    //   })
    // },
    // image: {
    //   displayName: 'Image',
    //   editorComponent: createImagePickerEditor({
    //     cropDefinitions: {
    //       profile: {
    //         aspectRatio: 4 / 4
    //       },
    //       large: {
    //         aspectRatio: 16 / 9
    //       }
    //     }
    //   }),
    //   type: RefractTypes.imageShape({
    //     profile: RefractTypes.cropShape,
    //     large: RefractTypes.cropShape
    //   })
    // },
    primary: {
      displayName: 'Primary',
      editorComponent: props => <Checkbox checked={props.value} onChange={(e, checked) => props.setValue(checked)} />,
      type: Boolean
    },
    highlightedProduct: propertyBuilder.singleReference(ProductSchema, {
      displayName: 'Highlighted product'
    }),
    otherRelatedProducts: propertyBuilder.multipleReferences(ProductSchema, {
      displayName: 'Other related products'
    })
  }
});
