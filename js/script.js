// define  ul element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('ul');
let  clearBtn = document.querySelector('#clear_task_btn');

//define event listenner 
form.addEventListener('submit', addtask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);


//  define function
function addtask(e){
  if(taskInput.value=== ''){
    alert('Add a task');

  }else{
    //create li
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + ' '))
    taskList.appendChild(li);
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    //local store
    storeTaskInLocalStorage(taskInput.value)


    taskInput.value = '';
  }e.preventDefault();
}


//remove function
function removeTask(e){
if(e.target.hasAttribute('href')){
  if(confirm('Are you sure?')){
    let ele = e.target.parentElement;
    ele.remove(); 
    
    removeFromLS(ele);
  }
}
}

// clear Task
function clearTask(){
  taskList.innerHTML = '';
localStorage.clear();

}

// filter task
function filterTask(e){
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('li').forEach(task=>{
    let item =  task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block'
    }else{
      task.style.display = 'none';
    }
  })
}


// store in local store
function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks')===null){
  tasks = [];

}else{
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.push(task);
localStorage.setItem('tasks',JSON.stringify(tasks))

}


function getTask(){
  let tasks;
if(localStorage.getItem('tasks')===null){
  tasks = [];

}else{
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(task=>{
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(task + ' '))
  taskList.appendChild(li);
  let link = document.createElement('a');
  link.setAttribute('href', '#');
  link.innerHTML = 'x';
  li.appendChild(link);

})
}

// remove task  from LS 
 function removeFromLS(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let li = taskItem;
  li.removeChild(li.lastChild);
  tasks.forEach((task, index) =>{

   if(li.textContent.trim()=== task){
     tasks.splice(index, 1)

   }

  })

  localStorage.setItem('tasks',JSON.stringify(tasks));

}