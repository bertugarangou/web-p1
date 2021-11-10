var checkedAll = true;

document.querySelector(".selectAll").addEventListener("click", event => {
    document.querySelectorAll(".checkbox").forEach(element => {
        element.checked = checkedAll;
    });
    checkedAll = !checkedAll;
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

function afegirCheckbox(){
    document.querySelectorAll(".checkbox").forEach(element => {
        element.addEventListener("change", event => {
            actualitzarTrashButton();
        });
    });
    actualitzarTrashButton();
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
    
    document.querySelector(".tasklist").innerHTML = "";
    await carregarTodos();
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
});

async function getTodos(){
    const raw = localStorage.getItem("todos");
    if(raw == null){
        return [];
    }
    return await JSON.parse(raw);
}

async function carregarTodos(){
    var todos = await getTodos();
    const llista = document.querySelector(".tasklist");

    todos.forEach(todo => {
        const { id, titol, descripcio, deadline, categoria, imatge, completed } = todo;

        const nouElement = `<div class="task" id="todo-${id}">
        <div class="taskSquare">
            <input type="checkbox" class="checkbox">
        </div>
        <div class="taskRectangle">
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