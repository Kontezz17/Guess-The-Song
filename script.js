const SONGS = [
  {title:'Billie Jean', artist:'Michael Jackson', year:1982, id:'Zi_XLOBDo_Y', start:20},
  {title:'Like a Prayer', artist:'Madonna', year:1989, id:'79fzeNUqQbQ', start:10},
  {title:'Smells Like Teen Spirit', artist:'Nirvana', year:1991, id:'hTWKbfoikeg', start:30},
  {title:'Wonderwall', artist:'Oasis', year:1995, id:'bx1Bh8ZvH84', start:10},
  {title:'Hey Ya!', artist:'OutKast', year:2003, id:'PWgvGjAhvIw', start:20},
  {title:'Rolling in the Deep', artist:'Adele', year:2010, id:'rYEDA3JcQqw', start:25},
  {title:'Shape of You', artist:'Ed Sheeran', year:2017, id:'JGwWNGJdvx8', start:15},
  {title:'Blinding Lights', artist:'The Weeknd', year:2019, id:'4NRXx6U8ABQ', start:30},
  {title:'Take On Me', artist:'a-ha', year:1985, id:'djV11Xbc914', start:30},
  {title:'Sweet Child O\' Mine', artist:'Guns N\' Roses', year:1987, id:'1w7OgIMMRc4', start:25},
  {title:'I Want to Break Free', artist:'Queen', year:1984, id:'f4Mc-NYPHaQ', start:20},
  {title:'No Scrubs', artist:'TLC', year:1999, id:'FrLequ6dUdM', start:15},
  {title:'…Baby One More Time', artist:'Britney Spears', year:1998, id:'C-u5WLJ9Yk4', start:10},
  {title:'Hotel California', artist:'Eagles', year:1976, id:'EqPtz5qN7HM', start:40},
  {title:'Imagine', artist:'John Lennon', year:1971, id:'YkgkThdzX-8', start:20},
  {title:'Billie Eilish - Bad Guy', artist:'Billie Eilish', year:2019, id:'DyDfgMOUjCI', start:10},
  {title:'Uptown Funk', artist:'Mark Ronson ft. Bruno Mars', year:2014, id:'OPf0YbXqDm0', start:20},
  {title:'Take Me to Church', artist:'Hozier', year:2013, id:'PVjiKRfKpPI', start:10},
  {title:'Numb', artist:'Linkin Park', year:2003, id:'kXYiU_JCYtU', start:15},
  {title:'Africa', artist:'Toto', year:1982, id:'FTQbiNvZqaY', start:30},
  {title:'Beat It', artist:'Michael Jackson', year:1982, id:'oRdxUFDoQe0', start:25},
  {title:'Hey Jude', artist:'The Beatles', year:1968, id:'A_MjCqQoLLA', start:40},
  {title:'Stairway to Heaven', artist:'Led Zeppelin', year:1971, id:'QkF3oxziUI4', start:30},
  {title:'Lose Yourself', artist:'Eminem', year:2002, id:'_Yhyp-_hX2s', start:30},
  {title:'Wonder', artist:'Shawn Mendes', year:2020, id:'bPJSsAr2iu0', start:20},
  {title:'Someone Like You', artist:'Adele', year:2011, id:'hLQl3WQQoQ0', start:20},
  {title:'Toxic', artist:'Britney Spears', year:2004, id:'LOZuxwVk7TU', start:20},
  {title:'Sweet Dreams (Are Made of This)', artist:'Eurythmics', year:1983, id:'qeMFqkcPYcg', start:15},
  {title:'Heroes', artist:'David Bowie', year:1977, id:'m9wS4P6t8r4', start:20},
  {title:'Wake Me Up', artist:'Avicii', year:2013, id:'IcrbM1l_BoI', start:10}
];

let pool=[], timeline=[], current=null;
const startBtn=document.getElementById('startBtn');
const startSection=document.getElementById('gameSetup');
const board=document.getElementById('board');
const playerSection=document.getElementById('player');
const resultsSection=document.getElementById('results');
const timelineDiv=document.getElementById('timeline');
const playerArea=document.getElementById('playerArea');
const songTitle=document.getElementById('songTitle');
const playBtn=document.getElementById('playBtn');
const placeLeftBtn=document.getElementById('placeLeft');
const placeRightBtn=document.getElementById('placeRight');
const nextCardBtn=document.getElementById('nextCard');
const feedback=document.getElementById('feedback');
const resultsInner=document.getElementById('resultsInner');
document.getElementById('restart').addEventListener('click',()=>location.reload());
startBtn.addEventListener('click',initGame);
playBtn.addEventListener('click',playCurrent);
placeLeftBtn.addEventListener('click',()=>place('left'));
placeRightBtn.addEventListener('click',()=>place('right'));
nextCardBtn.addEventListener('click',nextRound);

function initGame(){
  const count=Math.max(3,Math.min(30,parseInt(document.getElementById('count').value||10)));
  pool=shuffle(SONGS).slice(0,count);
  timeline=[];
  current=pool.pop();
  timeline.push(current);
  renderTimeline();
  songTitle.textContent=`Pierwsza piosenka: ${current.title}`;
  startSection.classList.add('hidden');
  board.classList.remove('hidden');
  playerSection.classList.remove('hidden');
  resultsSection.classList.add('hidden');
  nextCardBtn.classList.add('hidden');
}

function playCurrent(){
  if(!current) return;
  const url=`https://www.youtube.com/embed/${current.id}?autoplay=1&start=${current.start}&rel=0&controls=1`;
  playerArea.innerHTML=`<iframe width="560" height="120" src="${url}" frameborder="0" allow="autoplay; encrypted-media"></iframe>`;
}

function place(side){
  if(!current) return;
  timeline.push(current); // dla uproszczenia dodajemy na końcu
  feedback.textContent=`Dodano ${current.title}.`;
  renderTimeline();
  nextCardBtn.classList.remove('hidden');
}

function nextRound(){
  feedback.textContent='';
  if(pool.length===0){endGame(); return;}
  current=pool.pop();
  songTitle.textContent=`Aktualna piosenka: ${current.title}`;
  playerArea.innerHTML='';
  nextCardBtn.classList.add('hidden');
}

function endGame(){
  const correctOrder=[...timeline].sort((a,b)=>a.year-b.year);
  let score=0;
  timeline.forEach((s,i)=>{if(s.year===correctOrder[i].year) score++;});
  resultsInner.innerHTML=`<div>${timeline.map(s=>s.title+' — '+s.year).join('<br>')}</div><p>Wynik: ${score}/${timeline.length}</p>`;
  board.classList.add('hidden');
  playerSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
}

function renderTimeline(){
  timelineDiv.innerHTML='';
  timeline.forEach(s=>{
    const div=document.createElement('div');
    div.className='tile';
    div.innerHTML=`<strong>${s.title}</strong><div class="meta">${s.artist}</div>`;
    timelineDiv.appendChild(div);
  });
}

function shuffle(a){return a.slice().sort(()=>Math.random()-0.5);}
