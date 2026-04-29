/* =========================================
   SOTTOSOPRA · JS HOMEPAGE
   Hero animation + calendar
   ========================================= */

(function() {
  // ============ ROOT ANIMATION ============
  const heroStage = document.getElementById('hero');
  if (!heroStage) return;

  const layerSotto = document.getElementById('layer-sotto');
  const horizon = document.getElementById('horizon');
  const titleStrip = document.getElementById('title-strip');
  const tagline = document.getElementById('tagline');
  const plantGroup = document.getElementById('plant-group');
  const plantBreathe = document.getElementById('plant-breathe');
  const fruit1 = document.getElementById('fruit1');
  const fruit2 = document.getElementById('fruit2');
  const progressBar = document.getElementById('progress-bar');
  const scrollHint = document.getElementById('scroll-hint');
  const resetBtn = document.getElementById('reset-btn');
  const continueArrow = document.getElementById('continue-arrow');
  const arrowBounceEl = document.getElementById('arrow-bounce');

  const rootStages = [
    { el: document.getElementById('taproot'), start: 0,   end: 70 },
    { el: document.getElementById('root-l1'), start: 8,   end: 28 },
    { el: document.getElementById('root-r1'), start: 12,  end: 32 },
    { el: document.getElementById('root-l2'), start: 25,  end: 50 },
    { el: document.getElementById('root-r2'), start: 28,  end: 53 },
    { el: document.getElementById('root-l3'), start: 45,  end: 70 },
    { el: document.getElementById('root-r3'), start: 48,  end: 73 },
    { el: document.getElementById('hair-l1'), start: 30,  end: 45 },
    { el: document.getElementById('hair-r1'), start: 32,  end: 47 },
    { el: document.getElementById('hair-l2'), start: 55,  end: 70 },
    { el: document.getElementById('hair-r2'), start: 58,  end: 72 },
    { el: document.getElementById('hair-c1'), start: 22,  end: 38 },
    { el: document.getElementById('hair-c2'), start: 65,  end: 80 },
  ];
  const dots = [
    { el: document.getElementById('dot1'), at: 38 },
    { el: document.getElementById('dot2'), at: 42 },
    { el: document.getElementById('dot3'), at: 58 },
    { el: document.getElementById('dot4'), at: 60 },
    { el: document.getElementById('dot5'), at: 75 },
    { el: document.getElementById('dot6'), at: 78 },
  ];
  const infos = [
    { el: document.getElementById('info-1'), at: 28 },
    { el: document.getElementById('info-2'), at: 50 },
    { el: document.getElementById('info-3'), at: 72 },
  ];

  function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
  function progress(p, start, end) {
    if (p < start) return 0;
    if (p > end) return 1;
    return (p - start) / (end - start);
  }
  function updateRoots(p) {
    progressBar.style.width = p + '%';
    plantGroup.setAttribute('opacity', progress(p, 0, 15));
    fruit1.setAttribute('opacity', progress(p, 8, 15));
    fruit2.setAttribute('opacity', progress(p, 10, 15));
    const sottoHeight = lerp(50, 88, progress(p, 10, 90));
    layerSotto.style.height = sottoHeight + '%';
    horizon.style.top = (100 - sottoHeight) + '%';
    titleStrip.style.top = (100 - sottoHeight) + '%';
    titleStrip.style.opacity = lerp(1, 0.15, progress(p, 60, 95));
    tagline.style.opacity = lerp(1, 0, progress(p, 5, 25));
    rootStages.forEach(r => {
      r.el.setAttribute('stroke-dashoffset', 100 - progress(p, r.start, r.end) * 100);
    });
    dots.forEach(d => d.el.setAttribute('opacity', progress(p, d.at, d.at + 6)));
    infos.forEach(i => i.el.style.opacity = lerp(0, 1, progress(p, i.at, i.at + 8)));
  }

  let p = 0, target = 0, rafId = null, hintShown = true, arrowVisible = false, breatheTriggered = false;

  function smoothLoop() {
    const diff = target - p;
    if (Math.abs(diff) < 0.05) {
      p = target;
      updateRoots(p);
      checkArrow();
      checkBreathe();
      rafId = null;
      return;
    }
    p += diff * 0.18;
    updateRoots(p);
    checkArrow();
    checkBreathe();
    rafId = requestAnimationFrame(smoothLoop);
  }
  function checkArrow() {
    const shouldShow = p > 95;
    if (shouldShow && !arrowVisible) {
      continueArrow.style.opacity = '1';
      arrowBounceEl.classList.add('bouncing');
      arrowVisible = true;
    } else if (!shouldShow && arrowVisible) {
      continueArrow.style.opacity = '0';
      arrowBounceEl.classList.remove('bouncing');
      arrowVisible = false;
    }
  }
  function checkBreathe() {
    if (p < 1.5 && target < 1.5 && !breatheTriggered) {
      breatheTriggered = true;
      plantBreathe.classList.remove('breathe');
      void plantBreathe.offsetWidth;
      plantBreathe.classList.add('breathe');
    }
    if (p > 5) breatheTriggered = false;
  }
  function setTarget(newT) {
    target = Math.max(0, Math.min(100, newT));
    if (hintShown && target > 5) {
      scrollHint.style.transition = 'opacity 0.4s';
      scrollHint.style.opacity = '0';
      hintShown = false;
    } else if (!hintShown && target < 2) {
      scrollHint.style.opacity = '0.6';
      hintShown = true;
    }
    if (!rafId) rafId = requestAnimationFrame(smoothLoop);
  }

  heroStage.addEventListener('wheel', (e) => {
    const goingDown = e.deltaY > 0;
    const goingUp = e.deltaY < 0;
    if ((goingDown && target < 100) || (goingUp && target > 0)) {
      setTarget(target + e.deltaY * 0.18);
      e.preventDefault();
    }
  }, { passive: false });

  let dragging = false, lastY = 0;
  heroStage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button')) return;
    dragging = true; lastY = e.clientY;
    try { heroStage.setPointerCapture(e.pointerId); } catch(_) {}
  });
  heroStage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    setTarget(target + (lastY - e.clientY) * 0.55);
    lastY = e.clientY;
  });
  heroStage.addEventListener('pointerup', () => { dragging = false; });
  heroStage.addEventListener('pointercancel', () => { dragging = false; });

  resetBtn.addEventListener('click', (e) => { e.stopPropagation(); setTarget(0); });
  updateRoots(0);

  // ============ CIRCULAR CALENDAR ============
  const months = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  const monthsFull = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  const products = [
    { name: 'Pomodori antichi', color: '#d4533a', start: 5, end: 8 },
    { name: 'Zucchine e fiori', color: '#d4533a', start: 4, end: 8 },
    { name: 'Insalate miste', color: '#d4533a', start: 2, end: 10 },
    { name: 'Cavoli e crucifere', color: '#d4533a', start: 9, end: 2 },
    { name: 'Topinambur', color: '#c4a878', start: 9, end: 1 },
    { name: 'Carote viola', color: '#c4a878', start: 8, end: 11 },
    { name: 'Rapa rossa', color: '#c4a878', start: 6, end: 11 },
    { name: 'Timo serpillo', color: '#6a8a3a', start: 4, end: 9 },
    { name: 'Achillea', color: '#6a8a3a', start: 5, end: 8 },
    { name: 'Melissa e salvia', color: '#6a8a3a', start: 3, end: 10 },
    { name: 'Fragoline alpine', color: '#7a2a3a', start: 5, end: 7 },
    { name: 'Lamponi', color: '#7a2a3a', start: 5, end: 8 },
    { name: 'More', color: '#7a2a3a', start: 6, end: 8 },
    { name: 'Ribes e mirtilli', color: '#7a2a3a', start: 5, end: 7 },
  ];
  const monthMarks = document.getElementById('month-marks');
  const productArcs = document.getElementById('product-arcs');
  const monthPointer = document.getElementById('month-pointer');
  const monthName = document.getElementById('month-name');
  const monthProducts = document.getElementById('month-products');
  if (!monthMarks) return;
  const cx = 200, cy = 200;
  const NS = 'http://www.w3.org/2000/svg';
  function angleForMonth(m) { return -90 + m * 30; }
  function pointAt(angleDeg, radius) {
    const a = angleDeg * Math.PI / 180;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  }
  for (let m = 0; m < 12; m++) {
    const a = angleForMonth(m) + 15;
    const labelP = pointAt(a, 195);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', labelP.x); t.setAttribute('y', labelP.y + 3);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-family', 'JetBrains Mono, monospace');
    t.setAttribute('font-size', '10');
    t.setAttribute('fill', '#1a1410');
    t.setAttribute('letter-spacing', '1');
    t.textContent = months[m].toUpperCase();
    monthMarks.appendChild(t);
    const da = angleForMonth(m);
    const p1 = pointAt(da, 60), p2 = pointAt(da, 180);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', p1.x); line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x); line.setAttribute('y2', p2.y);
    line.setAttribute('stroke', '#1a1410'); line.setAttribute('stroke-width', '0.3');
    line.setAttribute('opacity', '0.4');
    monthMarks.appendChild(line);
    const segStart = pointAt(angleForMonth(m), 60);
    const segEnd1 = pointAt(angleForMonth(m), 180);
    const segEnd2 = pointAt(angleForMonth(m+1), 180);
    const segStart2 = pointAt(angleForMonth(m+1), 60);
    const seg = document.createElementNS(NS, 'path');
    seg.setAttribute('d', `M ${segStart.x} ${segStart.y} L ${segEnd1.x} ${segEnd1.y} A 180 180 0 0 1 ${segEnd2.x} ${segEnd2.y} L ${segStart2.x} ${segStart2.y} A 60 60 0 0 0 ${segStart.x} ${segStart.y} Z`);
    seg.setAttribute('fill', 'transparent');
    seg.setAttribute('style', 'cursor: pointer;');
    seg.addEventListener('click', () => selectMonth(m));
    seg.addEventListener('mouseenter', () => seg.setAttribute('fill', 'rgba(59,93,42,0.08)'));
    seg.addEventListener('mouseleave', () => seg.setAttribute('fill', 'transparent'));
    monthMarks.appendChild(seg);
  }
  const radiusByIndex = (i) => 75 + i * 7;
  products.forEach((pp, i) => {
    const radius = radiusByIndex(i);
    let startA = angleForMonth(pp.start);
    let endA = angleForMonth(pp.end + 1);
    if (endA <= startA) endA += 360;
    const startPoint = pointAt(startA, radius);
    const endPoint = pointAt(endA, radius);
    const largeArc = (endA - startA) > 180 ? 1 : 0;
    const arc = document.createElementNS(NS, 'path');
    arc.setAttribute('d', `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`);
    arc.setAttribute('stroke', pp.color);
    arc.setAttribute('stroke-width', '5');
    arc.setAttribute('stroke-linecap', 'round');
    arc.setAttribute('fill', 'none');
    arc.setAttribute('opacity', '0.85');
    productArcs.appendChild(arc);
  });
  function inSeasonAt(p, m) {
    if (p.end >= p.start) return m >= p.start && m <= p.end;
    return m >= p.start || m <= p.end;
  }
  function selectMonth(m) {
    const a = angleForMonth(m) + 15;
    const tip = pointAt(a, 175);
    monthPointer.setAttribute('x2', tip.x);
    monthPointer.setAttribute('y2', tip.y);
    monthName.textContent = monthsFull[m];
    const inSeason = products.filter(p => inSeasonAt(p, m));
    if (inSeason.length === 0) {
      monthProducts.innerHTML = '<span style="color: #7a6f5e; font-style: italic; font-family: Fraunces, Georgia, serif;">Il campo riposa. Il suolo lavora.</span>';
    } else {
      monthProducts.innerHTML = inSeason.map(p =>
        `<div class="item"><span class="dot" style="background: ${p.color};"></span>${p.name}</div>`
      ).join('');
    }
    productArcs.querySelectorAll('path').forEach((arc, i) => {
      arc.setAttribute('opacity', inSeasonAt(products[i], m) ? '1' : '0.25');
      arc.setAttribute('stroke-width', inSeasonAt(products[i], m) ? '6' : '4');
    });
  }
  selectMonth(5);
})();
