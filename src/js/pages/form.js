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
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="errorTitle">Title required. Maximum 100 characters length.ㅤ</span>`;
    }
    if(todo.descripcio.length == 0 || todo.descripcio.length > 1000){
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="erorrDescription"> Description required. Maximum 1000 characters length.ㅤ</span>`;
    }
    if(todo.deadline.length == 0){
        var errorFlag = 1;
        errorZone.innerHTML += `<span id="errorDeadline"> Deadline required.ㅤ</span>`;
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

document.querySelector('.select-wrapper').addEventListener('click', function() {
    
    this.querySelector('.select').classList.toggle('open');
    /*Cambiar color por uno selecionado */
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
})