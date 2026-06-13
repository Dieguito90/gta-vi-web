
const target = new Date('2026-11-19T00:00:00');
const ids = ['days','hours','minutes','seconds'];
function pad(n,l=2){return String(n).padStart(l,'0')}
function clock(){
 const d = target - new Date();
 const el = id => document.getElementById(id);
 if(d<=0){ids.forEach((id,i)=>el(id).textContent=i?'00':'000');document.getElementById('countdownText').textContent='¡Llegó el día!';return}
 const s=Math.floor(d/1000), days=Math.floor(s/86400), h=Math.floor((s%86400)/3600), m=Math.floor((s%3600)/60), sec=s%60;
 el('days').textContent=pad(days,3);el('hours').textContent=pad(h);el('minutes').textContent=pad(m);el('seconds').textContent=pad(sec);
 document.getElementById('countdownText').textContent='Actualizándose en tiempo real';
}
clock();setInterval(clock,1000);
const reveals=document.querySelectorAll('.reveal');const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show')}),{threshold:.12});reveals.forEach(x=>obs.observe(x));
window.addEventListener('scroll',()=>{const p=scrollY/(document.body.scrollHeight-innerHeight)*100;document.getElementById('scrollbar').style.width=p+'%';document.getElementById('topBtn').style.display=scrollY>500?'block':'none'});
document.getElementById('topBtn').onclick=()=>scrollTo({top:0,behavior:'smooth'});
document.getElementById('menuBtn').onclick=()=>document.getElementById('navLinks').classList.toggle('open');
document.getElementById('themeBtn').onclick=()=>document.body.classList.toggle('light');
let hype=100;document.getElementById('hypeBtn').onclick=()=>{hype+=5;document.getElementById('hype').textContent=hype};
document.getElementById('copyBtn').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);alert('URL copiada')}catch(e){alert(location.href)}};
const quotes=['Vice City no duerme.','El hype está en modo turbo.','Jason y Lucia van a romper internet.','Leonida se ve increíble.','Fan page hecha con estilo.'];document.getElementById('quote').textContent=quotes[Math.floor(Math.random()*quotes.length)];
let keys='';addEventListener('keydown',e=>{keys=(keys+e.key.toLowerCase()).slice(-3);if(keys==='gta'){alert('Easter egg desbloqueado: Vice City vibes 🌴')}});
