/* ===== GlowByte — общий JS для внутренних страниц ===== */
(function(){
  const C = ['#FE6A00','#337D76','#FFB000','#32487D'];
  const DIRECTIONS = [
    ['Advanced Analytics','Продвинутая аналитика, ML и ИИ для оптимальных бизнес-решений'],
    ['Risk Management & Compliance','Автоматизация управления рисками и регуляторных требований'],
    ['Marketing Management','Клиентская аналитика и автоматизация маркетинга'],
    ['Marketing Service Provider','Бизнес-консалтинг и аналитика для CRM-маркетинга'],
    ['Business Intelligence','Визуализация данных на новом уровне','business-intelligence.html'],
    ['Финансовая аналитика','Решения для эффективности управления — CPM','finansovaya-analitika.html'],
    ['Customer Experience','Изучаем клиентский опыт и собираем обратную связь'],
    ['Business Process Management','Развитие процессной зрелости компании, BPM'],
    ['Retail Solutions','Промышленные решения для коммерческой функции ритейла'],
    ['Промышленный IoT','Предиктивная аналитика и цифровые советники для производства'],
    ['Страховые компании','IT-решения для процессов страховых на основе ИИ'],
    ['Process & Task Mining','Реальная картина работы процессов и отделов'],
    ['Data Governance','Управление данными: качество, метаданные, НСИ'],
    ['Value Added Reseller','Официальный поставщик лицензионного ПО'],
    ['DWH — хранилища данных','Сбор, обработка и анализ исторических данных','dwh.html'],
    ['RPA','Роботизация рутинных бизнес-процессов'],
    ['Заказная разработка','Разработка ПО под задачи бизнеса: модули, интеграции, совместная разработка','zakaznaya-razrabotka.html'],
  ];
  const megaGrid = document.getElementById('megaGrid');
  if(megaGrid){
    DIRECTIONS.forEach(([t,d,url],i)=>{
      const c = C[i % C.length];
      const mi = document.createElement('a');
      mi.href = url || 'index.html#directions'; mi.className = 'mega-item';
      mi.innerHTML = `<span class="cube" style="background:${c}"></span><div><div class="mt">${t}</div><div class="md">${d}</div></div>`;
      megaGrid.appendChild(mi);
    });
  }

  // тень/фон шапки при скролле (на светлых страницах — всегда solid)
  const hdr = document.getElementById('hdr');
  const forceSolid = !!document.querySelector('.article-hero');
  const onScroll = ()=> hdr.classList.toggle('solid', forceSolid || window.scrollY > 60);
  onScroll(); window.addEventListener('scroll', onScroll);

  // мобильное меню
  const burger = document.getElementById('burger');
  if(burger){
    burger.addEventListener('click', ()=>{
      const m = document.querySelector('.menu');
      const open = m.style.display === 'flex';
      m.style.cssText = open ? '' : 'display:flex;position:absolute;top:76px;left:0;right:0;background:#fff;flex-direction:column;align-items:stretch;padding:14px 24px;gap:6px;box-shadow:0 20px 40px rgba(0,0,0,.12)';
      document.querySelectorAll('.menu>a,.menu .has-mega>span').forEach(el=>el.style.color='#15171c');
    });
  }

  // reveal on scroll
  const io = new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // переключение таб (мероприятия): предстоящие / прошедшие
  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const btns = group.querySelectorAll('button[data-tab]');
    btns.forEach(b=>b.addEventListener('click',()=>{
      const key = b.dataset.tab;
      btns.forEach(x=>x.classList.toggle('on', x===b));
      document.querySelectorAll('[data-tabpanel]').forEach(p=>{
        p.style.display = (p.dataset.tabpanel===key) ? '' : 'none';
      });
    }));
  });

  // pop-up окна (решения направлений)
  const closeModals = ()=>{
    document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-modal-open]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const m = document.getElementById(btn.getAttribute('data-modal-open'));
      if(m){ m.classList.add('open'); document.body.style.overflow = 'hidden'; }
    });
  });
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click',(e)=>{
      if(e.target === m || e.target.closest('[data-modal-close]')) closeModals();
    });
  });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeModals(); });

  // ===== Cookie banner =====
  const CB_KEY = 'gb_cookie_consent';
  if(!localStorage.getItem(CB_KEY)){
    const style = document.createElement('style');
    style.textContent = [
      '#gb-cookie{position:fixed;bottom:0;left:0;right:0;z-index:998;background:rgba(20,29,58,.97);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.1);padding:20px 24px;animation:cbUp .35s cubic-bezier(.22,.61,.36,1)}',
      '@keyframes cbUp{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}',
      '.cb-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}',
      '.cb-text{color:rgba(255,255,255,.88);font-size:14px;font-family:\'Montserrat\',sans-serif;line-height:1.55;flex:1;min-width:260px}',
      '.cb-text strong{color:#fff;font-weight:700;display:block;margin-bottom:3px;font-size:15px}',
      '.cb-text a{color:#FE6A00;font-weight:700;text-decoration:underline;text-underline-offset:2px}',
      '.cb-text a:hover{color:#FFB000}',
      '.cb-btns{display:flex;gap:10px;flex-shrink:0}',
      '.cb-btn{font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;padding:11px 22px;border-radius:10px;cursor:pointer;border:0;transition:transform .15s,background .15s,opacity .15s}',
      '.cb-secondary{background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.22)!important}',
      '.cb-secondary:hover{background:rgba(255,255,255,.18)}',
      '.cb-primary{background:#FE6A00;color:#fff}',
      '.cb-primary:hover{background:#e85d00;transform:translateY(-1px)}',
      '@media(max-width:600px){.cb-inner{flex-direction:column;align-items:flex-start;gap:14px}.cb-btns{width:100%}.cb-btn{flex:1;text-align:center}}',
    ].join('');
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'gb-cookie';
    banner.innerHTML = '<div class="cb-inner"><div class="cb-text"><strong>Мы используем cookies</strong>Для аналитики и корректной работы сайта (Яндекс.Метрика). <a href="cookies.html">Политика cookies →</a></div><div class="cb-btns"><button class="cb-btn cb-secondary" id="cb-decline">Только необходимые</button><button class="cb-btn cb-primary" id="cb-accept">Принять все</button></div></div>';
    document.body.appendChild(banner);

    const hide = (val)=>{
      localStorage.setItem(CB_KEY, val);
      banner.style.transition = 'transform .3s ease,opacity .3s ease';
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(()=>banner.remove(), 310);
    };
    document.getElementById('cb-accept').addEventListener('click', ()=>hide('all'));
    document.getElementById('cb-decline').addEventListener('click', ()=>hide('necessary'));
  }
})();
