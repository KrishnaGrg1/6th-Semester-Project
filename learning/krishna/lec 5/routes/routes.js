const {handleGenerateShortUrl,
    handleGetAnalytics,}=require('../controller/url');


    const express=require('express');
    const router=express.Router();


    router.post('/', handleGenerateShortUrl);

    router.get('/analytics/:shortID', handleGetAnalytics,);


    module.exports=router;