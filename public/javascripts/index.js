document.addEventListener('DOMContentLoaded', function(){
    var excess_food = document.getElementById("post_event");
    excess_food.addEventListener("click", function(){
        window.location.href = "./html/login.html"
    })
    var see_food = document.getElementById("see_food");
    see_food.addEventListener("click", function(){
        window.location.href = "./html/feed.html"
    })

});