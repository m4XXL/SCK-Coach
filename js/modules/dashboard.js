class SckDashboard {
  constructor() {
    this.weekStart = this.startOfWeek(new Date());
    this.grid = document.getElementById('dashboard-calendar-grid');
    this.title = document.getElementById('calendar-title');
    this.modal = document.getElementById('training-detail-modal');
    this.modalTitle = document.getElementById('training-modal-title');
    this.modalBody = document.getElementById('training-modal-body');
    document.getElementById('calendar-prev')?.addEventListener('click', () => this.changeWeek(-1));
    document.getElementById('calendar-next')?.addEventListener('click', () => this.changeWeek(1));
    document.getElementById('training-modal-close')?.addEventListener('click', () => this.close());
    this.modal?.addEventListener('click', e => { if (e.target === this.modal) this.close(); });
    this.render();
  }
  startOfWeek(value) { const d=new Date(value); const day=(d.getDay()+6)%7; d.setHours(0,0,0,0); d.setDate(d.getDate()-day); return d; }
  getPlans() { try { return JSON.parse(localStorage.getItem('sck_plans_v1') || '[]'); } catch { return []; } }
  changeWeek(delta) { this.weekStart.setDate(this.weekStart.getDate() + delta*7); this.render(); }
  dateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  isoWeek(d) { const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())); x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7)); const y=new Date(Date.UTC(x.getUTCFullYear(),0,1)); return Math.ceil((((x-y)/86400000)+1)/7); }
  render() {
    if (!this.grid || !this.title) return;
    const end=new Date(this.weekStart); end.setDate(end.getDate()+6);
    const fmt=new Intl.DateTimeFormat('de-AT',{day:'2-digit',month:'2-digit',year:'numeric'});
    this.title.textContent=`KW ${this.isoWeek(this.weekStart)} · ${fmt.format(this.weekStart)} – ${fmt.format(end)}`;
    const plans=this.getPlans(), today=this.dateKey(new Date()), names=['Mo','Di','Mi','Do','Fr','Sa','So'];
    this.grid.innerHTML=names.map((name,i)=>{
      const d=new Date(this.weekStart); d.setDate(d.getDate()+i); const key=this.dateKey(d);
      const dayPlans=plans.map((p,index)=>({p,index})).filter(x=>x.p.date===key);
      const events=dayPlans.map(x=>`<button class="calendar-event" onclick="sckDashboard.openPlan(${x.index})" title="${this.escape(x.p.title)}">${this.escape(x.p.title)}</button>`).join('');
      return `<div class="calendar-day${key===today?' is-today':''}${dayPlans.length?' has-training':''}"><div class="calendar-day-header"><span class="calendar-day-name">${name}</span><span class="calendar-day-number">${d.getDate()}.${d.getMonth()+1}.</span></div>${events}</div>`;
    }).join('');
  }
  openPlan(index) { const plan=this.getPlans()[index]; if(!plan)return; this.modalTitle.textContent=plan.title||'Training'; const exercises=(plan.exercises||[]).map(item=>{const id=item.exerciseId;return `<button class="training-exercise-link" ${id?`onclick="sckDashboard.openExercise('${id}')"`:''}><strong>${this.escape(item.title)}</strong><span>${Number(item.duration)||0} Min.</span></button>`;}).join('')||'<p>Keine Übungen hinterlegt.</p>'; this.modalBody.innerHTML=`<div class="detail-grid"><div class="detail-item"><span>Datum</span><strong>${this.formatDate(plan.date)}</strong></div><div class="detail-item"><span>Dauer</span><strong>${plan.calculatedDurationMinutes||0} Min.</strong></div><div class="detail-item"><span>Altersklasse</span><strong>${this.escape(plan.ageGroup||'–')}</strong></div><div class="detail-item"><span>Spieler</span><strong>${plan.playerCount||'–'}</strong></div></div><h3>Übungen</h3><div class="training-exercise-list">${exercises}</div>`; this.modal.classList.add('active'); }
  openExercise(id){this.close();if(window.exerciseDetailModal)exerciseDetailModal.open(id)} close(){this.modal?.classList.remove('active')} formatDate(v){if(!v)return'–';const[y,m,d]=v.split('-');return`${d}.${m}.${y}`} escape(v){const d=document.createElement('div');d.textContent=v||'';return d.innerHTML}
}
document.addEventListener('DOMContentLoaded',()=>{window.sckDashboard=new SckDashboard();});
