class Task{
    static nextId = 0;
    constructor(title, body = "У задачи нет описания"){
        this.id = Task.nextId++; 
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

var addTaskToInterface = (task) => {
    let taskList = document.getElementById("tasks");
    const newTaskDiv = document.createElement("div");
    newTaskDiv.innerHTML = `
        <div class="task-card-container" id="task#${task.id}">
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
            <button class="delete__task__button" task-id="${task.id}"> 
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
        </div>
    `;
    
    taskList.appendChild(newTaskDiv.firstElementChild);
}

var deleteTask = (taskID) =>{
    deleteTaskFromList(taskID)
    deleteTaskFromInterface(taskID)
}

var deleteTaskFromList = (taskID) => {
    tasks = tasks.filter(task => task.id != taskID)
}

var deleteTaskFromInterface = (taskID) => {
    let task = document.getElementById(`task#${taskID}`)
    if (task) {
        task.remove()
    }
}

var checkNumberOfTasks = () => {
    if (tasks.length > 0) {
        hideThereIsNoTasksCard()
        return
    }

    showThereIsNoTasksCard()
}

var hideThereIsNoTasksCard = () => {
    let thereIsNoTasksCard = document.getElementById("noTasksCard")
    thereIsNoTasksCard.style.display = "none"
}

var showThereIsNoTasksCard = () => {
    let thereIsNoTasksCard = document.getElementById("noTasksCard")
    thereIsNoTasksCard.style.display = "flex"
}

var reloadTasksList = () => {
    let taskList = document.getElementById("tasks");
    taskList.textContent = ""
    for (task in tasks){
        addTaskToInterface(task);
    }
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
        checkNumberOfTasks()
        newTaskTitle.value = ""
        newTaskBody.value = ""
        console.log(tasks);
    })
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete__task__button')) {
            id = event.target.getAttribute('task-id')
            deleteTask(id)  
            checkNumberOfTasks()
        }
    });

})

