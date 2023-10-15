const Add_btn=document.querySelector("#add-btn");
const Todo_input=document.querySelector("#todo-input");
const Todo_list=document.querySelector(".list");
const del_btn=document.querySelector("#delete");

let list=[];

function validationCheck(){
    const val=Todo_input.value;

    if(val === ""){
        alert("you can not add empty string!");
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
    
    const span=document.createElement("span");
    span.textContent=item.title;
    
    div_item.appendChild(checkbox);
    div_item.appendChild(span);
    Todo_list.appendChild(div_item);
    checkbox.addEventListener("click", ()=> {
    toggleStatus(item.title);
        
    })




    
}
function clearInput(){
    Todo_input.value=""

}
function renderList(){
    for(let i =0 ; i<list.length ; i++){
        const item=list[i];
        renderItem(item);
    }

}
function remove(){
    
    for(let i=0;i<list.length;i++){
        if(list[i].status===true){
         list.splice(i,1);
        }



        
     }
     syncStorage();
     
    
     console.log(list);
    }
 

    

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
    }
    del_btn.addEventListener("click",()=>{
     remove();



    })
   


function init(){
    loadFromStorage();
    renderList();
    events();
    console.log(list);
}
init();