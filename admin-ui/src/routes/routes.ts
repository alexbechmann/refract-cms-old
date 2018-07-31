import { match } from 'react-router';

function buildPath<T>(match: match<T>, relativePath: string) {
  return `${match ? match.path : ''}/${relativePath}`.replace('//', '/');
}

function buildUrl<T>(match: match<T>, relativePath: string) {
  return `${match ? match.url : ''}/${relativePath}`.replace('//', '/');
}

export const routes = {
  dashboard: {
    buildPath: <T>(match: match<T>) => buildPath(match, '/dashboard'),
    buildUrl: <T>(match: match<T>) => buildUrl(match, '/dashboard')
  }
};
