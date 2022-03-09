


// get all data by this function 

function getData (id){
    return document.getElementById(id)
}

// call the function
const form = getData('form');
const date = getData('date');
const tbody = getData('tbody')



//set date 
const today = new Date().toISOString().slice(0,10);
date.value = today





// add event handel
form.addEventListener('submit' , function(e){
    e.preventDefault()
    const inputs = ([...this.elements]);
    const fromData = {};
    let isValid = true;
    inputs.forEach( input =>{

        if(input.type !== 'submit'){
            if(input.value == ''){
                alert('please fill up the filed with valid value');
                isValid = false;
                return;
            }
            fromData[input.name] = input.value;
        }
      
    })
    
    if(isValid){
        fromData.status ='incomplete';
        fromData.id = uuidv4();
        let tasks = getDataFromLocalStorage();
        displayData(fromData,tasks.length +1);
        tasks.push(fromData)
        setDataToLocalStorage(tasks)
    }
    this.reset()
  
})



window.onload = load;


function load (){
    tbody.innerHTML ='';
    const tasks = getDataFromLocalStorage();
    tasks.forEach((task, index)=>{
        displayData(task,index +1)
    })
}


function displayData ({
     id,
      name,
      priority,
      status,
      date,
    },index)
    {

    const createTr = document.createElement('tr');
    createTr.innerHTML =    `


                    <td id= "no" >${index}</td>
                    <td id= "number" >${name}</td>
                    <td id= "priority" >${priority}</td>
                    <td id= "status" >${status}</td>
                    <td id= "data" >${date}</td>
                    <td id= "action">
                        <button id="delete"> <i class="fas fa-trash-can"></i></button>
                        <button id="check"> <i class="fas fa-check"></i></button>
                        <button id="edit"> <i class="fas fa-pen"></i></button>
                    </td>
    
    `
    createTr.dataset.id = id;
     tbody.appendChild(createTr)
}


function getDataFromLocalStorage(){
    let tasks =[];
    const data =localStorage.getItem('tasks');

    if(data){
        tasks = JSON.parse(data)
    }
    return tasks;
}


function setDataToLocalStorage(tasks){
    localStorage.setItem('tasks' , JSON.stringify(tasks))
    
}




// ===========Action ===============

tbody.addEventListener('click' , function(e){
    
    if(e.target.id == 'delete'){
        let tr = e.target.parentElement.parentElement;
        const id = tr.dataset.id
        console.log(id);
        tr.remove();
        let tasks = getDataFromLocalStorage();
        tasks = tasks.filter( (task) => {
            if(task.id !== id){
                return task;
            }
        })
        setDataToLocalStorage(tasks);
        load()
    }
    
    else if(e.target.id =='check'){
        const tr = e.target.parentElement.parentElement;
        const id = tr.dataset.id ;
        const tds = tr.children;
        [...tds].forEach(td=>{
            if(td.id =='status'){
                let tasks = getDataFromLocalStorage();
               tasks = tasks.filter(task=>{
                   if(task.id == id){
                    if(task.status =='incomplete'){
                        task.status ='complete';
                        td.innerText = 'complete';
                    }else{
                       task.status ='incomplete';
                       td.innerText = 'incomplete';
                    }
                    return task;

                   }else{
                       return task;
                   }
                    
                })
                setDataToLocalStorage(tasks)
            }
           
        }) 
    }
    else if(e.target.id == 'edit'){
     
    }
})
