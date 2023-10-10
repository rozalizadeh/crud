const Add_btn=document.querySelector("#add-btn");
const Todo_input=document.querySelector("#todo-input");
const Todo_list=document.querySelector(".list");
const real_list=JSON.parse(localStorage.getItem("my_list"));
for(let i =0 ; i<real_list.length ; i++){
    const title=real_list[i];
    addTolist(title);
}

Add_btn.addEventListener("click", ()=>{
    const item=Todo_input.value;
    validationCheck(item);
    
    
})
function clearInput(){
    Todo_input.value=""

}
function syncStorage(item){
    real_list.push(item)
    const string_List= JSON.stringify(real_list);
    localStorage.setItem("my_list", string_List);

}
function validationCheck(item){
    if(item===""){
        alert("you can not add empty string!");
    }else{ 
       syncStorage(item);
       addTolist(item);
       clearInput();

    }
}
function addTolist(item){

const div_item=document.createElement("div");
div_item.classList.add("item");

const checkbox=document.createElement("input");
checkbox.setAttribute("type", "checkbox");

const span=document.createElement("span");
span.textContent=item;

div_item.appendChild(checkbox);
div_item.appendChild(span);
Todo_list.appendChild(div_item);





// console.log(list)
// const p=document.createElement("p")
// p.textContent=item
// console.log(p)
}