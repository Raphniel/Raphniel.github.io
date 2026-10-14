// KONFIGURASI: ganti nomor WhatsApp admin dan sesuaikan nama/harga produk sebelum live.
const CONFIG = { whatsapp: '6281317832355', currency: 'id-ID' };
const games = [
 {id:'ml',name:'Mobile Legends',short:'MLBB',category:'MOBA • DIAMOND',symbol:'ML',colors:['#2466bb','#7138d9'],products:[['86 Diamonds',20000],['172 Diamonds',39000],['257 Diamonds',58000],['344 Diamonds',77000]]},
 {id:'ff',name:'Free Fire',short:'FREE FIRE',category:'BATTLE ROYALE • DIAMOND',symbol:'FF',colors:['#f28a28','#c72d47'],products:[['70 Diamonds',10000],['140 Diamonds',20000],['355 Diamonds',49000],['720 Diamonds',97000]]},
 {id:'pubg',name:'PUBG Mobile',short:'PUBG',category:'BATTLE ROYALE • UC',symbol:'UC',colors:['#c48a31','#633b22'],products:[['60 UC',16000],['325 UC',79000],['660 UC',159000],['1800 UC',399000]]},
 {id:'gi',name:'Genshin Impact',short:'GENSHIN',category:'RPG • CRYSTAL',symbol:'✧',colors:['#48a9b7','#6655bf'],products:[['60 Genesis Crystal',16000],['300 + 30 Crystal',79000],['980 + 110 Crystal',249000],['Blessing Welkin Moon',79000]]},
 {id:'valo',name:'Valorant',short:'VALORANT',category:'FPS • POINTS',symbol:'V',colors:['#ef526b','#822d53'],products:[['125 VP',15000],['420 VP',50000],['700 VP',80000],['1375 VP',150000]]}
];
const money = n => new Intl.NumberFormat(CONFIG.currency,{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const grid=document.querySelector('#gameGrid');
function renderGames(){grid.innerHTML=games.map(g=>`<article class="game-card" data-game="${g.id}" tabindex="0" role="button" aria-label="Top up ${g.name}"><div class="game-art" style="background:linear-gradient(140deg,${g.colors[0]},${g.colors[1]})"><span>${g.symbol}</span></div><div class="game-info"><small>${g.category}</small><h3>${g.name}</h3><button type="button" data-select="${g.id}">Pilih Game ↗</button></div></article>`).join('');}
renderGames();document.querySelector('#year').textContent=new Date().getFullYear();
const modal=document.querySelector('#modal');let activeGame=null,activeProduct=null;
function openGame(id){activeGame=games.find(g=>g.id===id);if(!activeProduct || activeProduct[1] == null){alert('Paket ini belum tersedia. Silakan pilih paket dengan harga yang tersedia.');return;}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-select]');const c=e.target.closest('[data-game]');if(b)openGame(b.dataset.select);else if(c)openGame(c.dataset.game)});grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-game]')){e.preventDefault();openGame(e.target.dataset.game)}});
document.querySelector('#denomGrid').innerHTML=activeGame.products.map((p,i)=>`<button type="button" class="denom" data-product="${i}" ${p[1] == null ? 'disabled' : ''}><strong>${p[0]}</strong><small>${p[1] == null ? 'Segera Hadir' : money(p[1])}</small></button>`).join('');
function closeModal(){modal.hidden=true;document.body.style.overflow='';}document.querySelector('#closeModal').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});
document.querySelector('#denomGrid').addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(!b||b.disabled)return;activeProduct=activeGame.products[Number(b.dataset.product)];if(activeProduct[1]==null)return;document.querySelectorAll('.denom').forEach(x=>x.classList.toggle('selected',x===b));document.querySelector('#totalPrice').textContent=money(activeProduct[1]);});

