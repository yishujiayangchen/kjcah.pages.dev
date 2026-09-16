
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const opening = $('#opening'), enter = $('#enterBtn');
  if (opening && enter) {
    const entered = sessionStorage.getItem('changan-entered');
    if (entered) opening.classList.add('hidden');
    enter.addEventListener('click', () => {
      sessionStorage.setItem('changan-entered','1');
      opening.classList.add('hidden');
    });
  }

  const nav = $('.navbar'), toggle = $('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  const canvas = $('#petalCanvas');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    let w=0,h=0, petals=[];
    const resize=()=>{w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);w=innerWidth;h=innerHeight};
    resize(); addEventListener('resize',resize,{passive:true});
    for(let i=0;i<28;i++) petals.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:2+Math.random()*3,v:.3+Math.random()*.8,s:Math.random()*6.28,a:.2+Math.random()*.6});
    function frame(){
      ctx.clearRect(0,0,w,h);
      for(const p of petals){p.y+=p.v;p.x+=Math.sin(p.s+=.008)*.35;if(p.y>h+20)p.y=-20;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.s);ctx.globalAlpha=p.a;ctx.fillStyle='#d6b47d';ctx.beginPath();ctx.ellipse(0,0,p.r,p.r*1.7,0,0,6.28);ctx.fill();ctx.restore();}
      requestAnimationFrame(frame);
    } frame();
  }

  const light = $('#mouseLight');
  if(light && !reduced && matchMedia('(pointer:fine)').matches){
    addEventListener('pointermove',e=>{light.style.left=e.clientX+'px';light.style.top=e.clientY+'px'},{passive:true});
  }

  const paper = $('#poemPaper'), text = $('#poemText'), close = $('#closePoem');
  const poems = [
    '花落春仍在，灯深人未眠。<br>一城风月里，且听长安弦。',
    '朱雀长街远，月照旧城门。<br>行人各有梦，灯火自相温。',
    '驼铃过西市，酒旗入晚风。<br>千年如一瞬，故人何处逢。',
    '曲水浮花影，楼台接暮云。<br>若问长安事，都在寻常人。'
  ];
  $$('.flower-art span').forEach((el,i)=>el.addEventListener('click',()=>{
    if(!paper)return;text.innerHTML=poems[i%poems.length];paper.classList.add('show');paper.setAttribute('aria-hidden','false');
  }));
  const hidePoem=()=>{if(paper){paper.classList.remove('show');paper.setAttribute('aria-hidden','true')}};
  close?.addEventListener('click',hidePoem);
  addEventListener('keydown',e=>{if(e.key==='Escape'){hidePoem(); $$('.modal.show').forEach(m=>m.classList.remove('show'));}});
  paper?.addEventListener('click',e=>{if(e.target===paper)hidePoem();});
})();
