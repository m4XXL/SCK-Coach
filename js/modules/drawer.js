class SckDrawer {
  constructor(){
    this.canvas=document.getElementById('tactic-canvas'); if(!this.canvas)return;
    this.ctx=this.canvas.getContext('2d'); this.currentTool='select'; this.fieldBg='half';
    this.elements=[]; this.selectedElement=null; this.isDragging=false; this.bindEvents(); this.draw();
  }
  bindEvents(){
    document.querySelectorAll('.tool-btn').forEach(btn=>btn.addEventListener('click',e=>{
      document.querySelectorAll('.tool-btn').forEach(b=>b.classList.remove('active'));
      e.currentTarget.classList.add('active'); this.currentTool=e.currentTarget.dataset.tool;
    }));
    document.getElementById('field-bg-select')?.addEventListener('change',e=>{this.fieldBg=e.target.value;this.draw();});
    document.getElementById('drawer-delete-selected-btn')?.addEventListener('click',()=>this.deleteSelected());
    document.getElementById('drawer-clear-btn')?.addEventListener('click',()=>{if(confirm('Alles löschen?')){this.elements=[];this.select(null);this.draw();}});
    document.getElementById('drawer-save-btn')?.addEventListener('click',()=>{const a=document.createElement('a');a.download=`sck-taktik-${Date.now()}.png`;a.href=this.canvas.toDataURL('image/png');a.click();});
    this.canvas.addEventListener('pointerdown',e=>{this.canvas.setPointerCapture(e.pointerId);this.handlePointerDown(this.getPos(e));});
    this.canvas.addEventListener('pointermove',e=>this.handlePointerMove(this.getPos(e)));
    this.canvas.addEventListener('pointerup',()=>this.isDragging=false);
    window.addEventListener('keydown',e=>{if((e.key==='Delete'||e.key==='Backspace')&&this.selectedElement){e.preventDefault();this.deleteSelected();}});
  }
  getPos(e){const r=this.canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*(this.canvas.width/r.width),y:(e.clientY-r.top)*(this.canvas.height/r.height)};}
  select(el){this.selectedElement=el;const b=document.getElementById('drawer-delete-selected-btn');if(b)b.disabled=!el;}
  handlePointerDown(pos){
    if(this.currentTool==='select'){
      const found=[...this.elements].reverse().find(el=>this.hit(el,pos)); this.select(found||null); this.isDragging=!!found; this.draw(); return;
    }
    this.elements.push({id:'el_'+Date.now()+Math.random(),type:this.currentTool,x:pos.x,y:pos.y}); this.draw();
  }
  handlePointerMove(pos){if(this.isDragging&&this.selectedElement){this.selectedElement.x=pos.x;this.selectedElement.y=pos.y;this.draw();}}
  hit(el,p){const sizes={'youth-goal':42,'goal':28,'pole':22,'hurdle':30,'marker-cone':18,'cone':22};return Math.hypot(el.x-p.x,el.y-p.y)<(sizes[el.type]||25);}
  deleteSelected(){if(!this.selectedElement)return;this.elements=this.elements.filter(el=>el!==this.selectedElement);this.select(null);this.draw();}
  draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.drawField();this.elements.forEach(el=>this.drawElement(el));}
  drawElement(el){
    const c=this.ctx;c.save();c.translate(el.x,el.y);
    if(el.type.includes('player')||el.type==='keeper'){c.beginPath();c.arc(0,0,16,0,Math.PI*2);c.fillStyle=el.type==='player-red'?'#e63946':el.type==='player-blue'?'#3a86ff':'#e9c46a';c.fill();c.strokeStyle='#fff';c.stroke();}
    else if(el.type==='ball'){c.beginPath();c.arc(0,0,10,0,Math.PI*2);c.fillStyle='#fff';c.fill();c.strokeStyle='#111';c.stroke();}
    else if(el.type==='marker-cone'){c.fillStyle='#ff9f1c';c.beginPath();c.ellipse(0,3,14,7,0,0,Math.PI*2);c.fill();c.strokeStyle='#fff';c.lineWidth=1;c.stroke();c.fillStyle='#d97706';c.beginPath();c.ellipse(0,1,5,2.5,0,0,Math.PI*2);c.fill();}
    else if(el.type==='cone'){c.beginPath();c.moveTo(0,-18);c.lineTo(-12,12);c.lineTo(12,12);c.closePath();c.fillStyle='#f77f00';c.fill();c.strokeStyle='#fff';c.lineWidth=1;c.stroke();c.fillStyle='#fff';c.fillRect(-8,1,16,4);}
    else if(el.type==='pole'){c.fillStyle='#ff9f1c';c.fillRect(-4,-25,8,50);c.fillStyle='#fff';c.fillRect(-8,23,16,4);}
    else if(el.type==='hurdle'){c.strokeStyle='#ff9f1c';c.lineWidth=6;c.beginPath();c.moveTo(-18,16);c.lineTo(-18,-8);c.lineTo(18,-8);c.lineTo(18,16);c.stroke();}
    else if(el.type==='goal'||el.type==='youth-goal'){const w=el.type==='youth-goal'?66:42,h=el.type==='youth-goal'?30:20;c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(-w/2,-h/2,w,h);c.lineWidth=1;for(let x=-w/2+8;x<w/2;x+=8){c.beginPath();c.moveTo(x,-h/2);c.lineTo(x,h/2);c.stroke();}}
    if(el===this.selectedElement){c.strokeStyle='#ffd166';c.lineWidth=2;c.setLineDash([5,4]);c.strokeRect(-30,-30,60,60);}
    c.restore();
  }
  drawField(){
    const c=this.ctx,w=this.canvas.width,h=this.canvas.height,m=40,L=w-2*m,H=h-2*m;
    c.fillStyle=this.fieldBg==='grid'?'#214f45':'#1b6b45';c.fillRect(0,0,w,h);c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=3;c.setLineDash([]);
    if(this.fieldBg==='grid'){c.lineWidth=1;c.strokeStyle='rgba(255,255,255,.18)';for(let x=40;x<w;x+=40){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=40;y<h;y+=40){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}return;}
    c.strokeRect(m,m,L,H);
    const penaltyW=250,penaltyD=100,goalW=110,goalD=36,sixW=135,sixD=45,r=62;
    if(this.fieldBg==='full'){
      c.beginPath();c.moveTo(w/2,m);c.lineTo(w/2,h-m);c.stroke();
      c.beginPath();c.arc(w/2,h/2,r,0,Math.PI*2);c.stroke();c.beginPath();c.arc(w/2,h/2,4,0,Math.PI*2);c.fillStyle='#fff';c.fill();
      this.drawSidePenalty(m,h/2,penaltyD,penaltyW,sixD,sixW,goalD,goalW,false);
      this.drawSidePenalty(w-m,h/2,penaltyD,penaltyW,sixD,sixW,goalD,goalW,true);
    }else{
      const lineY=h-m, penaltyDepth=125;
      this.drawPenalty(w/2,lineY,penaltyW,penaltyDepth,sixW,55,goalW,goalD,true);
      this.drawBottomPenaltyArc(w/2,lineY,penaltyDepth,72,r);
    }
  }
  drawSidePenalty(lineX,cy,pd,pw,sd,sw,gd,gw,right){
    const c=this.ctx,dir=right?-1:1;
    c.strokeRect(right?lineX-pd:lineX,cy-pw/2,pd,pw);
    c.strokeRect(right?lineX-sd:lineX,cy-sw/2,sd,sw);
    c.strokeRect(right?lineX:lineX-gd,cy-gw/2,gd,gw);
    const spotX=lineX+dir*72;c.beginPath();c.arc(spotX,cy,3,0,Math.PI*2);c.fillStyle='#fff';c.fill();
    const boxEdge=right?lineX-pd:lineX+pd;
    c.save();c.beginPath();
    if(right)c.rect(0,0,boxEdge,this.canvas.height);else c.rect(boxEdge,0,this.canvas.width-boxEdge,this.canvas.height);
    c.clip();c.beginPath();c.arc(spotX,cy,62,0,Math.PI*2);c.stroke();c.restore();
  }
  drawBottomPenaltyArc(cx,lineY,penaltyDepth,spotDistance,radius){
    const c=this.ctx,spotY=lineY-spotDistance,boxTop=lineY-penaltyDepth;
    c.save();c.beginPath();c.rect(0,0,this.canvas.width,boxTop);c.clip();
    c.beginPath();c.arc(cx,spotY,radius,0,Math.PI*2);c.stroke();c.restore();
  }
  drawPenalty(cx,lineY,pw,pd,sw,sd,gw,gd,bottom){
    const c=this.ctx,dir=bottom?-1:1;
    c.strokeRect(cx-pw/2,bottom?lineY-pd:lineY,pw,pd);
    c.strokeRect(cx-sw/2,bottom?lineY-sd:lineY,sw,sd);
    c.strokeRect(cx-gw/2,bottom?lineY:lineY-gd,gw,gd);
    const spotY=lineY+dir*72;c.beginPath();c.arc(cx,spotY,3,0,Math.PI*2);c.fillStyle='#fff';c.fill();
  }
}
document.addEventListener('DOMContentLoaded',()=>{window.sckDrawer=new SckDrawer();});
