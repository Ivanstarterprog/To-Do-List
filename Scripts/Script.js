class Task{
    constructor(title, body){
        this.title = title;
        this.body = body;
    }

    setDeadLineStart(data = "Неуказано"){
        this.deadLineStart = data;
    }

    setDeadLineEnd(data = "Неуказано"){
        this.deadLineEnd = data;
    }
}

var tasks = new Array();

var addTask = (title, body)=>{
    tasks.push(
        new Task(title, body)
    )
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

