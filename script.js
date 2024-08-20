const  player = document.querySelector('.player');
const  video = player.querySelector('.viewer');
const  progress = player.querySelector('.progress');
const  progressBar = player.querySelector('.progress__filled');
const  toggle = player.querySelector('.toggle');
const  skipButtons = player.querySelectorAll('[data-skip]');
const  ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton() {
    const icon = this.paused ? '►' : '||';
    toggle.textContent = icon;
}

function toggleKeyPlay(e) {
    if (e.code === 'Space') {
        togglePlay();
    }
    if (e.code === 'ArrowRight') {
        video.currentTime += 10;
    }
    if (e.code === 'ArrowLeft') {
        video.currentTime -= 10;
    }
    console.log(e.code);
}

function skip(e) {
    video.currentTime += parseFloat(this.dataset.skip);
    
}
function handleRangeUpdate() {
    video[this.name] = this.value;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
window.addEventListener('keydown', toggleKeyPlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
    console.log(percent);
}
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click',scrub);
// progressBar.addEventListener('drag', scrub);

