
// get all data by this function 

function getdata (id){
    return document.getElementById(id)
}

// call the function
const form = getdata('form');
const date = getdata('date');
const tbody = getdata('tbody')



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
        displaydata(fromData);
        const tasks = getDataFromLocalStorage();
        console.log(tasks);
        tasks.push(fromData)
        setDataFromLocalStorage(tasks)
    }
    this.reset()
  
})


function displaydata ({
     id,
      name,
      priority,
      status,
      date
    })
    {

    const createTr = document.createElement('tr');
    createTr.innerHTML =    `


                    <td>0</td>
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



