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

updateName();