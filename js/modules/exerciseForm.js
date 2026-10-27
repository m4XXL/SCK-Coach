class SckExerciseForm {
  constructor() {
    this.form = document.getElementById('new-exercise-form');
    this.fileInput = document.getElementById('form-attachments');
    this.preview = document.getElementById('form-attachment-preview');
    this.attachments = [];
    this.fileInput?.addEventListener('change', e => this.readFiles(e.target.files));
    this.form?.addEventListener('submit', e => { e.preventDefault(); this.save(); });
  }
  async readFiles(fileList) {
    const files = Array.from(fileList || []);
    const allowed = files.filter(file => file.type.startsWith('image/') || file.type === 'application/pdf');
    if (allowed.length !== files.length) alert('Es werden nur Bilder und PDF-Dateien unterstützt.');
    if (allowed.some(file => file.size > 2 * 1024 * 1024)) { alert('Eine Datei ist größer als 2 MB.'); this.fileInput.value=''; return; }
    if (allowed.reduce((sum,file)=>sum+file.size,0) > 4 * 1024 * 1024) { alert('Die ausgewählten Dateien sind zusammen größer als 4 MB.'); this.fileInput.value=''; return; }
    this.attachments = await Promise.all(allowed.map(file => this.toAttachment(file)));
    this.renderPreview();
  }
  toAttachment(file) {
    return new Promise((resolve,reject)=>{ const reader=new FileReader(); reader.onload=()=>resolve({name:file.name,type:file.type,size:file.size,dataUrl:reader.result}); reader.onerror=reject; reader.readAsDataURL(file); });
  }
  renderPreview() {
    if (!this.preview) return;
    this.preview.innerHTML=this.attachments.map((file,index)=>`<div class="attachment-chip"><span>${file.type.startsWith('image/')?'🖼️':'📄'} ${this.escape(file.name)}</span><button type="button" aria-label="Datei entfernen" onclick="sckExerciseForm.removeAttachment(${index})">×</button></div>`).join('');
  }
  removeAttachment(index){ this.attachments.splice(index,1); this.renderPreview(); }
  save() {
    const value=id=>document.getElementById(id)?.value.trim()||'';
    const title=value('form-title'), shortDescription=value('form-shortDesc');
    const playersMin=parseInt(value('form-players-min'))||1, playersMax=parseInt(value('form-players-max'))||playersMin;
    if(playersMax<playersMin){alert('Maximale Spielerzahl darf nicht kleiner als die minimale Spielerzahl sein.');return;}
    const newEx={
      id:'ex_sck_'+Date.now(), title, shortDescription, image:'',
      ageGroups:Array.from(document.querySelectorAll('#form-age-groups input:checked')).map(cb=>cb.value),
      categories:Array.from(document.querySelectorAll('#form-categories input:checked')).map(cb=>cb.value),
      trainingObjectives:Array.from(document.querySelectorAll('#form-categories input:checked')).map(cb=>cb.value),
      playersMin, playersMax, durationMinutes:parseInt(value('form-duration'))||15,
      difficulty:value('form-difficulty'), intensity:value('form-intensity'),
      materials:value('form-materials').split(',').map(x=>x.trim()).filter(Boolean), fieldSize:value('form-field'), setup:value('form-setup'),
      instructions:value('form-instructions').split('\n').map(x=>x.trim()).filter(Boolean), coachingPoints:value('form-coaching').split('\n').map(x=>x.trim()).filter(Boolean),
      variations:[], simplifications:[], progressions:[], safetyNotes:[], attachments:this.attachments,
      source:'Manuell', isFavorite:false, createdAt:new Date().toISOString()
    };
    const exercises=store.getExercises(); exercises.unshift(newEx);
    try { store.saveExercises(exercises); } catch(e) { alert('Die Dateien sind zu groß für den lokalen Browserspeicher. Bitte weniger oder kleinere Dateien auswählen.'); return; }
    alert('Übung erfolgreich gespeichert!'); this.form.reset(); this.attachments=[]; this.renderPreview(); app.navigateTo('exercises');
  }
  escape(value){const div=document.createElement('div');div.textContent=value||'';return div.innerHTML;}
}
document.addEventListener('DOMContentLoaded',()=>{window.sckExerciseForm=new SckExerciseForm();});
