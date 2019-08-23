import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
import * as ReactApolloHooks from 'react-apollo-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Maybe<T> = T | null;

export const NewsArticleCountDocument = gql`
    query NewsArticleCount {
  newsArticleCount
}
    `;
export type NewsArticleCountComponentProps = Omit<ReactApollo.QueryProps<NewsArticleCountQuery, NewsArticleCountQueryVariables>, 'query'>;

    export const NewsArticleCountComponent = (props: NewsArticleCountComponentProps) => (
      <ReactApollo.Query<NewsArticleCountQuery, NewsArticleCountQueryVariables> query={NewsArticleCountDocument} {...props} />
    );
    
export type NewsArticleCountProps<TChildProps = {}> = Partial<ReactApollo.DataProps<NewsArticleCountQuery, NewsArticleCountQueryVariables>> & TChildProps;
export function withNewsArticleCount<TProps, TChildProps = {}>(operationOptions?: ReactApollo.OperationOption<
  TProps,
  NewsArticleCountQuery,
  NewsArticleCountQueryVariables,
  NewsArticleCountProps<TChildProps>>) {
    return ReactApollo.withQuery<TProps, NewsArticleCountQuery, NewsArticleCountQueryVariables, NewsArticleCountProps<TChildProps>>(NewsArticleCountDocument, {
      alias: 'withNewsArticleCount',
      ...operationOptions
    });
};

    export function useNewsArticleCountQuery(baseOptions?: ReactApolloHooks.QueryHookOptions<NewsArticleCountQueryVariables>) {
      return ReactApolloHooks.useQuery<NewsArticleCountQuery, NewsArticleCountQueryVariables>(NewsArticleCountDocument, baseOptions);
    };
export type NewsArticleCountQueryHookResult = ReturnType<typeof useNewsArticleCountQuery>;/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  MongoId: string,
  DateTime: Date,
};

export type AdUser = {
  __typename?: 'adUser',
  _id?: Maybe<Scalars['MongoId']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type AdUserEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  firstName?: Maybe<StringFilter>,
  lastName?: Maybe<StringFilter>,
  OR?: Maybe<Array<Maybe<AdUserEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<AdUserEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<AdUserEntityFilterType>>>,
};

export type AdUserEntitySortType = {
  _id?: Maybe<SortType>,
  firstName?: Maybe<SortType>,
  lastName?: Maybe<SortType>,
};

export type AdUserInput = {
  _id?: Maybe<Scalars['MongoId']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type Author = {
  __typename?: 'author',
  _id?: Maybe<Scalars['MongoId']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type AuthorEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  firstName?: Maybe<StringFilter>,
  lastName?: Maybe<StringFilter>,
  OR?: Maybe<Array<Maybe<AuthorEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<AuthorEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<AuthorEntityFilterType>>>,
};

export type AuthorEntitySortType = {
  _id?: Maybe<SortType>,
  firstName?: Maybe<SortType>,
  lastName?: Maybe<SortType>,
};

export type AuthorInput = {
  _id?: Maybe<Scalars['MongoId']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type BlogPost = {
  __typename?: 'blogPost',
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  bodyText?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['DateTime']>,
  category?: Maybe<Array<Maybe<BlogPostCategory>>>,
  author?: Maybe<Author>,
};


export type BlogPostCategoryArgs = {
  filter?: Maybe<BlogPostCategoryEntityFilterType>,
  sort?: Maybe<BlogPostCategoryEntitySortType>,
  pagination?: Maybe<PaginationType>
};

export type BlogPostCategory = {
  __typename?: 'blogPostCategory',
  _id?: Maybe<Scalars['MongoId']>,
  name?: Maybe<Scalars['String']>,
};

export type BlogPostCategoryEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  name?: Maybe<StringFilter>,
  OR?: Maybe<Array<Maybe<BlogPostCategoryEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<BlogPostCategoryEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<BlogPostCategoryEntityFilterType>>>,
};

export type BlogPostCategoryEntitySortType = {
  _id?: Maybe<SortType>,
  name?: Maybe<SortType>,
};

export type BlogPostCategoryInput = {
  _id?: Maybe<Scalars['MongoId']>,
  name?: Maybe<Scalars['String']>,
};

export type BlogPostEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  title?: Maybe<StringFilter>,
  bodyText?: Maybe<StringFilter>,
  date?: Maybe<DateTimeFilter>,
  category?: Maybe<StringFilter>,
  author?: Maybe<StringFilter>,
  OR?: Maybe<Array<Maybe<BlogPostEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<BlogPostEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<BlogPostEntityFilterType>>>,
};

export type BlogPostEntitySortType = {
  _id?: Maybe<SortType>,
  title?: Maybe<SortType>,
  bodyText?: Maybe<SortType>,
  date?: Maybe<SortType>,
  author?: Maybe<SortType>,
};

export type BlogPostInput = {
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  bodyText?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['DateTime']>,
  category?: Maybe<Array<Maybe<Scalars['String']>>>,
  author?: Maybe<Scalars['String']>,
};

/** Filter type for Boolean scalar */
export type BooleanFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['Boolean']>,
  /** $gt */
  GT?: Maybe<Scalars['Boolean']>,
  /** $gte */
  GTE?: Maybe<Scalars['Boolean']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  /** $lt */
  LT?: Maybe<Scalars['Boolean']>,
  /** $lte */
  LTE?: Maybe<Scalars['Boolean']>,
  /** $ne */
  NE?: Maybe<Scalars['Boolean']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  /** $not */
  NOT?: Maybe<BooleanNotFilter>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  opr?: Maybe<Opr>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  value?: Maybe<Scalars['Boolean']>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  values?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  /** DEPRECATED: use NE */
  NEQ?: Maybe<Scalars['Boolean']>,
};

/** Filter type for $not of Boolean scalar */
export type BooleanNotFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['Boolean']>,
  /** $gt */
  GT?: Maybe<Scalars['Boolean']>,
  /** $gte */
  GTE?: Maybe<Scalars['Boolean']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  /** $lt */
  LT?: Maybe<Scalars['Boolean']>,
  /** $lte */
  LTE?: Maybe<Scalars['Boolean']>,
  /** $ne */
  NE?: Maybe<Scalars['Boolean']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
};


/** Filter type for DateTime scalar */
export type DateTimeFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['DateTime']>,
  /** $gt */
  GT?: Maybe<Scalars['DateTime']>,
  /** $gte */
  GTE?: Maybe<Scalars['DateTime']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
  /** $lt */
  LT?: Maybe<Scalars['DateTime']>,
  /** $lte */
  LTE?: Maybe<Scalars['DateTime']>,
  /** $ne */
  NE?: Maybe<Scalars['DateTime']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
  /** $not */
  NOT?: Maybe<DateTimeNotFilter>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  opr?: Maybe<Opr>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  value?: Maybe<Scalars['DateTime']>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  values?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
  /** DEPRECATED: use NE */
  NEQ?: Maybe<Scalars['DateTime']>,
};

/** Filter type for $not of DateTime scalar */
export type DateTimeNotFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['DateTime']>,
  /** $gt */
  GT?: Maybe<Scalars['DateTime']>,
  /** $gte */
  GTE?: Maybe<Scalars['DateTime']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
  /** $lt */
  LT?: Maybe<Scalars['DateTime']>,
  /** $lte */
  LTE?: Maybe<Scalars['DateTime']>,
  /** $ne */
  NE?: Maybe<Scalars['DateTime']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['DateTime']>>>,
};

export type File = {
  __typename?: 'file',
  _id?: Maybe<Scalars['MongoId']>,
  fileRef?: Maybe<FilefileRef>,
};

export type FileEntityfileRefObjectFilterType = {
  fileName?: Maybe<StringFilter>,
  path?: Maybe<StringFilter>,
  mimetype?: Maybe<StringFilter>,
  size?: Maybe<FloatFilter>,
  opr?: Maybe<OprExists>,
};

export type FileEntityfileRefSortType = {
  fileName?: Maybe<SortType>,
  path?: Maybe<SortType>,
  mimetype?: Maybe<SortType>,
  size?: Maybe<SortType>,
};

export type FileEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  fileRef?: Maybe<FileEntityfileRefObjectFilterType>,
  OR?: Maybe<Array<Maybe<FileEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<FileEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<FileEntityFilterType>>>,
};

export type FileEntitySortType = {
  _id?: Maybe<SortType>,
  fileRef?: Maybe<FileEntityfileRefSortType>,
};

export type FilefileRef = {
  __typename?: 'filefileRef',
  fileName?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  mimetype?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
};

export type FileInput = {
  _id?: Maybe<Scalars['MongoId']>,
  fileRef?: Maybe<FileInputfileRef>,
};

export type FileInputfileRef = {
  fileName?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  mimetype?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
};

/** Filter type for Float scalar */
export type FloatFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['Float']>,
  /** $gt */
  GT?: Maybe<Scalars['Float']>,
  /** $gte */
  GTE?: Maybe<Scalars['Float']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['Float']>>>,
  /** $lt */
  LT?: Maybe<Scalars['Float']>,
  /** $lte */
  LTE?: Maybe<Scalars['Float']>,
  /** $ne */
  NE?: Maybe<Scalars['Float']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['Float']>>>,
  /** $not */
  NOT?: Maybe<FloatNotFilter>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  opr?: Maybe<Opr>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  value?: Maybe<Scalars['Float']>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  values?: Maybe<Array<Maybe<Scalars['Float']>>>,
  /** DEPRECATED: use NE */
  NEQ?: Maybe<Scalars['Float']>,
};

/** Filter type for $not of Float scalar */
export type FloatNotFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['Float']>,
  /** $gt */
  GT?: Maybe<Scalars['Float']>,
  /** $gte */
  GTE?: Maybe<Scalars['Float']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['Float']>>>,
  /** $lt */
  LT?: Maybe<Scalars['Float']>,
  /** $lte */
  LTE?: Maybe<Scalars['Float']>,
  /** $ne */
  NE?: Maybe<Scalars['Float']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['Float']>>>,
};


/** Filter type for MongoId scalar */
export type MongoIdFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['MongoId']>,
  /** $gt */
  GT?: Maybe<Scalars['MongoId']>,
  /** $gte */
  GTE?: Maybe<Scalars['MongoId']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['MongoId']>>>,
  /** $lt */
  LT?: Maybe<Scalars['MongoId']>,
  /** $lte */
  LTE?: Maybe<Scalars['MongoId']>,
  /** $ne */
  NE?: Maybe<Scalars['MongoId']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['MongoId']>>>,
  /** $not */
  NOT?: Maybe<MongoIdNotFilter>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  opr?: Maybe<Opr>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  value?: Maybe<Scalars['MongoId']>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  values?: Maybe<Array<Maybe<Scalars['MongoId']>>>,
  /** DEPRECATED: use NE */
  NEQ?: Maybe<Scalars['MongoId']>,
};

/** Filter type for $not of MongoId scalar */
export type MongoIdNotFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['MongoId']>,
  /** $gt */
  GT?: Maybe<Scalars['MongoId']>,
  /** $gte */
  GTE?: Maybe<Scalars['MongoId']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['MongoId']>>>,
  /** $lt */
  LT?: Maybe<Scalars['MongoId']>,
  /** $lte */
  LTE?: Maybe<Scalars['MongoId']>,
  /** $ne */
  NE?: Maybe<Scalars['MongoId']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['MongoId']>>>,
};

export type NewsArticle = {
  __typename?: 'newsArticle',
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  articleText?: Maybe<Scalars['String']>,
  extraText?: Maybe<Scalars['String']>,
  articleDate?: Maybe<Scalars['DateTime']>,
  listOfStrings?: Maybe<Array<Maybe<Scalars['String']>>>,
  primary?: Maybe<Scalars['Boolean']>,
  highlightedProduct?: Maybe<Product>,
  otherRelatedProducts?: Maybe<Array<Maybe<Product>>>,
  upperCaseTitle?: Maybe<Scalars['String']>,
};


export type NewsArticleOtherRelatedProductsArgs = {
  filter?: Maybe<ProductEntityFilterType>,
  sort?: Maybe<ProductEntitySortType>,
  pagination?: Maybe<PaginationType>
};

export type NewsArticleEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  title?: Maybe<StringFilter>,
  articleText?: Maybe<StringFilter>,
  extraText?: Maybe<StringFilter>,
  articleDate?: Maybe<DateTimeFilter>,
  listOfStrings?: Maybe<StringFilter>,
  primary?: Maybe<BooleanFilter>,
  highlightedProduct?: Maybe<StringFilter>,
  otherRelatedProducts?: Maybe<StringFilter>,
  OR?: Maybe<Array<Maybe<NewsArticleEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<NewsArticleEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<NewsArticleEntityFilterType>>>,
};

export type NewsArticleEntitySortType = {
  _id?: Maybe<SortType>,
  title?: Maybe<SortType>,
  articleText?: Maybe<SortType>,
  extraText?: Maybe<SortType>,
  articleDate?: Maybe<SortType>,
  primary?: Maybe<SortType>,
  highlightedProduct?: Maybe<SortType>,
};

export type NewsArticleInput = {
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  articleText?: Maybe<Scalars['String']>,
  extraText?: Maybe<Scalars['String']>,
  articleDate?: Maybe<Scalars['DateTime']>,
  listOfStrings?: Maybe<Array<Maybe<Scalars['String']>>>,
  primary?: Maybe<Scalars['Boolean']>,
  highlightedProduct?: Maybe<Scalars['String']>,
  otherRelatedProducts?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export enum Opr {
  Eql = 'EQL',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  Nin = 'NIN'
}

export enum OprExists {
  Exists = 'EXISTS',
  NotExists = 'NOT_EXISTS'
}

export type PaginationType = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
};

export type Product = {
  __typename?: 'product',
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  productType?: Maybe<Scalars['String']>,
  customNumber?: Maybe<Scalars['Float']>,
  requiredForCustomDropdownEditor?: Maybe<Scalars['String']>,
  location?: Maybe<Productlocation>,
  category?: Maybe<Scalars['String']>,
  types?: Maybe<Array<Maybe<Scalars['String']>>>,
  primary?: Maybe<Scalars['Boolean']>,
};

export type ProductEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  title?: Maybe<StringFilter>,
  productType?: Maybe<StringFilter>,
  customNumber?: Maybe<FloatFilter>,
  requiredForCustomDropdownEditor?: Maybe<StringFilter>,
  location?: Maybe<ProductEntitylocationObjectFilterType>,
  category?: Maybe<StringFilter>,
  types?: Maybe<StringFilter>,
  primary?: Maybe<BooleanFilter>,
  OR?: Maybe<Array<Maybe<ProductEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<ProductEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<ProductEntityFilterType>>>,
};

export type ProductEntitylocationObjectFilterType = {
  lat?: Maybe<FloatFilter>,
  lng?: Maybe<FloatFilter>,
  opr?: Maybe<OprExists>,
};

export type ProductEntitylocationSortType = {
  lat?: Maybe<SortType>,
  lng?: Maybe<SortType>,
};

export type ProductEntitySortType = {
  _id?: Maybe<SortType>,
  title?: Maybe<SortType>,
  productType?: Maybe<SortType>,
  customNumber?: Maybe<SortType>,
  requiredForCustomDropdownEditor?: Maybe<SortType>,
  location?: Maybe<ProductEntitylocationSortType>,
  category?: Maybe<SortType>,
  primary?: Maybe<SortType>,
};

export type ProductInput = {
  _id?: Maybe<Scalars['MongoId']>,
  title?: Maybe<Scalars['String']>,
  productType?: Maybe<Scalars['String']>,
  customNumber?: Maybe<Scalars['Float']>,
  requiredForCustomDropdownEditor?: Maybe<Scalars['String']>,
  location?: Maybe<ProductInputlocation>,
  category?: Maybe<Scalars['String']>,
  types?: Maybe<Array<Maybe<Scalars['String']>>>,
  primary?: Maybe<Scalars['Boolean']>,
};

export type ProductInputlocation = {
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
};

export type Productlocation = {
  __typename?: 'productlocation',
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
};

export type Query = {
  __typename?: 'Query',
  newsArticleCount?: Maybe<Scalars['Int']>,
  newsArticleList?: Maybe<Array<Maybe<NewsArticle>>>,
  newsArticlePreview?: Maybe<NewsArticle>,
  newsArticleFindById?: Maybe<NewsArticle>,
  newsArticleFindOne?: Maybe<NewsArticle>,
  settingsCount?: Maybe<Scalars['Int']>,
  settingsList?: Maybe<Array<Maybe<Settings>>>,
  settingsPreview?: Maybe<Settings>,
  settings?: Maybe<Settings>,
  productCount?: Maybe<Scalars['Int']>,
  productList?: Maybe<Array<Maybe<Product>>>,
  productPreview?: Maybe<Product>,
  productFindById?: Maybe<Product>,
  productFindOne?: Maybe<Product>,
  blogPostCount?: Maybe<Scalars['Int']>,
  blogPostList?: Maybe<Array<Maybe<BlogPost>>>,
  blogPostPreview?: Maybe<BlogPost>,
  blogPostFindById?: Maybe<BlogPost>,
  blogPostFindOne?: Maybe<BlogPost>,
  authorCount?: Maybe<Scalars['Int']>,
  authorList?: Maybe<Array<Maybe<Author>>>,
  authorPreview?: Maybe<Author>,
  authorFindById?: Maybe<Author>,
  authorFindOne?: Maybe<Author>,
  blogPostCategoryCount?: Maybe<Scalars['Int']>,
  blogPostCategoryList?: Maybe<Array<Maybe<BlogPostCategory>>>,
  blogPostCategoryPreview?: Maybe<BlogPostCategory>,
  blogPostCategoryFindById?: Maybe<BlogPostCategory>,
  blogPostCategoryFindOne?: Maybe<BlogPostCategory>,
  fileCount?: Maybe<Scalars['Int']>,
  fileList?: Maybe<Array<Maybe<File>>>,
  filePreview?: Maybe<File>,
  fileFindById?: Maybe<File>,
  fileFindOne?: Maybe<File>,
  adUserCount?: Maybe<Scalars['Int']>,
  adUserList?: Maybe<Array<Maybe<AdUser>>>,
  adUserPreview?: Maybe<AdUser>,
  adUserFindById?: Maybe<AdUser>,
  adUserFindOne?: Maybe<AdUser>,
};


export type QueryNewsArticleCountArgs = {
  filter?: Maybe<NewsArticleEntityFilterType>
};


export type QueryNewsArticleListArgs = {
  filter?: Maybe<NewsArticleEntityFilterType>,
  sort?: Maybe<NewsArticleEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryNewsArticlePreviewArgs = {
  record?: Maybe<NewsArticleInput>
};


export type QueryNewsArticleFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryNewsArticleFindOneArgs = {
  filter?: Maybe<NewsArticleEntityFilterType>,
  sort?: Maybe<NewsArticleEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QuerySettingsCountArgs = {
  filter?: Maybe<SettingsEntityFilterType>
};


export type QuerySettingsListArgs = {
  filter?: Maybe<SettingsEntityFilterType>,
  sort?: Maybe<SettingsEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QuerySettingsPreviewArgs = {
  record?: Maybe<SettingsInput>
};


export type QueryProductCountArgs = {
  filter?: Maybe<ProductEntityFilterType>
};


export type QueryProductListArgs = {
  filter?: Maybe<ProductEntityFilterType>,
  sort?: Maybe<ProductEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryProductPreviewArgs = {
  record?: Maybe<ProductInput>
};


export type QueryProductFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryProductFindOneArgs = {
  filter?: Maybe<ProductEntityFilterType>,
  sort?: Maybe<ProductEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryBlogPostCountArgs = {
  filter?: Maybe<BlogPostEntityFilterType>
};


export type QueryBlogPostListArgs = {
  filter?: Maybe<BlogPostEntityFilterType>,
  sort?: Maybe<BlogPostEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryBlogPostPreviewArgs = {
  record?: Maybe<BlogPostInput>
};


export type QueryBlogPostFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryBlogPostFindOneArgs = {
  filter?: Maybe<BlogPostEntityFilterType>,
  sort?: Maybe<BlogPostEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryAuthorCountArgs = {
  filter?: Maybe<AuthorEntityFilterType>
};


export type QueryAuthorListArgs = {
  filter?: Maybe<AuthorEntityFilterType>,
  sort?: Maybe<AuthorEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryAuthorPreviewArgs = {
  record?: Maybe<AuthorInput>
};


export type QueryAuthorFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryAuthorFindOneArgs = {
  filter?: Maybe<AuthorEntityFilterType>,
  sort?: Maybe<AuthorEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryBlogPostCategoryCountArgs = {
  filter?: Maybe<BlogPostCategoryEntityFilterType>
};


export type QueryBlogPostCategoryListArgs = {
  filter?: Maybe<BlogPostCategoryEntityFilterType>,
  sort?: Maybe<BlogPostCategoryEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryBlogPostCategoryPreviewArgs = {
  record?: Maybe<BlogPostCategoryInput>
};


export type QueryBlogPostCategoryFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryBlogPostCategoryFindOneArgs = {
  filter?: Maybe<BlogPostCategoryEntityFilterType>,
  sort?: Maybe<BlogPostCategoryEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryFileCountArgs = {
  filter?: Maybe<FileEntityFilterType>
};


export type QueryFileListArgs = {
  filter?: Maybe<FileEntityFilterType>,
  sort?: Maybe<FileEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryFilePreviewArgs = {
  record?: Maybe<FileInput>
};


export type QueryFileFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryFileFindOneArgs = {
  filter?: Maybe<FileEntityFilterType>,
  sort?: Maybe<FileEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryAdUserCountArgs = {
  filter?: Maybe<AdUserEntityFilterType>
};


export type QueryAdUserListArgs = {
  filter?: Maybe<AdUserEntityFilterType>,
  sort?: Maybe<AdUserEntitySortType>,
  pagination?: Maybe<PaginationType>
};


export type QueryAdUserPreviewArgs = {
  record?: Maybe<AdUserInput>
};


export type QueryAdUserFindByIdArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryAdUserFindOneArgs = {
  filter?: Maybe<AdUserEntityFilterType>,
  sort?: Maybe<AdUserEntitySortType>,
  pagination?: Maybe<PaginationType>
};

export type Settings = {
  __typename?: 'settings',
  _id?: Maybe<Scalars['MongoId']>,
  setting1?: Maybe<Scalars['String']>,
  enableMyFeature?: Maybe<Scalars['Boolean']>,
  highlightedArticles?: Maybe<Array<Maybe<NewsArticle>>>,
  favouriteFood?: Maybe<Array<Maybe<SettingsfavouriteFood>>>,
};


export type SettingsHighlightedArticlesArgs = {
  filter?: Maybe<NewsArticleEntityFilterType>,
  sort?: Maybe<NewsArticleEntitySortType>,
  pagination?: Maybe<PaginationType>
};

export type SettingsEntityfavouriteFoodObjectFilterType = {
  kind?: Maybe<StringFilter>,
  name?: Maybe<StringFilter>,
  opr?: Maybe<OprExists>,
};

export type SettingsEntityFilterType = {
  _id?: Maybe<MongoIdFilter>,
  setting1?: Maybe<StringFilter>,
  enableMyFeature?: Maybe<BooleanFilter>,
  highlightedArticles?: Maybe<StringFilter>,
  favouriteFood?: Maybe<SettingsEntityfavouriteFoodObjectFilterType>,
  OR?: Maybe<Array<Maybe<SettingsEntityFilterType>>>,
  AND?: Maybe<Array<Maybe<SettingsEntityFilterType>>>,
  NOR?: Maybe<Array<Maybe<SettingsEntityFilterType>>>,
};

export type SettingsEntitySortType = {
  _id?: Maybe<SortType>,
  setting1?: Maybe<SortType>,
  enableMyFeature?: Maybe<SortType>,
};

export type SettingsfavouriteFood = {
  __typename?: 'settingsfavouriteFood',
  kind?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type SettingsInput = {
  _id?: Maybe<Scalars['MongoId']>,
  setting1?: Maybe<Scalars['String']>,
  enableMyFeature?: Maybe<Scalars['Boolean']>,
  highlightedArticles?: Maybe<Array<Maybe<Scalars['String']>>>,
  favouriteFood?: Maybe<Array<Maybe<SettingsInputfavouriteFood>>>,
};

export type SettingsInputfavouriteFood = {
  kind?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Filter type for String scalar */
export type StringFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['String']>,
  /** $gt */
  GT?: Maybe<Scalars['String']>,
  /** $gte */
  GTE?: Maybe<Scalars['String']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** $lt */
  LT?: Maybe<Scalars['String']>,
  /** $lte */
  LTE?: Maybe<Scalars['String']>,
  /** $ne */
  NE?: Maybe<Scalars['String']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** $regex */
  REGEX?: Maybe<Scalars['String']>,
  /** $options. Modifiers for the $regex expression. Field is ignored on its own */
  OPTIONS?: Maybe<Scalars['String']>,
  /** $not */
  NOT?: Maybe<StringNotFilter>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  opr?: Maybe<Opr>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  value?: Maybe<Scalars['String']>,
  /** DEPRECATED: Switched to the more intuitive operator fields */
  values?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** DEPRECATED: use NE */
  NEQ?: Maybe<Scalars['String']>,
};

/** Filter type for $not of String scalar */
export type StringNotFilter = {
  /** $eq */
  EQ?: Maybe<Scalars['String']>,
  /** $gt */
  GT?: Maybe<Scalars['String']>,
  /** $gte */
  GTE?: Maybe<Scalars['String']>,
  /** $in */
  IN?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** $lt */
  LT?: Maybe<Scalars['String']>,
  /** $lte */
  LTE?: Maybe<Scalars['String']>,
  /** $ne */
  NE?: Maybe<Scalars['String']>,
  /** $nin */
  NIN?: Maybe<Array<Maybe<Scalars['String']>>>,
  /** $regex */
  REGEX?: Maybe<Scalars['String']>,
  /** $options. Modifiers for the $regex expression. Field is ignored on its own */
  OPTIONS?: Maybe<Scalars['String']>,
};
export type NewsArticleCountQueryVariables = {};


export type NewsArticleCountQuery = ({ __typename?: 'Query' } & Pick<Query, 'newsArticleCount'>);
