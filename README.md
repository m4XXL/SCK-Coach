<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>SCK-Coach V0.3 | SC Kalsdorf Trainingsplattform</title>
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/drawing.css">
  <link rel="stylesheet" href="css/print.css" media="print">
</head>
<body>

  <!-- Sidebar / Desktop Navigation -->
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <img class="brand-logo" src="assets/SCK_Logo.png" alt="Logo des Sport Club Kalsdorf">
      <div class="brand-text">
        <h2>SCK-Coach</h2>
        <span>SC Kalsdorf Jugend</span>
      </div>
    </div>

    <nav class="nav-menu">
      <button class="nav-btn active" data-view="dashboard">
        <span class="icon">📊</span>
        <span class="label">Dashboard</span>
      </button>
      <button class="nav-btn" data-view="exercises">
        <span class="icon">📚</span>
        <span class="label">Übungsdatenbank</span>
      </button>
      <button class="nav-btn" data-view="planner">
        <span class="icon">📋</span>
        <span class="label">Trainingsplaner</span>
      </button>
      <button class="nav-btn" data-view="drawer">
        <span class="icon">🎨</span>
        <span class="label">Taktikzeichner</span>
      </button>
      <button class="nav-btn" data-view="history">
        <span class="icon">⏱️</span>
        <span class="label">Gespeicherte Trainings</span>
      </button>
      <button class="nav-btn" data-view="favorites">
        <span class="icon">⭐</span>
        <span class="label">Favoriten</span>
      </button>
      <button class="nav-btn" data-view="exercise-form">
        <span class="icon">➕</span>
        <span class="label">Neue Übung</span>
      </button>
      <button class="nav-btn" data-view="settings">
        <span class="icon">⚙️</span>
        <span class="label">Einstellungen & Backup</span>
      </button>
    </nav>
  </aside>

  <!-- Hauptinhaltsbereich -->
  <main class="main-content">
    
    <!-- Top-Bar (Mobil Header) -->
    <header class="top-bar">
      <h1 id="page-title">Dashboard</h1>
      <div class="top-bar-actions">
        <button class="btn btn-icon" onclick="app.navigateTo('exercise-form')" title="Neue Übung">➕</button>
      </div>
    </header>

    <!-- App Views Container -->
    <div id="view-container">

      <!-- View: Dashboard -->
      <section id="view-dashboard" class="app-view active">
        <div class="welcome-banner" style="margin-bottom: 20px;">
          <h2>Willkommen beim SCK-Coach</h2>
          <p style="color: var(--color-text-muted);">Professionelle Trainingsplattform für den SC Kalsdorf Jugendfußball</p>
        </div>

        <div class="dashboard-calendar panel" style="margin-bottom: 20px;">
          <div class="calendar-header">
            <button class="btn btn-secondary" id="calendar-prev" aria-label="Vorherige Woche">‹</button>
            <h2 id="calendar-title">Trainingskalender</h2>
            <button class="btn btn-secondary" id="calendar-next" aria-label="Nächste Woche">›</button>
          </div>
                    <div id="dashboard-calendar-grid" class="calendar-grid"></div>
          <p class="calendar-hint">Geplante Trainings anklicken, um die enthaltenen Übungen anzusehen.</p>
        </div>
        <div class="quick-actions-grid">
          <button class="action-card" onclick="app.navigateTo('planner')">
            <span class="action-icon">📋</span>
            <span class="action-title">Neues Training</span>
            <span class="action-desc">Einheit zusammenstellen</span>
          </button>
          <button class="action-card" onclick="app.navigateTo('exercises')">
            <span class="action-icon">📚</span>
            <span class="action-title">Übung suchen</span>
            <span class="action-desc">Übungen filtern</span>
          </button>
          <button class="action-card" onclick="app.navigateTo('drawer')">
            <span class="action-icon">🎨</span>
            <span class="action-title">Zeichner</span>
            <span class="action-desc">Taktikskizze erstellen</span>
          </button>
          <button class="action-card" onclick="app.navigateTo('exercise-form')">
            <span class="action-icon">➕</span>
            <span class="action-title">Neue Übung</span>
            <span class="action-desc">Eigene Übung anlegen</span>
          </button>
        </div>
      </section>

      <!-- View: Übungsdatenbank -->
      <section id="view-exercises" class="app-view">
        <div class="filter-panel">
          <div class="search-box">
            <input type="text" id="exercise-search" placeholder="Suche nach Titel, Ziel, Ablauf, Coaching..." class="form-input">
          </div>
          
          <div class="filters-grid">
            <div class="filter-group">
              <label for="filter-age">Altersklasse</label>
              <select id="filter-age" class="form-select">
                <option value="">Alle Altersklassen</option>
                <option value="U6_U7">U6 / U7 (Bambini)</option>
                <option value="U8_U9">U8 / U9 (F-Jugend)</option>
                <option value="U10_U11">U10 / U11 (E-Jugend)</option>
                <option value="U12_U13">U12 / U13 (D-Jugend)</option>
                <option value="U14_U15">U14 / U15 (C-Jugend)</option>
                <option value="U16_U19">U16 - U19 (A/B-Jugend)</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="filter-category">Kategorie</label>
              <select id="filter-category" class="form-select">
                <option value="">Alle Kategorien</option>
                <option value="Aufwärmen">Aufwärmen</option>
                <option value="Dribbling">Dribbling</option>
                <option value="Passspiel">Passspiel</option>
                <option value="Torschuss">Torschuss</option>
                <option value="1 gegen 1">1 gegen 1</option>
                <option value="Spielformen">Spielformen</option>
                <option value="Koordination">Koordination</option>
                <option value="Torwarttraining">Torwarttraining</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="filter-difficulty">Schwierigkeit</label>
              <select id="filter-difficulty" class="form-select">
                <option value="">Alle Stufen</option>
                <option value="Einfach">Einfach</option>
                <option value="Mittel">Mittel</option>
                <option value="Schwer">Schwer</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="filter-players">Spieleranzahl</label>
              <input type="number" id="filter-players" placeholder="z.B. 10" class="form-input">
            </div>
          </div>
          
          <div class="filter-actions" style="display: flex; justify-content: space-between; align-items: center;">
            <button class="btn btn-secondary" id="reset-filters-btn">Filter zurücksetzen</button>
            <span class="exercise-count" id="exercise-count-badge" style="color: var(--color-text-muted); font-size: 0.9rem;">0 Übungen gefunden</span>
          </div>
        </div>

        <div class="exercise-grid" id="exercise-list-container"></div>
      </section>

      <!-- View: Trainingsplaner -->
      <section id="view-planner" class="app-view">
        <div class="planner-layout">
          <div class="planner-main-column">
            <div class="panel">
              <h2>Trainings-Editor</h2>
              <div class="form-grid">
                <div class="form-group">
                  <label for="plan-title">Titel des Trainings</label>
                  <input type="text" id="plan-title" class="form-input" value="U9 Training: 1 gegen 1 & Dribbling">
                </div>
                <div class="form-group">
                  <label for="plan-date">Datum</label>
                  <div class="date-input-row">
                    <input type="date" id="plan-date" class="form-input">
                    <button type="button" class="btn btn-secondary date-picker-btn" id="plan-date-picker" aria-label="Kalender öffnen">📅</button>
                  </div>
                </div>
                <div class="form-group">
                  <label for="plan-age">Altersklasse</label>
                  <select id="plan-age" class="form-select">
                    <option value="U8_U9">U8 / U9 (F-Jugend)</option>
                    <option value="U10_U11">U10 / U11 (E-Jugend)</option>
                    <option value="U12_U13">U12 / U13 (D-Jugend)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="plan-focus">Hauptschwerpunkt</label>
                  <select id="plan-focus" class="form-select">
                    <option value="1 gegen 1">1 gegen 1</option>
                    <option value="Dribbling">Dribbling</option>
                    <option value="Passspiel">Passspiel</option>
                    <option value="Torschuss">Torschuss</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="plan-players">Anzahl Spieler</label>
                  <input type="number" id="plan-players" class="form-input" value="12">
                </div>
                <div class="form-group">
                  <label>Gesamtdauer</label>
                  <div class="duration-badge" id="plan-total-duration">0 Min.</div>
                </div>
              </div>
            </div>

            <div class="panel" style="margin-top: 20px;">
              <div class="panel-header-row">
                <h3>Enthaltene Übungen (STS-Struktur)</h3>
                <span style="font-size: 0.8rem; color: var(--color-text-muted);">Spielen – Trainieren – Spielen</span>
              </div>
              <div id="planner-selected-exercises" class="planner-exercises-list">
                <div class="empty-hint" style="color: var(--color-text-muted);">Noch keine Übungen hinzugefügt. Wähle rechts Übungen aus.</div>
              </div>
              <div class="planner-actions" style="margin-top: 16px; display: flex; gap: 10px;">
                <button class="btn" id="save-training-btn">💾 Training speichern</button>
                <button class="btn btn-secondary" id="reset-training-btn">Zurücksetzen</button>
              </div>
            </div>
          </div>

          <div class="planner-sidebar">
            <h3>Übungen hinzufügen</h3>
            <input type="text" id="planner-search" placeholder="Übung filtern..." class="form-input" style="margin-bottom: 12px;">
            <div id="planner-exercise-pool" class="planner-pool-list"></div>
          </div>
        </div>
      </section>

      <!-- View: Taktikzeichner -->
      <section id="view-drawer" class="app-view">
        <div class="drawer-layout">
          <div class="drawer-toolbar">
            <h3>Taktikzeichner</h3>
            <div class="tool-group">
              <label>Werkzeuge & Objekte</label>
              <button class="tool-btn active" data-tool="select">👆 Auswählen / Verschieben</button>
              <button class="tool-btn" data-tool="player-red">🔴 Spieler (Rot)</button>
              <button class="tool-btn" data-tool="player-blue">🔵 Spieler (Blau)</button>
              <button class="tool-btn" data-tool="keeper">🟡 Torhüter</button>
              <button class="tool-btn" data-tool="ball">⚽ Ball</button>
              <button class="tool-btn" data-tool="marker-cone">🟠 Hütchen</button>
              <button class="tool-btn" data-tool="cone">🔺 Pylone</button>
              <button class="tool-btn" data-tool="pole">🟧 Stange</button>
              <button class="tool-btn" data-tool="hurdle">▱ Hürde</button>
              <button class="tool-btn" data-tool="goal">🥅 Minitor</button>
              <button class="tool-btn" data-tool="youth-goal">🥅 Jugendtor</button>
            </div>
            <div class="tool-group">
              <label>Linien & Wege</label>
              <button class="tool-btn" data-tool="line-pass">➡️ Passweg (Gerade)</button>
              <button class="tool-btn" data-tool="line-run">〰️ Laufweg (Gestrichelt)</button>
            </div>
            <div class="tool-group">
              <label for="field-bg-select">Spielfeld-Hintergrund</label>
              <select id="field-bg-select" class="form-select">
                <option value="half">Halbes Spielfeld</option>
                <option value="full">Ganzes Spielfeld</option>
                <option value="grid">Freies Raster</option>
              </select>
            </div>
            <div class="tool-group">
              <label>Auswahl</label>
              <button class="btn btn-danger" id="drawer-delete-selected-btn" disabled>🗑️ Ausgewähltes Objekt löschen</button>
            </div>
            <div class="tool-group" style="margin-top: auto;">
              <button class="btn btn-secondary" id="drawer-clear-btn" style="background: #d62828; margin-bottom: 8px;">🗑️ Alles löschen</button>
              <button class="btn" id="drawer-save-btn">💾 Als Bild speichern</button>
            </div>
          </div>
          <div class="drawer-canvas-container">
            <canvas id="tactic-canvas" width="800" height="600"></canvas>
          </div>
        </div>
      </section>

      <!-- View: Gespeicherte Trainings -->
      <section id="view-history" class="app-view">
        <div class="history-header" style="margin-bottom: 20px;">
          <h2>Gespeicherte Trainingseinheiten</h2>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">Übersicht aller erstellten Einheiten.</p>
        </div>
        <div class="history-grid" id="history-list-container"></div>
      </section>

      <!-- View: Favoriten -->
      <section id="view-favorites" class="app-view">
        <h2>Favorisierte Übungen</h2>
        <div class="exercise-grid" id="favorites-list-container" style="margin-top: 20px;"></div>
      </section>

      <!-- View: Neue Übung -->
      <section id="view-exercise-form" class="app-view">
        <div class="panel" style="max-width: 900px; margin: 0 auto;">
          <h2>Neue Übung anlegen</h2>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 20px;">Erfasse eine neue Übung nach dem standardisierten SCK-Modell.</p>
          
          <form id="new-exercise-form">
            <div class="form-grid" style="margin-bottom: 16px;">
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-title">Titel der Übung *</label>
                <input type="text" id="form-title" class="form-input" required placeholder="z. B. Passkombination mit Abschluss">
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-shortDesc">Kurzbeschreibung *</label>
                <textarea id="form-shortDesc" class="form-input" rows="2" required placeholder="Kurzer Satz zur Lernwirkung..."></textarea>
              </div>
              <div class="form-group">
                <label for="form-duration">Dauer (Minuten)</label>
                <input type="number" id="form-duration" class="form-input" value="15" min="1" max="90">
              </div>
              <div class="form-group">
                <label for="form-difficulty">Schwierigkeit</label>
                <select id="form-difficulty" class="form-select">
                  <option value="Einfach">Einfach</option>
                  <option value="Mittel" selected>Mittel</option>
                  <option value="Schwer">Schwer</option>
                </select>
              </div>
              <div class="form-group">
                <label for="form-intensity">Intensität</label>
                <select id="form-intensity" class="form-select">
                  <option value="Gering">Gering</option>
                  <option value="Mittel" selected>Mittel</option>
                  <option value="Hoch">Hoch</option>
                </select>
              </div>
              <div class="form-group">
                <label for="form-players-min">Min. Spieler</label>
                <input type="number" id="form-players-min" class="form-input" value="4" min="1">
              </div>
              <div class="form-group">
                <label for="form-players-max">Max. Spieler</label>
                <input type="number" id="form-players-max" class="form-input" value="12" min="1">
              </div>
              <div class="form-group">
                <label for="form-field">Feldgröße</label>
                <input type="text" id="form-field" class="form-input" placeholder="z. B. 20x20 Meter">
              </div>
            </div>

            <div class="form-grid" style="margin-bottom: 16px; border-top: 1px solid var(--color-border); padding-top: 16px;">
              <div class="form-group">
                <label>Altersklassen</label>
                <div class="checkbox-group" id="form-age-groups">
                  <label><input type="checkbox" value="U6_U7" checked> U6/U7</label>
                  <label><input type="checkbox" value="U8_U9" checked> U8/U9</label>
                  <label><input type="checkbox" value="U10_U11" checked> U10/U11</label>
                  <label><input type="checkbox" value="U12_U13" checked> U12/U13</label>
                  <label><input type="checkbox" value="U14_U15"> U14/U15</label>
                  <label><input type="checkbox" value="U16_U19"> U16-U19</label>
                </div>
              </div>
              <div class="form-group">
                <label>Kategorien</label>
                <div class="checkbox-group" id="form-categories">
                  <label><input type="checkbox" value="Aufwärmen"> Aufwärmen</label>
                  <label><input type="checkbox" value="Dribbling"> Dribbling</label>
                  <label><input type="checkbox" value="Passspiel" checked> Passspiel</label>
                  <label><input type="checkbox" value="Torschuss"> Torschuss</label>
                  <label><input type="checkbox" value="1 gegen 1"> 1 gegen 1</label>
                  <label><input type="checkbox" value="Spielformen"> Spielformen</label>
                  <label><input type="checkbox" value="Koordination"> Koordination</label>
                  <label><input type="checkbox" value="Torwarttraining"> Torwarttraining</label>
                </div>
              </div>
            </div>

            <div class="form-grid" style="margin-bottom: 20px; border-top: 1px solid var(--color-border); padding-top: 16px;">
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-materials">Benötigtes Material (kommagetrennt)</label>
                <input type="text" id="form-materials" class="form-input" placeholder="z. B. 8 Hütchen, 10 Bälle">
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-setup">Aufbau & Organisation</label>
                <textarea id="form-setup" class="form-input" rows="3" placeholder="Spielfeldaufbau..."></textarea>
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-instructions">Ablauf (Schritte)</label>
                <textarea id="form-instructions" class="form-input" rows="4" placeholder="1. Pass zum Mitspieler&#10;2. Nachlaufen..."></textarea>
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label for="form-coaching">Coachingpunkte</label>
                <textarea id="form-coaching" class="form-input" rows="3" placeholder="- Saubere Ballmitnahme"></textarea>
              </div>
            </div>

            <div class="form-group attachment-upload" style="margin-bottom: 20px; border-top: 1px solid var(--color-border); padding-top: 16px;">
              <label for="form-attachments">Dateien zur Übung</label>
              <input type="file" id="form-attachments" class="form-input" multiple accept="image/*,.pdf,application/pdf">
              <p class="form-help">Screenshots, Bilder und PDF-Dateien. Maximal 2 MB je Datei und 4 MB insgesamt.</p>
              <div id="form-attachment-preview" class="attachment-preview"></div>
            </div>
            <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end;">
              <button type="button" class="btn btn-secondary" onclick="app.navigateTo('exercises')">Abbrechen</button>
              <button type="submit" class="btn">💾 Übung speichern</button>
            </div>
          </form>
        </div>
      </section>

      <!-- View: Einstellungen -->
      <section id="view-settings" class="app-view">
        <div class="panel" style="max-width: 600px;">
          <h2>Einstellungen & Daten</h2>
          <p style="color: var(--color-text-muted); margin-bottom: 20px;">Sichere deine Übungen und Trainings als Backup.</p>
          <button class="btn" onclick="alert('Export-Funktion aktiv (LocalStorage)')">📥 Daten als JSON exportieren</button>
        </div>
      </section>

    </div>
  </main>

  <!-- Mobile Bottom Navigation -->
  <nav class="bottom-nav">
    <button class="bottom-nav-btn active" data-view="dashboard">
      <span class="icon">📊</span>
      <span class="label">Home</span>
    </button>
    <button class="bottom-nav-btn" data-view="exercises">
      <span class="icon">📚</span>
      <span class="label">Übungen</span>
    </button>
    <button class="bottom-nav-btn" data-view="planner">
      <span class="icon">📋</span>
      <span class="label">Planer</span>
    </button>
    <button class="bottom-nav-btn" data-view="drawer">
      <span class="icon">🎨</span>
      <span class="label">Zeichnen</span>
    </button>
    <button class="bottom-nav-btn" data-view="favorites">
      <span class="icon">⭐</span>
      <span class="label">Favoriten</span>
    </button>
  </nav>

  <!-- Trainings-Detail Modal -->
  <div id="training-detail-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="training-modal-title">Training</h2>
        <button class="btn-close" id="training-modal-close">&times;</button>
      </div>
      <div class="modal-body" id="training-modal-body"></div>
    </div>
  </div>
  <!-- Übungs-Detail Modal -->
  <div id="exercise-detail-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Übungstitel</h2>
        <button class="btn-close" onclick="exerciseDetailModal.close()">&times;</button>
      </div>
      <div class="modal-body" id="modal-body-content"></div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="modal-btn-favorite">⭐ Favorit</button>
        <button class="btn btn-secondary" id="modal-btn-copy">📋 Kopieren</button>
        <button class="btn btn-secondary" id="modal-btn-print">🖨️ Drucken</button>
        <button class="btn btn-danger" id="modal-btn-delete">🗑️ Löschen</button>
      </div>
    </div>
  </div>

  <!-- JavaScript Modules -->
  <script src="js/data/initialExercises.js"></script>
  <script src="js/store.js"></script>
  <script src="js/modules/exerciseDb.js"></script>
  <script src="js/modules/exerciseDetail.js"></script>
  <script src="js/modules/drawer.js"></script>
  <script src="js/modules/planner.js"></script>
  <script src="js/modules/dashboard.js"></script>
  <script src="js/modules/history.js"></script>
  <script src="js/modules/exerciseForm.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
