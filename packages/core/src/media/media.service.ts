import { store } from '../state/root.store';
import axios from 'axios';
import { ImageProcessArgs } from '@refract-cms/domain';
import * as qs from 'qs';

export default {
  upload: (file: File, name: string) => {
    let data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`${store.getState().config.serverUrl}/media`, data);
  },
  buildUrl: (id: string, args?: ImageProcessArgs) => {
    let argsQuery = args ? `?${qs.stringify(args)}` : '';
    return `${store.getState().config.serverUrl}/media/file/${id}${argsQuery}`;
  }
};
