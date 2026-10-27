class ExerciseDetailModal {
  constructor() {
    this.modal = document.getElementById('exercise-detail-modal');
    this.titleEl = document.getElementById('modal-title');
    this.bodyEl = document.getElementById('modal-body-content');
    
    this.btnFavorite = document.getElementById('modal-btn-favorite');
    this.btnCopy = document.getElementById('modal-btn-copy');
    this.btnPrint = document.getElementById('modal-btn-print');
    this.btnDelete = document.getElementById('modal-btn-delete');
    
    this.currentExerciseId = null;
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }
    if (this.btnFavorite) {
      this.btnFavorite.addEventListener('click', () => {
        if (this.currentExerciseId) {
          store.toggleFavorite(this.currentExerciseId);
          this.open(this.currentExerciseId);
          if (app && app.exerciseDb) app.exerciseDb.render();
        }
      });
    }
    if (this.btnCopy) {
      this.btnCopy.addEventListener('click', () => { if (this.currentExerciseId) this.duplicateExercise(this.currentExerciseId); });
    }
    if (this.btnPrint) {
      this.btnPrint.addEventListener('click', () => window.print());
    }
    if (this.btnDelete) {
      this.btnDelete.addEventListener('click', () => { if (this.currentExerciseId) this.deleteExercise(this.currentExerciseId); });
    }
  }

  open(exerciseId) {
    const ex = store.getExercises().find(item => item.id === exerciseId);
    if (!ex) return;

    this.currentExerciseId = exerciseId;
    this.titleEl.textContent = ex.title;
    this.btnFavorite.textContent = ex.isFavorite ? '⭐ Favorit' : '☆ Favorit';

    this.bodyEl.innerHTML = `
      <p style="font-size: 1.05rem; margin-bottom: 16px; color: var(--color-text-muted);">${ex.shortDescription}</p>
      <div class="detail-grid">
        <div class="detail-item"><span>Altersklasse</span><strong>${ex.ageGroups.join(', ')}</strong></div>
        <div class="detail-item"><span>Dauer</span><strong>${ex.durationMinutes} Min.</strong></div>
        <div class="detail-item"><span>Spieler</span><strong>${ex.playersMin}-${ex.playersMax}</strong></div>
        <div class="detail-item"><span>Schwierigkeit</span><strong>${ex.difficulty}</strong></div>
      </div>
      <div class="detail-section">
        <h4>Ablauf</h4>
        <ol>${ex.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
      </div>
      <div class="detail-section">
        <h4>Coachingpunkte</h4>
        <ul>${ex.coachingPoints.map(cp => `<li>${cp}</li>`).join('')}</ul>
      </div>
      ${this.renderAttachments(ex.attachments || [])}
    `;
    this.modal.classList.add('active');
  }

  renderAttachments(files) {
    if (!files.length) return '';
    return `<div class="detail-section"><h4>Dateien</h4><div class="attachment-list">${files.map(file => `<div class="attachment-item"><a class="attachment-link" href="${file.dataUrl}" download="${file.name}">${file.type.startsWith('image/')?'🖼️':'📄'} ${file.name}</a></div>${file.type.startsWith('image/')?`<img class="attachment-image" src="${file.dataUrl}" alt="${file.name}">`:''}`).join('')}</div></div>`;
  }
  close() {
    this.modal.classList.remove('active');
    this.currentExerciseId = null;
  }

  duplicateExercise(id) {
    const exercises = store.getExercises();
    const ex = exercises.find(item => item.id === id);
    if (!ex) return;
    const newEx = { ...JSON.parse(JSON.stringify(ex)), id: 'ex_sck_' + Date.now(), title: `${ex.title} (Kopie)` };
    exercises.push(newEx);
    store.saveExercises(exercises);
    this.close();
    if (app && app.exerciseDb) app.exerciseDb.render();
    alert('Übung kopiert!');
  }

  deleteExercise(id) {
    if (confirm('Übung wirklich löschen?')) {
      let exercises = store.getExercises().filter(item => item.id !== id);
      store.saveExercises(exercises);
      this.close();
      if (app && app.exerciseDb) app.exerciseDb.render();
    }
  }
}

const exerciseDetailModal = new ExerciseDetailModal();