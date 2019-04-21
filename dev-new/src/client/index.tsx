import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
import config from '../refract-cms/refract.config';
import 'typeface-roboto';

render(<Dashboard config={config} rootPath="/" serverUrl="/cms" />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
