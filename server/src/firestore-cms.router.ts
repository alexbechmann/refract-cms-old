const express = require('express');
var router = express.Router();

router.post('/content/:alias/:id?', (req, res) => {
  res.send({
    alias: req.alias,
    params: req.params
  });
});

export default router;
