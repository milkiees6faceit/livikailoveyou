/* ============================================================
   💌 ЛОГИКА САЙТА-ВАЛЕНТИНКИ
   ------------------------------------------------------------
   ✏️ ПИСЬМО: замени текст в LETTER_TEXT на своё.
      Каждый абзац — в кавычках, между абзацами  \n\n
   🔑 СЕКРЕТНОЕ СЛОВО: поменяй значение SECRET_WORD
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

/* ================== ЛЕТАЮЩИЙ ФОН ================== */
(function makeBg(){
  const bg=document.getElementById('bg');
  const icons=['💗','💕','🤍','✨','⭐','🌸','💫'];
  for(let i=0;i<26;i++){
    const s=document.createElement('span');
    s.textContent=icons[Math.floor(Math.random()*icons.length)];
    s.style.left=Math.random()*100+'vw';
    s.style.fontSize=(10+Math.random()*16)+'px';
    const dur=9+Math.random()*10;
    s.style.animationDuration=dur+'s';
    s.style.animationDelay=(-Math.random()*dur)+'s';
    s.style.setProperty('--sway',(Math.random()*60-30)+'px');
    s.style.setProperty('--rot',(Math.random()*70-35)+'deg');
    bg.appendChild(s);
  }
})();

/* ================== ПЕРЕХОДЫ МЕЖДУ ЭКРАНАМИ ================== */
function goTo(id){
  const cur=document.querySelector('.screen.active');
  const next=document.getElementById(id);
  if(cur===next)return;
  cur.classList.add('leaving');
  setTimeout(()=>{
    cur.classList.remove('active','leaving');
    next.classList.add('active');
    next.scrollTop=0;
  },650);
}

/* ================== ВЗРЫВ СЕРДЕЧЕК ================== */
function burst(x,y,n){
  n=n||14;
  const em=['💗','💕','💖','💘','✨'];
  for(let i=0;i<n;i++){
    const h=document.createElement('div');
    h.className='burst-heart';
    h.textContent=em[Math.floor(Math.random()*em.length)];
    h.style.left=x+'px';h.style.top=y+'px';
    const a=Math.random()*Math.PI*2,d=70+Math.random()*130;
    h.style.setProperty('--bx',Math.cos(a)*d+'px');
    h.style.setProperty('--by',(Math.sin(a)*d-60)+'px');
    h.style.setProperty('--br',(Math.random()*120-60)+'deg');
    h.style.fontSize=(16+Math.random()*16)+'px';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1600);
  }
}
function burstFrom(el,n){const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,n)}

/* ================== ЭКРАН 1 ================== */
const btnYes=document.getElementById('btnYes'),
      btnNo=document.getElementById('btnNo'),
      s1hint=document.getElementById('s1hint');
const finePointer=window.matchMedia('(pointer:fine)').matches;

btnYes.addEventListener('click',e=>{
  burst(e.clientX,e.clientY,22);
  s1hint.textContent='Урааа! Я так и знал 🥹💕';
  setTimeout(()=>goTo('s2'),900);
});

let noCount=0;
function dodge(){
  if(!finePointer)return; /* на телефоне не уворачиваемся */
  const pad=60;
  const x=(Math.random()*2-1)*pad;
  const y=(Math.random()*2-1)*pad;
  btnNo.style.position='relative';
  btnNo.style.left=x+'px';
  btnNo.style.top=y+'px';
}
btnNo.addEventListener('mouseenter',dodge);
btnNo.addEventListener('touchstart',()=>{}, {passive:true});
btnNo.addEventListener('click',()=>{
  noCount++;
  dodge();
  const msgs=['А ну-ка подумай ещё раз, котик 😾💕','Хмм… попробуй ещё разочек 🥺','Точно-точно? Сердечко ведь знает правду 💗','Давай попробуем снова? 😽'];
  s1hint.textContent=msgs[noCount%msgs.length];
  btnNo.classList.remove('shake');void btnNo.offsetWidth;btnNo.classList.add('shake');
});

/* ================== ЭКРАН 2 ================== */
const input=document.getElementById('secretInput'),
      checkBtn=document.getElementById('checkBtn'),
      s2hint=document.getElementById('s2hint'),
      nextBtn=document.getElementById('nextBtn');

function checkWord(){
  const val=input.value.trim().toLowerCase();
  if(val===SECRET_WORD.toLowerCase()){
    input.classList.add('ok');
    s2hint.textContent='Правильно, моя умница! 🥹💕';
    burstFrom(input,20);
    checkBtn.style.display='none';
    nextBtn.classList.add('show');
  }else{
    input.classList.remove('ok');
    s2hint.textContent='Нееет, подумай ещё, солнышко 🥺💕';
    input.classList.remove('shake');void input.offsetWidth;input.classList.add('shake');
  }
}
checkBtn.addEventListener('click',checkWord);
input.addEventListener('keydown',e=>{if(e.key==='Enter')checkWord()});
nextBtn.addEventListener('click',e=>{burst(e.clientX,e.clientY,16);setTimeout(()=>goTo('s3'),700)});

/* ================== ЭКРАН 3: КОНВЕРТ И ПИСЬМО ================== */
const envelope=document.getElementById('envelope'),
      openBtn=document.getElementById('openBtn'),
      envScene=document.getElementById('envScene'),
      letterFull=document.getElementById('letterFull'),
      letterText=document.getElementById('letterText'),
      readBtn=document.getElementById('readBtn');

/* подставляем текст письма, первая строка — приветствие красным */
(function fillLetter(){
  const parts=LETTER_TEXT.split('\n\n');
  letterText.innerHTML=parts.map((p,i)=>{
    const esc=p.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    return i===0?'<span class="salut">'+esc+'</span>':esc;
  }).join('\n\n');
})();

openBtn.addEventListener('click',e=>{
  burst(e.clientX,e.clientY,14);
  envelope.classList.add('glow');
  setTimeout(()=>envelope.classList.add('open'),450);

  /* конверт исчезает, письмо раскрывается */
  setTimeout(()=>{
    envScene.style.transition='opacity .6s,transform .6s';
    envScene.style.opacity='0';
    envScene.style.transform='scale(.85)';
    setTimeout(()=>{
      envScene.style.display='none';
      letterFull.classList.add('show');
      setTimeout(()=>readBtn.classList.add('show'),1400);
    },550);
  },2400);
});

readBtn.addEventListener('click',e=>{
  burst(e.clientX,e.clientY,24);
  letterFull.classList.add('fold');
  setTimeout(()=>goTo('s4'),750);
});

/* ================== ЭКРАН 4: ОБНИМАШКИ ================== */
const hugBtn=document.getElementById('hugBtn'),
      hugOverlay=document.getElementById('hugOverlay');
hugBtn.addEventListener('click',e=>{
  burst(e.clientX,e.clientY,26);
  hugOverlay.classList.add('show');
  let n=0;
  const iv=setInterval(()=>{
    burst(Math.random()*innerWidth,Math.random()*innerHeight,8);
    if(++n>5){clearInterval(iv);}
  },220);
  setTimeout(()=>hugOverlay.classList.remove('show'),2600);
});
hugOverlay.addEventListener('click',()=>hugOverlay.classList.remove('show'));
