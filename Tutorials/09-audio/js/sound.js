let song = document.querySelector("#song");
let noise = document.querySelector("#sfx");
let playBtn = document.querySelector("#play-button");
let stopBtn = document.querySelector("#pause-button");
let volume = document.getElementById('volume-control');

song.onloadeddata = function(){
    playBtn.style.visibility = "visible";
}

setTimeout(function() {
    playBtn.style.visibility = "visible"; }, 5000);

playBtn.addEventListener('click', function(){
    noise.play();
    song.play();
})
stopBtn.addEventListener('click', function(){
    noise.play();
    song.pause();
})
volume.addEventListener("change", function(e) {
    song.volume = e.currentTarget.value / 100;
})