const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req,res) =>{
  res.render('notes/new-notes')
});

router.post('/notes/new-notes', isAuthenticated, async(req,res) =>{
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
    newNote.user =req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note added Successfully');
    res.redirect('/notes');
  }
});
router.get('/notes', isAuthenticated, async(req, res) =>{
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render('notes/allnotes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async(req, res) =>{
  const note = await Note.findById(req.params.id);
  res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Note update Successfully');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id' , isAuthenticated, async (req, res) =>{
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note delete Successfully');
  res.redirect('/notes');
});
module.exports = router;
