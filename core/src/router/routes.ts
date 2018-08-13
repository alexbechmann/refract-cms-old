export interface Routes {
  root: {
    path: () => string;
    url: () => string;
  };
  content: {
    path: () => string;
    url: (entityAlias?: string) => string;
  };
  entityRoot: {
    path: (entityAlias: string) => string;
    url: (entityAlias: string) => string;
  };
  entityEditById: {
    path: (args: { entityAlias: string }) => string;
    url: (args: { id: string; entityAlias: string }) => string;
  };
}
