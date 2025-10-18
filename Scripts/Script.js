class Task {
  static nextId = 0;
  constructor(title = "Не задан заголовок", body = "У задачи нет описания") {
    this.id = ++Task.nextId;
    this.title = title;
    this.body = body;
    this.description = "";
    this.deadLineStart = new Date().toLocaleDateString("ru-RU");
    this.deadLineEnd = "";
  }

  static setNextId(id) {
    Task.nextId = ++id;
  }

  static objectToTask(item){
    let task = new Task();
    task.id = item.id;
    task.title = item.title;
    task.body = item.body;
    task.description = item.description;
    task.deadLineStart = item.deadLineStart;
    task.deadLineEnd = item.deadLineEnd;
    return task;
  }

  deadLine() {
    if (this.deadLineEnd == ""){
      return `${this.deadLineStart}`
    }
    return `${this.deadLineStart} - ${this.deadLineEnd}`;
  }

  setTaskTitle(newTitle){
    this.title = newTitle
  }

  setTaskBody(newBody){
    this.body = newBody
  }

  setTaskDescription(newFullDescription){
    this.description = newFullDescription
  }

  setTaskNewData(taskData){
    this.setTaskTitle(taskData.title)
    this.setTaskBody(taskData.body)
    this.setTaskDescription(taskData.description)
  }

  setDeadLineEnd(data) {
    this.deadLineEnd = data;
  }
}

var tasks = new Array();

var saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('last-id', JSON.stringify(tasks[tasks.length - 1].id));
}

var loadTasks = () => {
  tasks = localStorageToTasks();
  Task.setNextId(JSON.parse(localStorage.getItem('last-id')) || 0) ;
  checkNumberOfTasks();
  reloadTasksList();
}

var localStorageToTasks = () => {
  let localTasks = JSON.parse(localStorage.getItem('tasks')) || new Array();
  return localTasks.map(item => Task.objectToTask(item))
}


var addTask = (tittle, body) => {
  if (tittle == "") {
    return;
  }
  let newTask = new Task(tittle, body);
  addTaskToList(newTask);
  addTaskToInterface(newTask);
  checkNumberOfTasks();
  saveTasks();
  console.log(tasks)
};

var addTaskToList = (task) => {
  tasks.push(task);
};

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
    <div class="task__card__buttons-container" task-id="${
      task.id
    }" id="task-buttons#${task.id}">
    <button class="task__card__buttons task__card__share-button">
    <img src="../Assets/Img/Share.svg" alt="Поделиться" />
    </button>
    <button class="task__card__buttons  task__card__info-button">
    <img src="../Assets/Img/i.svg" alt="Информация" />
    </button>
    <button class="task__card__buttons task__card__edit-button" task-id="${task.id}">
    <img src="../Assets/Img/Edit.svg" alt="Редактировать" />
    </button>
    </div>
    </div>
    `;

  taskList.appendChild(newTaskDiv.firstElementChild);
};

var deleteTask = async (taskID) => {
  showModalWindow("confirmModal");
  const confirmDeletion = await confirmModal("confirmDelete", "cancelDelete");
  hideModalWindow("confirmModal");
  if (!confirmDeletion) {
    return;
  }
  deleteTaskFromList(taskID);
  deleteTaskFromInterface(taskID);
  saveTasks();
  checkNumberOfTasks();
};

var showModalWindow = (id) => {
  const modal = document.getElementById(id);
  modal.style.display = "flex";
  const modalClickHandler = (event) => {
    if (event.target === modal) {
      hideModalWindow(id);
      modal.removeEventListener("click", modalClickHandler);
    }
  };
  
  modal.addEventListener("click", modalClickHandler);
};

var hideModalWindow = (id) => {
  const modal = document.getElementById(id);
  modal.style.display = "none";
};

var confirmModal = (confirmButtonID, cancelButtonID) => {
  return new Promise((resolve) => { 
    const confirmButton = document.getElementById(confirmButtonID)
    const cancelButton = document.getElementById(cancelButtonID);

    confirmButton.onclick = () => {
      resolve(true);
    };

    cancelButton.onclick = () => {
      resolve(false);
    };
  });
};

var deleteTaskFromList = (taskID) => {
  tasks = tasks.filter((task) => task.id != taskID);
};

var deleteTaskFromInterface = (taskID) => {
  let task = document.getElementById(`task#${taskID}`);
  if (task) {
    task.remove();
  }
};

var showShareMenu = () => {
  showModalWindow("shareModal");
};

var hideShareMenu = () => {
  hideModalWindow("shareModal");
};

var showEditMenu = async (taskID) => {
    showModalWindow("editModal")
    updateEditMenuInformation(taskID)
    const confirmChangeOfTask = await confirmModal("confirmEdit", "cancelEdit")
    hideModalWindow("editModal")
    if(!confirmChangeOfTask){
      return
    }
    editTaskInformation(taskID)
    saveTasks();
    reloadTasksList()
};

var updateEditMenuInformation = (taskID) => {
  let titleInput = document.getElementById(`titleEdit`);
  let bodyInput = document.getElementById(`bodyEdit`);
  let descriptionInput = document.getElementById(`descriptionEdit`);
  let task = tasks.find(task => task.id == taskID)
  titleInput.value = task.title
  bodyInput.value = task.body
  descriptionInput.value = task.description
}

var editTaskInformation = (taskID) =>{
  let newTitle = document.getElementById(`titleEdit`);
  if (newTitle.value.trim() == ""){
    return
  }
  let newBody = document.getElementById(`bodyEdit`);
  let newDescription = document.getElementById(`descriptionEdit`);
  let task = tasks.find(task => task.id == taskID)
  if (task){
    task.setTaskNewData({
      title: newTitle.value,
      body: newBody.value,
      description: newDescription.value
    })
  }
}


var checkNumberOfTasks = () => {
  if (tasks.length > 0) {
    hideThereIsNoTasksCard();
    return;
  }

  showThereIsNoTasksCard();
};

var hideThereIsNoTasksCard = () => {
  let thereIsNoTasksCard = document.getElementById("noTasksCard");
  thereIsNoTasksCard.style.display = "none";
};

var showThereIsNoTasksCard = () => {
  let thereIsNoTasksCard = document.getElementById("noTasksCard");
  thereIsNoTasksCard.style.display = "flex";
};

var reloadTasksList = () => {
  let taskList = document.getElementById("tasks").querySelectorAll(".task-card-containe");
  for (let taskCard of taskList){
    taskCard.remove()
  }
  for (let task of tasks) {
    addTaskToInterface(task);
  }
};

var toggleTaskButtons = (taskID) => {
  let taskButtons = document.getElementById(`task-buttons#${taskID}`);
  if (!taskButtons) {
    return;
  }
  hideAllNotClickedTaskButtons(taskID);
  if (taskButtons.style.display == "flex") {
    taskButtons.style.display = "none";
    return;
  }
  taskButtons.style.display = "flex";
};

var hideAllNotClickedTaskButtons = (taskID) => {
  document
    .querySelectorAll(".task__card__buttons-container")
    .forEach((container) => {
      containerID = container.getAttribute("task-id");
      if (containerID != taskID) {
        container.style.display = "none";
      }
    });
};

var hideAllTaskButtons = () => {
  document
    .querySelectorAll(".task__card__buttons-container")
    .forEach((container) => {
      container.style.display = "none";
    });
};

window.addEventListener("load", () => {
  loadTasks()
  let newTaskTitle = document.getElementById("newTaskTitle");
  let newTaskBody = document.getElementById("newTaskBody");
  let addNewTask = document.getElementById("addNewTaskButton");
  addNewTask.addEventListener("click", () => {
    addTask(newTaskTitle.value, newTaskBody.value);
    newTaskTitle.value = "";
    newTaskBody.value = "";
  });
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete__task__button")) {
      let id = event.target.getAttribute("task-id");
      deleteTask(id);
    }
    if (event.target.classList.contains("task__card__info-button")) {
      let id = event.target.getAttribute("task-id");
      showEditMenu(id);
    }
    if (event.target.classList.contains("task__card__edit-button")) {
      let id = event.target.getAttribute("task-id");
      showEditMenu(id);
    }
    if (event.target.classList.contains("task__card__share-button")) {
      showShareMenu();
    }
    if (event.target.classList.contains("task__card")) {
      id = event.target.getAttribute("task-id");
      toggleTaskButtons(id);
    } else if (!event.target.classList.contains("task__card__buttons")) {
      hideAllTaskButtons();
    }
  });
});
