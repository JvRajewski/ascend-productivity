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

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card", priority);

    taskCard.innerHTML = `
        <h3>${title}</h3>
        <p>Due: ${date || "No date"}</p>
        <button class="delete-btn">Delete</button>
    `;

    taskContainer.appendChild(taskCard);

    taskCard.querySelector(".delete-btn").addEventListener("click", () => {
        taskCard.remove();
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDate").value = "";
});
