class ExerciseDbModule {
  constructor() {
    this.container = document.getElementById('exercise-list-container');
    this.searchInput = document.getElementById('exercise-search');
    this.filterAge = document.getElementById('filter-age');
    this.filterCategory = document.getElementById('filter-category');
    this.filterDifficulty = document.getElementById('filter-difficulty');
    this.filterPlayers = document.getElementById('filter-players');
    this.resetBtn = document.getElementById('reset-filters-btn');
    this.countBadge = document.getElementById('exercise-count-badge');

    this.bindEvents();
  }

  bindEvents() {
    const updateHandler = () => this.render();
    if (this.searchInput) this.searchInput.addEventListener('input', updateHandler);
    if (this.filterAge) this.filterAge.addEventListener('change', updateHandler);
    if (this.filterCategory) this.filterCategory.addEventListener('change', updateHandler);
    if (this.filterDifficulty) this.filterDifficulty.addEventListener('change', updateHandler);
    if (this.filterPlayers) this.filterPlayers.addEventListener('input', updateHandler);
    
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.filterAge.value = '';
        this.filterCategory.value = '';
        this.filterDifficulty.value = '';
        this.filterPlayers.value = '';
        this.render();
      });
    }
  }

  render() {
    if (!this.container) return;
    let exercises = store.getExercises();

    const search = this.searchInput ? this.searchInput.value.toLowerCase() : '';
    const age = this.filterAge ? this.filterAge.value : '';
    const cat = this.filterCategory ? this.filterCategory.value : '';
    const diff = this.filterDifficulty ? this.filterDifficulty.value : '';
    const players = this.filterPlayers ? parseInt(this.filterPlayers.value) : null;

    exercises = exercises.filter(ex => {
      const matchSearch = !search || ex.title.toLowerCase().includes(search) || ex.shortDescription.toLowerCase().includes(search);
      const matchAge = !age || ex.ageGroups.includes(age);
      const matchCat = !cat || ex.categories.includes(cat);
      const matchDiff = !diff || ex.difficulty === diff;
      const matchPlayers = !players || (players >= ex.playersMin && players <= ex.playersMax);
      return matchSearch && matchAge && matchCat && matchDiff && matchPlayers;
    });

    if (this.countBadge) this.countBadge.textContent = `${exercises.length} Übungen gefunden`;

    if (exercises.length === 0) {
      this.container.innerHTML = '<div style="color: var(--color-text-muted);">Keine passenden Übungen gefunden.</div>';
      return;
    }

    this.container.innerHTML = exercises.map(ex => `
      <div class="exercise-card" onclick="exerciseDetailModal.open('${ex.id}')" style="cursor: pointer;">
        <div class="exercise-card-header">
          <div class="exercise-title">${ex.title}</div>
          <div class="tag-list">
            ${ex.categories.map(c => `<span class="tag tag-category">${c}</span>`).join('')}
            <span class="tag">${ex.difficulty}</span>
          </div>
        </div>
        <div class="exercise-card-body">
          <p style="font-size: 0.9rem; color: var(--color-text-muted);">${ex.shortDescription}</p>
          <div class="exercise-meta" onclick="event.stopPropagation()">
            <span>⏱️ ${ex.durationMinutes} Min.</span>
            <span>👥 ${ex.playersMin}-${ex.playersMax}</span>
            <button onclick="app.toggleFav('${ex.id}')" style="background:none; cursor:pointer;">${ex.isFavorite ? '⭐' : '☆'}</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}