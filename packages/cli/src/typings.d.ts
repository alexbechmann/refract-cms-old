import { Config } from '@refract-cms/core';

declare module '@consumer/config' {
  var config: Config;
  export default config;
}
