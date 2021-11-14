const imatgeActual = document.querySelector(".coverImageSelected");
var edit = false;
var editing;

async function getTodos() {
    const raw = localStorage.getItem("todos");
    if (raw == null) {
        return [];
    }
    return await JSON.parse(raw);

}

document.querySelector("#cancelBtn").addEventListener("click", event => {
    edit = false;
    localStorage.removeItem("edit");
    window.location.href = "./index.html";
    event.preventDefault();
});


document.querySelectorAll(".coverImage").forEach(element => {
    element.addEventListener("click", event => {
        imatgeActual.setAttribute("src", element.getAttribute("src"));
    });
});


document.addEventListener("DOMContentLoaded", async event => {
    var id = localStorage.getItem("edit");


    if (id != null) {
        edit = true;

        id = id.split("-");
        id = id[1];
        var data = await getTodos();

        data.forEach(todo => {
            if (id.localeCompare(todo.id) == 0) { //si ha trobat la tasca
                editing = todo;
            }
        });
        document.getElementById('title').value = editing.titol;

        const check = document.querySelector("#completedCheck");
        if (editing.completed == 1) {
            check.checked = true;
        }

        document.getElementById('date').value = editing.deadline;
        document.getElementById('description').value = editing.descripcio;

        const imatge = document.getElementById("imageCoverID");
        imatge.setAttribute("src", editing.imatge);

    } else {
        edit = false;
    }
    localStorage.removeItem("edit");

});



document.querySelector("#acceptBtn").addEventListener("click", async event => {
    event.preventDefault();

    var todo = {
        id: Date.now(),
        titol: document.querySelector("#title").value,
        descripcio: document.querySelector("#description").value,
        deadline: document.querySelector("#date").value,
        categoria: [],
        imatge: document.querySelector(".coverImageSelected").getAttribute("src"),
        completed: document.querySelector("#completedCheck").checked
    };

    var errorFlag = 0;
    const errorZone = document.querySelector(".error-zone");
    errorZone.innerHTML = ``;
    if (todo.titol.length == 0 || todo.titol.length > 100) {
        errorFlag = 1;
        errorZone.innerHTML += `<span id="errorTitle">Title required. Maximum 100 characters length.ㅤ</span>`;
    }
    if (todo.descripcio.length == 0 || todo.descripcio.length > 1000) {
        errorFlag = 1;
        errorZone.innerHTML += `<span id="erorrDescription"> Description required. Maximum 1000 characters length.ㅤ</span>`;
    }
    if (todo.deadline.length == 0) {
        errorFlag = 1;
        errorZone.innerHTML += `<span id="errorDeadline"> Deadline required.ㅤ</span>`;
    }
    if (errorFlag != 1) {

        const raw = localStorage.getItem("todos");
        if (raw == null) {

            localStorage.setItem("todos", JSON.stringify([todo]));
        } else {
            const todos = await JSON.parse(raw);
            if (edit == false) {
                todos.push(todo);
                localStorage.setItem("todos", JSON.stringify(todos));
            } else {
                var newTodos = await getTodos();
                var found = null;
                var idActu = String(editing.id);
                
                for(var i = 0; i < newTodos.length ; i++){
                    var idNou = String(newTodos[i].id);
                    if(idActu.localeCompare(idNou) == 0){
                        found = i;
                    }
                }
                todo.id = newTodos[found].id;
                newTodos.splice(found, 1);
                newTodos.push(todo);
                localStorage.setItem("todos", JSON.stringify(newTodos));
            }
        }
        window.location.href = "./index.html";
        event.preventDefault();
    }
    edit = false;
    event.preventDefault();
});

/*
document.querySelector('.select-wrapper').addEventListener('click', function() {
    
    this.querySelector('.select').classList.toggle('open');

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                
                this.classList.add('selected');     

                console.log();
                
                this.closest('.select').querySelector('.select__trigger svg').innerHTML = `width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><rect class = "rectSVG" width="19" height="19" rx="5" fill="${option.querySelector(".rectSVG").getAttribute("fill")}"/>`;
            }
        })
    }
});
*/