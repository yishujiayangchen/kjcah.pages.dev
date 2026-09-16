/* 看尽长安花 - 交互脚本 */

document.addEventListener('DOMContentLoaded', () => {
  // 创建飘落花瓣
  createPetals();

  // 高亮当前导航
  highlightNav();

  // 平滑滚动增强
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

function createPetals() {
  const container = document.querySelector('.petals');
  if (!container) return;

  const count = 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 8) + 's';
    petal.style.width = (8 + Math.random() * 10) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = 0.3 + Math.random() * 0.5;
    container.appendChild(petal);
  }
}

function highlightNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || 
        (path === 'index.html' && href === 'index.html') ||
        href.endsWith(path)) {
      link.classList.add('active');
    }
  });
}
