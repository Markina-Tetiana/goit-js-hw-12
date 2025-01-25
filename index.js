import{S as f,i as n}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function m({webformatURL:i,largeImageURL:o,tags:r,likes:s,views:e,comments:t,downloads:a}){return`<li class="gallery-item">
            <a href="${o}" class="gallery__item">
      <img src="${i}" alt="${r}" loading="lazy" class="gallery__image" />
      <div class="gallery__info">
        <p><b>Likes:</b> ${s}</p>
        <p><b>Views:</b> ${e}</p>
        <p><b>Comments:</b> ${t}</p>
        <p><b>Downloads:</b> ${a}</p>
      </div>
    </a>
        </li>`}const p=i=>{const o=new URLSearchParams({key:"48307902-b3b0ba5bf2bf175d4af253477",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${o}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})},u=document.querySelector(".search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),d=new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});function h(i){i.preventDefault();const o=u.elements.user_query.value.trim();if(o===""){n.error({message:" Please fill this field. The field should not be empty!",position:"topRight"});return}l.innerHTML="",c.style.display="block",p(o).then(r=>{if(r.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=r.hits.map(m).join("");l.innerHTML=s,d.refresh()}).catch(r=>{n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),console.log(r)}).finally(()=>{c.style.display="none"})}u.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
