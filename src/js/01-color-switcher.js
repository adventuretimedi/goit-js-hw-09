const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intarvalId = null;

// генерування випадкового кольору використовуй функцію
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// керування кнопками-перемикачами

function changeBtnColor (e) {
    intarvalId = setInterval(() => {
        startBtn.disabled = true;
        body.style.backgroundColor = getRandomHexColor();
        console.log(`Time for color-party 😃 ${body.style.backgroundColor}`);
    }, 1000);
};
//лісенер на клік + ф + дісейблед
startBtn.addEventListener("click", changeBtnColor);

stopBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  clearInterval(intarvalId);
  console.log(`Your color - ${intarvalId} .Party is over!🙃`);
});


