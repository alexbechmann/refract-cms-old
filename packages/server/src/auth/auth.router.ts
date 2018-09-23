import * as express from 'express';
import { Router } from 'express';
import { editorService } from '../editors/editor.service';
import { tokenService } from './token.service';

var router = express.Router();

router.post('/login', async (req, res) => {
  var match = await editorService.getEditorByCredentials(req.body.username, req.body.password);
  if (match) {
    res.send(tokenService.sign(match));
  }
  else {
    res.status(401).send();
  }
});

export default router as Router;
