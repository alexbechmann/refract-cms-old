import { AxiosStatic } from 'axios';
const axios: AxiosStatic = require('axios');

class EntityService {
  insert(args: { alias: string; entity: any }) {
    const { alias, entity } = args;
    return axios.post(`http://localhost:3500/cms/content/${alias}`, entity).then(response => response.data);
  }
  update(args: { alias: string; entity: any; id }) {
    const { alias, entity, id } = args;
    return axios.put(`http://localhost:3500/cms/content/${alias}/${id}`, entity).then(response => response.data);
  }
  delete(args: { alias: string; id: string }) {
    const { alias, id } = args;
    return axios.delete(`http://localhost:3500/cms/content/${alias}/${id}`).then(response => response.data);
  }

  getAll(args: { alias: string }) {
    const { alias } = args;
    return axios.get(`http://localhost:3500/cms/content/${alias}`).then(response => response.data);
  }

  getById(args: { alias: string; id: string }) {
    const { alias, id } = args;
    return axios.get(`http://localhost:3500/cms/content/${alias}/${id}`).then(response => response.data);
  }
}

export default new EntityService();
