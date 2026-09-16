const sky=document.getElementById('sky'), timeBtn=document.getElementById('timeBtn');
let night=false;
timeBtn.addEventListener('click',()=>{night=!night;sky.classList.toggle('night',night);sky.classList.toggle('day',!night);timeBtn.textContent=night?'白昼将至':'夜色降临';document.body.dataset.time=night?'night':'day';});

const info=document.getElementById('infoPanel'), infoText=document.getElementById('infoText');
document.querySelectorAll('.gate').forEach(el=>el.addEventListener('click',()=>{info.classList.add('show');infoText.textContent=el.dataset.info;}));
document.getElementById('closeInfo').addEventListener('click',()=>info.classList.remove('show'));

const toast=document.getElementById('eventToast');
const events=[
 '你在街角发现一位卖花的小童。他没有出现在地图上，只说了一句：“今日的花，比昨日早开。”',
 '一辆马车在灯影里停下，车夫向你询问纸墨斋的位置。地图上没有这条支线。',
 '你听见远处有人叫你的名字。循声走近，只找到一盏尚未熄灭的灯。',
 '客舍门前落下一枚旧铜钱，背面刻着一个你尚未探索的人物姓氏。'
];
document.getElementById('eventBtn').addEventListener('click',()=>{
  const e=events[Math.floor(Math.random()*events.length)];
  toast.textContent='隐藏事件 · '+e; toast.classList.remove('show'); void toast.offsetWidth; toast.classList.add('show');
});

const wanderers=document.getElementById('wanderers');
function spawn(){
  const w=document.createElement('div'); w.className='wanderer';
  w.style.left=(8+Math.random()*78)+'%'; w.style.top=(25+Math.random()*55)+'%';
  w.style.animationDuration=(8+Math.random()*8)+'s';
  wanderers.appendChild(w); setTimeout(()=>w.remove(),16000);
}
setInterval(spawn,2200); for(let i=0;i<5;i++) setTimeout(spawn,i*500);

document.querySelectorAll('.hotspot').forEach(el=>{
  el.addEventListener('mouseenter',()=>el.setAttribute('aria-label',el.dataset.tip));
});
