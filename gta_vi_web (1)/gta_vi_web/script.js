const launchDate = new Date('2026-11-19T00:00:00');

const parts = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const message = document.getElementById('countdown-message');

function twoDigits(number) {
  return String(number).padStart(2, '0');
}

function refreshClock() {
  const now = new Date();
  const distance = launchDate.getTime() - now.getTime();

  if (distance <= 0) {
    parts.days.textContent = '000';
    parts.hours.textContent = '00';
    parts.minutes.textContent = '00';
    parts.seconds.textContent = '00';
    message.textContent = 'Ya llegó el día.';
    return;
  }

  const secondsTotal = Math.floor(distance / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  parts.days.textContent = String(days).padStart(3, '0');
  parts.hours.textContent = twoDigits(hours);
  parts.minutes.textContent = twoDigits(minutes);
  parts.seconds.textContent = twoDigits(seconds);
  message.textContent = 'Actualizándose en tiempo real';
}

refreshClock();
setInterval(refreshClock, 1000);
