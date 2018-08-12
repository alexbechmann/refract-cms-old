const axios = require('axios');

class EntityService {
  insert(args: { alias: string; entity: any }) {
    const { alias, entity } = args;
    return axios.post(`http://localhost:3500/cms/content/${alias}/0`, entity);
  }
}

export default new EntityService();
