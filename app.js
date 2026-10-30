const $=s=>document.querySelector(s),txt=$("#txt"),cards=$("#cards"),NS="liyun-fonts-mv",API="https://abacus.jasoncameron.dev";
let F=[],counts={},shift=false;
const hit=k=>fetch(`${API}/hit/${NS}/${k}`).then(r=>r.json()).then(j=>j.value).catch(()=>null);
const get=k=>fetch(`${API}/get/${NS}/${k}`).then(r=>r.ok?r.json():{value:0}).then(j=>j.value||0).catch(()=>0);
const fmt=n=>n==null?"–":Number(n).toLocaleString();
fetch("fonts.json").then(r=>r.json()).then(d=>{F=d;const st=document.createElement("style");
st.textContent=d.map(f=>`@font-face{font-family:"L-${f.slug}";src:url("${f.preview}");font-display:swap}`).join("");document.head.append(st);
$("#sFonts").textContent=d.length;$("#cssFont").innerHTML=d.map((f,i)=>`<option value="${i}">${f.name}</option>`).join("");
$("#credits").innerHTML=d.map(f=>`<li><b>${f.name}</b> by ${f.author}. ${f.copy}. <a href="${f.src}" target="_blank" rel="noopener">Original source</a> · <a href="${f.zip.replace(/[^/]+$/,"OFL.txt")}">OFL.txt</a></li>`).join("");
render();snippet();loadCounts()});
async function loadCounts(){get("subscribers").then(v=>$("#sSubs").textContent=fmt(v));
const v=await Promise.all(F.map(f=>get("dl-"+f.slug)));F.forEach((f,i)=>counts[f.slug]=v[i]);
$("#sDl").textContent=fmt(v.reduce((a,b)=>a+b,0));document.querySelectorAll("[data-cnt]").forEach(e=>e.textContent=fmt(counts[e.dataset.cnt])+" downloads")}
function render(){const q=$("#q").value.toLowerCase(),sz=$("#size").value,t=txt.value||"ދިވެހި";cards.innerHTML="";
F.filter(f=>(f.name+" "+f.author+" "+f.styles.join(" ")).toLowerCase().includes(q)).forEach(f=>{const c=document.createElement("article");c.className="card";
c.innerHTML=`<h3>${f.name}</h3><div class="s" lang="dv" style="font-family:'L-${f.slug}','Noto Sans Thaana';font-size:${sz}px"></div>
<div class="meta">By ${f.author} · ${f.styles.length} style${f.styles.length>1?"s":""} · <a href="${f.zip.replace(/[^/]+$/,"OFL.txt")}">SIL OFL 1.1</a></div>
<div class="row2"><span class="cnt" data-cnt="${f.slug}">${fmt(counts[f.slug])} downloads</span></div>
<button class="cta">⬇ Download free (.zip)</button>`;c.querySelector(".s").textContent=t;c.querySelector("button").onclick=()=>download(f);cards.append(c)})}
function download(f){if(!localStorage.liyunName){pending=f;$("#modal").hidden=false;$("#nm").focus();return}
const a=document.createElement("a");a.href=f.zip;a.download="";document.body.append(a);a.click();a.remove();
hit("dl-"+f.slug).then(v=>{if(v!=null){counts[f.slug]=v;const e=document.querySelector(`[data-cnt="${f.slug}"]`);if(e)e.textContent=fmt(v)+" downloads";$("#sDl").textContent=fmt(Object.values(counts).reduce((a,b)=>a+b,0))}})}
let pending=null;
$("#subF").onsubmit=e=>{e.preventDefault();const n=$("#nm").value.trim();if(!n)return;localStorage.liyunName=n;$("#modal").hidden=true;who();
hit("subscribers").then(v=>v!=null&&($("#sSubs").textContent=fmt(v)));if(pending){download(pending);pending=null}};
$("#cancel").onclick=()=>{$("#modal").hidden=true;pending=null};
function who(){const n=localStorage.liyunName;if(n){$("#who").hidden=false;$("#who").textContent="✓ "+n}}who();
const M={q:"ް",w:"އ",e:"ެ",r:"ރ",t:"ތ",y:"ޔ",u:"ު",i:"ި",o:"ޮ",p:"ޕ",a:"ަ",s:"ސ",d:"ދ",f:"ފ",g:"ގ",h:"ހ",j:"ޖ",k:"ކ",l:"ލ",z:"ޒ",x:"×",c:"ޗ",v:"ވ",b:"ބ",n:"ނ",m:"މ",
Q:"ޤ",W:"ޢ",E:"ޭ",R:"ޜ",T:"ޓ",Y:"ޠ",U:"ޫ",I:"ީ",O:"ޯ",P:"÷",A:"ާ",S:"ށ",D:"ޑ",F:"ﷲ",G:"ޣ",H:"ޙ",J:"ޛ",K:"ޚ",L:"ޅ",Z:"ޡ",X:"ޘ",C:"ޝ",V:"ޥ",B:"ޞ",N:"ޏ",M:"ޟ",",":"،",";":"؛","?":"؟"};
function ins(s){txt.setRangeText(s,txt.selectionStart,txt.selectionEnd,"end");txt.focus();render()}
txt.addEventListener("keydown",e=>{if(!$("#phon").checked||e.ctrlKey||e.metaKey||e.altKey)return;const m=M[e.key];if(m){e.preventDefault();ins(m)}});
txt.addEventListener("input",render);
function kb(){const k=$("#kb");k.innerHTML="";["qwertyuiop","asdfghjkl","zxcvbnm"].forEach(r=>{const d=document.createElement("div");d.className="row";
[...r].forEach(ch=>{const key=shift?ch.toUpperCase():ch,b=document.createElement("button");b.innerHTML=`${M[key]}<small>${key}</small>`;b.onclick=()=>ins(M[key]);d.append(b)});k.append(d)});
const d=document.createElement("div");d.className="row";[["⇧ Shift",()=>{shift=!shift;kb()}],["Space",()=>ins(" ")],["⌫",()=>{const a=txt.selectionStart;if(a>0){txt.setRangeText("",a-1,a,"end");render()}}],["،",()=>ins("،")],["؟",()=>ins("؟")]].forEach(([l,f])=>{const b=document.createElement("button");b.className="wide";b.textContent=l;b.onclick=f;d.append(b)});k.append(d)}
kb();$("#kbToggle").onclick=()=>$("#kb").hidden=!$("#kb").hidden;
$("#size").oninput=e=>{$("#sizeV").textContent=e.target.value;render()};$("#q").oninput=render;
$("#samples").onchange=e=>{if(e.target.value){txt.value=e.target.value;render()}};
let tab="s";const base=location.href.replace(/[#?].*$/,"").replace(/[^/]*$/,"");
function snippet(){const f=F[$("#cssFont").value||0];if(!f)return;
const g=`<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thaana:wght@100..900&display=swap" rel="stylesheet">\n<style>[lang="dv"]{font-family:"Noto Sans Thaana",sans-serif;direction:rtl;text-align:right}</style>`;
const s=`/* Download the .zip, put the .ttf next to your CSS (licence: SIL OFL 1.1) */\n@font-face{\n  font-family:"${f.name}";\n  src:url("${f.preview.split("/").pop()}") format("truetype");\n  font-display:swap;\n}\n[lang="dv"]{\n  font-family:"${f.name}",sans-serif;\n  direction:rtl;\n  text-align:right;\n}\n/* HTML: <p lang="dv" dir="rtl">ދިވެހި</p> */`;
$("#code").textContent=tab=="g"?g:s}
$("#cssFont").onchange=snippet;
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("on"));b.classList.add("on");tab=b.dataset.t;snippet()});
$("#copy").onclick=()=>navigator.clipboard.writeText($("#code").textContent).then(()=>{$("#copy").textContent="Copied ✓";setTimeout(()=>$("#copy").textContent="Copy snippet",1500)});
const th=localStorage.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=th;
$("#theme").onclick=()=>{const t=document.documentElement.dataset.theme=="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.theme=t};
