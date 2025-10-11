class Task{
    constructor(title, body = "У задачи нет описания"){
        this.title = title;
        this.body = body;
        this.deadLineStart = "Не указано"
        this.deadLineEnd = "Не указано"
    }

    deadLine(){
        return `${this.deadLineStart} - ${this.deadLineEnd}`
    }

    setDeadLineStart(data){
        this.deadLineStart = data;
    }

    setDeadLineEnd(data){
        this.deadLineEnd = data;
    }
}

var tasks = new Array();

var addTask = (tittle, body) =>{
    if (tittle == "") {
        return
    }
    let newTask = new Task(tittle, body)
    addTaskToList(newTask)
    addTaskToInterface(newTask)
}

var addTaskToList = (task) => {
    tasks.push(
        task
    )
}

var reloadTasksList = () => {
    let taskList = document.getElementById("tasks");
    taskList.textContent = ""
    for (task in tasks){
        addTaskToInterface(task);
    }
}

var addTaskToInterface = (task) => {
    let taskList = document.getElementById("tasks");
    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task-card-container")
    newTaskDiv.innerHTML = `
          <div class="task__card">
            <div class="task__card__data">
              <h3 class="task__card__title">
                ${task.title}
              </h3>
              <p class="task__card__description">
                ${task.body}
              </p>
              <h4 class="task__card__deadline">${task.deadLine()}</h4>
            </div>
            <button class="delete__task__button"> 
                <img src="../Assets/Img/Union.svg" alt="Удалить" />
            </button>
          </div>
          <div class="task__card__buttons-container">
            <button class="task__card__buttons">
                <img src="../Assets/Img/Share.svg" alt="Поделиться" />
            </button>
            <button class="task__card__buttons">
                <img src="../Assets/Img/i.svg" alt="Информация" />
            </button>
            <button class="task__card__buttons">
                <img src="../Assets/Img/Edit.svg" alt="Редактировать" />
            </button>
          </div>
    `;
    
    taskList.appendChild(newTaskDiv.firstElementChild);
}

window.addEventListener("load", ()=>{
    let newTaskTitle = document.getElementById("newTaskTitle")
    let newTaskBody = document.getElementById("newTaskBody")
    let addNewTask = document.getElementById("addNewTaskButton")
    addNewTask.addEventListener("click", ()=>{
        addTask(
            newTaskTitle.value, 
            newTaskBody.value
        )
        newTaskTitle.value = ""
        newTaskBody.value = ""
        console.log(tasks);
    })


})

