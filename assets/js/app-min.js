const gameModule=(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],a=document.querySelector("#btnRequest"),r=document.querySelector("#btnStop"),d=document.querySelector("#btnNew"),n=document.querySelectorAll("small"),s=document.querySelectorAll(".divCards");a.disabled=!0,r.disabled=!0;let o=[],i=(t=2)=>{e=u(),o=[];for(let l=0;l<t;l++)o.push(0),n[l].innerText=0,s[l].innerHTML="";a.disabled=!1,r.disabled=!1},u=()=>{e=[];for(let a=2;a<=10;a++)for(let r of t)e.push(a+r);for(let d of t)for(let n of l)e.push(n+d);return _.shuffle(e)},$=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},c=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},b=(e,t)=>(o[t]=o[t]+c(e),n[t].innerText=o[t],o[t]),p=(e,t)=>{let l=document.createElement("img");l.src=`assets/cartas/${e}.png`,l.classList.add("carta"),s[t].append(l)},f=()=>{let[e,t]=o;setTimeout(()=>{t===e?alert("Empate!"):e>21?alert("Computadora Gana!"):t>21?alert("Jugador 1 Gana!"):e<21&&21===t?alert("Computadora Gana!"):e<21&&t<=21&&t>e&&alert("Computadora Gana!")},300)},h=e=>{let t=0;do{let l=$();t=b(l,o.length-1),p(l,o.length-1)}while(t<e&&e<=21);f()};return a.addEventListener("click",()=>{let e=$(),t=b(e,0);p(e,0),t>21?(a.disabled=!0,r.disabled=!0,h(t)):21===t&&(a.disabled=!0,r.disabled=!0,h(t))}),r.addEventListener("click",()=>{a.disabled=!0,r.disabled=!0,h(o[0])}),d.addEventListener("click",()=>{i()}),{newGame:i}})();