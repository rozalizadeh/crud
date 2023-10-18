const Add_btn=document.querySelector("#add-btn");
const Todo_input=document.querySelector("#todo-input");
const Todo_list=document.querySelector(".list");
const remove_btn=document.querySelector("#remove");
const select_btn=document.querySelector(".combo");
const select_done=document.querySelector("#done");
const select_todo=document.querySelector("#todo");
const select_all=document.querySelector("#all");
const search_btn=document.querySelector("#search");
const inp_search=document.querySelector("#inp-search");

let list=[];

function validationCheck(){
    const val=Todo_input.value;

    if(val === ""){
        alert("you can not add empty string!");
        return;
    }else{ 
        const item={
        title: val,
        status: false,
        };
       addItem(item);
       renderItem(item);
       clearInput();

    }
}
//work with dom
function renderItem(item){

    const div_item=document.createElement("div");
    div_item.classList.add("item");
    
    const checkbox=document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked=item.status;

    const del_btn=document.createElement("button");
    del_btn.setAttribute("type", "button");
    del_btn.textContent="Delete";
    del_btn.classList.add("delete");
    del_btn.addEventListener("click",()=>{
          Delete(item.title); })
    
    const span=document.createElement("span");
    span.textContent=item.title;
    
    div_item.appendChild(checkbox);
    div_item.appendChild(span);
    div_item.appendChild(del_btn);
    Todo_list.appendChild(div_item);
    checkbox.addEventListener("click", ()=> {
    toggleStatus(item.title);
        
    })
  }


function selectFilter(){
switch(select_btn.value){
    case "todo":
        loadFromStorage();
        const select_todo= list.filter((item) =>{
            return !item.status;
          })
          list=select_todo;
          renderList();
        break;
    case "done":
        loadFromStorage();
        const select_done= list.filter((item) =>{
            return item.status;
          })
          list=select_done;
          renderList();
        break;
    case "all":
        loadFromStorage();
        renderList();
        break;

}

}
function clearInput(){
    Todo_input.value=""

}
function renderList(){
    Todo_list.innerHTML="";
    
    for(let i =0 ; i<list.length ; i++){
        const item=list[i];
        renderItem(item);
    }

}
function Delete(title){
    
    for(let i=0;i<list.length;i++){
        if(list[i].title===title){
         list.splice(i,1);
        }
       
     }
     syncStorage();
     renderList();
      
     console.log(list);
    }
 function onRemove(){
 const newlist= list.filter((item) =>{
   return !item.status;
 })
 list=newlist;
 syncStorage();
 renderList();

 }
// search
    function search(){
        
        loadFromStorage();
        const templist=[];
        list.forEach((title,i)=>{
            let temp=list[i].title;
            if(temp.includes(inp_search.value)){
                templist.push(list[i]);
                      }
                });
       if(templist.length===0){
        alert("the string you are looking for is not founded!!!")
        renderList();
        inp_search.value="";
       } 
       else{
       
    list=templist;
    console.log("list:",list);
    renderList();
    inp_search.value="";

    }}

//work with storage
function syncStorage(){
      
    const string_List= JSON.stringify(list);
    localStorage.setItem("my_list", string_List);
    console.log(list);
}
function loadFromStorage(){

    const listFromStorage=JSON.parse(localStorage.getItem("my_list")) || [];
   
    list=listFromStorage;
   
}
function addItem(item){

    const next_item={
        title: item.title,
        status: item.status,
    };
    list.push(next_item);
    syncStorage();
           

}
//functionality
function toggleStatus(title){
    for(let i=0 ; i<list.length ; i++){

        if (list[i].title===title){
            list[i].status=!list[i].status;
            

                     }
    }
    syncStorage();
}


function events(){
    Add_btn.addEventListener("click", validationCheck);     
    
    remove_btn.addEventListener("click",()=>{
     onRemove(); })
    
         select_btn.addEventListener("change", () => {
            selectFilter();
          
         })
         select_btn.addEventListener("click", () => {
            selectFilter();
          
         })

    search_btn.addEventListener("click" ,()=>{
        search();

    })     
        }

function init(){
    loadFromStorage();
    renderList();
    events();
    console.log(list);
}
console.log(list);
// syncStorage();
init();