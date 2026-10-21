const $=s=>document.querySelector(s);
$('#year').textContent=new Date().getFullYear();
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const jokes=[
['শিক্ষক: বলো তো, অলসতার সবচেয়ে বড় উদাহরণ কী?','ছাত্র: স্যার, উত্তরটা কাল বলব—আজ খুব ক্লান্ত!'],
['বন্ধু: পরীক্ষায় কেমন করেছিস?','আমি: প্রশ্নপত্রের সঙ্গে সুন্দর সময় কাটিয়েছি!'],
['মা: ফোনটা রেখে পড়তে বসো।','আমি: ফোনেই তো PDF বই, মা! 😅'],
['গেমারদের প্রিয় অঙ্ক কোনটা?','১ HP + মেডকিট = নতুন আশা! 🎮'],
['বন্ধু: তুই এত হাসিস কেন?','আমি: দুঃখগুলোকে ভাবতে দিই না যে আমি ফ্রি আছি! 😂']
];let ji=0;
$('#newJoke').addEventListener('click',()=>{ji=(ji+1)%jokes.length;$('#joke').textContent=jokes[ji][0];$('#jokeAnswer').textContent=jokes[ji][1]});
const quizzes=[
{q:'বাংলাদেশের জাতীয় ফুল কোনটি?',a:['গোলাপ','শাপলা','জবা','সূর্যমুখী'],c:1},
{q:'এক সপ্তাহে কয় দিন?',a:['৫ দিন','৬ দিন','৭ দিন','৮ দিন'],c:2},
{q:'সূর্য কোন দিক থেকে ওঠে?',a:['উত্তর','দক্ষিণ','পশ্চিম','পূর্ব'],c:3},
{q:'বাংলাদেশের জাতীয় ফল কোনটি?',a:['আম','কাঁঠাল','লিচু','কলা'],c:1},
{q:'২ + ৫ = কত?',a:['৬','৭','৮','৯'],c:1}
];let qi=0,answered=false;
function renderQuiz(){answered=false;$('#question').textContent=quizzes[qi].q;$('#quizFeedback').textContent='সঠিক উত্তর বেছে নাও!';$('#answers').innerHTML=quizzes[qi].a.map((a,i)=>`<button data-index="${i}">${a}</button>`).join('');$('#answers').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{if(answered)return;answered=true;const good=Number(b.dataset.index)===quizzes[qi].c;b.classList.add(good?'correct':'wrong');if(!good)$('#answers').querySelectorAll('button')[quizzes[qi].c].classList.add('correct');$('#quizFeedback').textContent=good?'দারুণ! সঠিক উত্তর 🎉':'আবার চেষ্টা করো! সঠিক উত্তর: '+quizzes[qi].a[quizzes[qi].c]}))}
$('#nextQuiz').addEventListener('click',()=>{qi=(qi+1)%quizzes.length;renderQuiz()});renderQuiz();
const canvas=$('#posterCanvas'),ctx=canvas.getContext('2d');
function drawPoster(){const name=$('#posterName').value.trim()||'তোমার নাম',line=$('#posterLine').value.trim()||'Dream Big • Shine Bright';const g=ctx.createLinearGradient(0,0,900,600);g.addColorStop(0,'#25174d');g.addColorStop(.55,'#5536a5');g.addColorStop(1,'#126c83');ctx.fillStyle=g;ctx.fillRect(0,0,900,600);ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=2;for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(760,110,35+i*23,0,Math.PI*2);ctx.stroke()}ctx.fillStyle='#8df4ed';ctx.font='bold 26px Arial';ctx.textAlign='center';ctx.fillText('✦ MY PERSONAL POSTER ✦',450,135);ctx.fillStyle='#fff';ctx.font='bold 76px Arial';while(ctx.measureText(name).width>780&&parseInt(ctx.font.match(/\d+/)[0])>30){ctx.font='bold '+(parseInt(ctx.font.match(/\d+/)[0])-4)+'px Arial'}ctx.fillText(name,450,300);ctx.fillStyle='#e2dcff';ctx.font='32px Arial';ctx.fillText(line,450,375);ctx.fillStyle='rgba(255,255,255,.8)';ctx.font='20px Arial';ctx.fillText('GG MOUSE PRO • SUPER FUN ZONE',450,520);ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=4;ctx.strokeRect(24,24,852,552)}
$('#makePoster').addEventListener('click',drawPoster);drawPoster();
$('#downloadPoster').addEventListener('click',()=>{drawPoster();const a=document.createElement('a');a.download='gg-mouse-pro-poster.png';a.href=canvas.toDataURL('image/png');a.click()});
async function share(){const data={title:'GG Mouse Pro — Super Fun Zone',text:'চলো গেমিং টিপস, জোকস আর কুইজ খেলি!',url:location.href};if(navigator.share){try{await navigator.share(data);$('#shareStatus').textContent='শেয়ার মেনু খোলা হয়েছে।'}catch(e){if(e.name!=='AbortError')$('#shareStatus').textContent='শেয়ার করা যায়নি। লিংক কপি করে পাঠাও।'}}else{try{await navigator.clipboard.writeText(location.href);$('#shareStatus').textContent='সাইটের লিংক কপি হয়েছে! বন্ধুদের পাঠাও।'}catch(e){$('#shareStatus').textContent='ব্রাউজারের address bar থেকে লিংক কপি করো।'}}}
$('#shareBtn').addEventListener('click',share);$('#shareTop').addEventListener('click',share);
$('#copyBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);$('#shareStatus').textContent='লিংক কপি হয়েছে!'}catch(e){$('#shareStatus').textContent='Address bar থেকে লিংক কপি করো।'}});
document.querySelectorAll('.share-quote').forEach(b=>b.addEventListener('click',async()=>{const text=b.dataset.text;if(navigator.share){try{await navigator.share({text,title:'GG Mouse Pro'})}catch(e){}}else{try{await navigator.clipboard.writeText(text);b.textContent='কপি হয়েছে ✓'}catch(e){b.textContent=text}}}));
