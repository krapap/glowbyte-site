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

  // тень/фон шапки при скролле
  const hdr = document.getElementById('hdr');
  const onScroll = ()=> hdr.classList.toggle('solid', window.scrollY > 60);
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
})();
