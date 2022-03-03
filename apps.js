


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
    console.log(inputs);
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
        setDataFromLocalStorage(tasks)
    }
    this.reset()
  
})



window.onload = function (){
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


                    <td>${index}</td>
                    <td>${name}</td>
                    <td>${priority}</td>
                    <td>${status}</td>
                    <td>${date}</td>
                    <td>
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
    return tasks


}


function setDataFromLocalStorage(tasks){
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}



