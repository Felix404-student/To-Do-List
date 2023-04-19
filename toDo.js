/*
Author: Justin Brown
Assignment: "JS Todos Exercise" for UMass/Springboard Bootcamp
For this assignment you will be combining your knowledge of DOM access and events to build a todo app!
As a user, you should be able to:
    Add a new todo (by submitting a form)
    Mark a todo as completed (cross out the text of the todo)
    Remove a todo
Now that you have a functioning todo app, save your todos in localStorage! Make sure that when the page 
refreshes, the todos on the page remain there.
*/

const list = document.querySelector('#list');
const form = document.querySelector("form");
const button = document.getElementById("submitButton");

// takes the input from the text box and turns it into a new list item
function addTask(input) {
    let newLi = document.createElement("li");

    // prevents HTML injection
    input.value = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // HTML adds an X button to new list item
    newLi.innerHTML = input.value + "<span class=\"close\">"+"x"+"</span>";
    list.append(newLi);

    // updates local storage to current state of list
    localStorage.setItem("toDoList", JSON.stringify(list.innerHTML));
    form.reset();
}

// keeps from trying to reference objects that don't exist yet
document.addEventListener("DOMContentLoaded", function(){ 

    // event for submitting the text box
    form.addEventListener("submit", function(e) {
        let input = document.querySelector('#inputText');
        e.preventDefault();
        addTask(input);
    });

    // if click is on X, delete list item, else apply strikethrough class
    // updates local storage
    list.addEventListener("click", function(e){
        if(e.target.tagName === 'SPAN'){
            e.target.parentElement.remove();
            localStorage.setItem("toDoList", JSON.stringify(list.innerHTML));
        } else if(e.target.tagName === 'LI') {
            e.target.classList.toggle("completed");
            localStorage.setItem("toDoList", JSON.stringify(list.innerHTML));
        }
    });

    // loads last state from local storage
    list.innerHTML = JSON.parse(localStorage.toDoList);
})