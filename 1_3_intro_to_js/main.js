console.log('hello world');

console.log(document)
console.log(window)

const input = document.getElementById("name-input")
console.log(input)
const updateName = () =>{
    console.log('in update function')
    const userName = input.value;
    window.alert('Hello, welcome to class ${userName}')

}

//Example of 
const dataVizClass = {
    day: 'Tuesday',
    time: 'late',
    students: '15',
}

const dayAccessor = 'day'
const day = dataVizClass[dayAccessor]
//or 
//dataVizClass['day']
//dataVizClass.day

console.log('day', day)

const keys = Object.keys(dataVizClass)
console.log(keys)

const values = Object.values(dataVizClass)
console.log(values)

const entries = Object.entries(dataVizClass)
console.log(entries)


//Example of date
const now = new Date()

//Homework
let changeable = true;
const constant = true;
let counter = 0;

function change(){
    changeable = false;
    const constant = false;
    
}