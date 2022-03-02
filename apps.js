
// get all item by this function 

function getItem (id){
    return document.getElementById(id)
}

// call the function
const form = getItem('form');
const date = getItem('date');
const tbody = getItem('tbody')



//set date 
const today = new Date().toISOString().slice(0,10);
date.value = today





// add event handel
form.addEventListener('submit' , function(e){
    e.preventDefault()
    const inputs = ([...this.elements]);
    const fromData = {}
    console.log(inputs);
    inputs.forEach( input =>{

        if(input.type !== 'submit'){
            fromData[input.name] = input.value;
        }
      
    })
    fromData.status ='incomplete'
    displayItem(fromData);
  
})


function displayItem ({name, priority, status, date}){

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
     tbody.appendChild(createTr)
}