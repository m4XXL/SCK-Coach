class SCKStore {
  constructor() {
    this.STORAGE_KEY_EXERCISES = 'sck_exercises_v1';
    this.STORAGE_KEY_PLANS = 'sck_plans_v1';
    this.LIBRARY_VERSION_KEY = 'sck_library_version';
    this.LIBRARY_VERSION = '0.3';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY_EXERCISES)) {
      this.saveExercises(INITIAL_EXERCISES);
    }
  }

  getExercises() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_EXERCISES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Fehler beim Laden der Übungen", e);
      return [];
    }
  }

  saveExercises(exercises) {
    localStorage.setItem(this.STORAGE_KEY_EXERCISES, JSON.stringify(exercises));
  }

  toggleFavorite(exerciseId) {
    const exercises = this.getExercises();
    const ex = exercises.find(item => item.id === exerciseId);
    if (ex) {
      ex.isFavorite = !ex.isFavorite;
      this.saveExercises(exercises);
    }
    return ex ? ex.isFavorite : false;
  }
}

const store = new SCKStore();