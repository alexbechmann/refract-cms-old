import { AxiosStatic } from 'axios';
import { store } from '../state/root.store';
const axios: AxiosStatic = require('axios');

class MediaService {
  upload(file: File, name: string) {
    let data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`${store.getState().config.serverUrl}/media`, data);
  }

  url(id: string) {
    return `${store.getState().config.serverUrl}/media/file/${id}`;
  }

  getAll() {
    return axios.get(`${store.getState().config.serverUrl}/media`).then(response => response.data);
  }
}

export default new MediaService();
