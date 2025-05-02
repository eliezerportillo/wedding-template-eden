

function togglePlay() {
    let audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    var btn = document.querySelector('.btn-musica');
    btn.classList.toggle('pausa');
}

