const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ic=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const shuf=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
// Bank soal: [pertanyaan, [4 pilihan], indeks jawaban benar, penjelasan, level 0=mudah 1=sedang 2=sulit]
const S=[
{n:'Matematika',d:'Hitungan, aljabar, geometri.',c:'#2F6BFF',i:'M4 7h16M4 17h16M9 3l-2 18M17 3l-2 18',q:[
["Hasil dari 12 × 8 adalah ...",["86","96","108","98"],1,"12 × 8 = 96.",0],
["Nilai x pada 3x + 5 = 20 adalah ...",["3","5","15","25"],1,"3x = 15, sehingga x = 5.",0],
["Luas lingkaran berjari-jari 7 cm (π = 22/7) adalah ...",["44 cm²","144 cm²","154 cm²","308 cm²"],2,"L = πr² = 22/7 × 49 = 154.",1],
["Akar kuadrat dari 225 adalah ...",["15","25","14","45"],0,"15 × 15 = 225.",1],
["Turunan dari f(x) = x³ adalah ...",["x²","3x","3x²","x⁴"],2,"Aturan pangkat: 3x².",2]]},
{n:'Bahasa Indonesia',d:'Kosakata, ejaan, majas.',c:'#EF4B6C',i:'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM8 7h7',q:[
["Antonim kata 'tinggi' adalah ...",["Panjang","Rendah","Besar","Jauh"],1,"Lawan kata tinggi adalah rendah.",0],
["Kalimat dengan huruf kapital yang benar adalah ...",["Saya tinggal di jakarta.","Saya tinggal di Jakarta.","saya tinggal di Jakarta.","Saya Tinggal di Jakarta."],1,"Nama kota dan awal kalimat diawali huruf kapital.",0],
["Bentuk baku dari 'apotik' adalah ...",["Apotek","Apotik","Apoteek","Apotex"],0,"Menurut KBBI bentuk bakunya apotek.",1],
["'Hatinya batu' termasuk majas ...",["Hiperbola","Metafora","Litotes","Ironi"],1,"Perbandingan langsung tanpa kata 'seperti': metafora.",1],
["Kalimat yang memuat gagasan pokok paragraf disebut kalimat ...",["Penjelas","Utama","Penutup","Tanya"],1,"Kalimat utama memuat gagasan pokok.",2]]},
{n:'Bahasa Inggris',d:'Grammar dan vocabulary.',c:'#22B8CF',i:'M21 12a8 8 0 01-11.5 7.2L4 20l1-4.5A8 8 0 1121 12z',q:[
["She ___ to school every day.",["go","goes","going","gone"],1,"Subjek orang ketiga tunggal memakai 'goes'.",0],
["Past tense dari 'write' adalah ...",["writed","wrote","written","writing"],1,"Write, wrote, written.",0],
["Sinonim 'big' adalah ...",["Small","Large","Thin","Short"],1,"Large berarti besar.",1],
["I have lived here ___ 2015.",["for","since","at","during"],1,"'Since' untuk titik awal waktu.",1],
["If I ___ rich, I would travel the world.",["am","was","were","be"],2,"Conditional type 2 memakai 'were'.",2]]},
{n:'IPA',d:'Fisika, kimia, biologi dasar.',c:'#22C58B',i:'M9 3h6M10 3v6L4 19a1 1 0 001 1h14a1 1 0 001-1l-6-10V3',q:[
["Planet terdekat dari Matahari adalah ...",["Venus","Merkurius","Bumi","Mars"],1,"Merkurius paling dekat dengan Matahari.",0],
["Gas yang dihirup manusia untuk bernapas adalah ...",["Nitrogen","Oksigen","Karbon dioksida","Hidrogen"],1,"Oksigen dipakai dalam respirasi.",0],
["Rumus kimia air adalah ...",["CO₂","H₂O","O₂","NaCl"],1,"Satu molekul air: dua atom H, satu atom O.",1],
["Organel tempat fotosintesis adalah ...",["Mitokondria","Kloroplas","Ribosom","Nukleus"],1,"Kloroplas mengandung klorofil.",1],
["Satuan gaya dalam SI adalah ...",["Joule","Watt","Newton","Pascal"],2,"Gaya diukur dalam newton (N).",2]]},
{n:'IPS',d:'Ekonomi dan masyarakat.',c:'#F59E0B',i:'M16 11a3 3 0 100-6 3 3 0 000 6zM3 20a6 6 0 0112 0M17 14a5 5 0 014 6',q:[
["Kegiatan menggunakan barang untuk memenuhi kebutuhan disebut ...",["Produksi","Distribusi","Konsumsi","Investasi"],2,"Konsumsi adalah penggunaan barang dan jasa.",0],
["Mata uang Indonesia adalah ...",["Ringgit","Rupiah","Baht","Peso"],1,"Rupiah (IDR).",0],
["Hubungan timbal balik antarindividu disebut ...",["Interaksi sosial","Migrasi","Urbanisasi","Stratifikasi"],0,"Itulah interaksi sosial.",1],
["Perpindahan penduduk dari desa ke kota disebut ...",["Transmigrasi","Urbanisasi","Emigrasi","Imigrasi"],1,"Perpindahan desa ke kota adalah urbanisasi.",1],
["Lembaga yang berwenang mengedarkan uang rupiah adalah ...",["OJK","Bank Indonesia","BPS","Kemenkeu"],1,"Bank Indonesia berwenang mengeluarkan dan mengedarkan rupiah.",2]]},
{n:'Sejarah',d:'Peristiwa dan tokoh bangsa.',c:'#C0803F',i:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',q:[
["Proklamasi kemerdekaan dibacakan pada ...",["17 Agustus 1945","1 Juni 1945","28 Oktober 1928","20 Mei 1908"],0,"Dibacakan Soekarno-Hatta pada 17 Agustus 1945.",0],
["Presiden pertama Republik Indonesia adalah ...",["Soeharto","Soekarno","B.J. Habibie","Moh. Hatta"],1,"Soekarno.",0],
["Sumpah Pemuda diikrarkan pada tahun ...",["1908","1928","1945","1955"],1,"28 Oktober 1928.",1],
["Candi Borobudur dibangun oleh wangsa ...",["Majapahit","Sriwijaya","Syailendra","Kediri"],2,"Dibangun Wangsa Syailendra, Mataram Kuno.",1],
["Konferensi Asia Afrika 1955 diadakan di ...",["Jakarta","Bandung","Yogyakarta","Surabaya"],1,"Berlangsung di Bandung.",2]]},
{n:'Geografi',d:'Peta, benua, dan alam.',c:'#14B8A6',i:'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',q:[
["Samudra terluas di dunia adalah ...",["Atlantik","Hindia","Pasifik","Arktik"],2,"Samudra Pasifik.",0],
["Gunung tertinggi di dunia adalah ...",["K2","Everest","Kilimanjaro","Elbrus"],1,"Everest, ±8.849 m.",0],
["Garis khayal yang membagi bumi menjadi utara dan selatan adalah ...",["Meridian","Khatulistiwa","Garis tanggal","Zona waktu"],1,"Khatulistiwa (ekuator), lintang 0°.",1],
["Sungai terpanjang di Indonesia, Kapuas, berada di pulau ...",["Sumatra","Kalimantan","Jawa","Sulawesi"],1,"Sungai Kapuas mengalir di Kalimantan Barat.",1],
["Selat yang memisahkan Pulau Jawa dan Sumatra adalah ...",["Sunda","Malaka","Bali","Makassar"],0,"Selat Sunda.",2]]},
{n:'Pendidikan Pancasila',d:'Nilai dan dasar negara.',c:'#EF4444',i:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',q:[
["Sila pertama Pancasila adalah ...",["Kemanusiaan yang adil dan beradab","Ketuhanan Yang Maha Esa","Persatuan Indonesia","Keadilan sosial"],1,"Ketuhanan Yang Maha Esa.",0],
["Lambang sila ketiga adalah ...",["Bintang","Rantai","Pohon beringin","Kepala banteng"],2,"Pohon beringin melambangkan persatuan.",0],
["Pancasila disahkan sebagai dasar negara pada ...",["17 Agustus 1945","18 Agustus 1945","1 Juni 1945","22 Juni 1945"],1,"Disahkan PPKI pada 18 Agustus 1945.",1],
["Contoh pengamalan sila kedua adalah ...",["Bermusyawarah","Menghormati sesama manusia","Beribadah","Gotong royong"],1,"Sila kedua tentang kemanusiaan.",1],
["Pembukaan UUD 1945 terdiri atas berapa alinea?",["3","4","5","6"],1,"Empat alinea.",2]]},
{n:'Informatika',d:'Komputer, kode, dan data.',c:'#8B5CF6',i:'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',q:[
["Kepanjangan CPU adalah ...",["Central Processing Unit","Computer Power Unit","Central Program Utility","Core Processing Unit"],0,"Central Processing Unit.",0],
["Perangkat input berikut adalah ...",["Monitor","Printer","Keyboard","Speaker"],2,"Keyboard memasukkan data.",0],
["Bahasa untuk membangun struktur halaman web adalah ...",["CSS","HTML","SQL","Python"],1,"HTML menyusun struktur halaman.",1],
["Sistem bilangan yang hanya memakai 0 dan 1 adalah ...",["Desimal","Biner","Oktal","Heksadesimal"],1,"Biner.",1],
["Bilangan biner 101 sama dengan desimal ...",["3","5","6","7"],1,"4 + 0 + 1 = 5.",2]]},
{n:'Pengetahuan Umum',d:'Wawasan dari berbagai bidang.',c:'#E879F9',i:'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z',q:[
["Hewan tercepat di darat adalah ...",["Singa","Citah","Kuda","Rusa"],1,"Citah mencapai ±100 km/jam.",0],
["Benua terbesar di dunia adalah ...",["Afrika","Asia","Eropa","Amerika"],1,"Asia.",0],
["Pelukis Mona Lisa adalah ...",["Picasso","Leonardo da Vinci","Van Gogh","Michelangelo"],1,"Leonardo da Vinci.",1],
["Jumlah pemain inti satu tim sepak bola di lapangan adalah ...",["9","10","11","12"],2,"Sebelas pemain.",1],
["Unsur dengan simbol Au adalah ...",["Perak","Emas","Aluminium","Argon"],1,"Au berasal dari 'aurum', emas.",2]]}];
const MODE={solo:'Solo Challenge',duel:'Duel 2 Pemain',time:'Time Attack',survival:'Survival'};
const ACH={first:'Langkah Pertama: selesaikan satu permainan',c5:'Combo 5: lima jawaban benar beruntun',pf:'Sempurna: akurasi 100%',sv:'Penyintas: selesaikan Survival tanpa kehilangan nyawa'};
let cfg=store.get('cc_cfg',{sfx:true,vol:.5,dark:true}),g={over:true},sel=0,pick={lv:'x',mode:'solo',dur:60};
const save=()=>{store.set('cc_cfg',cfg);document.documentElement.dataset.t=cfg.dark?'dark':'light'};
// Audio
let ac;const beep=(f,t=.12,ty='sine')=>{if(!cfg.sfx)return;try{ac=ac||new AudioContext();const o=ac.createOscillator(),v=ac.createGain();o.type=ty;o.frequency.value=f;v.gain.value=cfg.vol*.3;o.connect(v);v.connect(ac.destination);o.start();v.gain.exponentialRampToValueAtTime(.001,ac.currentTime+t);o.stop(ac.currentTime+t)}catch{}};
// Maskot
$$('.slot').forEach(s=>s.append($('#mas').content.cloneNode(true)));
const mood=m=>$$('.mas').forEach(e=>e.dataset.mood=m);
function show(id){$$('.scr').forEach(s=>s.classList.toggle('on',s.id===id));mood(id==='menu'?'wave':'idle');scrollTo(0,0)}
// Menu
$('#stats').innerHTML=[[S.length,'Kategori'],[S.reduce((a,s)=>a+s.q.length,0),'Soal'],[4,'Mode']].map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join('');
$('#grid').innerHTML=S.map((s,i)=>`<button class="card" style="--c:${s.c}" data-i="${i}">${ic(s.i)}<h3>${s.n}</h3><p>${s.d}</p><small>${s.q.length} soal, Mudah sampai Sulit</small></button>`).join('');
$('#go').onclick=()=>show('subjects');
$$('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
$$('[data-d]').forEach(b=>b.onclick=()=>{if(b.dataset.d==='lb')renderLB();$('#'+b.dataset.d).showModal()});
$$('.card').forEach(c=>c.onclick=()=>{sel=+c.dataset.i;$('#sn').textContent=S[sel].n;syncChips();$('#su').showModal()});
function syncChips(){$$('.chips').forEach(c=>$$('button',c).forEach(b=>b.classList.toggle('on',b.dataset.v==pick[c.dataset.k])));$('#du').hidden=pick.mode!=='time'}
$$('.chips button').forEach(b=>b.onclick=()=>{pick[b.parentNode.dataset.k]=b.dataset.v;syncChips()});
$('#run').onclick=()=>setTimeout(start,0);
// Pengaturan
$('#sfx').checked=cfg.sfx;$('#vol').value=cfg.vol;$('#dk').checked=cfg.dark;save();
$('#sfx').onchange=e=>{cfg.sfx=e.target.checked;save()};$('#vol').oninput=e=>{cfg.vol=+e.target.value;save();beep(520)};$('#dk').onchange=e=>{cfg.dark=e.target.checked;save()};
// Permainan
function start(){const s=S[sel];let q=s.q.map(([t,o,a,e,l])=>({t,o,a,e,l}));q=shuf(q);
if(pick.lv!=='x')q.sort((a,b)=>Math.abs(a.l-pick.lv)-Math.abs(b.l-pick.lv));
q=q.map(x=>{const c=x.o[x.a],o=shuf(x.o);return{...x,o,a:o.indexOf(c)}});
clearInterval(g.iv);clearTimeout(g.to);
g={s,mode:pick.mode,q,i:0,sc:[0,0],p:0,lives:3,combo:0,best:0,ok:0,no:0,t0:Date.now(),log:[],dur:+pick.dur,left:+pick.dur,over:false,tl:15};
$('#tbw').hidden=false;show('game');render();mood('think');g.iv=setInterval(tick,100)}
function hud(){$('#hn').textContent=g.s.n;$('#hc').textContent=`Soal ${g.i+1}${g.mode==='time'?'':' / '+g.q.length}`;$('#pb i').style.width=(g.i/g.q.length*100)+'%';
$('#sc').textContent=g.mode==='duel'?`P1 ${g.sc[0]}  P2 ${g.sc[1]}`:`Skor ${g.sc[0]}`;
$('#st').textContent=g.mode==='duel'?`Giliran Pemain ${g.p+1}`:g.mode==='survival'?`Nyawa ${g.lives} / 3`:g.combo>1?`Combo x${g.combo}`:'Jawab dengan tepat';}
function render(){const c=g.cur=g.q[g.i];g.lock=false;g.tl=15;$('#qt').textContent=c.t;
$('#an').innerHTML=c.o.map((o,i)=>`<button class="a" data-k="${i}"><b>${'ABCD'[i]}</b><span>${o}</span></button>`).join('');
$$('.a').forEach(b=>b.onclick=()=>answer(+b.dataset.k));$('#fb').className='fb';$('#fb').textContent='';hud();tick(true)}
function tick(z){if(g.over)return;let t;
if(g.mode==='time'){if(!z)g.left-=.1;t=g.left;$('#tb').style.width=t/g.dur*100+'%';if(t<=0)return finish()}
else{if(!g.lock&&!z)g.tl-=.1;t=g.tl;$('#tb').style.width=t/15*100+'%';if(t<=0&&!g.lock)return answer(-1)}
$('#tn').textContent=Math.max(0,Math.ceil(t));$('#tm').classList.toggle('low',t<=5)}
function answer(k){if(g.lock||g.over||k>3||!g.cur)return;g.lock=true;const c=g.cur,r=k===c.a;
$$('.a').forEach((b,i)=>{b.disabled=true;if(i===c.a)b.classList.add('ok');else if(i===k)b.classList.add('no')});
if(r){g.ok++;g.combo++;g.best=Math.max(g.best,g.combo);g.sc[g.p]+=100+(g.mode==='time'?0:Math.round(g.tl*4))+(g.combo-1)*10;mood('happy');beep(660);setTimeout(()=>beep(880),100)}
else{g.no++;g.combo=0;if(g.mode==='survival')g.lives--;mood('sad');beep(180,.3,'sawtooth')}
g.log.push({t:c.t,y:k<0?'Waktu habis':c.o[k],a:c.o[c.a],e:c.e,r,p:g.p+1});
$('#fb').className='fb '+(r?'ok':'no');$('#fb').innerHTML=`<b>${r?'Jawaban Benar!':k<0?'Waktu Habis':'Jawaban Kurang Tepat'}</b>${r?'':'Jawaban benar: '+c.o[c.a]+'. '}${c.e}`;
if(g.mode==='duel')g.p^=1;hud();g.to=setTimeout(next,g.mode==='time'?1000:2200)}
function next(){if(g.over)return;g.i++;if(g.i>=g.q.length||(g.mode==='survival'&&g.lives<=0))return finish();render();mood('think')}
addEventListener('keydown',e=>{if($('#game').classList.contains('on')&&/^[1-4]$/.test(e.key)&&!document.querySelector('dialog[open]'))answer(+e.key-1)});
$('#quit').onclick=()=>{if(!g.over)$('#cf').showModal()};
$('#yes').onclick=()=>{g.over=true;clearInterval(g.iv);clearTimeout(g.to);show('menu')};
function finish(){if(g.over)return;g.over=true;clearInterval(g.iv);clearTimeout(g.to);
const n=g.ok+g.no,acc=n?Math.round(g.ok/n*100):0,sec=Math.round((Date.now()-g.t0)/1000),
rk=acc>=90?'Jenius!':acc>=75?'Sangat Hebat!':acc>=60?'Cukup Cerdas!':'Terus Berlatih!',duel=g.mode==='duel',top=Math.max(...g.sc);
const head=duel?(g.sc[0]===g.sc[1]?'Seri!':`Pemain ${g.sc[0]>g.sc[1]?1:2} Menang!`):rk;
const lb=store.get('cc_lb',[]);lb.push({s:g.s.n,m:MODE[g.mode],sc:top,acc});lb.sort((a,b)=>b.sc-a.sc);store.set('cc_lb',lb.slice(0,10));
const have=store.get('cc_ach',[]),new_=[];const chk=(k,ok)=>{if(ok&&!have.includes(k)){have.push(k);new_.push(k)}};
chk('first',n>0);chk('c5',g.best>=5);chk('pf',acc===100&&n>=5);chk('sv',g.mode==='survival'&&g.lives===3&&n>=5);store.set('cc_ach',have);
$('#rb').innerHTML=`<h2>${head}</h2><p class="mu">${duel?'Predikat: '+rk:MODE[g.mode]+', '+g.s.n}</p>
<div class="st"><div><b>${duel?g.sc[0]+' / '+g.sc[1]:g.sc[0]}</b><span>Skor</span></div><div><b>${g.ok}</b><span>Benar</span></div><div><b>${g.no}</b><span>Salah</span></div><div><b>${acc}%</b><span>Akurasi</span></div><div><b>${sec} dtk</b><span>Waktu</span></div></div>
${new_.length?'<p class="mu">Pencapaian baru: '+new_.map(k=>ACH[k].split(':')[0]).join(', ')+'</p>':''}
<div class="row"><button class="btn" id="again">Main Lagi</button><button class="btn g" id="home">Kembali ke Menu</button><button class="btn g" id="rvw">Lihat Pembahasan</button></div>`;
$('#again').onclick=start;$('#home').onclick=()=>show('menu');
$('#rvw').onclick=()=>{$('#rvb').innerHTML=g.log.map((l,i)=>`<div class="li ${l.r?'ok':'no'}"><b>${i+1}. ${l.t}</b><small>${duel?'Pemain '+l.p+', ':''}Jawabanmu: ${l.y}. Benar: ${l.a}.</small><small>${l.e}</small></div>`).join('');$('#rv').showModal()};
show('result');mood(acc>=60||duel?'win':'sad');beep(523,.15);setTimeout(()=>beep(784,.25),160)}
function renderLB(){const lb=store.get('cc_lb',[]),h=store.get('cc_ach',[]);
$('#lbb').innerHTML=lb.length?lb.map((e,i)=>`<div class="li"><b>${i+1}. ${e.sc} poin</b><small>${e.s}, ${e.m}, akurasi ${e.acc}%</small></div>`).join(''):'<p class="mu">Belum ada skor. Mainkan satu permainan untuk masuk peringkat.</p>';
$('#ach').innerHTML=Object.entries(ACH).map(([k,v])=>`<div class="li" style="opacity:${h.includes(k)?1:.45}">${v}${h.includes(k)?' (terbuka)':''}</div>`).join('')}
// Partikel latar
(()=>{const c=$('#bg'),x=c.getContext('2d');let w,h;const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight};rs();addEventListener('resize',rs);
const ps=Array.from({length:40},()=>({x:Math.random()*w,y:Math.random()*h,r:1+Math.random()*2,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}));
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
(function f(){x.clearRect(0,0,w,h);x.fillStyle='rgba(120,150,255,.35)';ps.forEach(p=>{p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});requestAnimationFrame(f)})()})();
