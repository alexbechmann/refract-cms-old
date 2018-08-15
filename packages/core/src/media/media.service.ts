import { store } from '../state/root.store';
import axios from 'axios';

export default {
  upload: (file: File, name: string) => {
    let data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`${store.getState().config.serverUrl}/media`, data);
  },
  buildUrl: (id: string) => {
    return `${store.getState().config.serverUrl}/media/file/${id}`;
  }
};
