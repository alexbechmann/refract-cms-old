import { store } from '../state/root.store';
import axios from 'axios';

class EntityService {
  insert<T = any>(args: { alias: string; entity: any }): Promise<T> {
    const { alias, entity } = args;
    return axios.post(`${store.getState().config.serverUrl}/entities/${alias}`, entity).then(response => response.data);
  }

  update<T = any>(args: { alias: string; entity: any; id }): Promise<T> {
    const { alias, entity, id } = args;
    return axios
      .put(`${store.getState().config.serverUrl}/entities/${alias}/${id}`, entity)
      .then(response => response.data);
  }

  delete<T = any>(args: { alias: string; id: string }): Promise<T> {
    const { alias, id } = args;
    return axios.delete(`${store.getState().config.serverUrl}/entities/${alias}/${id}`).then(response => response.data);
  }

  getAll<T = any>(args: { alias: string }): Promise<T[]> {
    const { alias } = args;
    return axios.get(`${store.getState().config.serverUrl}/entities/${alias}`).then(response => response.data);
  }

  getById<T = any>(args: { alias: string; id: string }): Promise<T> {
    const { alias, id } = args;
    return axios.get(`${store.getState().config.serverUrl}/entities/${alias}/${id}`).then(response => response.data);
  }
}

export default new EntityService();
