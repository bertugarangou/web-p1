document.querySelector("#cancelBtn").addEventListener("click", event => {
    window.location.href = "./index.html";
    event.preventDefault();
});


const imatgeActual = document.querySelector(".coverImageSelected");

document.querySelectorAll(".coverImage").forEach(element => {
    element.addEventListener("click", event => {
        imatgeActual.setAttribute("src", element.getAttribute("src"));
    });
});


document.querySelector("#acceptBtn").addEventListener("click", async event => {
    const todo = {
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
    if(todo.titol.length == 0 || todo.titol.length > 100){
        console.log("titol: " + todo.titol);
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="errorTitle">Title required. Maximum 100 characters length. </span>`;
    }
    if(todo.descripcio.length == 0 || todo.descripcio.length > 1000){
        console.log("desc");
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="erorrDescription"> Description required. Maximum 1000 characters length. </span>`;
    }
    if(todo.deadline.length == 0){
        console.log("error date");
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="errorDeadline"> Deadline required. </span>`;
    }
    if(errorFlag != 1){

        const raw = localStorage.getItem("todos");
        if (raw == null) {
            localStorage.setItem("todos", JSON.stringify([todo]));
        }else{
            const todos = await JSON.parse(raw);
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        window.location.href = "./index.html";
        event.preventDefault();
    }
    event.preventDefault();
});