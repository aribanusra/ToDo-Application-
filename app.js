
const taskinput = document.querySelector("#todo-input");
const tasklist = document.querySelector("#todo-list");
const addbutton = document.querySelector("#add-button");
const span = document.querySelector('.span');


function gettask() {
    let todos;
    if (localStorage == undefined) {
        todos = '[]'
    }
    else {
        todos = localStorage.getItem('todo')

    }
    return JSON.parse(todos);


}



let AllTodo = gettask();



function savetask() {

    localStorage.setItem('todo', JSON.stringify(AllTodo))  //only string values can be stored in local storage so we convert to json
}




//progress bar 


const updatestats = () => {
    const completetask = AllTodo.filter(AllTodo => AllTodo.completed).length;

    const totaltask = AllTodo.length;

    const progress = (completetask / totaltask) * 100;
    const progressbar = document.querySelector('.progress');
    progressbar.style.width = `${progress}%`;
    const number = document.querySelector('.progressnumber');
    number.innerHTML = `${completetask}/${totaltask}`
}



//add button 

addbutton.addEventListener("click", (e) => {
    e.preventDefault();

    if (addbutton.innerText === "ADD") {
        span.innerText = "";
        addtask();
    }

});


function addtask() {
    const text = taskinput.value.trim();
    AllTodo = AllTodo || []
    console.log(AllTodo.some(obj => obj.text === text));

    // console.log(AllTodo.includes(text));  .includes works with only arrays but some works with array of objects  

    if (text.length != 0 && !AllTodo.some(obj => obj.text === text)) {
        AllTodo.push({ text: text, completed: false })
    }
    else {
        span.innerText = '*Please write a new task before you add.   '
    }
    taskinput.value = "";
    updatetodo();
    updatestats();
    savetask();
}

const toggletaskcomplete = (index) => {
    AllTodo[index].completed = !AllTodo[index].completed;

    updatetodo();

    updatestats();

    savetask();
}


function updatetodo() {
    tasklist.innerHTML = "";
    if (AllTodo != null)
        AllTodo.forEach((task, index) => {
            const taskli = document.createElement("li");


            taskli.innerHTML = `
    <div class="todo" draggable="true">
                <input type="checkbox" id="to-do${index}" ${task.completed ? "checked" : ""} />
                <label for="to-do${index}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#5f6368">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="to-do${index}" class="todo-text  ${task.completed ? "completed" : ""}">
                ${task.text}
                </label>
                <button class="${task.completed ? "edit-buttonchecked" : "edit-button "}" onclick="edittask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#5f6368">
                        <path
                            d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                </button>
                <button class="delete-button" onclick="deletetask(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="#5f6368">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
            </div>
        `;

            taskli.addEventListener('change', () => toggletaskcomplete(index));
            tasklist.append(taskli);
            updatestats();
            savetask();
        })
}

updatetodo();




const deletetask = (index) => {
    // if(confirm('Are you sure you want to delete this task ?'))
    AllTodo.splice(index, 1);
    updatetodo();
    savetask();
    updatestats();
}




const edittask = (index) => {
    addbutton.innerText = "EDIT";
    console.log(index);
    if (addbutton.innerText === "EDIT") {
        taskinput.value = AllTodo[index].text;
        addbutton.addEventListener('click', function editnow(e) {

            console.log("h");
            document.querySelectorAll('.todo-text')[index].innerText = taskinput.value;
            AllTodo[index].text = taskinput.value
            taskinput.value = "";
            addbutton.innerText = 'ADD'
            savetask();
        }, { once: true });
    }
}








/* Its important to call functions whenever required .Took 2 
days to figure out why on clicking a todo their is no line through although in console its updating , later realised
i hadnt called updatetodo function . lol


Local storage if no value is passed initially then undefined will be set  and in  json undefined is invalid.
So its bettr to use if else while getting items ,if local storage is null get an empty array [] on reload else get getitem('key') ,
 and make setitem function after the array is initialsed with either [] or the old value.'
*/
