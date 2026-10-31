(() => {
  'use strict';
  const C = window.CAMP_CONTENT, U = window.CampCore, e = U.escape;
  const main = document.querySelector('#main'), reader = document.querySelector('#reader');
  const state = { theme: 0, page: 0, postcard: null, back: false, busy: false, timer: null, route: '', island: null };
  const routes = ['home', 'geese', 'bay', 'post', 'journal'];
  let day = U.litDays(C.lighting);
  function progress() { return `<span class="progress-label">${day ? `已点亮 ${day} / 7` : '等待启航'}</span><progress class="island-progress" max="7" value="${day}" aria-label="岛屿点亮进度">${day} / 7</progress>`; }
  function syncLighting() {
    const next = U.litDays(C.lighting);
    if(next === day)return;
    day = next;
    document.body.style?.setProperty('--camp-map', `url("${U.mapFile(day)}")`);
    const map = document.querySelector('.world-map');
    if(map)map.src=U.mapFile(day);
    const counter = document.querySelector('[data-lighting-progress]');
    if(counter)counter.innerHTML=progress();
    document.querySelectorAll('[data-island]').forEach(pin=>{
      const i=Number(pin.dataset.island),lit=i<day;
      pin.classList.toggle('lit',lit);
      pin.setAttribute('aria-label',`查看${C.islands[i].name}，${lit?'已点亮':'待点亮'}`);
    });
    if(reader.open && state.island !== null){
      const island=C.islands[state.island],lit=island.day<=day;
      const art=document.querySelector('[data-island-art]'),status=document.querySelector('[data-island-status]');
      if(art){art.src=`assets/${island.day}-${lit?2:1}.png`;art.alt=`${island.name}${lit?'点亮后':'未点亮'}`;}
      if(status)status.textContent=lit?'这座岛已经点亮。':'这座岛尚未点亮，旅程将随活动进度展开。';
    }
    document.querySelector('#announcement').textContent=`已点亮 ${day} 座岛屿，共7座。`;
  }
  const icons = [
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5h10v4h4v4h-8v6h8v8H6V15h6z"/><path class="icon-accent" d="M22 9h8v4h-8z"/><path class="icon-eye" d="M18 7h2v2h-2z"/></svg>',
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 3h6v9l5 5v12H8V17l5-5z"/><path class="icon-accent" d="M11 19h10v7H11zM12 2h8v4h-8z"/></svg>',
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 7h26v20H3z"/><path class="icon-line" d="m4 8 12 11L28 8"/><path class="icon-accent" d="M23 4h6v7h-6z"/></svg>',
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 5h11l2 3 2-3h11v23H18l-2 2-2-2H3z"/><path class="icon-line" d="M16 9v17M7 12h5m-5 5h5m8-5h5m-5 5h5"/></svg>'
  ];
  const entries = [
    ['geese', '旅伴名册', '长鹅救援队', '遇见一起出发的伙伴'],
    ['bay', 'DAY 01 / 02', '漂流瓶海湾', '把心事交给海风'],
    ['post', 'DAY 05', '不期鹅遇 · 漂流邮局', '寄出心意，偶遇一张明信片'],
    ['journal', 'DAY 07', '周末旅行图鉴', '把沿途的收获装订成册']
  ];
  function head(kicker, title, desc) { return `<div class="page-heading"><a class="back-link" href="#home">← 地图</a><h1>${title}</h1></div>`; }
  function formButton(url, label) { const safe = U.safeForm(url); return safe ? `<a class="button primary" href="${e(safe)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>` : '<button class="button" disabled>投稿暂未开放</button>'; }
  function home() {
    const coords = [[20,77],[32,61],[43,49],[56,39],[71,31],[77,23],[79,13]];
    const labels = ['长鹅救援队', '漂流瓶海湾', '漂流邮局', '旅行图鉴'];
    const notes = ['旅伴介绍', 'D1 / D2', 'D5', 'D7'];
    return `<div class="home-board"><section class="map-panel" aria-label="我们的旅行地图"><div class="map-toolbar"><h1>七日旅行地图</h1><span class="lighting-progress" data-lighting-progress>${progress()}</span></div><div class="map-scroll" tabindex="0" role="region" aria-label="岛屿地图，手机可左右滑动"><div class="map-canvas"><img class="world-map" src="${U.mapFile(day)}" alt="七座岛屿由左下向右上排列的旅行地图" fetchpriority="high">${coords.map(([x,y],i) => `<button class="map-pin ${i < day ? 'lit' : ''}" style="left:${x}%;top:${y}%" data-island="${i}" aria-label="查看${e(C.islands[i].name)}，${i < day ? '已点亮' : '待点亮'}"><b>D${i+1}</b><span>${e(C.islands[i].name)}</span></button>`).join('')}</div></div><div class="map-bottom"><span>点击岛屿，查看活动</span><span class="map-swipe-note">← 左右滑动地图 →</span></div></section><nav class="home-dock" aria-label="四个活动入口">${entries.map((x,i)=>`<a class="dock-link" href="#${x[0]}"><span class="dock-icon">${icons[i]}</span><span class="dock-copy"><strong>${labels[i]}</strong><small>${notes[i]}</small></span><span class="dock-arrow" aria-hidden="true">›</span></a>`).join('')}</nav></div>`;
  }
  function geese() { return `<section class="content-wrap geese-wrap">${head('', '长鹅救援队', '')}<p class="gallery-hint">点击图片，查看高清介绍</p><div class="geese-scroll"><div class="geese-grid">${C.geese.map((g,i)=>`<button class="goose-card ${i===0?'goose-leader':''}" style="grid-row:${i===0?1:Math.floor((i-1)/5)+2};grid-column:${i===0?3:(i-1)%5+1}" data-goose="${i}" aria-label="查看${e(g.person || '')} · ${e(g.name)}高清介绍" ${U.safeFile(g.image) ? '' : 'disabled'}><span class="goose-person">${e(g.person || '姓名待补充')}</span>${U.safeFile(g.image) ? `<img src="${e(U.safeFile(g.image))}" alt="${e(g.name)}介绍图" loading="${i===0?'eager':'lazy'}" decoding="async">` : `<span class="goose-shape">${e(g.name)}</span>`}</button>`).join('')}</div></div></section>`; }
  function bottleLink(t) {
    const url=t.formReady ? U.safeForm(t.formUrl) : '';
    const art='<span class="bottle-cork"></span><span class="bottle-neck"></span><span class="bottle-body"><span class="bottle-letter">✉</span></span>';
    return url ? '<a class="bottle" href="'+e(url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+e(t.title)+'，打开投稿问卷">'+art+'</a>' : '<button class="bottle" data-bottle aria-label="查看当前主题说明">'+art+'</button>';
  }
  function bay() { const t = C.themes[state.theme]; return `<section class="bay-scene">${head('MESSAGE IN A BOTTLE', '漂流瓶海湾', '夜海有灯塔，也有等待出发的话。')}<div class="bay-content"><div class="day-tabs" aria-label="选择投稿主题">${C.themes.map((t,i)=>`<button data-theme="${i}" class="${state.theme===i?'active':''}" aria-pressed="${state.theme===i}">第 ${t.day} 天</button>`).join('')}</div><h2>${e(t.title)}</h2><p class="bay-intro">${e(t.intro)}</p>${bottleLink(t)}<div class="bay-action">${formButton(t.formReady ? t.formUrl : '',t.buttonLabel || '前往投稿')}<p>${e(t.instructions)}</p><small>通过飞书投稿，提交后查看表单反馈</small></div></div></section>`; }
  function post() {
    const cards = C.postcards.filter(x => U.safeFile(x.image));
    const p = state.postcard;
    return `<section class="content-wrap post-wrap">${head('A LITTLE LETTER, AN UNEXPECTED MEETING', '不期鹅遇 · 漂流邮局', '有些相遇，始于一张偶然拆开的明信片。')}<div class="post-layout"><aside class="post-letter"><span class="postmark">漂流邮局<br>第五天</span><h2>寄出明信片</h2><p>${e(C.post.intro)}</p><div class="rules">${e(C.post.rules || '投稿规则筹备中，确认后开放寄送。')}</div>${formButton(C.post.formReady && C.post.rules ? C.post.formUrl : '', '寄出明信片')}<small>审核及获准公开后收录，不会实时上墙。</small></aside><div class="draw-area"><p class="eyebrow">抽一张明信片</p>${p ? `<button class="postcard ${state.back?'is-flipped':''}" data-flip aria-pressed="${state.back}" aria-label="${state.back?'翻回作品正面':'翻面阅读留言'}"><span class="card-inner"><span class="card-face card-front" aria-hidden="${state.back}"><img src="${e(U.safeFile(p.image))}" alt="明信片作品"><span>轻触翻面 · 读一读留言</span></span><span class="card-face card-back" aria-hidden="${!state.back}"><span class="card-label">旅途来信</span><span class="card-message">${e(p.message)}</span><span class="card-author">来自 ${e(p.author || '一位旅伴')}</span>${p.note?`<span class="card-note">${e(p.note)}</span>`:''}</span></span></button><div class="postcard-actions"><button class="button" data-flip-control>${state.back?'查看正面':'翻面读留言'}</button><button class="button" data-enlarge>放大明信片 ↗</button></div><p class="ending">${e(C.post.ending)}</p>` : `<div class="empty-postcard"><span class="stamp-square">鹅<br>邮局</span><span class="envelope-icon" aria-hidden="true">✉</span><h2>明信片正在路上</h2><p>${cards.length ? '点击抽取，翻面阅读留言。' : '作品整理后开放抽取。'}</p><span class="card-dashes"></span></div>`}<button class="button primary" data-draw ${cards.length ? '' : 'disabled'}>${cards.length ? (p?'再抽一张':'抽取一张明信片') : '卡池筹备中'}</button><p class="draw-note">${cards.length ? (cards.every(card=>card.demo) ? 'AI生成的体验明信片，非真实群友投稿。' : '随机抽取，可能重复，不做一对一配对。') : '等待收录已获公开许可的作品。'}</p></div></div></section>`;
  }
  function journal() {
    const i=state.page, o=C.outcomes[i-1];
    return `<section class="journal-wrap">${head('THE THINGS WE TAKE HOME', '周末旅行图鉴', '把七天的灵感、相遇与收获，装订成一本纪念。')}<div class="journal-stage"><div class="book"><div class="book-binding"></div><div class="book-page ${i===0?'book-cover':''}" id="book-page">${i===0 ? `<svg class="journal-map-cover" viewBox="0 0 941 1672" preserveAspectRatio="xMidYMid slice" role="img" aria-label="顺时针旋转为竖版的七岛全亮地图，七座岛完整展示"><image href="assets/journal-cover-map.png" width="1672" height="941" transform="translate(941 0) rotate(90)"/></svg><div class="journal-cover-title"><span class="book-edition">鹅创营 · 手帐</span><h2>旅行<br>图鉴</h2></div><span class="book-foot">点击下一页翻阅</span>` : `<div class="chapter-top"><span>第 ${i} 章</span><span>鹅创营 · 旅行图鉴</span></div>${U.safeFile(o.cover)?`<img class="outcome-cover" src="${e(U.safeFile(o.cover))}" alt="${e(o.title)}封面">`:`<div class="chapter-art"><span>${String(i).padStart(2,'0')}</span><small>成果封面筹备中</small></div>`}<h2>${e(o.title)}</h2><p>${e(o.description)}</p>${U.safeFile(o.file)?`<button class="button primary" data-outcome="${i-1}">阅读完整成果 ↗</button>`:'<button class="button" disabled>成果整理中</button>'}<span class="book-foot">${i} / 5 · 章节导览</span>`}</div></div></div><div class="book-controls"><button class="button" data-page="-1" ${i===0?'disabled':''} aria-label="上一页">← 上一页</button><span aria-live="polite">${i===0?'封面':`第 ${i} 章`} / 五份旅途成果</span><button class="button" data-page="1" ${i===5?'disabled':''} aria-label="下一页">下一页 →</button></div><div class="chapter-list" aria-label="章节目录"><button data-chapter="0" aria-pressed="${i===0}">封面</button>${C.outcomes.map((o,j)=>`<button data-chapter="${j+1}" aria-pressed="${i===j+1}">${String(j+1).padStart(2,'0')} ${e(o.title)}</button>`).join('')}</div></section>`;
  }
  function render(focus=false) {
    syncLighting();
    clearTimeout(state.timer); state.busy=false;
    const requested = location.hash.slice(1) || 'home';
    state.route = routes.includes(requested) ? requested : 'home';
    main.innerHTML=({home,geese,bay,post,journal}[state.route])();
    document.body.dataset.page=state.route;
    document.body.style?.setProperty('--camp-map', `url("${U.mapFile(day)}")`);
    if(state.route==='home'){
      const viewport=main.querySelector?.('.map-scroll');
      if(viewport)viewport.scrollTop=viewport.scrollHeight-viewport.clientHeight;
    }
    document.querySelectorAll('nav a').forEach(a=>{if(a.hash===`#${state.route}`)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title = `${({home:'七日漫游记',geese:'长鹅救援队',bay:'漂流瓶海湾',post:'漂流邮局',journal:'旅行图鉴'})[state.route]} · 鹅创营`;
    if(focus){window.scrollTo(0,0);main.focus({preventScroll:true});}
  }
  function showReader(title, html) { state.island=null; document.querySelector('#reader-title').textContent=title; document.querySelector('#reader-body').innerHTML=html; reader.showModal(); }
  function imageReader(title, path) { if(U.safeFile(path)) showReader(title,`<div class="reader-tools"><button class="button" data-reader-zoom aria-pressed="false">原始尺寸</button></div><div class="image-view"><img class="reader-image" src="${e(U.safeFile(path))}" alt="${e(title)}"></div>`); }
  function turnPage(target) {
    if(state.busy || target===state.page)return;
    const next = U.clampPage(target, C.outcomes.length+1);
    state.busy=true;
    const page=document.querySelector('#book-page');
    page.classList.add(next>state.page?'turn-next':'turn-prev');
    state.timer=setTimeout(()=>{state.page=next;render();document.querySelector('.book-controls').focus?.();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:380);
  }
  main.addEventListener('click', event => {
    const b=event.target.closest('button');if(!b || b.disabled)return;
    if(b.hasAttribute('data-island')) {
      const idx=Number(b.dataset.island), island=C.islands[idx], lit=island.day<=day;
      const link=island.day<=2?'bay':island.day===5?'post':island.day===7?'journal':null;
      if(island.day<=2)state.theme=island.day-1;
      showReader(`D${island.day} · ${island.name}`,`<img class="reader-image" data-island-art src="assets/${island.day}-${lit?2:1}.png" alt="${e(island.name)}${lit?'点亮后':'未点亮'}"><h3 class="island-note">${e(island.tagline)}</h3><p class="island-note">${e(island.description)}</p><p class="island-note" data-island-status>${lit?'这座岛已经点亮。':'这座岛尚未点亮，旅程将随活动进度展开。'}</p>${link?`<a class="button primary" href="#${link}" data-dialog-link>进入${island.day<=2?'漂流瓶海湾':island.day===5?'漂流邮局':'旅行图鉴'} →</a>`:'<p class="island-note">更多内容见地图下方入口。</p>'}`);
      state.island=idx;
    }
    if(b.hasAttribute('data-goose')){const g=C.geese[Number(b.dataset.goose)];imageReader(`${g.person ? g.person+' · ' : ''}${g.name}`,g.image);}
    if(b.hasAttribute('data-theme')){state.theme=Number(b.dataset.theme);render();}
    if(b.hasAttribute('data-bottle')){const t=C.themes[state.theme];showReader(t.title,`<p class="dialog-copy">${e(t.intro)}</p><p class="dialog-copy">${e(t.instructions)}</p>${formButton(t.formReady ? t.formUrl : '',t.buttonLabel || '前往投稿')}`);}
    if(b.hasAttribute('data-draw')) {
      if(state.busy)return;
      const cards=C.postcards.filter(x=>U.safeFile(x.image));if(!cards.length)return;
      state.busy=true;b.disabled=true;b.textContent='正在拆开一份问候…';
      state.timer=setTimeout(()=>{state.postcard=U.pick(cards);state.back=false;render();document.querySelector('[data-flip]').focus();document.querySelector('#announcement').textContent='已抽到明信片，点击卡片翻面阅读留言。';},450);
    }
    if(b.hasAttribute('data-flip') || b.hasAttribute('data-flip-control')){
      state.back=!state.back;
      const card=document.querySelector('.postcard');
      card.classList.toggle('is-flipped',state.back);
      card.setAttribute('aria-label',state.back?'翻回作品正面':'翻面阅读留言');
      card.setAttribute('aria-pressed',String(state.back));
      document.querySelector('.card-front').setAttribute('aria-hidden',String(state.back));
      document.querySelector('.card-back').setAttribute('aria-hidden',String(!state.back));
      document.querySelector('[data-flip-control]').textContent=state.back?'查看正面':'翻面读留言';
      document.querySelector('#announcement').textContent=state.back?'已翻至留言面':'已翻至作品正面';
    }
    if(b.hasAttribute('data-enlarge')&&state.postcard){
      const p=state.postcard;
      showReader('明信片 · '+(p.author || '一位旅伴'),'<div class="reader-tools"><button class="button" data-reader-zoom aria-pressed="false">原始尺寸</button></div><div class="image-view"><img class="reader-image" src="'+e(U.safeFile(p.image))+'" alt="海边明信片作品"></div><section class="enlarged-message" aria-label="明信片留言"><p>'+e(p.message)+'</p><p class="reader-author">'+e(p.author || '一位旅伴')+'</p>'+(p.note?'<small>'+e(p.note)+'</small>':'')+'</section>');
    }
    if(b.hasAttribute('data-page'))turnPage(state.page+Number(b.dataset.page));
    if(b.hasAttribute('data-chapter'))turnPage(Number(b.dataset.chapter));
    if(b.hasAttribute('data-outcome')) {
      const o=C.outcomes[Number(b.dataset.outcome)], file=U.safeFile(o.file);if(!file)return;
      if(o.type==='pdf'||file.toLowerCase().endsWith('.pdf'))window.open(file,'_blank','noopener,noreferrer');else imageReader(o.title,file);
    }
  });
  document.querySelector('#reader-close').addEventListener('click',()=>reader.close());
  reader.addEventListener('click',event=>{
    const zoom=event.target.closest('[data-reader-zoom]');
    if(zoom){const wide=zoom.getAttribute('aria-pressed')!=='true';document.querySelector('.image-view').classList.toggle('original-size',wide);zoom.setAttribute('aria-pressed',String(wide));zoom.textContent=wide?'适应窗口':'原始尺寸';}
    if(event.target.closest('[data-dialog-link]')||event.target===reader)reader.close();
  });
  reader.addEventListener('close',()=>{state.island=null;document.querySelector('#reader-body').innerHTML='';});
  // 不在resize时重置地图位置：手机地址栏伸缩和转屏不应把浏览中的地图拉回底部。
  document.addEventListener('error',event=>{
    if(event.target.tagName!=='IMG')return;
    const note=document.createElement('p');note.className='island-note';note.textContent='图片暂时无法加载，请稍后重试。';
    event.target.replaceWith(note);
  },true);
  window.addEventListener('hashchange',()=>{if(reader.open)reader.close();render(true);});
  render();
  // 只在进度变化时修改画面，不重新渲染、不打断抽卡/翻页或阅读。
  window.setInterval(syncLighting,1000);
  window.addEventListener('focus',syncLighting);
  window.addEventListener('pageshow',syncLighting);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncLighting();});
})();
