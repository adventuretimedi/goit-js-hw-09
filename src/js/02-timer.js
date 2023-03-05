// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate;
let timerId;
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true; // disable button on page reload

const timerRefs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = number => number.toString().padStart(2, '0');

// Date picker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    const selected = selectedDates[0];
    // console.log(`now ${now.toUTCString()}, selected ${selected.toUTCString()}`);

    if (now.getTime() >= selected.getTime()) {
      // selected time is in the past
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selectedDate = selected;
    }
  },
};
flatpickr(input, options);

function updateTimer() {
  const now = new Date();
  const diff = selectedDate.getTime() - now.getTime();
  if (diff > 0) {
    const remaining = convertMs(diff);
    timerRefs.days.textContent = addLeadingZero(remaining.days);
    timerRefs.hours.textContent = addLeadingZero(remaining.hours);
    timerRefs.minutes.textContent = addLeadingZero(remaining.minutes);
    timerRefs.seconds.textContent = addLeadingZero(remaining.seconds);
  } else {
    clearInterval(timerId);
    timerRefs.days.textContent = addLeadingZero(0);
    timerRefs.hours.textContent = addLeadingZero(0);
    timerRefs.minutes.textContent = addLeadingZero(0);
    timerRefs.seconds.textContent = addLeadingZero(0);
    console.log('Timer has finished!');
  }
}

startBtn.addEventListener('click', () => {
  clearInterval(timerId);

  const now = new Date();
  const diff = selectedDate.getTime() - now.getTime();
  console.log(`selectedDate: ${selectedDate.toUTCString()}, diff: ${diff}`);
  if (diff > 0) {
    console.log('Starting the timer');
    timerId = setInterval(updateTimer, 1000);
    updateTimer();
  }
  startBtn.disabled = true;
});
