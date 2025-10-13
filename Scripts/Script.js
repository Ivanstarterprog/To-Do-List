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
    checkNumberOfTasks()
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
          <div class="task__card" task-id="${task.id}">
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
          <div class="task__card__buttons-container" task-id="${task.id}" id="task-buttons#${task.id}">
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

var deleteTask = async (taskID) =>{
    showModalWindow('confirmModal')
    const confirmDeletion = await confirmDeletionOfTask()
    hideModalWindow('confirmModal')
    if (!confirmDeletion){
        return
    }
    deleteTaskFromList(taskID)
    deleteTaskFromInterface(taskID)
    checkNumberOfTasks()
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

var toggleTaskButtons = (taskID) => {
    let taskButtons = document.getElementById(`task-buttons#${taskID}`)
    if (!taskButtons){
        return
    }
    hideAllNotClickedTaskButtons(taskID)
    if (taskButtons.style.display == "flex"){
        taskButtons.style.display = "none"
        return
    }
    taskButtons.style.display = "flex"
}

var hideAllNotClickedTaskButtons = (taskID) => {
    document.querySelectorAll('.task__card__buttons-container').forEach(container => {
        containerID = container.getAttribute('task-id')
        if (containerID != taskID){
            container.style.display = 'none';
        }
    });
}

var hideAllTaskButtons = () => {
    document.querySelectorAll('.task__card__buttons-container').forEach(container => {
        container.style.display = 'none';
    });
}

var showModalWindow = (id) => {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
}

var hideModalWindow = (id) => {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
}

var confirmDeletionOfTask = () => {
    return new Promise((resolve) => {
        const confirmBtn = document.getElementById('confirmDelete');
        const cancelBtn = document.getElementById('cancelDelete');

        confirmBtn.onclick = () => {
            resolve(true);
        };

        cancelBtn.onclick = () => {
            resolve(false); 
        };
    });
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
    })
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete__task__button')) {
            let id = event.target.getAttribute('task-id')
            deleteTask(id)  
            
        }
        if (event.target.classList.contains('task__card')) {
            id = event.target.getAttribute('task-id') 
            toggleTaskButtons(id)
        }
        else{
            hideAllTaskButtons()
        }
    });

})

