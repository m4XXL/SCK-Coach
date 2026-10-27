class SckHistory {
  constructor() {
    this.container = document.getElementById('history-list-container');
    this.render();
  }

  getSavedPlans() {
    return JSON.parse(localStorage.getItem('sck_plans_v1') || '[]');
  }

  deletePlan(index) {
    if (confirm('Training wirklich löschen?')) {
      const plans = this.getSavedPlans();
      plans.splice(index, 1);
      localStorage.setItem('sck_plans_v1', JSON.stringify(plans));
      this.render();
      if (window.sckDashboard) sckDashboard.render();
    }
  }

  loadIntoPlanner(index) {
    const plan = this.getSavedPlans()[index];
    if (!plan && typeof sckPlanner !== 'undefined') return;
    sckPlanner.currentPlan = JSON.parse(JSON.stringify(plan));
    if (sckPlanner.titleInput) sckPlanner.titleInput.value = plan.title;
    sckPlanner.render();
    app.navigateTo('planner');
  }

  render() {
    if (!this.container) return;
    const plans = this.getSavedPlans();
    if (plans.length === 0) {
      this.container.innerHTML = '<div style="color: var(--color-text-muted);">Keine gespeicherten Trainings vorhanden.</div>';
      return;
    }
    this.container.innerHTML = plans.map((plan, index) => `
      <div class="history-card">
        <div>
          <div class="history-title">${plan.title}</div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 8px;">Datum: ${plan.date} | Dauer: ${plan.calculatedDurationMinutes} Min.</div>
          <ul style="padding-left:16px; font-size:0.85rem; margin-bottom:12px;">
            ${plan.exercises.map(ex => `<li>${ex.title} (${ex.duration} Min.)</li>`).join('')}
          </ul>
        </div>
        <div class="history-footer">
          <button class="btn" style="flex:1; padding:6px;" onclick="sckHistory.loadIntoPlanner(${index})">Laden</button>
          <button class="btn btn-secondary" style="background:#d62828; padding:6px;" onclick="sckHistory.deletePlan(${index})">🗑️</button>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => { window.sckHistory = new SckHistory(); });