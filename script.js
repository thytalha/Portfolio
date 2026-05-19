  // ── CURSOR ──
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
  (function animRing(){
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.project-card,.stat-card,.skill-category,.cert-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.style.width='20px'; cur.style.height='20px'; ring.style.width='54px'; ring.style.height='54px'; });
    el.addEventListener('mouseleave',()=>{ cur.style.width='12px'; cur.style.height='12px'; ring.style.width='36px'; ring.style.height='36px'; });
  });

  // ── STARFIELD ──
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars=[], W, H;
  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  resize(); window.addEventListener('resize',resize);
  for(let i=0;i<180;i++) stars.push({ x:Math.random()*9999, y:Math.random()*9999, r:Math.random()*1.2+0.2, a:Math.random(), s:Math.random()*0.003+0.001 });
  function drawStars(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{
      s.a += s.s; if(s.a>1||s.a<0) s.s*=-1;
      ctx.beginPath(); ctx.arc(s.x%W,s.y%H,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,230,255,${s.a*0.7})`; ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // ── TYPING ──
  const roles = ['C++ Developer', 'Web Developer', 'Software Engineer', 'Problem Solver', 'Game Developer'];
  let ri=0, ci=0, del=false, txt='';
  function type(){
    const target=roles[ri];
    if(!del){ txt=target.slice(0,++ci); }
    else { txt=target.slice(0,--ci); }
    document.getElementById('typed-text').textContent=txt;
    if(!del && ci===target.length){ setTimeout(()=>del=true,1800); setTimeout(type,100); return; }
    if(del && ci===0){ del=false; ri=(ri+1)%roles.length; }
    setTimeout(type, del?60:90);
  }
  setTimeout(type,1200);

  // ── NAVBAR SCROLL ──
  window.addEventListener('scroll',()=>{
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY>60);
  });

  // ── SCROLL REVEAL ──
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{ threshold:0.12 });
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // ── PROJECT CARD GLOW ──
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // ── STAGGER REVEAL ──
  document.querySelectorAll('.projects-grid .project-card, .skills-grid .skill-category, .certs-list .cert-item, .about-stats .stat-card').forEach((el,i)=>{
    el.style.transitionDelay = (i*0.08)+'s';
  });
