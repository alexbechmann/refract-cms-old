import { match } from 'react-router';

function buildPath<T>(match: match<T> | undefined, relativePath: string) {
  return `${match ? match.path : ''}${relativePath.length > 0 ? '/' : ''}${relativePath}`.replace('//', '/');
}

function buildUrl<T>(match: match<T> | undefined, relativePath: string) {
  return `${match ? match.url : ''}${relativePath.length > 0 ? '/' : ''}${relativePath}`.replace('//', '/');
}

export const routes = {
  root: {
    path: <T>(match: match<T> | undefined) => buildPath(match, ''),
    url: <T>(match: match<T> | undefined) => buildUrl(match, '')
  },
  entities: {
    path: <T>(match: match<T> | undefined) => buildPath(match, '/entities'),
    url: <T>(match: match<T> | undefined) => buildUrl(match, '/entities')
  },
  entityRoot: {
    path: <T>(match: match<T> | undefined, entityAlias: string) => buildPath(match, `/${entityAlias}`),
    url: <T>(match: match<T> | undefined, entityAlias: string) => buildUrl(match, `/${entityAlias}`)
  },
  entityEditById: {
    path: <T>(match: match<T> | undefined, entityAlias: string) => buildPath(match, `/${entityAlias}/:id`),
    url: <T>(match: match<T> | undefined, id: string, entityAlias: string) => buildUrl(match, `/${entityAlias}/${id}`)
  }
};
