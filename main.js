const play_pause_button = document.querySelector(".play-button")
const next_button = document.querySelector(".next-button")
const prev_button = document.querySelector(".prev-button")
const current_progress = document.querySelector(".progress")
const progress_bar = document.querySelector(".progress-bar")
const current_time = document.querySelector(".current-time")
const music_time = document.querySelector(".duration-time")
const artist_name = document.querySelector(".artist-name")
const song_name = document.querySelector(".music-name")
const album_image = document.querySelector(".album-img")
const song = document.querySelector(".music")
const volume_progress = document.querySelector(".volume-progress")
const volume_icon = document.querySelector(".volume-icon")
const volume_bar = document.querySelector(".volume-bar")

import musicas from "./musicas.js";

var music_on = false

//music volume
var current_volume = song.volume 

volume_bar.addEventListener("change", () => {
    const newVolume = volume_progress.value / 100
    song.volume = newVolume
    current_volume = song.volume
    if(song.volume == 0) {
        volume_icon.src = "assets/img/mudo.png"
    }else {
        volume_icon.src = "assets/img/volume.png"
    }
})

volume_icon.addEventListener('click', () => mutar())

function mutar() {
    if (current_volume == 0 && song.volume == 0){
        song.volume = 0.25
        volume_progress.value = song.volume * 100
        volume_icon.src = "assets/img/volume.png"
    }else if(song.volume == 0) {
        song.volume = current_volume
        volume_progress.value = current_volume * 100
        volume_icon.src = "assets/img/volume.png"
    }else {
        song.volume = 0
        volume_icon.src = "assets/img/mudo.png"
        volume_progress.value = 0
    }
}

//pause play button
play_pause_button.addEventListener('click', function() {
    if(this.classList[1] == "play") {
        tocarMusica(music_on = true)
    }else if (this.classList[1] == "pause") {
        tocarMusica(music_on = false)
    }
})

//play music function
function tocarMusica(tocar) {
    if(tocar == true) {
        song.play()
        play_pause_button.classList.replace('play', 'pause')
        play_pause_button.innerHTML = '<img src="assets/img/pause.png" alt="">'
    }else {
        song.pause()
        play_pause_button.innerHTML = '<img src="assets/img/play.png" alt="">'
        play_pause_button.classList.replace('pause', 'play')
    }
}

//song progress bar and time
song.ontimeupdate = () => updateTime()

const updateTime = () => {
    const currentMinutes = Math.floor(song.currentTime / 60)
    const currentSeconds = Math.floor(song.currentTime % 60)
    current_time.textContent = `${currentMinutes}:${formataZero(currentSeconds)}`

    const songDuration = isNaN(song.duration) ? 0 : song.duration
    const durationMinutes = Math.floor(songDuration / 60)
    const durationSeconds = Math.floor(songDuration % 60)
    music_time.textContent = `${durationMinutes}:${formataZero(durationSeconds)}`

    if(song.currentTime === song.duration){
        prevNextMusic()
        setTimeout(() => {
            tocarMusica(music_on = true)
        }, 100);
    }

    //progress bar
    const progressWidth = songDuration ? (song.currentTime / songDuration) * 100 : 0
    current_progress.style.width = `${progressWidth}%`
}

const formataZero = (numero) => (numero < 10 ? "0" + numero : numero)

progress_bar.addEventListener("click", (e) => {
    const newTime = (e.offsetX / progress_bar.offsetWidth) * song.duration
    song.currentTime = newTime
})

//change song
let index = 0

prev_button.addEventListener('click', () => {
    prevNextMusic("prev")
    setTimeout(() => {
        tocarMusica(music_on = true)
    }, 100);
})

next_button.addEventListener('click', () => {
    prevNextMusic()
    setTimeout(() => {
        tocarMusica(music_on = true)
    }, 100);
})

const prevNextMusic = (type = "next") => {
    if((type == "next" && index + 1 === musicas.length) || type === "init") {
        index = 0
    }else if (type == "prev" && index === 0) {
        index = musicas.length - 1
    }else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    song.src = musicas[index].musica
    song_name.innerText = musicas[index].nome
    artist_name.innerText = musicas[index].artista
    album_image.src = musicas[index].albumImg

    updateTime()
}

prevNextMusic("init")

//tecla pressionada

document.body.addEventListener("keypress", (e) => {
    var teclaPressionada =  e.code
    if(teclaPressionada == "Space") {
        if(song.paused){
            tocarMusica(music_on = true)
        }else {
            tocarMusica(music_on = false)
        }
    }else if(teclaPressionada == "KeyM") {
        mutar()
    }
})

