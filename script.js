// Mobile nav toggle + footer year
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();

// Board: open modal on click (mobile / touch)
(function(){
  const modal = document.getElementById('profileModal');
  if(!modal) return;
  const body = modal.querySelector('.modal-body');
  const closeEls = modal.querySelectorAll('[data-close]');

  function openModal(html){
    body.innerHTML = html;
    modal.classList.add('open');
    const btn = modal.querySelector('.modal-close');
    if(btn) btn.focus();
    document.addEventListener('keydown', onKey);
  }
  function closeModal(){
    modal.classList.remove('open');
    body.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){ if(e.key === 'Escape') closeModal(); }

  // Clickable overlay / close button
  modal.addEventListener('click', (e)=>{
    if(e.target.matches('[data-close]') || e.target === modal.querySelector('.modal-backdrop')) closeModal();
  });

  // For each board card: click opens details
  document.querySelectorAll('.board-card').forEach(card =>{
    card.addEventListener('click', ()=>{
      const name = card.getAttribute('data-name') || '';
      const role = card.getAttribute('data-role') || '';
      const bio  = card.getAttribute('data-bio') || '';
      const email= card.getAttribute('data-email') || '';
      const linkedin = card.getAttribute('data-linkedin') || '#';
      const img = card.querySelector('img')?.getAttribute('src') || '';
      const html = `
        <div class="center">
          <img class="avatar" src="${img}" alt="${name}">
          <h3 id="modalTitle">${name}</h3>
          <p class="role">${role}</p>
        </div>
        <p>${bio}</p>
        <div class="flex" style="gap:8px">
          <a class="btn btn-small" href="mailto:${email}">Email</a>
          <a class="btn btn-small" href="${linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        </div>`;
      openModal(html);
    });
  });
})();
