document.documentElement.classList.add("has-js");
const menuButton=document.querySelector("[data-menu-button]");
const nav=document.querySelector("[data-nav]");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));nav.dataset.open=String(!open)});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menuButton.setAttribute("aria-expanded","false");nav.dataset.open="false"}))}
document.querySelectorAll("[data-year]").forEach(node=>{node.textContent=String(new Date().getFullYear())});
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced&&"IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll(".reveal").forEach(node=>observer.observe(node))}else{document.querySelectorAll(".reveal").forEach(node=>node.classList.add("is-visible"))}
