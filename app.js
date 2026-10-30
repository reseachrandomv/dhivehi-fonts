const W=[["Light",300],["Regular",400],["Medium",500],["Bold",700],["Black",900]];
const fonts=[...W.map(([n,w])=>({name:"Noto Sans Thaana "+n,w,file:"fonts/NotoSansThaana-"+n+".ttf"})),{name:"Noto Sans Thaana Variable (100–900)",w:400,file:"fonts/NotoSansThaana-Variable.ttf",v:1},{name:"All weights + licence (.zip)",w:600,file:"fonts/NotoSansThaana-all.zip"}];
const $=s=>document.querySelector(s),txt=$("#txt"),cards=$("#cards");
function render(){const q=$("#q").value.toLowerCase(),sz=$("#size").value;cards.innerHTML="";
fonts.filter(f=>(f.name+" "+f.w).toLowerCase().includes(q)).forEach(f=>{const c=document.createElement("div");c.className="card";
c.innerHTML=`<b>${f.name}</b><div class="s" lang="dv" style="font-size:${sz}px;font-weight:${f.w}"></div>
<div class="meta">Weight ${f.v?"100–900 (variable)":f.w} · By The Noto Project Authors / Google · Licence: <a href="fonts/OFL.txt">SIL OFL 1.1</a></div>
<a class="dl" href="${f.file}" download>⬇ Download</a>`;c.querySelector(".s").textContent=txt.value||"ދިވެހި";
if(f.v){const r=document.createElement("input");r.type="range";r.min=100;r.max=900;r.value=400;r.oninput=()=>c.querySelector(".s").style.fontWeight=r.value;c.insertBefore(r,c.querySelector(".meta"))}
cards.append(c)})}
// Phonetic Thaana layout
const M={q:"ް",w:"އ",e:"ެ",r:"ރ",t:"ތ",y:"ޔ",u:"ު",i:"ި",o:"ޮ",p:"ޕ",a:"ަ",s:"ސ",d:"ދ",f:"ފ",g:"ގ",h:"ހ",j:"ޖ",k:"ކ",l:"ލ",z:"ޒ",x:"×",c:"ޗ",v:"ވ",b:"ބ",n:"ނ",m:"މ",
Q:"ޤ",W:"ޢ",E:"ޭ",R:"ޜ",T:"ޓ",Y:"ޠ",U:"ޫ",I:"ީ",O:"ޯ",P:"÷",A:"ާ",S:"ށ",D:"ޑ",F:"ﷲ",G:"ޣ",H:"ޙ",J:"ޛ",K:"ޚ",L:"ޅ",Z:"ޡ",X:"ޘ",C:"ޝ",V:"ޥ",B:"ޞ",N:"ޏ",M:"ޟ",",":"،",";":"؛","?":"؟"};
function ins(s){const a=txt.selectionStart,b=txt.selectionEnd;txt.setRangeText(s,a,b,"end");txt.focus();render()}
txt.addEventListener("keydown",e=>{if(!$("#phon").checked||e.ctrlKey||e.metaKey||e.altKey)return;const m=M[e.key];if(m){e.preventDefault();ins(m)}});
txt.addEventListener("input",render);
let shift=false;const rows=["qwertyuiop","asdfghjkl","zxcvbnm"];
function kb(){const k=$("#kb");k.innerHTML="";rows.forEach((r,i)=>{const d=document.createElement("div");d.className="row";
[...r].forEach(ch=>{const key=shift?ch.toUpperCase():ch,b=document.createElement("button");b.innerHTML=`${M[key]}<small>${key}</small>`;b.onclick=()=>ins(M[key]);d.append(b)});k.append(d)});
const d=document.createElement("div");d.className="row";[["⇧ Shift",()=>{shift=!shift;kb()}],["Space",()=>ins(" ")],["⌫",()=>{const a=txt.selectionStart;if(a>0){txt.setRangeText("",a-1,a,"end");render()}}],["،",()=>ins("،")],["؟",()=>ins("؟")]].forEach(([l,f])=>{const b=document.createElement("button");b.className="wide";b.textContent=l;b.onclick=f;d.append(b)});k.append(d)}
$("#kbToggle").onclick=()=>{$("#kb").hidden=!$("#kb").hidden};kb();
$("#size").oninput=e=>{$("#sizeV").textContent=e.target.value;render()};$("#q").oninput=render;
$("#samples").onchange=e=>{if(e.target.value){txt.value=e.target.value;render()}};
const S={g:`<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thaana:wght@100..900&display=swap" rel="stylesheet">
<style>
  .dv{font-family:"Noto Sans Thaana",sans-serif;direction:rtl;text-align:right}
</style>
<p class="dv" lang="dv" dir="rtl">ދިވެހި</p>`,s:`@font-face{
  font-family:"Noto Sans Thaana";
  src:url("NotoSansThaana-Variable.ttf") format("truetype");
  font-weight:100 900;
  font-display:swap;
}
[lang="dv"]{font-family:"Noto Sans Thaana",sans-serif;direction:rtl;text-align:right}`};
let tab="g";const code=$("#code");code.textContent=S.g;
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("on"));b.classList.add("on");tab=b.dataset.t;code.textContent=S[tab]});
$("#copy").onclick=()=>navigator.clipboard.writeText(S[tab]).then(()=>{$("#copy").textContent="Copied ✓";setTimeout(()=>$("#copy").textContent="Copy snippet",1500)});
const th=localStorage.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=th;
$("#theme").onclick=()=>{const t=document.documentElement.dataset.theme=="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.theme=t};
render();
