class SCKApp {
  constructor() {
    this.currentView = 'dashboard';
    this.initNavigation();
  }

  initNavigation() {
    const navButtons = document.querySelectorAll('[data-view]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const viewName = e.currentTarget.getAttribute('data-view');
        this.navigateTo(viewName);
      });
    });

    this.exerciseDb = new ExerciseDbModule();
    this.exerciseDb.render();
  }

  navigateTo(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));

    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) targetView.classList.add('active');

    document.querySelectorAll(`[data-view="${viewName}"]`).forEach(btn => btn.classList.add('active'));

    const titles = {
      'dashboard': 'Dashboard',
      'exercises': 'Übungsdatenbank',
      'planner': 'Trainingsplaner',
      'drawer': 'Taktikzeichner',
      'history': 'Gespeicherte Trainings',
      'favorites': 'Favoriten',
      'exercise-form': 'Neue Übung',
      'settings': 'Einstellungen'
    };
    document.getElementById('page-title').textContent = titles[viewName] || 'SCK-Coach';

    if (viewName === 'dashboard' && window.sckDashboard) sckDashboard.render();
    if (viewName === 'exercises') this.exerciseDb.render();
    if (viewName === 'history' && typeof sckHistory !== 'undefined') sckHistory.render();
    if (viewName === 'favorites' && typeof exerciseDbModule !== 'undefined') {
      // Favoriten-Ansicht rendern
      this.renderFavorites();
    }
  }

  renderFavorites() {
    const container = document.getElementById('favorites-list-container');
    if (!container) return;
    const exercises = store.getExercises().filter(ex => ex.isFavorite);
    if (exercises.length === 0) {
      container.innerHTML = '<div style="color: var(--color-text-muted);">Noch keine Favoriten markiert.</div>';
      return;
    }
    container.innerHTML = exercises.map(ex => `
      <div class="exercise-card" onclick="exerciseDetailModal.open('${ex.id}')" style="cursor: pointer;">
        <div class="exercise-title">${ex.title}</div>
        <p>${ex.shortDescription}</p>
        <div class="exercise-meta" onclick="event.stopPropagation()">
          <span>⏱️ ${ex.durationMinutes} Min.</span>
          <button onclick="app.toggleFav('${ex.id}')">⭐</button>
        </div>
      </div>
    `).join('');
  }

  toggleFav(id) {
    store.toggleFavorite(id);
    this.exerciseDb.render();
    if (this.currentView === 'favorites') this.renderFavorites();
  }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new SCKApp();
});