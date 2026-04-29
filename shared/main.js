/* =========================================
   SOTTOSOPRA · JS CONDIVISO
   Torch cursor + mobile menu
   ========================================= */

(function() {
  // ============ TORCH CURSOR ============
  const torch = document.querySelector('.torch');
  if (torch) {
    const darkSections = document.querySelectorAll('[data-dark="true"]');
    function isOverDark(x, y) {
      for (const sec of darkSections) {
        const r = sec.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
      }
      return false;
    }
    document.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(hover: none)').matches) return;
      if (isOverDark(e.clientX, e.clientY)) {
        torch.style.opacity = '1';
        torch.style.left = e.clientX + 'px';
        torch.style.top = e.clientY + 'px';
        document.body.style.cursor = 'none';
      } else {
        torch.style.opacity = '0';
        document.body.style.cursor = '';
      }
    });
    document.addEventListener('mouseleave', () => {
      torch.style.opacity = '0';
      document.body.style.cursor = '';
    });
  }

  // ============ MOBILE MENU ============
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('nav.main');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('mobile-open');
      if (isOpen) {
        mainNav.style.display = 'flex';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '60px';
        mainNav.style.right = '18px';
        mainNav.style.flexDirection = 'column';
        mainNav.style.background = 'var(--bg-light)';
        mainNav.style.padding = '20px 24px';
        mainNav.style.borderRadius = '12px';
        mainNav.style.border = '0.5px solid rgba(26,20,16,0.15)';
        mainNav.style.gap = '16px';
        mainNav.style.zIndex = '101';
      } else {
        mainNav.style.cssText = '';
      }
    });
  }
})();
