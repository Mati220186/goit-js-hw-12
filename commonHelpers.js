import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as g,i as r,S as h}from"./assets/vendor-0Fq3u7cb.js";const f=document.querySelector("#searchForm"),p=document.querySelector("#gallery"),s=document.querySelector("#loadMore"),c=document.querySelector("#loader");let y="",n=1,d=40;f.addEventListener("submit",async a=>{a.preventDefault(),y=document.querySelector("#searchQuery").value.trim(),n=1,p.innerHTML="",s.style.display="none",await m()});s.addEventListener("click",async()=>{n+=1,c.style.display="none",await m()});async function m(){const o=`https://pixabay.com/api/?key=45239691-411c9704351f7c72c1a4b78aa&q=${encodeURIComponent(y)}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${d}`;c.style.display="flex";try{const e=(await g.get(o)).data;console.log(e),e.hits.length>0?(c.style.display="none",u(e.hits),console.log(e.hits),s.style.display="",n*d>=e.totalHits&&(s.style.display="none",r.info({title:"Informacja",message:"Were sorry, but you've reached the end of search results.",position:"topRight"}))):(s.style.display="none",r.info({title:"Informacja",message:"No images found. Please try a different search query.",position:"topRight"}))}catch{r.info({title:"Error",message:"Error fetching images:",position:"topRight",color:"red"})}}function u(a){a.forEach(t=>{const e=document.createElement("a");e.href=t.largeImageURL,e.dataset.lightbox="gallery",e.dataset.title=t.tags;const l=document.createElement("img");l.src=t.webformatURL,l.alt=t.tags;const i=document.createElement("div");i.classList.add("image-info"),i.innerHTML=`
            <div>
                <span class="label">Likes:</span>
                <span>${t.likes}</span>
            </div>
            <div>
                <span class="label">Views:</span>
                <span>${t.views}</span>
            </div>
            <div>
                <span class="label">Comments:</span>
                <span>${t.comments}</span>
            </div>
            <div>
                <span class="label">Downloads:</span>
                <span>${t.downloads}</span>
            </div>`,p.appendChild(e),e.appendChild(l),e.appendChild(i)}),v(),new h("#gallery a",{}).refresh()}function v(){const a=document.querySelector("#gallery img");if(a){const{height:o}=a.getBoundingClientRect();window.scrollBy({top:o*3,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
