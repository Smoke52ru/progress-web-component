(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.value=this.getAttribute("value")||0,this.animated=this.hasAttribute("animated"),this.hide=this.hasAttribute("hide"),this.render()}static get observedAttributes(){return["value","animated","hide"]}attributeChangedCallback(e,a,s){e==="value"?this.setValue(s):e==="animated"?this.setAnimated(s!==null):e==="hide"&&this.setHide(s!==null),this.render()}setValue(e){this.value=Math.max(0,Math.min(100,+e))}setAnimated(e){this.animated=!!e}setHide(e){this.hide=!!e}render(){let e="progress-circle";this.animated&&(e+=" animated"),this.hide&&(e+=" hide"),this.shadowRoot.innerHTML=`
            <style>
                @keyframes spinner {
                  to { transform: rotate(360deg); }
                }
            
                .progress-circle {
                    min-width: 1rem;
                    min-height: 1rem;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    background: conic-gradient(var(--blue) ${this.value}%, var(--lightblue) 0);
                    position: relative;
                    
                    &::before {
                        content: "";
                        width: 80%;
                        height: 80%;
                        background: white;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    
                    &.animated {
                        animation: spinner 1.5s linear infinite;
                    }
                    
                    &.hide {
                        display: none;
                    }
                }
            </style>
            <div class='${e}'>
            </div>
        `}}customElements.define("progress-circle",d);const o=document.querySelector("progress-circle"),l=document.querySelector("input#value");l.addEventListener("input",r=>{let e=+r.target.value;e>100?(e=100,r.target.value=e):e<0&&(e=0),o.setAttribute("value",e.toString())});const u=document.querySelector("input#animate");u.addEventListener("change",r=>{const e=r.target.checked;console.log("event",e),o.toggleAttribute("animated",e)});const c=document.querySelector("input#hide");c.addEventListener("change",r=>{const e=r.target.checked;console.log("event",e),o.toggleAttribute("hide",e)});
