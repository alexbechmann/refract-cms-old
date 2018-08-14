import { store } from '../state/root.store';
import axios from 'axios';

class EntityService {
  insert(args: { alias: string; entity: any }) {
    const { alias, entity } = args;
    return axios.post(`${store.getState().config.serverUrl}/content/${alias}`, entity).then(response => response.data);
  }
  update(args: { alias: string; entity: any; id }) {
    const { alias, entity, id } = args;
    return axios
      .put(`${store.getState().config.serverUrl}/content/${alias}/${id}`, entity)
      .then(response => response.data);
  }
  delete(args: { alias: string; id: string }) {
    const { alias, id } = args;
    return axios.delete(`${store.getState().config.serverUrl}/content/${alias}/${id}`).then(response => response.data);
  }

  getAll(args: { alias: string }) {
    const { alias } = args;
    return axios.get(`${store.getState().config.serverUrl}/content/${alias}`).then(response => response.data);
  }

  getById(args: { alias: string; id: string }) {
    const { alias, id } = args;
    return axios.get(`${store.getState().config.serverUrl}/content/${alias}/${id}`).then(response => response.data);
  }
}

export default new EntityService();
