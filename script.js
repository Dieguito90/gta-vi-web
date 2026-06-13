
const target = new Date('2026-11-19T00:00:00');
const $ = id => document.getElementById(id);
function pad(n,l=2){return String(n).padStart(l,'0')}
function updateTimer(){
  const diff = target - new Date();
  if(diff <= 0){
    $('days').textContent='000'; $('hours').textContent='00'; $('minutes').textContent='00'; $('seconds').textContent='00';
    $('timerText').textContent='¡Ya llegó el día!';
    return;
  }
  const total = Math.floor(diff/1000);
  const days = Math.floor(total/86400);
  const hours = Math.floor((total%86400)/3600);
  const minutes = Math.floor((total%3600)/60);
  const seconds = total%60;
  $('days').textContent=pad(days,3); $('hours').textContent=pad(hours); $('minutes').textContent=pad(minutes); $('seconds').textContent=pad(seconds);
}
updateTimer(); setInterval(updateTimer,1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - innerHeight;
  $('progress').style.width = (scrollY / max * 100) + '%';
  $('topBtn').style.display = scrollY > 500 ? 'block' : 'none';
});
$('topBtn').onclick = () => scrollTo({top:0,behavior:'smooth'});
$('menuBtn').onclick = () => $('nav').classList.toggle('open');
$('themeBtn').onclick = () => document.body.classList.toggle('light');

let hype = 100;
$('hypeBtn').onclick = () => { hype += 5; $('hype').textContent = hype; };
$('copyBtn').onclick = async () => {
  try { await navigator.clipboard.writeText(location.href); alert('URL copiada'); }
  catch(e){ alert(location.href); }
};
let soundEnabled = false;
let audioCtx = null;

function startAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  return audioCtx;
}

function uiSound(type = 'click') {
  if (!soundEnabled) return;

  const ctx = startAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const now = ctx.currentTime;
  const presets = {
    click: [520, 860, 0.06],
    confirm: [660, 1040, 0.10],
    hype: [420, 1280, 0.14],
    copy: [740, 980, 0.09]
  };

  const [startFreq, endFreq, duration] = presets[type] || presets.click;

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.09, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration);
}

$('musicBtn').onclick = () => {
  soundEnabled = !soundEnabled;
  startAudio();
  $('musicBtn').textContent = soundEnabled ? 'Sonido UI ✅' : 'Sonido UI 🔊';
  if (soundEnabled) {
    const ctx = startAudio();
    if (ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.10, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  }
};

document.addEventListener('click', event => {
  const target = event.target.closest('button, a, summary');
  if (!target || target.id === 'musicBtn') return;

  if (target.id === 'hypeBtn') uiSound('hype');
  else if (target.id === 'copyBtn') uiSound('copy');
  else uiSound('click');
});
const quotes = [
  'Vice City no duerme.',
  'El hype está en modo neón.',
  'Cada tráiler esconde detalles.',
  'La página ya parece portal premium.',
  'Fan page lista para compartir.',
  'Más relleno, más estilo, más GTA VI.'
];
$('quote').textContent = quotes[Math.floor(Math.random()*quotes.length)];

let code = '';
addEventListener('keydown', e => {
  code = (code + e.key.toLowerCase()).slice(-3);
  if(code === 'gta') alert('Easter egg desbloqueado 🌴');
});


const midnightBtn = document.getElementById('midnightBtn');
const midnightPlayer = document.getElementById('midnightPlayer');
const midnightFrame = document.getElementById('midnightFrame');
const closeMidnight = document.getElementById('closeMidnight');

if (midnightBtn && midnightPlayer && midnightFrame && closeMidnight) {
  midnightBtn.addEventListener('click', () => {
    midnightPlayer.classList.add('open');
    midnightBtn.textContent = 'Música abierta ✅';

    // YouTube en muchos celulares NO deja sonar oculto.
    // Por eso ahora se abre un mini reproductor visible.
    if (!midnightFrame.src) {
      midnightFrame.src = 'https://www.youtube.com/embed/dX3k_QDnzHE?autoplay=1&playsinline=1';
    }

    uiSound('confirm');
  });

  closeMidnight.addEventListener('click', () => {
    midnightPlayer.classList.remove('open');
    midnightFrame.src = '';
    midnightBtn.textContent = 'Abrir música 🎵';
    uiSound('click');
  });
}
