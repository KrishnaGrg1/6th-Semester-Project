const express=require('express');
const {handleGenerateShortUrl,handleGetAnalytics}=require('../controller/url')
const routes=express.Router();

routes.post('/',handleGenerateShortUrl);

routes.get('/analytics/:shortId',handleGetAnalytics);

module.exports=routes;