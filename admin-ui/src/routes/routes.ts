import { match } from 'react-router';

function buildPath<T>(match: match<T> | undefined, relativePath: string) {
  return `${match ? match.path : ''}/${relativePath}`.replace('//', '/');
}

function buildUrl<T>(match: match<T> | undefined, relativePath: string) {
  return `${match ? match.url : ''}/${relativePath}`.replace('//', '/');
}

export const routes = {
  dashboard: {
    path: <T>(match: match<T> | undefined) => buildPath(match, '/dashboard'),
    url: <T>(match: match<T> | undefined) => buildUrl(match, '/dashboard')
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
