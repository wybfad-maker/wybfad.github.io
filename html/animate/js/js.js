// 创建粒子效果
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }

  function createParticle (container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = '#00f3ff';
    particle.style.boxShadow = '0 0 5px #00f3ff, 0 0 10px #00f3ff';
    particle.style.borderRadius = '50%';

    // 随机位置
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = posX + 'vw';
    particle.style.top = posY + 'vh';

    // 动画
    const duration = Math.random() * 10 + 5;
    particle.style.animation = `float ${duration}s linear infinite`;
    const keyframes = `
    @keyframes float {
      0% {
        transform: translate(0, 0);
        opacity: ${Math.random() * 0.5 + 0.2};
      }
      100% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        opacity: ${Math.random() * 0.5 + 0.2};
      }
    }`;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    container.appendChild(particle);
  }
});