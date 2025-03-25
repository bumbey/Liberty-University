/*
proj8.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

Task manager JavaScript implementation.
Uses task objects and allows editing a task list through the UI.
*/

// Stores task objects
var tasks = {};
var taskIdCounter = 0;

// Create a new task element
function addTask() {
    console.log("Adding new task.");
    const taskList = document.getElementById("taskList");

    // Create task element
    const task = document.createElement("div");
    task.classList.add("task");
    const taskId = taskIdCounter++;
    task.setAttribute('task-id', taskId);
    // NEW TASK USED HERE
    var taskObject = new Task("", "Not Started", new Date());
    tasks[taskId] = taskObject;

    // Create task name input
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Task Name";
    nameInput.value = taskObject.getName();
    nameInput.required = true;
    nameInput.classList.add("task-name");
    task.appendChild(nameInput);

    // Create due date input
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "DUE";
    dueDateLabel.classList.add("task-label");
    task.appendChild(dueDateLabel);
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.value = new Date().toISOString().split("T")[0];
    dueDateInput.classList.add("task-due")
    task.appendChild(dueDateInput);

    // Create status dropdown
    const statusSelect = document.createElement("select");
    const statuses = ["Not Started", "In Progress", "Complete"];
    for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i];
        const opt = document.createElement("option");
        opt.value = status;
        opt.innerHTML = status;
        statusSelect.appendChild(opt);
    }
    statusSelect.classList.add("task-status");
    statusSelect.value = taskObject.getStatus();
    task.appendChild(statusSelect);

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "-"
    removeButton.classList.add("task-remove");
    removeButton.onclick = function () {
        taskList.removeChild(task);
        delete tasks[taskId];
        console.log("Removing task.")
    };
    task.appendChild(removeButton);

    taskList.insertBefore(task, taskList.firstChild)
    task.onchange = updateTask;
}

// Update task object with new values
function updateTask(event) {
    // Get task
    const taskElement = event.target.closest(".task");
    const taskId = taskElement.getAttribute('task-id');
    console.log(`Updating task ${taskId}.`);

    // Get task inputs
    const nameInput = taskElement.getElementsByClassName("task-name")[0];
    const dueDateInput = taskElement.getElementsByClassName("task-due")[0];
    const statusSelect = taskElement.getElementsByClassName("task-status")[0];
    
    // Update task values
    var task = tasks[taskId];
    task.setName(nameInput.value);
    task.setStatus(statusSelect.value)
    task.setDueDate(new Date(dueDateInput.value))

    // Check if overdue
    task.checkDueDate();
    if (task.isOverdue && !dueDateInput.classList.contains("invalid") && task.status !== "Complete") {
        dueDateInput.classList.add("invalid");
    }
    else if (!task.isOverdue && dueDateInput.classList.contains("invalid") || task.status === "Complete") {
        dueDateInput.classList.remove("invalid");
    }

    // Check if complete
    if (task.status === "Complete" && !taskElement.classList.contains("task-complete")) {
        taskElement.classList.add("task-complete");
    }
    else if (task.status !== "Complete" && taskElement.classList.contains("task-complete")) {
        taskElement.classList.remove("task-complete");
    }

    // Update task object
    tasks[taskId] = task;

    // Log new task values
    console.log(`Task ${taskId}: ${task.name}, Due: ${task.dueDate}, Status: ${task.status}, Overdue: ${task.isOverdue}`);
}