const express = require('express');
const router = express.Router();

router.get('/notes/add', (req,res) =>{
  res.render('notes/new-notes.hbs')
});
router.get('/notes', (req, res) =>{
  res.send('notas');
});

module.exports = router;
