import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as g,i}from"./assets/vendor-xN_OkTRX.js";const y=document.querySelector("#searchForm"),l=document.querySelector("#gallery"),a=document.querySelector("#loadMore");let m="",r=1,c=40;y.addEventListener("submit",async e=>{e.preventDefault(),m=document.querySelector("#searchQuery").value.trim(),r=1,l.innerHTML="",a.style.display="none",await p()});a.addEventListener("click",async()=>{r++,await p()});async function p(){const t={key:"45239691-411c9704351f7c72c1a4b78aa",q:m,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:c},n="https://pixabay.com/api";try{const s=(await g.get(n,{params:t})).data;s.hits.length>0&&(d(s.hits),console.log(s.hits),a.style.display="block",r*c>=s.totalHits?(a.style.display="none",i.info({title:"Informacja",message:"Were sorry, but you've reached the end of search results.",position:"topRight"})):(a.style.display="none",i.info({title:"Informacja",message:"No images found. Please try a different search query.",position:"topRight"})))}catch{i.info({title:"Informacja",message:"Error fetching images:",position:"topRight"})}}function d(e){const t=document.createDocumentFragment();e.forEach(n=>{const o=document.createElement("img");o.src=n.webformatURL,o.alt=n.tags,t.appendChild(o)}),l.appendChild(t),h()}function h(){const e=document.querySelector("#gallery img");if(e){const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
