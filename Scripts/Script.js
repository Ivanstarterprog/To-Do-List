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

window.addEventListener("load", ()=>{
    

})