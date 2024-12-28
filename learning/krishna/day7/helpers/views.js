import {readFileSync, writeFileSync} from 'fs';
import path from 'path'


function getCurrentViews(){
    const content=readFileSync('/Users/krishnabahadurgurung/Documents/Project/sample2/6th-Semester-Project/learning/krishna/day7/views.json',{
        encoding:'utf-8'
    });
    const parsedContent=JSON.parse(content);
    return parsedContent
}

function increasedViews(){
 let CurrentViews=getCurrentViews();
 let count=CurrentViews.count;
 count=count+1;
 CurrentViews['count']=count;

 let JsonString=JSON.stringify(CurrentViews);
 writeFileSync('/Users/krishnabahadurgurung/Documents/Project/sample2/6th-Semester-Project/learning/krishna/day7/views.json',JsonString,{
    encoding:'utf-8'});
return CurrentViews;
};

function resetViews(){
    let CurrentViews=getCurrentViews();
    let count=CurrentViews.count;
    CurrentViews['count']=0;
    let JsonString=JSON.stringify(CurrentViews);
    writeFileSync('views.json',JsonString,{
        encoding:'utf-8'
    })
    return CurrentViews;
}
 
function decreaseViews(){
    let CurrentViews=getCurrentViews();
    let count=CurrentViews.count;
    count=count-10;
    CurrentViews['count']=count;
    let JsonString=JSON.stringify(CurrentViews);
    writeFileSync('views.json',JsonString,{
        encoding:'utf-8'
    })
    return CurrentViews;
}





export {getCurrentViews,increasedViews,resetViews,decreaseViews}