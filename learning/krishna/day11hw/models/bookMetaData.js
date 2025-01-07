
import mongoose, { Schema, model } from "mongoose";

const bookMetaDataSchema = new Schema({
  source:{
    type:String,
    default:''
  },
  updatedBy:{
    type:String,
    default:''
  }
});



const BookMetaData = model("bookMetaData", bookMetaDataSchema);

async function getBookMetaData(){
  let existing=await BookMetaData.findOne({});

  if(!existing){
    existing=await BookMetaData.create({});
    console.log("Created Metadata");
  }
  return existing;
}


async function updateBookMetaData({source,updatedBy}){
  let existing=await getBookMetaData();

  existing.source=source;
  existing.updatedBy=updatedBy;

  await existing.save();
  return existing;

}

export{
  BookMetaData,getBookMetaData,updateBookMetaData
}
