const projects = [
  { title: '棕色姿态', english: 'BROWN ATTITUDE', type: '时尚摄影 · 小组项目', category: 'photo', href: '#fashion', image: 'media/fashion-portrait.webp' },
  { title: '汉服视觉', english: 'HANFU VISUAL', type: '调研与视觉传播 · 团队项目', category: 'visual', href: '#hanfu', image: 'media/hanfu-green.webp' },
  { title: '茶叶产品视觉', english: 'COLOUR & LIGHT', type: '商业静物摄影', category: 'photo', href: '#still-life', image: 'media/tea-red.webp' },
  { title: '古楼映江城', english: 'WUHAN / HUANGHE TOWER', type: '建筑摄影', category: 'photo', href: '#architecture', image: 'media/architecture-eave.webp' },
  { title: '屏幕之中的人', english: 'VIRTUAL IMAGE & FILM', type: '虚拟图像与实验短片', category: 'digital', href: '#virtual', image: 'media/virtual-02.webp' }
];

const projectList = document.querySelector('#project-list');
for (const project of projects) {
  const row = document.createElement('a');
  row.className = 'project-row';
  row.href = project.href;
  row.dataset.category = project.category;
  row.innerHTML = `<span class="project-row-title">${project.title}<small>${project.english}</small></span><span class="project-row-type">${project.type}</span><img src="${project.image}" alt="" loading="lazy"><span class="row-arrow" aria-hidden="true">↗</span>`;
  projectList.append(row);
}

const filters = [...document.querySelectorAll('[data-filter]')];
for (const filter of filters) {
  filter.addEventListener('click', () => {
    filters.forEach(button => {
      const active = button === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    [...projectList.children].forEach(row => {
      row.hidden = filter.dataset.filter !== 'all' && row.dataset.category !== filter.dataset.filter;
    });
  });
}

const virtualTitles = [
  '虚拟图像 · 城市中的屏幕人物',
  '虚拟图像 · 屏幕取代面孔',
  '虚拟图像 · 人群与信息',
  '虚拟图像 · 街道',
  '虚拟图像 · 通勤',
  '虚拟图像 · 日常片段',
  '虚拟图像 · 课堂',
  '虚拟图像 · 屏幕与视线',
  '虚拟图像 · 集体状态'
];
const virtualGrid = document.querySelector('#virtual-grid');
virtualTitles.forEach((title, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'image-button';
  button.dataset.lightbox = '';
  button.dataset.title = title;
  button.setAttribute('aria-label', `放大查看${title}`);
  button.innerHTML = `<img src="media/virtual-${String(index + 1).padStart(2, '0')}.webp" alt="${title}" loading="lazy">`;
  virtualGrid.append(button);
});

const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 90 || window.innerWidth <= 740 && window.scrollY > 10);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
menuToggle.addEventListener('click', () => {
  const open = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', '打开导航');
}));

const compare = document.querySelector('#fashion-compare');
const compareRange = document.querySelector('#compare-range');
compareRange.addEventListener('input', () => compare.style.setProperty('--split', `${compareRange.value}%`));
const beforeImage = document.querySelector('#compare-before');
document.querySelectorAll('.compare-option').forEach(button => button.addEventListener('click', () => {
  beforeImage.src = button.dataset.before;
  beforeImage.alt = button.textContent.trim() === '棚拍原图' ? '时尚肖像棚拍原图' : '时尚肖像高级灰背景方案';
  document.querySelectorAll('.compare-option').forEach(option => {
    const active = option === button;
    option.classList.toggle('is-active', active);
    option.setAttribute('aria-pressed', String(active));
  });
}));

const posterTrack = document.querySelector('#poster-track');
const scrollPosters = direction => {
  const poster = posterTrack.querySelector('figure');
  const gap = parseFloat(getComputedStyle(posterTrack).gap) || 0;
  posterTrack.scrollBy({ left: direction * (poster.getBoundingClientRect().width + gap), behavior: 'smooth' });
};
document.querySelector('#poster-prev').addEventListener('click', () => scrollPosters(-1));
document.querySelector('#poster-next').addEventListener('click', () => scrollPosters(1));

const imageButtons = [...document.querySelectorAll('[data-lightbox]')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activeImageIndex = 0;
function showImage(index) {
  activeImageIndex = (index + imageButtons.length) % imageButtons.length;
  const button = imageButtons[activeImageIndex];
  const source = button.querySelector('img');
  lightboxImage.src = source.currentSrc || source.src;
  lightboxImage.alt = source.alt;
  lightboxCaption.textContent = button.dataset.title;
}
imageButtons.forEach((button, index) => button.addEventListener('click', () => {
  showImage(index);
  lightbox.showModal();
}));
document.querySelector('#lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('#lightbox-prev').addEventListener('click', () => showImage(activeImageIndex - 1));
document.querySelector('#lightbox-next').addEventListener('click', () => showImage(activeImageIndex + 1));
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(activeImageIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showImage(activeImageIndex + 1); }
});
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const filmDialog = document.querySelector('#film-dialog');
const filmVideo = document.querySelector('#film-video');
const openFilm = () => {
  filmDialog.showModal();
  filmVideo.play().catch(() => {});
};
document.querySelector('#open-film').addEventListener('click', openFilm);
document.querySelector('#open-film-poster').addEventListener('click', openFilm);
document.querySelector('#film-close').addEventListener('click', () => filmDialog.close());
filmDialog.addEventListener('close', () => { filmVideo.pause(); filmVideo.currentTime = 0; });
