class SckPlanner {
  constructor() {
    this.currentPlan = {
      id: 'plan_' + Date.now(),
      title: 'U9 Training: 1 gegen 1',
      date: new Date().toISOString().split('T')[0],
      ageGroup: 'U8_U9',
      mainFocus: '1 gegen 1',
      playerCount: 12,
      exercises: []
    };
    this.initElements();
    this.bindEvents();
    this.render();
  }

  initElements() {
    this.titleInput = document.getElementById('plan-title');
    this.dateInput = document.getElementById('plan-date');
    this.ageSelect = document.getElementById('plan-age');
    this.focusSelect = document.getElementById('plan-focus');
    this.playerInput = document.getElementById('plan-players');
    this.totalDurationBadge = document.getElementById('plan-total-duration');
    this.selectedContainer = document.getElementById('planner-selected-exercises');
    this.poolContainer = document.getElementById('planner-exercise-pool');
    this.searchInput = document.getElementById('planner-search');
    if (this.dateInput) this.dateInput.value = this.currentPlan.date;
  }

  bindEvents() {
    if (this.titleInput) this.titleInput.addEventListener('input', e => this.currentPlan.title = e.target.value);
    if (this.dateInput) this.dateInput.addEventListener('input', e => this.currentPlan.date = e.target.value);
    document.getElementById('plan-date-picker')?.addEventListener('click', () => { if (this.dateInput?.showPicker) this.dateInput.showPicker(); else this.dateInput?.focus(); });
    if (this.dateInput) this.dateInput.addEventListener('click', () => { if (this.dateInput.showPicker) this.dateInput.showPicker(); });
    if (this.ageSelect) this.ageSelect.addEventListener('change', e => this.currentPlan.ageGroup = e.target.value);
    if (this.focusSelect) this.focusSelect.addEventListener('change', e => this.currentPlan.mainFocus = e.target.value);
    if (this.playerInput) this.playerInput.addEventListener('input', e => this.currentPlan.playerCount = parseInt(e.target.value) || 0);
    if (this.searchInput) this.searchInput.addEventListener('input', () => this.renderPool());
    
    document.getElementById('save-training-btn').addEventListener('click', () => this.saveTraining());
    document.getElementById('reset-training-btn').addEventListener('click', () => {
      this.currentPlan.exercises = [];
      this.render();
    });
  }

  addExercise(exerciseId) {
    const ex = store.getExercises().find(item => item.id === exerciseId);
    if (!ex) return;
    this.currentPlan.exercises.push({ exerciseId: ex.id, title: ex.title, duration: ex.durationMinutes || 15 });
    this.render();
  }

  removeExercise(index) {
    this.currentPlan.exercises.splice(index, 1);
    this.render();
  }

  updateDuration(index, val) {
    this.currentPlan.exercises[index].duration = parseInt(val) || 0;
    this.calculateTotal();
  }

  calculateTotal() {
    const total = this.currentPlan.exercises.reduce((sum, item) => sum + item.duration, 0);
    if (this.totalDurationBadge) this.totalDurationBadge.textContent = `${total} Min.`;
    return total;
  }

  render() {
    this.renderSelected();
    this.renderPool();
    this.calculateTotal();
  }

  renderSelected() {
    if (!this.selectedContainer) return;
    if (this.currentPlan.exercises.length === 0) {
      this.selectedContainer.innerHTML = '<div style="color: var(--color-text-muted);">Noch keine Übungen hinzugefügt.</div>';
      return;
    }
    this.selectedContainer.innerHTML = this.currentPlan.exercises.map((item, index) => `
      <div class="planned-exercise-card">
        <div><strong>${index + 1}. ${item.title}</strong></div>
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="number" value="${item.duration}" style="width:60px; background:#121212; color:#fff; border:1px solid #333; padding:4px;" onchange="sckPlanner.updateDuration(${index}, this.value)"> Min.
          <button class="btn btn-secondary" style="background:#d62828; padding:4px 8px;" onclick="sckPlanner.removeExercise(${index})">✕</button>
        </div>
      </div>
    `).join('');
  }

  renderPool() {
    if (!this.poolContainer) return;
    const search = this.searchInput ? this.searchInput.value.toLowerCase() : '';
    const filtered = store.getExercises().filter(ex => !search || ex.title.toLowerCase().includes(search));
    this.poolContainer.innerHTML = filtered.map(ex => `
      <div class="pool-item">
        <div><span style="font-weight:600;">${ex.title}</span><br><span style="font-size:0.75rem; color:var(--color-text-muted);">${ex.durationMinutes} Min.</span></div>
        <button class="btn" style="padding:4px 8px;" onclick="sckPlanner.addExercise('${ex.id}')">➕</button>
      </div>
    `).join('');
  }

  saveTraining() {
    if (this.currentPlan.exercises.length === 0) { alert('Bitte Übungen hinzufügen.'); return; }
    const plans = JSON.parse(localStorage.getItem('sck_plans_v1') || '[]');
    const saved = { ...this.currentPlan, calculatedDurationMinutes: this.calculateTotal() };
    const existingIndex = plans.findIndex(plan => plan.id === saved.id);
    if (existingIndex >= 0) plans[existingIndex] = saved; else plans.push(saved);
    localStorage.setItem('sck_plans_v1', JSON.stringify(plans));
    alert('Training erfolgreich gespeichert!');
    if (window.sckDashboard) sckDashboard.render();
  }
}

document.addEventListener('DOMContentLoaded', () => { window.sckPlanner = new SckPlanner(); });