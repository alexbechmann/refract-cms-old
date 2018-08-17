export interface Config {
  mongoConnectionString?: string;
}

export const configure = (config: Config) => {
  global['refract-cms-config'] = config;
};

export const getCurrentConfig = () => global['refract-cms-config'] as Config;
