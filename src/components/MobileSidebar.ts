// ============================================================
// components/MobileSidebar.ts
// Controla el sidebar deslizable en mobile con pantalla completa
// CORREGIDO: Añadido botón de cierre (X) y mejor manejo
// ============================================================

const MOBILE_BREAKPOINT = 768;

function isMobile(): boolean {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

export function initMobileSidebar(): void {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuBtn = document.getElementById('mobileMenuBtn');
  
  // Crear botón de cierre si no existe
  let closeBtn = document.getElementById('mobileSidebarClose');
  if (!closeBtn && sidebar) {
    closeBtn = document.createElement('button');
    closeBtn.id = 'mobileSidebarClose';
    closeBtn.className = 'mobile-sidebar-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar menú');
    sidebar.appendChild(closeBtn);
  }

  if (!sidebar || !overlay || !menuBtn) {
    console.warn('Mobile sidebar elements not found');
    return;
  }

  function openSidebar(): void {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('sidebar-open');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }

  function closeSidebar(): void {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  // Abrir sidebar al hacer clic en el botón de menú (hamburguesa)
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('sidebar-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Cerrar sidebar al hacer clic en el botón de cierre (X)
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  // Cerrar sidebar al hacer clic en el overlay
  overlay.addEventListener('click', closeSidebar);

  // Cerrar sidebar al seleccionar un chat en mobile
  const chatsList = document.getElementById('chatsList');
  if (chatsList) {
    chatsList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.chat-item') && isMobile()) {
        setTimeout(closeSidebar, 150);
      }
    });
  }

  // Cerrar al hacer clic en nuevo chat
  const newChatBtn = document.getElementById('newChatBtn');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      if (isMobile()) {
        setTimeout(closeSidebar, 150);
      }
    });
  }

  // Cerrar al hacer clic en el logo
  const logoBtn = document.getElementById('logoBtn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      if (isMobile()) {
        setTimeout(closeSidebar, 150);
      }
    });
  }

  // Cerrar al presionar la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
      closeSidebar();
    }
  });

  // Cerrar al redimensionar a desktop
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      closeSidebar();
    }
  });

  // Prevenir que el clic dentro del sidebar cierre el overlay
  sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}