import { store } from '../state/root.store';
import axios from 'axios';
import { ImageProcessArgs } from '../generated';
import * as qs from 'qs';
import { EntityService } from '../entities/entity.service';
import { MediaFile } from './models/media-file.model';

export class MediaService extends EntityService<MediaFile> {
  constructor() {
    super({ alias: 'media.files' });
  }

  upload = (file: File, name: string) => {
    let data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`${store.getState().config.serverUrl}/media`, data);
  };

  buildUrl = (id: string, args?: ImageProcessArgs) => {
    let argsQuery = args ? `?${qs.stringify(args)}` : '';
    return `${store.getState().config.serverUrl}/media/file/${id}${argsQuery}`;
  };
}

export default new MediaService();
