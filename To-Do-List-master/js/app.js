// CODE EXPLAINED channel
//select the elements
const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");


//variable
let LIST=[];
let id=0;

//classes names
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THORUGH="lineThrough";

//show todays date
const options={day:"numeric", weekday:"short" ,month:"short"}
dateElement.innerHTML=new Date().toLocaleDateString("en-US",options);

//get items from local sytorage
let data=localStorage.getItem("TODO");
if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    loadList(LIST);
}
else{
    LIST=[];
    id=0;
}

//load items to user
function loadList (array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

//Add to do function
function addToDo(toDo, id, done,trash){
    if(trash){return;}
    const DONE= done ? CHECK: UNCHECK;
    const LINE=done? LINE_THORUGH:"";
    const item=`<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="0"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="0"></i>
                    </li>`;
                    list.insertAdjacentHTML("beforeend",item);
}
//addToDo("Heloos", 1, false,false)

input.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        const ToDo=input.value;
        if(ToDo!=" "){
            addToDo(ToDo,id,false,false);
            LIST.push({
                name:ToDo,
                id:id,
                done:false,
                trash:false
            })
            //add item to local storage add this line where list is updtaed
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
            console.log(LIST)
        }
        input.value=" ";
    }
        
})

//complete to do
function completeToDo(element){
    element.classlist.toggle(CHECK);
    element.classlist.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classlist.toggle(LINE_THORUGH);
    LIST[element.id].done=LIST[element.id].done? false: true;

}

//remove todo by dustine icon by calling below function
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
    LIST.splice(element.id,1);
    
}
list.addEventListener("click",function(event){
    const element= event.target; //return on whch element event occurred.whihc can be fafacircle or fatrash
    const elementJob=element.attributes.job.value;// complete or delete.
    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
        removeTodo(element);
    }
    //add item to local storage add this line where list is updtaed
    localStorage.setItem("TODO",JSON.stringify(LIST));
});

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})