let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem("ascendTasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

const navItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".section");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target = item.getAttribute("data-section");

        sections.forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });

});

const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

addTaskBtn.addEventListener("click", () => {

    const title = document.getElementById("taskTitle").value;
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        date: date,
        priority: priority,
        category: document.getElementById("taskCategory").value,
        completed: false
};


    tasks.push(task);
    saveTasks();
    renderTasks();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
});

function getCategoryColor(category) {
    switch(category) {
        case "work": return "#22c55e";
        case "school": return "#3b82f6";
        case "personal": return "#f59e0b";
        case "notes": return "#ec4899";
        default: return "#6b5b95"; // general
    }
}

function renderTasks(filter = "all") {
    taskContainer.innerHTML = "";

    tasks
        .filter( task => filter === "all" || task.category === filter )
        .forEach( task => { 
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card", task.priority);

            if( task.completed ) {
                taskCard.classList.add("completed");
            }

            taskCard.style.borderLeftColor = getCategoryColor(task.category);

            taskCard.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <p><span class="category-badge category-${task.category}">${task.category}</span></p>
            <p>Due: ${task.date || "No date"}</p>
            <div class="task-buttons">
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const completeBtn = taskCard.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = taskCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks(currentFilter);
        });

        taskContainer.appendChild(taskCard);

    });
}


function saveTasks() {
    localStorage.setItem("ascendTasks", JSON.stringify(tasks));
}

loadTasks();
renderTasks();

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const category = button.getAttribute("data-filter");
        renderTasks(category); // render tasks filtered by category
    });
});

