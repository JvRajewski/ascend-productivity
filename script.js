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