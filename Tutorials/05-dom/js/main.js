console.log("ratJAM");

let pageTitle = document.querySelector("#pagetitle");

// changes title text color after a bit
setTimeout(function(){
    pageTitle.style.color = "blue"
}, 2500)

// click event on header changes bg color
document.querySelector("header").onclick = function(){
    // console.log("clicked header");
    document.querySelector("body").style.backgroundColor = "gray"
}

let divs = document.querySelectorAll(".image-div");

divs.forEach((div) => {
    div.addEventListener('click', () => {
        console.log("forEach worked");
        div.style.visibility = "hidden";
    });
});

document.querySelector("#img1").addEventListener("click", function(){
    document.querySelector("#img2").style.visibility = "visible";
})
document.querySelector("#img2").addEventListener("click", function(){
    document.querySelector("#img3").style.visibility = "visible";
})
document.querySelector("#img3").addEventListener("click", function(){
    document.querySelector("#img4").style.visibility = "visible";
})
document.querySelector("#img4").addEventListener("click", function(){
    document.querySelector("#img5").style.visibility = "visible";
})
document.querySelector("#img5").addEventListener("click", function(){
    document.querySelector("#img6").style.visibility = "visible";
})
document.querySelector("#img6").addEventListener("click", function(){
    document.querySelector("#img7").style.visibility = "visible";
})
document.querySelector("#img7").addEventListener("click", function(){
    document.querySelector("#img1").style.visibility = "visible";
})
