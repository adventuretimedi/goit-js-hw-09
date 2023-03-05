import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);
  });
}

function checkPromise(e) {
  e.preventDefault();

  let delay = Number(form.delay.value);
  let step = Number(form.step.value);
  let amount = Number(form.amount.value);
  console.log(delay, step, amount);
  for (let position = 0; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

form.addEventListener('submit', checkPromise);
