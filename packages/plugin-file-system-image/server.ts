import { createServerPlugin, repositoryForSchema } from '@refract-cms/server';
import { fileSystemImagePluginConfig } from './';
import multer from 'multer';
import uniqueString from 'unique-string';
import { FileModel } from './file.model';
import { FileSystemImageSchema } from './file-system-image.schema';
import jimp = require('jimp');

interface FileSystemImageServerPluginOptions {
  filesPath: string;
}

export const fileSystemImageServerPlugin = ({ filesPath }: FileSystemImageServerPluginOptions) =>
  createServerPlugin(fileSystemImagePluginConfig, {
    events: {},
    resolverPlugins: [],
    configureRouter: router => {
      router.get('/hi', (req, res) => {
        res.send('hi');
      });

      const storage = multer.diskStorage({
        destination: filesPath,
        filename(req, file, cb) {
          console.log(file);
          cb(null, `${uniqueString()}_${file.originalname}`);
        }
      });
      const upload = multer({ storage });
      const fileRepository = repositoryForSchema(FileSystemImageSchema);

      router.get('/files/:id', async (req, res) => {
        const { id } = req.params;
        const crop = req.query;
        const entity = await fileRepository.findById(id);

        if (entity.fileRef) {
          const img = await jimp.read(entity.fileRef.path);

          if (crop.x && crop.y && crop.width && crop.height) {
            img.crop(parseInt(crop.x), parseInt(crop.y), parseInt(crop.width), parseInt(crop.height));
          }

          const imgBuffer = await img.getBufferAsync(entity.fileRef.mimetype);
          res.writeHead(200, { 'Content-Type': entity.fileRef.mimetype });
          res.end(imgBuffer, 'binary');
        } else {
          res.sendStatus(500);
        }
      });

      router.post('/files', upload.single('file'), (req, res) => {
        const { mimetype, path, filename, size } = req.file;
        res.send(req.file);
      });
    }
  });
