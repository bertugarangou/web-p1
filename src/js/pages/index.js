var checkedAll = true;
var allDuties = true;

var todosVisibles = null;
var todosTotals;

document.querySelector(".selectAll").addEventListener("click", event => {
    document.querySelectorAll(".checkbox").forEach(element => {
        element.checked = checkedAll;
    });
    checkedAll = !checkedAll;
    actualitzarTrashButton();
    actualitzarTickButton();
});



/*Desplegable de categories */

document.querySelector('.select-wrapper').addEventListener('click', function() {

    this.querySelector('.select').classList.toggle('open');
    /*Cambiar color por uno selecionado */
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {

                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');

                this.classList.add('selected');


                this.closest('.select').querySelector('.select__trigger svg').innerHTML = `width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><rect class = "rectSVG" width="19" height="19" rx="5" fill="${option.querySelector(".rectSVG").getAttribute("fill")}" id="colorChosen"/>`;
            }
        });
    }
});


document.querySelector(".square2").addEventListener("click", event=>{
    var input = document.getElementById("catBox");
    input = input.value;
    if(input != ""){
        const cat = {
            color: document.getElementById("colorChosen").getAttribute("fill"),
            name: input,
            id: Date.now()
        };
        //afegir localstorage
        const raw = localStorage.getItem("categories");
        if (raw == null) {
            localStorage.setItem("categories", JSON.stringify([cat]));
        } else {
            const cats = JSON.parse(raw);
            cats.push(cat);
            localStorage.setItem("categories", JSON.stringify(cats));
        }
        carregarCategories();
        document.getElementById("catBox").value = "";
    }
});

function actualitzarTrashButton() {
    var algun = false;
    document.querySelectorAll(".checkbox").forEach(element => {
        if (element.checked) {
            algun = true;
        }
    });

    if (algun)
        document.querySelector("#trashButton").removeAttribute("disabled");
    else
        document.querySelector("#trashButton").setAttribute("disabled", "true");
}

function actualitzarTickButton() {
    var algun = false;
    document.querySelectorAll(".checkbox").forEach(element => {
        if (element.checked) {
            algun = true;
        }
    });

    if (algun)
        document.querySelector("#tickButton").removeAttribute("disabled");
    else
        document.querySelector("#tickButton").setAttribute("disabled", "true");
}

function afegirCheckbox() {
    document.querySelectorAll(".checkbox").forEach(element => {
        element.addEventListener("change", event => {
            actualitzarTrashButton();
            actualitzarTickButton();
        });
    });
    actualitzarTrashButton();
    actualitzarTickButton();
}


document.querySelector("#trashButton").addEventListener("click", event => {
    const main = document.querySelector('main');
    var todos;
    if (todosVisibles == null) {
        todos = getTodos();
    } else {
        todos = todosVisibles.slice();
    }
    var copia = todos.slice();

    for (var i = copia.length - 1; i >= 0; i--) {
        const todo = copia[i];

        const element = document.querySelector(`#todo-${todo.id}`);
        if (element.querySelector(".checkbox").checked) {
            document.querySelector(`#todo-${todo.id}`).setAttribute("borrar", "true");

            main.classList.add('vanish');

            todosTotals.splice(todosTotals.indexOf(todo), 1);

        }
    }

    localStorage.setItem("todos", JSON.stringify(todosTotals));

    setTimeout(function() {
        carregarTodos();
        calcularDuties();
    }, 500);

    checkedAll = true;

});


document.querySelector("#tickButton").addEventListener("click", async event => { //no em toqueu que funciono sense saber com ;-;
    var todos;
    if (todosVisibles == null) {
        todos = await getTodos();

    } else {
        todos = todosVisibles.slice();
    }

    for (var i = todos.length - 1; i >= 0; i--) {
        var todo = todos[i];
        const element = document.querySelector(`#todo-${todo.id}`);
        if (element.querySelector(".checkbox").checked) {
            if (element.querySelector(".taskRectangle").getAttribute("completed") == "false") {
                todo.completed = true;
            } else {
                todo.completed = false;
            }
        }
    }

    localStorage.setItem("todos", JSON.stringify(todosTotals));
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
    await calcularUrgents();
    await carregarCategories();

});

window.addEventListener("resize", async event => {
    await carregarTodos();
});

async function getTodos() {
    const raw = localStorage.getItem("todos");
    if (raw == null) {
        return [];
    }
    return await JSON.parse(raw);
}
async function getCategories() {
    const raw = localStorage.getItem("categories");
    if (raw == null) {
        return [];
    }
    return await JSON.parse(raw);
}

async function calcularDuties() {
    var duties;
    if (localStorage.todos != null) {
        duties = JSON.parse(localStorage.todos).length;
        var dutiesHTML;
        dutiesHTML = document.querySelector(".duties");
        dutiesHTML.innerHTML = `<p class="duties">${duties} duties</p>`;
    }
}

async function calcularUrgents() {
    var tasks = await getTodos();
    var numberOfUrgents = 0;
    tasks.forEach(task => {
        if (Date.now() - task.id > 604800000 && task.completed == false) { //604800000 = one week


            const urgentText = document.querySelector(`#todo-${task.id} .urgentState`);
            urgentText.innerHTML = `<p>Urgent!</p>`;
            numberOfUrgents++;
        }
    });

    const urgentDuty = document.querySelector(".urgents");
    urgentDuty.innerHTML = `<p class="urgents">${numberOfUrgents} urgent</p>`;
    numberOfUrgents = 0;
}

document.querySelector("#today").addEventListener("click", event => {
    allDuties = false;

    const text = document.querySelector("#today");
    text.setAttribute('data-name', 'true');
    const text2 = document.querySelector("#allDuties");
    text2.setAttribute('data-name', 'false');

    carregarTodos();
});

document.querySelector("#allDuties").addEventListener("click", event => {
    allDuties = true;

    const text = document.querySelector("#allDuties");
    text.setAttribute('data-name', 'true');
    const text2 = document.querySelector("#today");
    text2.setAttribute('data-name', 'false');

    carregarTodos();
});

function ordenarPerToday(todos) {

    var today = new Date(Date.now());
    today = today.getFullYear() + "-" + parseInt(1 + today.getMonth()) + "-" + today.getDate();

    var copia = todos.slice();

    copia.forEach(todo => {
        if (todo.deadline.localeCompare(today) != 0) {
            todos.splice(todos.indexOf(todo), 1);
        }
    });
}

function ordenarPerData(todos) {
    todos.sort(
        function(a, b) {
            if (b.completed == true && a.completed == false) {
                return -1;
            } else if (b.completed == false && a.completed == true) {
                return 1;
            } else {
                return b.id - a.id; //canviar ID per DATE (i potser traduir la date a timestamp/epoch si fa falta) si s'ha dordenar diferent
            }
        }
    );
    //localStorage.setItem("todos", JSON.stringify(todos)); //deixar comentat sempre i quan no falli res d'ordres
}

function filterFunction() {
    var input, filter, pack, items, a, i, txtValue, txtValue2, b;
    input = document.getElementById("searchBx");
    filter = input.value.toUpperCase();
    pack = document.getElementById("tasklst");
    items = pack.getElementsByClassName("task");

    for (i = 0; i < items.length; i++) {
        //obtenir titol
        a = items[i].getElementsByClassName("taskTitle")[0];
        txtValue = a.textContent || a.innerText;
        //obtenir descr
        b = items[i].getElementsByClassName("taskDescription")[0];
        txtValue2 = b.textContent || b.innerText;

        //obtenir category

        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) { //yes
            items[i].style.display = "";

        } else { //nope
            items[i].style.display = "none";
        }
    }
}


function editFunction(todoID) {
    localStorage.setItem("edit", todoID);

    window.location.href = "./form.html";

}
function ordenarCats(cats){
    cats.sort(
        function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }
    )
}

async function carregarCategories(){
    document.querySelector(".categoryZone").innerHTML = "";
    const llista = document.querySelector(".categoryZone");
    var cats = await getCategories();

    ordenarCats(cats);

    await cats.forEach(cat =>{
        const {
            color,
            name,
            id
        } = cat;
    
        const nouElement =`
        <div class="categoryList" id="${id}">
            <button class="cross" onclick="deleteCategory('${id}')">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black" fill-opacity="0.25" />
                </svg>
            </button>
            <div>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <rect width="19" height="19" rx="5" fill="${color}" />
                </svg>
            </div>
            <p>${name}</p>
        </div>`;
        llista.innerHTML += nouElement;
    });

}

async function deleteCategory(id){
    var categories = new Array();
    categories = await getCategories();
    var found;

    for(var i = 0; i < categories.length; i++){
        if( id.localeCompare(String(categories[i].id)) == 0){
            found = i;
        }
    }

    categories.splice(found, 1);

    localStorage.setItem("categories", JSON.stringify(categories));
    await carregarCategories();
}

async function carregarTodos() {

    document.querySelector(".tasklist").innerHTML = "";
    const llista = document.querySelector(".tasklist");
    checkedAll = true;

    var todos = await getTodos();
    todosTotals = todos.slice();

    if (allDuties == true) {
        ordenarPerData(todos);
    } else {
        ordenarPerData(todos);
        ordenarPerToday(todos);
    }

    todosVisibles = todos.slice(); //copia els visibles

    await todos.forEach(todo => {
        //correcció width
        var size = Math.floor(document.querySelector("body").clientWidth * 0.05 - 35);
        if (todo.descripcio.length > size) {
            todo.descripcio = todo.descripcio.slice(0, size) + "...";
        }

        var size2 = Math.floor(document.querySelector("body").clientWidth * 0.015);
        if (todo.titol.length > size2) {
            todo.titol = todo.titol.slice(0, size2) + "...";
        }

        //creació tasks
        const {
            id,
            titol,
            descripcio,
            deadline,
            categoria,
            imatge,
            completed
        } = todo;

        const nouElement = `<div class="task" id="todo-${id}" borrar="false">
        <div class="taskSquare" completed="${completed}">
            <input type="checkbox" class="checkbox">
        </div>
        <div class="taskRectangle" completed="${completed}" onclick="editFunction('todo-${id}')">
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
                    <!--CATEGORIES-->
                </div>
            </div>
        </div>
        </div>`;

        llista.innerHTML += nouElement;
    });
    
    await afegirCategories()
    afegirCheckbox();
    await calcularUrgents();
    filterFunction();

    const cats = await getCategories();
    todosVisibles.forEach(un =>{
        if(un.categoria != null){
            var index = 0;
            for(var i = 0; i < cats.length; i++){
                var cat = cats[i];
                if(String(cat.id).localeCompare(String(un.categoria)) == 0){
                    index = i;
                }
            }

            const catHTML = document.querySelector("#todo-"+ un.id + " .container5");
            catHTML.innerHTML = `<div class="cosa">
            <p class="taskCategory1">${cats[index].name}</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect width="14" height="14" rx="5" fill="${cats[index].color}"/>
            </svg> 
        </div>`;




        }
    })
    
}


async function afegirCategories(){
    const nouElement = `
    <div class="cosa">
        <p class="taskCategory1">Development</p>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect width="14" height="14" rx="5" fill="#43AA8B"/>
        </svg> 
    </div>`;

}