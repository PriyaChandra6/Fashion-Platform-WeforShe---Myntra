document.addEventListener("DOMContentLoaded", function() {
    // Change background image on mouse enter for each element
    let elems = document.querySelectorAll(".elem");
    var page2 = document.querySelector("#shop");
    elems.forEach(function(ele){
        ele.addEventListener("mouseenter", function(){
            var bgimg = ele.getAttribute("data-img");
            page2.style.backgroundImage = `url(${bgimg})`;
        });
    });

    // Add On Me button functionality
    const addOnMeBtn = document.getElementById("addOnMeBtn");
    addOnMeBtn.addEventListener("click", function() {
        fetch("components/add-on-me.html")
            .then(response => response.text())
            .then(html => {
                document.getElementById("content").innerHTML = html;
                const script = document.createElement("script");
                script.src = "js/add-on-me.js";
                document.head.appendChild(script);
            })
            .catch(error => {
                console.error('Error loading Add On Me component:', error);
            });
    });

    // Existing This or That button functionality on the homepage remains unchanged
    document.getElementById("thisOrThatBtn").addEventListener("click", function() {
        loadComponent("components/this-or-that.html");
    });
});

// Function to load a component
function loadComponent(componentUrl) {
    fetch(componentUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}
