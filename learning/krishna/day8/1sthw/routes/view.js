import { readFileSync, writeFileSync} from "fs";


function viewall(){
   const view=readFileSync('/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/1sthw/view.json',{encoding:"utf-8" })
    const parsedData=JSON.parse(view);
    return parsedData;
}

function addtodo(taskname){

    let {count,todo}=viewall();

   if(todo.includes(taskname)){
    throw new Error (`${taskname} is already exist`);
   }else{
    todo.push(taskname)
    let write={todo,count};
    let obj=JSON.stringify(write);
    writeFileSync('/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/1sthw/view.json',obj,{
        encoding:'utf8'
    })
    return write;
   }

}

function editTodo(taska,taskb){
    let {count,todo}=viewall();

    if(todo.includes(taska)){
        if(todo.includes(taskb)){
            throw new Error (`${taskb} is already exist`);
        }else{
            const index = todo.indexOf(taska);
            todo[index]=taskb;
            let write={todo,count};
            let obj=JSON.stringify(write);
            writeFileSync('/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/1sthw/view.json',obj,{
                encoding:'utf8'
            })
            return write;
        }
       }else{
        throw new Error (`${taska} not found`);
      
    }
}


function deleteTodo(taskname){
    const {todo,count}=viewall();
    if(todo.includes(taskname)){
        const todoIndex=todo.indexOf(taskname)
        todo.splice(todoIndex,1);
        const write={todo,count};
        let obj=JSON.stringify(write);
        writeFileSync('/Users/krishnabahadurgurung/Documents/Project/sample4/6th-Semester-Project/learning/krishna/day8/1sthw/view.json',obj,{
            encoding:'utf8'
        })
        return write;
    }else{
        throw new Error (`${taska} not found`);
    }
}


export {viewall,addtodo, editTodo,deleteTodo}