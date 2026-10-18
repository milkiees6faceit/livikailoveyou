/* ============================================================
   💌 ЛОГИКА САЙТА-ВАЛЕНТИНКИ (v2 — стабильные переходы, SVG-фон)
   ------------------------------------------------------------
   ✏️ ПИСЬМО: LETTER_TEXT   🔑 СЛОВО: SECRET_WORD
   ============================================================ */

/* ✏️✏️✏️  МЕНЯЙ ТЕКСТ ПИСЬМА ЗДЕСЬ  ✏️✏️✏️ */
const LETTER_TEXT = "Моё солнышко… 💗\n\n"
+ "Если ты сейчас читаешь это письмо, значит, я смог подарить тебе хотя бы маленькую улыбку.\n\n"
+ "Я не знаю, как правильно описать словами всё то, что ты для меня значишь. Иногда хочется сказать так много, но любые слова кажутся слишком маленькими.\n\n"
+ "Ты — тот человек, который делает мои дни теплее, мысли счастливее, а мир чуточку красивее.\n\n"
+ "Мне нравится в тебе даже то, чего ты сама, возможно, не замечаешь. Твоя улыбка, твои привычки, твой характер, твои маленькие странности — всё это делает тебя именно тобой. И именно поэтому ты для меня такая особенная.\n\n"
+ "Я хочу, чтобы ты всегда помнила: ты достойна самых искренних чувств, нежности, заботы и огромного количества счастливых моментов.\n\n"
+ "Спасибо, что ты есть. Спасибо за то, что ты — это ты.\n\n"
+ "И если бы мне снова пришлось выбирать, кому подарить своё тепло, я бы снова выбрал тебя. 💌\n\n"
+ "Твой человек, который очень тебя любит. 💗";

/* 🔑 Секретное слово (можно поменять) */
const SECRET_WORD = "умница";

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOBILE  = window.matchMedia('(max-width: 640px)').matches;

/* ================== ЛЕТАЮЩИЙ ФОН (создаётся ОДИН раз) ================== */
(function makeBg(){
  const bg = document.getElementById('bg');
  const hearts = ['#h-glossy','#h-glass','#h-peach','#h-matte','#h-outline','#h-dots'];
  const stars  = ['#st-soft','#st-gold'];
  // 20–35 элементов на десктопе, меньше на телефоне и при reduced-motion
  const COUNT = REDUCED ? 8 : (MOBILE ? 14 : 24);
  const NS = 'http://www.w3.org/2000/svg';

  for (let i = 0; i < COUNT; i++) {
    const isStar = Math.random() < 0.28;
    const fl = document.createElement('div');
    fl.className = 'fl' + (isStar ? ' star' : '');

    const size  = isStar ? 9 + Math.random()*10 : 15 + Math.random()*30;
    const dur   = REDUCED ? 60 + Math.random()*30 : 16 + Math.random()*14;
    const delay = -Math.random() * dur;      // отрицательная задержка = сразу заполнен экран
    const x0    = Math.random() * 96;        // vw
    const sway  = 12 + Math.random()*26;     // px
    const op    = isStar ? (0.35 + Math.random()*0.5) : (0.3 + Math.random()*0.55);

    fl.style.setProperty('--dur',  dur + 's');
    fl.style.setProperty('--delay', delay + 's');
    fl.style.setProperty('--x0',   x0 + 'vw');
    fl.style.setProperty('--sway', sway + 'px');
    fl.style.setProperty('--op',   op.toFixed(2));

    const inn = document.createElement('div');
    inn.className = 'fl-in' + (isStar ? ' tw' : '');
    inn.style.setProperty('--sdur', (3.5 + Math.random()*3.5) + 's');
    inn.style.setProperty('--sdel', (-Math.random()*4) + 's');
    if (isStar) {
      inn.style.setProperty('--tdur', (1.6 + Math.random()*2.4) + 's');
      inn.style.setProperty('--tdel', (-Math.random()*2) + 's');
    }

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', isStar ? '0 0 16 16' : '0 0 32 30');
    svg.style.width  = size + 'px';
    svg.style.height = size + 'px';
    const use = document.createElementNS(NS, 'use');
    use.setAttribute('href', isStar
      ? stars[Math.floor(Math.random()*stars.length)]
      : hearts[Math.floor(Math.random()*hearts.length)]);
    svg.appendChild(use);
    inn.appendChild(svg);
    fl.appendChild(inn);
    bg.appendChild(fl);
  }
})();

/* ================== ПЕРЕХОДЫ МЕЖДУ ЭКРАНАМИ (защита от спама) ================== */
let transitioning = false;
function goTo(id){
  if (transitioning) return;
  const cur = document.querySelector('.screen.active');
  const next = document.getElementById(id);
  if (!cur || !next || cur === next) return;
  transitioning = true;

  const finish = () => {
    cur.classList.remove('active','leaving');
    next.classList.add('active');
    window.scrollTo(0, 0);            // наверх на новой странице
    transitioning = false;
  };
  if (REDUCED) { finish(); return; }
  cur.classList.add('leaving');
  setTimeout(finish, 550);
}

/* ================== ВЗРЫВ СЕРДЕЧЕК ================== */
function burst(x, y, n){
  n = n || 14;
  const em = ['💗','💕','💖','💘','✨'];
  for (let i = 0; i < n; i++){
    const h = document.createElement('div');
    h.className = 'burst-heart';
    h.textContent = em[Math.floor(Math.random()*em.length)];
    h.style.left = x + 'px';
    h.style.top  = y + 'px';
    const a = Math.random()*Math.PI*2, d = 70 + Math.random()*130;
    h.style.setProperty('--bx', Math.cos(a)*d + 'px');
    h.style.setProperty('--by', (Math.sin(a)*d - 60) + 'px');
    h.style.setProperty('--br', (Math.random()*120 - 60) + 'deg');
    h.style.fontSize = (16 + Math.random()*16) + 'px';
    document.body.appendChild(h);
    h.addEventListener('animationend', () => h.remove(), { once:true });
    setTimeout(() => h.remove(), 1800); // страховка
  }
}
function burstFrom(el, n){
  const r = el.getBoundingClientRect();
  burst(r.left + r.width/2, r.top + r.height/2, n);
}

/* ================== ЭКРАН 1 ================== */
const btnYes = document.getElementById('btnYes'),
      btnNo  = document.getElementById('btnNo'),
      s1hint = document.getElementById('s1hint');
const finePointer = window.matchMedia('(pointer: fine)').matches;

btnYes.addEventListener('click', e => {
  if (btnYes.disabled) return;
  btnYes.disabled = true;
  burst(e.clientX, e.clientY, 22);
  s1hint.textContent = 'Урааа! Я так и знал 🥹💕';
  setTimeout(() => goTo('s2'), 900);
});

let noCount = 0;
function dodge(){
  if (!finePointer) return;             // на телефоне не уворачиваемся
  btnNo.style.position = 'relative';
  btnNo.style.left = ((Math.random()*2 - 1) * 55) + 'px';
  btnNo.style.top  = ((Math.random()*2 - 1) * 30) + 'px';
}
btnNo.addEventListener('mouseenter', dodge);
btnNo.addEventListener('click', () => {
  noCount++;
  dodge();
  const msgs = ['А ну-ка подумай ещё раз, котик 😾💕','Хмм… попробуй ещё разочек 🥺',
                'Точно-точно? Сердечко ведь знает правду 💗','Давай попробуем снова? 😽'];
  s1hint.textContent = msgs[noCount % msgs.length];
  btnNo.classList.remove('shake');
  void btnNo.offsetWidth;
  btnNo.classList.add('shake');
});

/* ================== ЭКРАН 2 ================== */
const input    = document.getElementById('secretInput'),
      checkBtn = document.getElementById('checkBtn'),
      s2hint   = document.getElementById('s2hint'),
      nextBtn  = document.getElementById('nextBtn');
let solved = false, goingNext = false;

function checkWord(){
  if (solved) return;
  const val = input.value.trim().toLowerCase().replace(/\s+/g,' ');
  if (val === SECRET_WORD.toLowerCase()){
    solved = true;
    input.classList.add('ok');
    s2hint.textContent = 'Правильно, моя умница! 🥹💕';
    burstFrom(input, 20);
    checkBtn.style.display = 'none';
    nextBtn.classList.add('show');
  } else {
    input.classList.remove('ok');
    s2hint.textContent = 'Нееет, подумай ещё, солнышко 🥺💕';
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
  }
}
checkBtn.addEventListener('click', checkWord);
input.addEventListener('keydown', e => { if (e.key === 'Enter') checkWord(); });
nextBtn.addEventListener('click', e => {
  if (goingNext) return;
  goingNext = true;
  burst(e.clientX, e.clientY, 16);
  setTimeout(() => goTo('s3'), 700);
});

/* ================== ЭКРАН 3: КОНВЕРТ И ПИСЬМО ================== */
const envelope  = document.getElementById('envelope'),
      envFlap   = document.getElementById('envFlap'),
      openBtn   = document.getElementById('openBtn'),
      envScene  = document.getElementById('envScene'),
      letterFull= document.getElementById('letterFull'),
      letterText= document.getElementById('letterText'),
      readBtn   = document.getElementById('readBtn');
let opening = false, folding = false;

/* текст письма; первая строка — приветствие */
(function fillLetter(){
  const parts = LETTER_TEXT.split('\n\n');
  letterText.innerHTML = parts.map((p, i) => {
    const esc = p.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    return i === 0 ? '<span class="salut">' + esc + '</span>' : esc;
  }).join('\n\n');
})();

openBtn.addEventListener('click', e => {
  if (opening) return;
  opening = true;
  openBtn.disabled = true;
  burst(e.clientX, e.clientY, 14);

  envelope.classList.add('glow');                                   // 1. свечение
  setTimeout(() => envelope.classList.add('open'), 450);            // 2. клапан + лист
  setTimeout(() => { envFlap.style.zIndex = 1; }, 900);             // клапан «за» конверт

  setTimeout(() => {                                                // 3. конверт уходит
    envScene.style.opacity = '0';
    envScene.style.transform = 'scale(.85)';
    setTimeout(() => {
      envScene.style.display = 'none';
      letterFull.classList.add('show');                             // 4. письмо раскрывается
      window.scrollTo(0, 0);
      const showRead = () => readBtn.classList.add('show');
      if (REDUCED) { setTimeout(showRead, 300); }
      else {
        letterFull.addEventListener('animationend', showRead, { once:true });
        setTimeout(showRead, 1800);                                 // страховка
      }
    }, 550);
  }, 2400);
});

readBtn.addEventListener('click', e => {
  if (folding) return;
  folding = true;
  burst(e.clientX, e.clientY, 24);
  letterFull.classList.add('fold');
  const go = () => goTo('s4');
  if (REDUCED) setTimeout(go, 200);
  else {
    letterFull.addEventListener('animationend', go, { once:true });
    setTimeout(go, 900);                                            // страховка
  }
});

/* ================== ЭКРАН 4: ОБНИМАШКИ ================== */
const hugBtn      = document.getElementById('hugBtn'),
      hugOverlay  = document.getElementById('hugOverlay');
let hugTimer = null, hugInterval = null;

hugBtn.addEventListener('click', e => {
  burst(e.clientX, e.clientY, 26);
  hugOverlay.classList.add('show');
  clearInterval(hugInterval);
  let n = 0;
  hugInterval = setInterval(() => {
    burst(Math.random()*innerWidth, Math.random()*innerHeight, 8);
    if (++n > 5) { clearInterval(hugInterval); hugInterval = null; }
  }, 220);
  clearTimeout(hugTimer);
  hugTimer = setTimeout(() => hugOverlay.classList.remove('show'), 2600);
});
hugOverlay.addEventListener('click', () => {
  hugOverlay.classList.remove('show');
  clearTimeout(hugTimer);
  clearInterval(hugInterval);
});
