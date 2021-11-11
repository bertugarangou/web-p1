var checkedAll = true;

document.querySelector(".selectAll").addEventListener("click", event => {
    document.querySelectorAll(".checkbox").forEach(element => {
        element.checked = checkedAll;
    });
    checkedAll = !checkedAll;
    actualitzarTrashButton()
    actualitzarTickButton();
});

function actualitzarTrashButton(){
    var algun = false;
    document.querySelectorAll(".checkbox").forEach(element => {
        if(element.checked){
            algun = true;
        }
    });

    if(algun)
        document.querySelector("#trashButton").removeAttribute("disabled");
    else
        document.querySelector("#trashButton").setAttribute("disabled", "true");
}

function actualitzarTickButton(){
    var algun = false;
    document.querySelectorAll(".checkbox").forEach(element => {
        if(element.checked){
            algun = true;
        }
    });

    if(algun)
        document.querySelector("#tickButton").removeAttribute("disabled");
    else
        document.querySelector("#tickButton").setAttribute("disabled", "true");
}

function afegirCheckbox(){
    document.querySelectorAll(".checkbox").forEach(element => {
        element.addEventListener("change", event => {
            actualitzarTrashButton();
            actualitzarTickButton();
        });
    });
    actualitzarTrashButton();
    actualitzarTickButton();
}

document.querySelector("#trashButton").addEventListener("click", async event => {
    var todos = await getTodos();
    for (var i = todos.length - 1; i >= 0; i--){
        const todo = todos[i];

        const element = document.querySelector(`#todo-${todo.id}`);
        if(element.querySelector(".checkbox").checked){
            todos.splice(i, 1);
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    
    await carregarTodos();
    await calcularDuties();
    checkedAll = true;
});


document.querySelector("#tickButton").addEventListener("click", async event => {
    var todos = await getTodos();
    for(var i = todos.length -1; i >= 0; i--){
        var todo = todos[i];
        const element = document.querySelector(`#todo-${todo.id}`);
        if(element.querySelector(".checkbox").checked){
            if(element.querySelector(".taskRectangle").getAttribute("completed") == "false"){
                todo.completed = true;
            }else{
                todo.completed = false;
            }

        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    await carregarTodos();
    await calcularUrgents();
    checkedAll = true;
});

document.querySelector(".add-task-button").addEventListener("click", event => {
    window.location.href = "./form.html";
});

/* 
{
    titol: "titol",
    descripcio: "descripcio",
    deadline: "data",
    categoria: "",
    image: "",
    completed: false
}
*/
document.addEventListener("DOMContentLoaded", async event => {
    await carregarTodos();
    await calcularDuties();
    await calcularUrgents();

});

window.addEventListener("resize", async event =>{
    await carregarTodos();
});

async function getTodos(){
    const raw = localStorage.getItem("todos");
    if(raw == null){
        return [];
    }
    return await JSON.parse(raw);
    

}


async function calcularDuties(){
    const duties = JSON.parse(localStorage.todos).length;
    const dutiesHTML = document.querySelector(".duties");
    dutiesHTML.innerHTML = `<p class="duties">${duties} duties</p>`;
}

async function calcularUrgents(){
    var tasks = await getTodos();
    var numberOfUrgents = 0;
    tasks.forEach(task => {
        if(Date.now() - task.id  > 604800000){//604800000 = one week
            

            const urgentText = document.querySelector(`#todo-${task.id} .urgentState`);
            urgentText.innerHTML = `<p>Urgent!</p>`;
            numberOfUrgents++;
        }
    });


    const urgentDuty = document.querySelector(".urgents");
    urgentDuty.innerHTML = `<p class="urgents">${numberOfUrgents} urgent</p>`
    numberOfUrgents = 0;
}

async function carregarTodos(){
    document.querySelector(".tasklist").innerHTML = "";

    var todos = await getTodos();
    const llista = document.querySelector(".tasklist");


    todos.forEach(todo => {
        var size = Math.floor(document.querySelector("body").clientWidth*0.065 - 35);
        if(todo.descripcio.length > size){
             todo.descripcio = todo.descripcio.slice(0,size) + "...";
        }

        var size2 = Math.floor(document.querySelector("body").clientWidth*0.025);
        console.log(size2)
        if(todo.titol.length > size2){
            todo.titol = todo.titol.slice(0,size2) + "...";
        }
        const { id, titol, descripcio, deadline, categoria, imatge, completed } = todo;

        const nouElement = `<div class="task" id="todo-${id}">
        <div class="taskSquare" completed="${completed}">
            <input type="checkbox" class="checkbox">
        </div>
        <div class="taskRectangle" completed="${completed}">
            <div class="container1">
                <img src="${imatge}" alt="Board with paper. Website logo." id="webLogo"
                height="47" width="47">
            </div>
            <div class="container2">
                <p class="taskTitle">${titol}</p>
                <p class="taskDescription">${descripcio}</p>
            </div>
            <div class="container3">
                <div class="container4">
                    <div class="urgentState">
                    </div>
                    <p class="taskDate">${deadline}</p>
                </div>
                <div class="container5">
                    <div class="cosa">
                        <p class="taskCategory1">Development</p>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="14" rx="5" fill="#43AA8B"/>
                    </svg> 
                    </div>
                    <div class="cosa">
                        <p class="taskCategory1">Uni Projects</p>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="14" rx="5" fill="#F94144"/>
                    </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

        llista.innerHTML += nouElement;
    });
    afegirCheckbox();
}