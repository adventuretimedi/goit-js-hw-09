const e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),t=document.querySelector("body"),r=document.querySelector(".giphy-cat"),a=new Audio("https://now.morsmusic.org/load/1528392161/Nyan_Cat_-_Nyan_Cat_Theme_(musmore.com).mp3");let l=null;r.classList.remove("is-hidden"),r.classList.add("is-hidden"),a.play(),e.addEventListener("click",(function(o){e.disabled=!0,l=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,console.log(`Time for color-party 😃 ${t.style.backgroundColor}`)}),1e3)})),o.addEventListener("click",(()=>{e.disabled=!1,a.pause(),clearInterval(l),console.log(`Your color - ${l} .Party is over!🙃`)}));
//# sourceMappingURL=01-color-switcher.9e3b8589.js.map
