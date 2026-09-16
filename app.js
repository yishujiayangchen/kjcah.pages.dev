
(() => {
  window.openM = i => {
    const m=document.getElementById('m'+i); if(!m)return;
    m.classList.add('show'); document.body.style.overflow='hidden';
    const close=m.querySelector('.close'); close?.focus();
  };
  window.closeM = i => {
    const m=document.getElementById('m'+i); if(!m)return;
    m.classList.remove('show'); document.body.style.overflow='';
  };
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') document.querySelectorAll('.modal.show').forEach(m=>m.classList.remove('show'));
    if(!document.querySelector('.modal.show')) document.body.style.overflow='';
  });
})();
