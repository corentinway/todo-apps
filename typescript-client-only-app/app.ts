interface Item {
    text: string
}

var tasks: Array<Item> = JSON.parse(localStorage.getItem("tasks")) || [];

let taskInput: HTMLInputElement = document.querySelector("#item_input");
taskInput.addEventListener("keypress", activateAddButton);

function activateAddButton(event: Event) {
    addButton.disabled = !taskInput.value.length;
}


let list: HTMLUListElement = document.querySelector("ul");

let addButton: HTMLButtonElement = document.querySelector("#add");
addButton.addEventListener("click", addItem);

function addItem(event: Event) {
    let task = taskInput.value;
    tasks.push({ text: task });
    updateDisplayList(task);
    updateStorage();
    taskInput.value = '';
    addButton.disabled = true;
    taskInput.focus();
}

// initialize display at (re)load of the page
tasks.forEach((item: Item) => {
    updateDisplayList(item.text);
});

function updateDisplayList(task: string) {
    let li: HTMLLIElement = document.createElement("li");
    li.innerHTML = `<span class='item'>${task}</span>`;
    list.appendChild(li);

    let removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.innerText = "Effacer";
    removeButton.addEventListener("click", removeItem(task, li), { once: true });
    li.appendChild(removeButton)
}

function removeItem(task: string, li: HTMLLIElement) {

    return function(event : Event) {
        list.removeChild(li);
        let index = tasks.findIndex( item => item.text === task);
        tasks.splice(index, 1);
        updateStorage();
    }

}

function updateStorage() {
    tasks.map(item => item.text).forEach(console.log);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
