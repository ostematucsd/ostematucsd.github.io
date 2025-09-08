// ==============================
// Mobile nav toggle + footer year
// ==============================
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ============================================
// Board: on phones, tap a card to show profile
// ============================================
(function(){
  const modal = document.getElementById('profileModal');
  if (!modal) return;

  const body = modal.querySelector('.modal-body');
  const isNoHover = window.matchMedia('(hover: none)').matches; // phones/tablets

  function openModal(html){
    body.innerHTML = html;
    modal.classList.add('open');
    document.addEventListener('keydown', onKey);
  }
  function closeModal(){
    modal.classList.remove('open');
    body.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){ if (e.key === 'Escape') closeModal(); }

  // Close on X or backdrop
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]') || e.target === modal.querySelector('.modal-backdrop')) {
      closeModal();
    }
  });

  // Only attach the tap-to-open behavior on devices without hover (mobile)
  if (!isNoHover) return;

  document.querySelectorAll('.board-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If a real link/button inside the card was tapped, let it do its thing
      if (e.target.closest('a, button')) return;

      const name = card.getAttribute('data-name') || '';
      const role = card.getAttribute('data-role') || '';

      // Prefer the back/profile image; fall back to the front avatar
      const backImg = card.querySelector('.card-back .profile-rect');
      const frontImg = card.querySelector('.card-front .avatar');
      const src = backImg?.getAttribute('src') || frontImg?.getAttribute('src') || '';
      const alt = backImg?.getAttribute('alt') || frontImg?.getAttribute('alt') || name || 'Profile';

      if (!src) return;

      const html = `
        <div class="modal-profile">
          <img src="${src}" alt="${alt}" class="modal-profile-img">
          <h3 id="modalTitle">${name}</h3>
          <p class="role">${role}</p>
          <button class="modal-close btn btn-small" data-close style="margin-top:8px;">Close</button>
        </div>
      `;
      openModal(html);
    }, { passive: true });
  });
})();
