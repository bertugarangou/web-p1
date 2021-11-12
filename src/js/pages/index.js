var checkedAll = true;
var allDuties = true;
var todosActuals;

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

//revisar que sols miri els actuals i borri els totals (si? sembla que ja funciona)
document.querySelector("#trashButton").addEventListener("click", async event => {
    var todos = await getTodos();
    
    for (var i = todosActuals.length - 1; i >= 0; i--){
        const todo = todosActuals[i];

        const element = document.querySelector(`#todo-${todo.id}`);
        if(element.querySelector(".checkbox").checked){
            todos.splice(todos.indexOf(todo), 1);//index de l'array actual A l'array total
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    
    await carregarTodos();
    await calcularDuties();
    checkedAll = true;
    console.log(todos)
});


document.querySelector("#tickButton").addEventListener("click", async event => {

    for(var i = todosActuals.length -1; i >= 0; i--){
        var todo = todosActuals[i];
        const element = document.querySelector(`#todo-${todo.id}`);
        if(element.querySelector(".checkbox").checked){
            if(element.querySelector(".taskRectangle").getAttribute("completed") == "false"){
                todo.completed = true;
            }else{
                todo.completed = false;
            }

        }
    }
    localStorage.setItem("todos", JSON.stringify(todosActuals));
    await carregarTodos();
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
    await calcularUrgents(await getTodos());

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

async function calcularUrgents(tasks){
    //var tasks = await getTodos();
    var numberOfUrgents = 0;
    tasks.forEach(task => {
        if(Date.now() - task.id  > 604800000 && task.completed == false){//604800000 = one week //////////////////////canviaaaaaaaaaa'm
            

            const urgentText = document.querySelector(`#todo-${task.id} .urgentState`);
            urgentText.innerHTML = `<p>Urgent!</p>`;
            numberOfUrgents++;
        }
    });


    const urgentDuty = document.querySelector(".urgents");
    urgentDuty.innerHTML = `<p class="urgents">${numberOfUrgents} urgent</p>`
    numberOfUrgents = 0;
}


document.querySelector("#today").addEventListener("click", event => {
    allDuties = false;
    carregarTodos();
});

document.querySelector("#allDuties").addEventListener("click", event =>{
    allDuties = true;
    carregarTodos();
});


function ordenarPerToday(todos){
    
    var today = new Date(Date.now());
    today = today.getFullYear() + "-" + (1 + parseInt(today.getMonth())) + "-" + today.getDate();


    todos.forEach(todo =>{ 
        console.log("tractant el todo '" + todo.titol + "'")
        if(today.localeCompare(todo.deadline) != 0){
            console.log("eliminat el titol '" + todo.titol + "'")
            todos.splice(todos.indexOf(todo), 1)
        }
    })

    ordenarPerData(todos);
}

function ordenarPerData(todos){


    todos.sort(
        function (a, b) {
            if(b.completed == true && a.completed == false){
                return -1;
            }else if(b.completed == false && a.completed == true){
                return 1;
            }else{
                return b.id - a.id;//canviar ID per DATE (i potser traduir la date a timestamp/epoch si fa falta) si s'ha dordenar diferent
            }
        }
    );

    //localStorage.setItem("todos", JSON.stringify(todos)); //deixar comentat sempre i quan no falli res d'ordres

}

async function carregarTodos(){
    console.log("todos abans d'ordenar: ")
    console.log(todos);
    document.querySelector(".tasklist").innerHTML = "";
    const llista = document.querySelector(".tasklist");
    checkedAll = true;

    var todos = await getTodos();
    if(allDuties == true){
        ordenarPerData(todos);
    }else{
        ordenarPerToday(todos);
    }
    await console.log(todos)

    await todos.forEach(todo => {
        //correcció width
        var size = Math.floor(document.querySelector("body").clientWidth*0.05 - 35);
        if(todo.descripcio.length > size){
             todo.descripcio = todo.descripcio.slice(0,size) + "...";
        }

        var size2 = Math.floor(document.querySelector("body").clientWidth*0.015);
        if(todo.titol.length > size2){
            todo.titol = todo.titol.slice(0,size2) + "...";
        }

        //creació tasks
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
    todosActuals = todos;
    afegirCheckbox();
    calcularUrgents(todosActuals)
}