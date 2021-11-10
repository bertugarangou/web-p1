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
});