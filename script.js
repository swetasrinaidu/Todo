const form = document.getElementById("form");
const addBtn = document.getElementById("add");
const search = document.getElementById("search");
const list = document.getElementById("list");
const tasks = document.getElementById("tasks");

const todos = JSON.parse(localStorage.getItem("todos"));
if(todos){
    todos.forEach((el)=>{
        addTodo("add",el[0],el[1])
    })
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo("add");
});


function addTodo(str,txt="",del=false) {
    if (str == "add") {
        let text;
        if(txt){
            text = txt;
        }
        else{
            text = search.value;
            search.value = "";
        }
        const li = document.createElement("li");
        if(txt && del) li.classList.add("delete");
        li.innerText = text;
        li.addEventListener("click",()=>{
            li.classList.toggle("delete");
            updateLs();
        })
        li.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            li.remove();
            updateLs();
        });
        list.appendChild(li);
        updateLs();
    }

}

function updateLs() {
    const todoEl = document.querySelectorAll("li");
    const todos = [];
    const classes =[];
    todoEl.forEach((el) => {
        todos.push([el.innerText,el.classList.contains("delete")]);

    });
    localStorage.setItem("todos", JSON.stringify(todos));
}