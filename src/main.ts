// ============================================================
// main.ts - VERSIÓN SIMPLIFICADA (sin selector arriba)
// ============================================================

import './styles/base.css';
import './styles/layout.css';
import './styles/messages.css';
import './styles/components.css';
import './styles/features.css';
import './styles/splash.css';

import { App } from './app';
import { initThemeToggle } from './components/ThemeToggle';
import { initMobileSidebar } from './components/MobileSidebar';
import { initTour } from './components/Tour';
import { initSplash } from './components/Splash';

console.log('🚀 Iniciando aplicación...');

const app = new App();
app.init();

console.log('✅ App inicializada');

// ─────────────────────────────────────────────────────────────
// MEJORAR ICONOS DE CATEGORÍAS
// ─────────────────────────────────────────────────────────────
function enhanceCategoryIcons() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  console.log(`📊 Encontrados ${categoryBtns.length} botones`);
  
  categoryBtns.forEach((btn) => {
    const cat = btn.getAttribute('data-ava-cat');
    const icon = btn.querySelector('.icon');
    
    if (icon) {
      switch(cat) {
        case 'gestion':
          icon.textContent = '📖';
          break;
        case 'capacitacion':
          icon.textContent = '🎓';
          break;
        case 'consulta':
          icon.textContent = '🔍';
          break;
        case 'simulador':
          icon.textContent = '🎮';
          break;
      }
    }
  });
  
  console.log('✅ Iconos mejorados');
}

// ─────────────────────────────────────────────────────────────
// INICIALIZAR
// ─────────────────────────────────────────────────────────────
setTimeout(() => {
  enhanceCategoryIcons();
}, 300);

initThemeToggle();
initMobileSidebar();

initSplash(() => {
  setTimeout(() => {
    initTour();
  }, 100);
});

(window as unknown as Record<string, unknown>).app = app;

console.log('🏁 main.ts ejecutado');