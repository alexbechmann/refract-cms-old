import { mongoHelper } from '../db/mongo-helper';
import { Editor, Entity } from '../generated';

export const editorService = {
  async ensureAdminExists(password: string) {
    const db = await mongoHelper.db();
    const collection = db.collection<Editor>('editors');
    const admin = await collection.findOne({
      username: 'admin'
    });
    if (!admin) {
      return collection.insertOne({ username: 'admin', password });
    } else {
      return collection.replaceOne(
        { id: admin._id },
        {
          ...admin,
          password
        }
      );
    }
  },
  async getEditorByCredentials(username: string, password: string): Promise<Editor> {
    const db = await mongoHelper.db();
    const collection = db.collection<Editor>('editors');
    return collection.findOne({ username, password });
  }
};
