const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
router.get('/notes/add', (req,res) =>{
  res.render('notes/new-notes')
});

router.post('/notes/new-notes', async(req,res) =>{
  const {title, description} = req.body;
  const errors = [];
  if(!title){
    errors.push({text: 'Please Write a Title'});
  }
  if(!description){
    errors.push({text: 'Please Write a Title'});
  }
  if(errors.length > 0){
    res.render('notes/new-notes',{
      errors,
      title,
      description
    });
  }else{
    const newNote = new Note({title, description});
    await newNote.save();
    res.redirect('/notes');
  }
});
router.get('/notes', (req, res) =>{
  res.send('notas');
});

module.exports = router;
