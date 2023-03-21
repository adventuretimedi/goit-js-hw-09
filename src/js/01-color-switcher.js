import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const cat = document.querySelector('.giphy-cat');
const catSong = new Audio('https://now.morsmusic.org/load/1528392161/Nyan_Cat_-_Nyan_Cat_Theme_(musmore.com).mp3');
let intarvalId = null;

// генерування випадкового кольору використовуй функцію
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// керування кнопками-перемикачами
function changeColor(e) {
  catSong.play();
  startBtn.disabled = true;
  cat.classList.remove('is-hidden');
  
  intarvalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    // Notify.success(`Time for color-party 😃 ${body.style.backgroundColor}`);
  }, 1000);
}
//лісенер на клік + ф + дісейблед
startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  cat.classList.add('is-hidden');
  catSong.pause();
  clearInterval(intarvalId);
  // Notify.failure(`Your color is ${intarvalId} .Party is over!🙃`);
});