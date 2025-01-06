import { Router } from 'express';
import { getBookMetaData, updateBookMetaData } from '../models/bookMetaData.js';
import { Book } from '../models/bookdetails.js';
import validate from '../middleware/validate.js';
import { update } from '../validation/metadata.js';
import { bookValidation } from '../validation/book.js';
import mongoose from 'mongoose';
const bookRouter=Router();
const singleBookRouter=Router();

bookRouter.get('/',async(req,res)=>{
  try{
   
    const metadata = (await getBookMetaData()).toObject();
    let book=await Book.find({})
    return res.json({...metadata,book:book, _id: undefined, __v: undefined, date: new Date().toISOString()})
  }catch(e){
    return res.status(400).json({
      error:e.message()
    })
  }
})

bookRouter.put('/',validate(update),async(req,res)=>{
  try{
   let {source,updatedBy}=req.body;
   let latest=await updateBookMetaData(req.body);
   return res.status(200).json({ metadata: latest })
  }catch(e){
    return res.status(400).json({
      error:e.message()
    })
  }
})


bookRouter.post('/',validate(bookValidation.add),async(req,res)=>{
  try{
    let {title,author,publishedYear,genre,rating}=req.body
    let book=await Book.create(req.body)
    return res.json({
     message:"Book added successfully",
      book:book
    })
  }
  catch(e){
    return res.status(400).json({
      error:e.message
    })
  }
})


bookRouter.use('/:bookId',validate(bookValidation.validateSingle),async function(req,res,next){
  try{
    let bookId=req.params.bookId;
    
    let existing=await Book.findOne({_id:new mongoose.Types.ObjectId(bookId)});

    if (existing) {
      req.existing = existing;
      next();
  } else {
      throw new Error("Book not found by id: " + bookId);
  }
  }catch(e){
    return res.status(400).send({ error: e.message })
  }
},singleBookRouter)

singleBookRouter.get('/',function(req,res){
  return res.json(
    req.existing
  )
})

singleBookRouter.put('/',validate(bookValidation.add),async function(req,res){
 try{
  let {title,author,publishedYear,genre,rating}=req.body 
  req.existing.title=title;
  req.existing.author=author;
  req.existing.publishedYear=publishedYear;
  req.existing.genre=genre;
  req.existing.rating=rating;
  await req.existing.save();
  return res.json({
    message:"Book updated successfully",
    "book":req.existing
    })
 }
 catch(e){
  return res.status(400).json({
    error:e.message
  })
 }
})

singleBookRouter.delete('/',async function(req,res){
  try{
    await req.existing.deleteOne()
    return res.json({
      "message": "Book deleted successfully"
    })
  }
  catch(e){
   return res.status(400).json({
     error:e.message
   })
  }
})


export{
  bookRouter
}