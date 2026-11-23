/* Tinder Date · Season 2 — logika gry */
(function () {
  'use strict';
  const G = window.GAME;
  const S = G.settings;
  const KEY = 'tinder-date-s2-v1';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const on = arr => (arr || []).filter(x => !x.off);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const wait = ms => new Promise(r => setTimeout(r, ms));

  const QUIZ = on(G.quiz), PACK = on(G.packing), ACTS = on(G.activities), PREFS = on(G.prefs);

  /* ---------------- stan ---------------- */
  const fresh = () => ({
    screen: 'intro', chats: {}, played: {},
    quiz: { idx: 0, answers: [] },
    clues: [], clueTries: {}, clueLast: null, pack: [], packLast: null,
    checklist: {}, guideSeen: false,
    swipes: {}, swipeOrder: [],
    prefs: {}, prefsOther: {}, prefIdx: 0, wish: '',
    sent: false, sentAt: null
  });
  let state = fresh();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && typeof saved === 'object') state = Object.assign(fresh(), saved);
  } catch (e) { /* brak dostępu do pamięci — gramy bez zapisu */ }
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  /* ---------------- ekrany ---------------- */
  const ORDER = $$('.screen').map(s => s.dataset.screen);
  const STEP = { intro: 0, match: 0, rules: 0, l9unlock: 1, l9chat: 1, memories: 1, l10unlock: 2, l10intro: 2, l10quiz: 2, l10result: 2,
    l11unlock: 3, l11chat: 3, clues: 3, l12unlock: 4, l12pack: 4, l12result: 4, guide: 4, l13unlock: 5, l13swipe: 5, l13matches: 5,
    l14unlock: 6, l14prefs: 6, send: 6, finalchat: 7, finale: 7 };
  const LVL = { 1: '09', 2: '10', 3: '11', 4: '12', 5: '13', 6: '14' };
  let chatToken = 0, countdownTimer = null;

  function show(name) {
    if (!ORDER.includes(name)) name = 'intro';
    if (name === 'l10result' && QUIZ.some((q, i) => !state.quiz.answers[i])) name = 'l10quiz';
    if (name === 'guide') state.guideSeen = true;
    state.screen = name;
    chatToken++;
    clearInterval(countdownTimer);
    $$('.screen').forEach(s => s.classList.toggle('active', s.dataset.screen === name));
    const step = STEP[name] || 0;
    $$('#steps i').forEach((i, n) => i.classList.toggle('on', n < step));
    $('#tag').textContent = step === 0 ? 'SEASON 2 ♥' : step === 7 ? 'S2 · FINAŁ ♥' : 'S2 · LVL ' + LVL[step];
    $('#guide-shortcut').hidden = !state.guideSeen || name === 'guide';
    (RENDER[name] || (() => {}))();
    persist();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ---------------- unlock ---------------- */
  $$('.level-unlock').forEach(s => {
    const d = s.dataset;
    s.innerHTML = `
      <div class="eyebrow">✨ Nowy rozdział</div>
      <div class="unlock-stage ${d.variant === 'three' ? 'three' : ''}">
        <div class="unlock-rings"><div class="unlock-lock" aria-hidden="true">🔓</div></div>
        <div class="unlock-small">NEW LEVEL UNLOCKED</div>
        <h1>LEVEL <span class="gradient">${d.lvl}</span></h1>
        <div class="unlock-tag">${d.unlockTag}</div>
        <p>${d.unlockText}</p>
      </div>
      <button class="primary" data-go="${d.next}">${d.btn}</button>`;
  });

  /* ---------------- czat ---------------- */
  $$('.chat-head').forEach(h => {
    h.innerHTML = `<div class="avatar av-mariusz"><img src="assets/img/mariusz-avatar.jpg" alt="${S.me}"></div>
      <div><strong>${S.me} <span>♥</span></strong><small><i></i> online</small></div><span class="heart-out">♡</span>`;
  });

  function bubble(chatEl, who, text) {
    const row = el('div', 'row ' + who);
    if (who === 'in') { const av = el('div', 'avatar av-mariusz'); const img = el('img'); img.src = 'assets/img/mariusz-avatar.jpg'; img.alt = ''; av.append(img); row.append(av); }
    row.append(el('div', 'bubble', text));
    chatEl.append(row);
    return row;
  }
  async function playSeq(chatEl, msgs, token, ctx) {
    for (const m of msgs) {
      if (token !== chatToken) return false;
      const typing = el('div', 'row in');
      const av = el('div', 'avatar av-mariusz'); const img = el('img'); img.src = 'assets/img/mariusz-avatar.jpg'; img.alt = ''; av.append(img);
      const b = el('div', 'bubble typing'); b.innerHTML = '<i></i><i></i><i></i>';
      typing.append(av, b); chatEl.append(typing);
      await wait(ctx.fast ? 120 : 650 + Math.min(m.length * 16, 1300));
      typing.remove();
      if (token !== chatToken) return false;
      bubble(chatEl, 'in', m);
      await wait(ctx.fast ? 60 : 280);
    }
    return token === chatToken;
  }

  function runChat(key, cfg, ids) {
    const chatEl = $(ids.chat), choicesEl = ids.choices ? $(ids.choices) : null, nextEl = $(ids.next);
    const token = chatToken;
    const ctx = { fast: false };
    chatEl.onclick = () => { ctx.fast = true; };
    chatEl.replaceChildren();
    nextEl.hidden = true;
    if (choicesEl) choicesEl.hidden = true;
    const chosen = cfg.choices ? cfg.choices.find(c => c.id === state.chats[key]) : null;
    const done = cfg.choices ? !!chosen : state.played[key];

    if (done) {
      cfg.intro.forEach(t => bubble(chatEl, 'in', t));
      if (chosen) { bubble(chatEl, 'out', chosen.label); chosen.reply.forEach(t => bubble(chatEl, 'in', t)); }
      (cfg.outro || []).forEach(t => bubble(chatEl, 'in', t));
      nextEl.hidden = false;
      return;
    }
    playSeq(chatEl, cfg.intro, token, ctx).then(ok => {
      if (!ok) return;
      if (!cfg.choices) { state.played[key] = true; persist(); nextEl.hidden = false; return; }
      choicesEl.replaceChildren(el('div', 'compose-label', 'CO ODPISUJESZ?'));
      cfg.choices.forEach(c => {
        const btn = el('button', 'choice'); btn.type = 'button';
        btn.append(el('b', null, c.id), el('span', null, c.label));
        btn.onclick = async () => {
          state.chats[key] = c.id; persist();
          choicesEl.hidden = true;
          bubble(chatEl, 'out', c.label);
          const ok2 = await playSeq(chatEl, c.reply.concat(cfg.outro || []), token, ctx);
          if (ok2) nextEl.hidden = false;
        };
        choicesEl.append(btn);
      });
      choicesEl.hidden = false;
    });
  }

  /* ---------------- wspomnienia ---------------- */
  function renderMemories() {
    const wrap = $('#polaroids'); wrap.replaceChildren();
    G.memories.forEach(m => {
      const p = el('button', 'polaroid'); p.type = 'button';
      const img = el('img'); img.src = m.img; img.alt = m.caption; img.loading = 'lazy';
      p.append(img, el('span', null, m.caption));
      p.onclick = () => openLightbox(m.img, m.caption);
      wrap.append(p);
    });
    $('#memories-thanks').textContent = G.memoriesThanks;
  }
  function openLightbox(src, cap) {
    const lb = $('#lightbox'); $('img', lb).src = src; $('p', lb).textContent = cap; lb.hidden = false;
  }
  $('#lightbox').addEventListener('click', () => { $('#lightbox').hidden = true; });

  /* ---------------- quiz ---------------- */
  $('#quiz-count').textContent = String(QUIZ.length).padStart(2, '0'); $('#quiz-count-label').textContent = plural(QUIZ.length, 'pytanie', 'pytania', 'pytań');
  const quizScore = () => QUIZ.reduce((s, q, i) => s + (state.quiz.answers[i] === q.correct ? 1 : 0), 0);
  function renderQuiz() {
    const idx = Math.min(state.quiz.idx, QUIZ.length - 1), q = QUIZ[idx], ans = state.quiz.answers[idx];
    $('#quiz-serial').textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(QUIZ.length).padStart(2, '0');
    const prog = $('#quiz-progress'); prog.replaceChildren();
    QUIZ.forEach((_, i) => prog.append(el('i', i < idx ? 'past' : i === idx ? 'current' : '')));
    $('#quiz-sup').textContent = q.sup || '';
    $('#quiz-q').textContent = q.q;
    const tiles = $('#quiz-tiles'); tiles.replaceChildren();
    q.options.forEach(o => {
      const t = el('button', 'tile'); t.type = 'button';
      t.append(el('span', 'te', o.e), el('span', 'tt', o.t), el('span', 'tick', ans ? (o.id === q.correct ? '✓' : '✕') : '✓'));
      if (ans) {
        t.disabled = true;
        if (o.id === q.correct) t.classList.add('correct');
        else if (o.id === ans) t.classList.add('wrong');
        else t.classList.add('dim');
      }
      t.onclick = () => { if (state.quiz.answers[idx]) return; state.quiz.answers[idx] = o.id; persist(); renderQuiz(); };
      tiles.append(t);
    });
    const r = $('#quiz-reaction'), next = $('#quiz-next');
    if (ans) {
      const good = ans === q.correct, right = q.options.find(o => o.id === q.correct);
      r.innerHTML = '';
      const av = el('div', 'avatar av-mariusz'); const img = el('img'); img.src = 'assets/img/mariusz-avatar.jpg'; img.alt = ''; av.append(img);
      const b = el('div', 'bubble');
      b.append(el('span', 'verdict ' + (good ? 'ok' : 'bad'), good ? '✓ DOKŁADNIE TAK' : '✕ PUDŁO · prawidłowo: ' + right.t));
      b.append(document.createTextNode(q.reply));
      r.append(av, b); r.hidden = false;
      next.hidden = false;
      next.textContent = idx === QUIZ.length - 1 ? 'Zobacz wynik →' : 'Dalej →';
    } else { r.hidden = true; next.hidden = true; }
  }
  $('#quiz-next').onclick = () => {
    if (state.quiz.idx < QUIZ.length - 1) { state.quiz.idx++; persist(); renderQuiz(); window.scrollTo({ top: 0, behavior: 'instant' }); }
    else show('l10result');
  };
  $('#quiz-restart').onclick = () => { state.quiz = { idx: 0, answers: [] }; show('l10quiz'); };
  function renderQuizResult() {
    const sc = quizScore(), tot = QUIZ.length, c = G.quizComments;
    $('#quiz-score').textContent = sc; $('#quiz-total').textContent = '/' + tot;
    $('#quiz-hearts').textContent = '♥ '.repeat(sc) + '♡ '.repeat(tot - sc);
    $('#quiz-comment').textContent = c[Math.round(sc / tot * (c.length - 1))];
    $('#quiz-fill').style.width = '0';
    setTimeout(() => { $('#quiz-fill').style.width = (sc / tot * 100) + '%'; }, 150);
  }

  /* ---------------- poszlaki ---------------- */
  function optIcon(o) {
    if (o.swatch) { const s = el('span', 'swatch'); s.style.background = o.swatch; return s; }
    return el('span', 'te', o.e);
  }
  const clueOk = (q, id) => q.allCorrect || id === q.correct;
  function mariuszBubble(text, verdict, good) {
    const r = el('div', 'reaction');
    const av = el('div', 'avatar av-mariusz'); const img = el('img'); img.src = 'assets/img/mariusz-avatar.jpg'; img.alt = ''; av.append(img);
    const b = el('div', 'bubble');
    if (verdict) b.append(el('span', 'verdict ' + (good ? 'ok' : 'bad'), verdict));
    b.append(document.createTextNode(text));
    r.append(av, b);
    return r;
  }
  function renderClues() {
    state.clueTries = state.clueTries || {};
    const current = G.clues.findIndex((_, i) => !state.clues[i]);
    const last = state.clueLast;

    // pytanie o Mariusza dla pierwszej zamkniętej poszlaki
    const qbox = $('#clue-quiz'); qbox.replaceChildren();
    if (last && last.ok && G.clues[last.i] && G.clues[last.i].quiz) {
      qbox.append(mariuszBubble(G.clues[last.i].quiz.ok, '✓ POSZLAKA #' + (last.i + 1) + ' ODBLOKOWANA', true));
    }
    if (current >= 0 && G.clues[current].quiz) {
      const q = G.clues[current].quiz, wrong = state.clueTries[current] || [];
      const card = el('div', 'clue-q');
      card.append(el('div', 'quiz-sup', 'PYTANIE ' + (current + 1) + ' / ' + G.clues.length + ' · 🔒 POSZLAKA #' + (current + 1)), el('h2', null, q.q));
      const tiles = el('div', 'tiles');
      q.options.forEach(o => {
        const isWrong = wrong.includes(o.id);
        const t = el('button', 'tile' + (isWrong ? ' wrong' : '')); t.type = 'button'; t.disabled = isWrong;
        t.append(optIcon(o), el('span', 'tt', o.t), el('span', 'tick', '✕'));
        t.onclick = () => {
          if (clueOk(q, o.id)) { state.clues[current] = true; state.clueLast = { i: current, ok: true }; }
          else { state.clueTries[current] = wrong.concat(o.id); state.clueLast = { i: current, ok: false }; }
          persist(); renderClues();
        };
        tiles.append(t);
      });
      card.append(tiles);
      if (last && !last.ok && last.i === current && wrong.length) {
        const pool = G.clueWrong || ['Pudło! Spróbuj jeszcze raz.'];
        card.append(mariuszBubble(pool[(wrong.length - 1) % pool.length], '✕ ZŁA ODPOWIEDŹ', false));
      }
      qbox.append(card);
    }

    // lista poszlak
    const box = $('#clues'); box.replaceChildren();
    G.clues.forEach((c, i) => {
      const open = !!state.clues[i];
      const justOpened = open && last && last.ok && last.i === i;
      const b = el('div', 'clue ' + (open ? 'open' : 'locked') + (i === current ? ' current' : '') + (justOpened ? ' fresh' : ''));
      const txt = el('div');
      txt.append(el('div', 'ct', open ? c.t : 'Poszlaka #' + (i + 1)),
        el('div', 'cd', open ? c.d : (i === current ? 'Odpowiedz na pytanie wyżej, żeby otworzyć 🔒' : 'Zamknięta na kłódkę 🔒')));
      b.append(el('span', 'ce', open ? c.e : '🔒'), txt);
      if (!c.quiz && !open && i === current) {
        b.classList.add('tap'); b.onclick = () => { state.clues[i] = true; state.clueLast = null; persist(); renderClues(); };
      }
      box.append(b);
    });
    $('#clues-done').hidden = current >= 0;
  }

  /* ---------------- pakowanie ---------------- */
  const packGrid = $('#pack-grid');
  PACK.forEach(it => {
    const b = el('button', 'pack-tile'); b.type = 'button'; b.dataset.pack = it.id; b.setAttribute('aria-label', it.n);
    b.append(el('span', 'pack-emoji', it.e), el('span', 'pack-name', it.n), el('span', 'pack-check'));
    b.onclick = () => {
      const had = state.pack.includes(it.id);
      state.pack = had ? state.pack.filter(x => x !== it.id) : state.pack.concat(it.id);
      state.packLast = { id: it.id, add: !had };
      persist(); renderPack();
    };
    packGrid.append(b);
  });
  function renderPack() {
    $$('.pack-tile').forEach(b => {
      const sel = state.pack.includes(b.dataset.pack);
      b.classList.toggle('selected', sel); b.setAttribute('aria-pressed', String(sel));
      $('.pack-check', b).textContent = sel ? '✓' : '';
    });
    const n = state.pack.length;
    $('#pack-count').textContent = n ? n + ' zaznaczonych' : 'Nic jeszcze nie zaznaczono';
    const last = state.packLast && PACK.find(p => p.id === state.packLast.id);
    $('#pack-msg').textContent = !last ? 'Pakuj się mądrze. Patrzę. 👀'
      : state.packLast.add ? last.r : 'Odkładasz „' + last.n.toLowerCase() + '”? Okej… ale mam Cię na oku. 👀';
    const m = $('#pack-msg'); m.style.animation = 'none'; void m.offsetWidth; m.style.animation = '';
  }
  function packResult() {
    const must = PACK.filter(p => p.type === 'must');
    const got = must.filter(p => state.pack.includes(p.id));
    const missing = must.filter(p => !state.pack.includes(p.id));
    const jokes = PACK.filter(p => p.type === 'joke' && state.pack.includes(p.id));
    const score = Math.max(0, Math.min(100, Math.round(got.length / (must.length || 1) * 100) - jokes.length * 10));
    return { must, got, missing, jokes, score };
  }
  function renderPackResult() {
    const r = packResult();
    $('#pack-score').textContent = r.score;
    $('#pack-fill').style.width = '0';
    setTimeout(() => { $('#pack-fill').style.width = r.score + '%'; }, 150);
    $('#pack-title').textContent = r.score === 100 ? 'GOTOWA NA WSZYSTKO 🔥' : r.score >= 80 ? 'PRAWIE IDEALNIE 😏' : r.score >= 60 ? 'DOBRY START 🧳' : r.score >= 40 ? 'TROCHĘ CHAOSU 😂' : 'ZMARZNIESZ, KOCHANIE 🥶';
    $('#pack-note').textContent = `Obowiązkowe: ${r.got.length}/${r.must.length} · Żarty w walizce: ${r.jokes.length} × −10 pkt`;
    const notes = [];
    r.missing.slice(0, 2).forEach(p => notes.push(p.miss));
    r.jokes.slice(0, 1).forEach(p => notes.push(p.r));
    if (state.pack.includes('box')) notes.push((PACK.find(p => p.id === 'box') || {}).r);
    if (!notes.length) notes.push('Perfekcyjnie spakowana. Jestem pod wrażeniem… i trochę się boję, jak dobrze się przygotowałaś. 😏');
    if (r.missing.length > 2) notes.push(`…i jeszcze ${r.missing.length - 2} ${plural(r.missing.length - 2, "rzecz", "rzeczy", "rzeczy")} z listy obowiązkowej. Sprawdź poradnik niżej! 📋`);
    const box = $('#pack-notes'); box.replaceChildren();
    notes.filter(Boolean).forEach(t => box.append(el('div', 'live-bubble', t)));
  }
  $('#pack-approve').onclick = () => show('l12result');

  /* ---------------- poradnik ---------------- */
  function renderGuide() {
    const list = $('#guide-list'); list.replaceChildren();
    let total = 0, done = 0;
    G.guide.forEach((sec, si) => {
      const s = el('div', 'g-section');
      const h = el('h3', null, sec.title); const cnt = el('small'); h.append(cnt); s.append(h);
      let sd = 0;
      sec.items.forEach((it, ii) => {
        const key = si + '-' + ii; total++;
        const lab = el('label', 'g-item'); const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!state.checklist[key];
        if (cb.checked) { done++; sd++; }
        cb.onchange = () => { state.checklist[key] = cb.checked; persist(); renderGuide(); };
        lab.append(cb, el('span', null, it)); s.append(lab);
      });
      cnt.textContent = sd + '/' + sec.items.length;
      list.append(s);
    });
    $('#guide-count').textContent = done + ' / ' + total;
    $('#guide-fill').style.width = (total ? done / total * 100 : 0) + '%';
    $('#tips-title').textContent = G.tipsTitle || ''; const tips = $('#tips'); tips.replaceChildren(); (G.tips || []).forEach(t => tips.append(el('li', null, t))); tips.parentElement.hidden = !(G.tips || []).length;
    const mine = $('#my-part'); mine.replaceChildren(); G.myPart.forEach(t => mine.append(el('li', null, '✓ ' + t)));
    const cont = $('#guide-continue');
    if (state.sent) { cont.dataset.go = 'finale'; cont.textContent = 'Wróć do finału ♥'; }
    else if (Object.keys(state.swipes).length || state.prefIdx) { cont.dataset.go = 'l13swipe'; cont.textContent = 'Wróć do gry →'; }
    else { cont.dataset.go = 'l13unlock'; cont.textContent = 'Dalej: zaplanuj weekend →'; }
  }
  $('#guide-shortcut').onclick = () => show('guide');

  /* ---------------- swipe ---------------- */
  const remaining = () => ACTS.filter(a => !(a.id in state.swipes));
  function cardEl(a) {
    const [c1, c2] = (a.bg || '#ff5a7e,#8a63ff').split(',');
    const c = el('div', 'card'); c.style.setProperty('--c1', c1); c.style.setProperty('--c2', c2);
    c.innerHTML = `<div class="art"><span class="ctag"></span><b></b></div><div class="info"><h3></h3><p></p></div>
      <div class="stamp like">CHCĘ!</div><div class="stamp nope">PAS</div><div class="stamp super">SUPER LIKE ★</div>`;
    $('.ctag', c).textContent = '📍 ' + a.tag; $('b', c).textContent = a.e; $('h3', c).textContent = a.t; $('p', c).textContent = a.d;
    return c;
  }
  function renderDeck() {
    const deck = $('#deck'); deck.replaceChildren();
    const rest = remaining();
    $('#deck-count').textContent = Math.min(ACTS.length - rest.length + 1, ACTS.length) + ' / ' + ACTS.length;
    $('#deck-undo').disabled = !state.swipeOrder.length;
    $$('[data-swipe]').forEach(b => { b.disabled = !rest.length; });
    if (!rest.length) {
      deck.append(el('div', 'deck-empty', 'To wszystko! Liczę Twoje matche… 💘'));
      setTimeout(() => { if (state.screen === 'l13swipe') show('l13matches'); }, 700);
      return;
    }
    rest.slice(0, 3).reverse().forEach((a, i, arr) => {
      const c = cardEl(a); const depth = arr.length - 1 - i;
      c.classList.add(depth === 0 ? 'top' : depth === 1 ? 'behind' : 'behind2');
      deck.append(c);
      if (depth === 0) attachDrag(c, a);
    });
  }
  function commitSwipe(card, a, verdict) {
    if (!card || card.dataset.gone) return;
    card.dataset.gone = '1';
    card.classList.remove('dragging');
    const x = verdict === 'like' ? 700 : verdict === 'nope' ? -700 : 0, y = verdict === 'super' ? -900 : 40;
    card.style.transform = `translate(${x}px,${y}px) rotate(${x / 25}deg)`; card.style.opacity = '0';
    const st = $('.stamp.' + verdict, card); if (st) st.style.opacity = '1';
    state.swipes[a.id] = verdict; state.swipeOrder.push(a.id); persist();
    setTimeout(renderDeck, 300);
  }
  function attachDrag(card, a) {
    let sx = 0, sy = 0, dx = 0, dy = 0, drag = false;
    card.addEventListener('pointerdown', e => { drag = true; sx = e.clientX; sy = e.clientY; dx = dy = 0; card.classList.add('dragging'); card.setPointerCapture(e.pointerId); });
    card.addEventListener('pointermove', e => {
      if (!drag) return;
      dx = e.clientX - sx; dy = e.clientY - sy;
      card.style.transform = `translate(${dx}px,${dy}px) rotate(${dx / 18}deg)`;
      $('.stamp.like', card).style.opacity = Math.max(0, Math.min(1, dx / 90));
      $('.stamp.nope', card).style.opacity = Math.max(0, Math.min(1, -dx / 90));
      $('.stamp.super', card).style.opacity = Math.abs(dx) < 60 ? Math.max(0, Math.min(1, -dy / 100)) : 0;
    });
    const end = () => {
      if (!drag) return; drag = false;
      if (dx > 100) return commitSwipe(card, a, 'like');
      if (dx < -100) return commitSwipe(card, a, 'nope');
      if (dy < -110 && Math.abs(dx) < 80) return commitSwipe(card, a, 'super');
      card.classList.remove('dragging'); card.style.transform = '';
      $$('.stamp', card).forEach(s => { s.style.opacity = '0'; });
    };
    card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  }
  $$('[data-swipe]').forEach(b => b.addEventListener('click', () => {
    const top = $('#deck .card.top'); const a = remaining()[0];
    if (top && a) commitSwipe(top, a, b.dataset.swipe);
  }));
  $('#deck-undo').onclick = () => {
    const id = state.swipeOrder.pop(); if (!id) return;
    delete state.swipes[id]; persist(); renderDeck();
  };
  document.addEventListener('keydown', e => {
    if (state.screen !== 'l13swipe') return;
    const map = { ArrowRight: 'like', ArrowLeft: 'nope', ArrowUp: 'super' };
    if (map[e.key]) { e.preventDefault(); const t = $('#deck .card.top'), a = remaining()[0]; if (t && a) commitSwipe(t, a, map[e.key]); }
  });
  const byVerdict = v => ACTS.filter(a => state.swipes[a.id] === v);
  function renderMatches() {
    const sup = byVerdict('super'), like = byVerdict('like');
    $('#matches-lead').textContent = (sup.length + like.length)
      ? `${sup.length + like.length} ${plural(sup.length + like.length, 'match', 'matche', 'matchy')}${sup.length ? `, w tym ${sup.length} × super like ★` : ''}. Zapisane — resztę biorę na siebie. 😏`
      : 'Zero matchy?! Czyli… cały weekend nie wychodzimy spod koca. Nie mam nic przeciwko. 😏';
    const box = $('#matches'); box.replaceChildren();
    sup.concat(like).forEach(a => {
      const [c1, c2] = (a.bg || '#ff5a7e,#8a63ff').split(',');
      const row = el('div', 'match-item');
      const ic = el('div', 'me', a.e); ic.style.setProperty('--c1', c1); ic.style.setProperty('--c2', c2);
      const t = el('div'); t.append(el('strong', null, a.t), el('small', null, a.tag));
      const isSup = state.swipes[a.id] === 'super';
      row.append(ic, t, el('span', 'badge ' + (isSup ? 'super' : 'like'), isSup ? '★ SUPER' : '♥ CHCĘ'));
      box.append(row);
    });
  }
  $('#deck-restart').onclick = () => { state.swipes = {}; state.swipeOrder = []; show('l13swipe'); };
  function plural(n, one, few, many) { if (n === 1) return one; const d = n % 10, t = n % 100; return d >= 2 && d <= 4 && (t < 12 || t > 14) ? few : many; }

  /* ---------------- życzenia ---------------- */
  const PREF_TOTAL = PREFS.length + 1;
  function renderPrefs() {
    const idx = Math.min(state.prefIdx, PREF_TOTAL - 1);
    $('#pref-serial').textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(PREF_TOTAL).padStart(2, '0');
    const prog = $('#pref-progress'); prog.replaceChildren();
    for (let i = 0; i < PREF_TOTAL; i++) prog.append(el('i', i < idx ? 'past' : i === idx ? 'current' : ''));
    const body = $('#pref-body'); body.replaceChildren();
    const next = $('#pref-next');
    $('#pref-back').disabled = idx === 0;
    if (idx < PREFS.length) {
      const p = PREFS[idx]; const val = state.prefs[p.id];
      const head = el('div', 'quiz-question');
      head.append(el('div', 'quiz-sup', p.sup || ''), el('h2', null, p.q), el('p', 'quiz-hint', p.hint || ''));
      const tiles = el('div', 'tiles' + (p.multi ? ' multi' : ''));
      p.options.forEach(o => {
        const sel = p.multi ? (val || []).includes(o.id) : val === o.id;
        const t = el('button', 'tile' + (sel ? ' selected' : '')); t.type = 'button'; t.setAttribute('aria-pressed', String(sel));
        t.append(el('span', 'te', o.e), el('span', 'tt', o.t), el('span', 'tick', '✓'));
        t.onclick = () => {
          if (p.multi) { const cur = new Set(state.prefs[p.id] || []); cur.has(o.id) ? cur.delete(o.id) : cur.add(o.id); state.prefs[p.id] = Array.from(cur); }
          else { state.prefs[p.id] = o.id; if (state.prefsOther) state.prefsOther[p.id] = ''; }
          persist(); renderPrefs();
        };
        tiles.append(t);
      });
      body.append(head, tiles);
      state.prefsOther = state.prefsOther || {};
      const hasPick = () => p.multi ? !!(state.prefs[p.id] || []).length : !!state.prefs[p.id];
      const hasOther = () => !!(state.prefsOther[p.id] || '').trim();
      if (p.other) {
        const inp = el('input', 'pref-other'); inp.type = 'text'; inp.maxLength = 200;
        inp.placeholder = '✏️ ' + p.other; inp.value = state.prefsOther[p.id] || '';
        inp.oninput = () => {
          state.prefsOther[p.id] = inp.value;
          // przy pojedynczym wyborze wpisany tekst zastępuje zaznaczony kafelek
          if (!p.multi && inp.value.trim() && state.prefs[p.id]) {
            state.prefs[p.id] = null;
            $$('.tile', tiles).forEach(t => { t.classList.remove('selected'); t.setAttribute('aria-pressed', 'false'); });
          }
          persist(); next.disabled = !(hasPick() || hasOther());
        };
        body.append(inp);
      }
      next.disabled = !(hasPick() || hasOther());
      next.textContent = 'Dalej →';
    } else {
      const head = el('div', 'quiz-question');
      head.append(el('div', 'quiz-sup', 'OSTATNIE PYTANIE'), el('h2', null, 'Twoje specjalne życzenie ✨'), el('p', 'quiz-hint', G.wishPrompt));
      const ta = el('textarea', 'pref-text'); ta.placeholder = 'Np. „Chcę zobaczyć gwiazdy z sauny”… albo „żadnych grzybów!” 😄'; ta.value = state.wish || ''; ta.maxLength = 1500;
      ta.oninput = () => { state.wish = ta.value; persist(); };
      body.append(head, ta);
      next.disabled = false; next.textContent = 'Podsumowanie →';
    }
  }
  $('#pref-next').onclick = () => {
    if (state.prefIdx < PREF_TOTAL - 1) { state.prefIdx++; persist(); renderPrefs(); window.scrollTo({ top: 0, behavior: 'instant' }); }
    else show('send');
  };
  $('#pref-back').onclick = () => { if (state.prefIdx > 0) { state.prefIdx--; persist(); renderPrefs(); } };

  /* ---------------- podsumowanie i wysyłka ---------------- */
  function prefAnswer(p) {
    const v = state.prefs[p.id];
    const ids = v ? (Array.isArray(v) ? v : [v]) : [];
    const parts = ids.map(id => { const o = p.options.find(x => x.id === id); return o ? o.e + ' ' + o.t : id; });
    const other = ((state.prefsOther || {})[p.id] || '').trim();
    if (other) parts.push('✏️ ' + other);
    return parts.join(', ') || '—';
  }
  function collect() {
    const names = arr => arr.map(a => a.e + ' ' + a.t).join('\n') || '—';
    const chat = (key, cfg) => { const c = cfg.choices.find(x => x.id === state.chats[key]); return c ? c.label : '—'; };
    const pr = packResult();
    const rows = [
      ['★ SUPER LIKE — MUSIMY', names(byVerdict('super'))],
      ['♥ CHCĘ', names(byVerdict('like'))],
      ['✕ PAS', names(byVerdict('nope'))]
    ];
    PREFS.forEach(p => rows.push([p.q.toUpperCase(), prefAnswer(p)]));
    rows.push(['✨ SPECJALNE ŻYCZENIE', (state.wish || '').trim() || '—']);
    rows.push(['🔍 QUIZ O WIECZORZE', quizScore() + ' / ' + QUIZ.length]);
    const cq = G.clues.filter(c => c.quiz && !c.quiz.allCorrect);
    const tries = state.clueTries || {};
    const firstTry = G.clues.filter((c, i) => c.quiz && !c.quiz.allCorrect && state.clues[i] && !(tries[i] || []).length).length;
    const misses = G.clues.map((c, i) => (tries[i] || []).map(id => { const o = c.quiz && c.quiz.options.find(x => x.id === id); return o ? '„' + o.t + '” (' + c.quiz.q + ')' : null; }).filter(Boolean)).flat();
    rows.push(['🙋‍♂️ PYTANIA O MARIUSZA', firstTry + ' / ' + cq.length + ' za pierwszym razem' + (misses.length ? '\nPomyłki: ' + misses.join(', ') : '\nBez pomyłek! 😎')]);
    rows.push(['🧳 WALIZKA', pr.score + '/100' + (pr.missing.length ? '\nBrakowało: ' + pr.missing.map(p => p.n).join(', ') : '') + (state.pack.includes('box') ? '\n📦 Pudełeczko: zatwierdzone 😏' : '')]);
    rows.push(['💬 ODPOWIEDZI W CZATACH', 'Poranek: ' + chat('morning', G.morningChat) + '\nUrodzinowy twist: ' + chat('twist', G.twistChat)]);
    return rows;
  }
  function asText(rows) { return 'Tinder Date · Season 2 — odpowiedzi ' + S.her + '\n\n' + rows.map(r => r[0] + ':\n' + r[1]).join('\n\n'); }
  function renderSend() {
    const rows = collect(); const box = $('#summary'); box.replaceChildren();
    rows.slice(0, rows.length - 4).forEach(([k, v]) => { const r = el('div', 'sum-row'); r.append(el('span', null, k), el('p', null, v)); box.append(r); });
    $('#send-btn').textContent = state.sent ? 'Wyślij ponownie (z poprawkami) 💌' : 'Wyślij do Mariusza 💌';
    $('#send-status').hidden = !state.sent;
    if (state.sent) setStatus('ok', '✓ Już wysłane. Jeśli coś zmieniłaś, możesz wysłać jeszcze raz.');
    $('#send-fallback').hidden = true;
    const text = asText(rows);
    $('#mailto-link').href = 'mailto:' + S.fallbackEmail + '?subject=' + encodeURIComponent(S.emailSubject) + '&body=' + encodeURIComponent(text);
  }
  function setStatus(kind, msg) { const s = $('#send-status'); s.className = 'send-status ' + kind; s.textContent = msg; s.hidden = false; }
  $('#send-btn').onclick = async () => {
    const btn = $('#send-btn'); const rows = collect();
    btn.disabled = true; setStatus('wait', 'Wysyłam… 💌');
    const payload = { _subject: S.emailSubject, _template: 'box', _captcha: 'false', Od: S.her, 'Wysłano': new Date().toLocaleString('pl-PL') };
    rows.forEach(([k, v]) => { payload[k] = v; });
    try {
      const res = await fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === true || data.success === 'true')) {
        state.sent = true; state.sentAt = Date.now(); persist();
        setStatus('ok', '✓ Wysłane! Mariusz właśnie dostał Twoje odpowiedzi. 😏');
        setTimeout(() => { if (state.screen === 'send') show('finalchat'); }, 1300);
      } else throw new Error(data.message || 'HTTP ' + res.status);
    } catch (err) {
      setStatus('err', 'Ups, coś nie pykło z wysyłką. 😅 Wyślij mailem jednym kliknięciem albo skopiuj odpowiedzi i wklej mi na czacie.');
      $('#send-fallback').hidden = false;
      console.warn('Wysyłka nieudana:', err);
    } finally { btn.disabled = false; }
  };
  $('#mailto-link').addEventListener('click', () => { state.sent = true; persist(); setTimeout(() => show('finalchat'), 800); });
  $('#copy-btn').onclick = async () => {
    const text = asText(collect());
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const ta = el('textarea'); ta.value = text; document.body.append(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) {} ta.remove(); }
    toast('Skopiowane! Wklej mi to na czacie 💌');
  };
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 2600); }

  /* ---------------- finał ---------------- */
  function renderCountdown() {
    const box = $('#countdown');
    const dep = new Date(S.departure).getTime(), ret = new Date(S.returnDate).getTime(), now = Date.now();
    if (now >= dep) {
      box.innerHTML = '';
      box.append(el('div', 'now', now < ret ? 'JESTEŚMY W GÓRACH 🔥' : 'DO ZOBACZENIA W SEASON 3 😏'));
      return;
    }
    let s = Math.floor((dep - now) / 1000);
    const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
    box.innerHTML = '';
    [[d, plural(d, 'DZIEŃ', 'DNI', 'DNI')], [h, 'GODZ'], [m, 'MIN'], [s, 'SEK']].forEach(([v, l]) => {
      const c = el('div'); c.append(el('b', null, String(v).padStart(2, '0')), el('small', null, l)); box.append(c);
    });
  }

  /* ---------------- render per ekran ---------------- */
  const RENDER = {
    l9chat: () => runChat('morning', G.morningChat, { chat: '#chat-morning', choices: '#choices-morning', next: '#next-morning' }),
    memories: renderMemories,
    l10quiz: renderQuiz,
    l10result: renderQuizResult,
    l11chat: () => runChat('twist', G.twistChat, { chat: '#chat-twist', choices: '#choices-twist', next: '#next-twist' }),
    clues: renderClues,
    l12pack: renderPack,
    l12result: renderPackResult,
    guide: renderGuide,
    l13swipe: renderDeck,
    l13matches: renderMatches,
    l14prefs: renderPrefs,
    send: renderSend,
    finalchat: () => runChat('final', { intro: G.finalChat }, { chat: '#chat-final', next: '#next-final' }),
    finale: () => { renderCountdown(); countdownTimer = setInterval(renderCountdown, 1000); }
  };

  /* ---------------- nawigacja ---------------- */
  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); show(go.dataset.go); }
  });
  const reset = () => {
    if (!confirm('Zacząć grę od nowa? (Checklista pakowania zostaje.)')) return;
    const keep = state.checklist; state = fresh(); state.checklist = keep; show('intro');
  };
  $('#reset').onclick = reset; $('#replay').onclick = reset;

  const s1 = $('#season1-link');
  if (S.season1Url) s1.href = S.season1Url; else s1.hidden = true;

  show(state.screen);
})();
