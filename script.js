/* =========
   DATA
============ */
const skillBars = [
  { name: 'Coding', pct: 30 },
  { name: 'Hardware', pct: 20 },
  { name: 'Problem Solving', pct: 27 },
  { name: 'Talking', pct: 30 },
  { name: 'Listening', pct: 45 }
];

/* SKILL PILLS */
const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'Git',
  'Web Development',
  'Problem Solving',
  'Bot Development (Learning)'
];

/* PROJECTS */
const projects = [
  {
    id: 1,
    year: '1st',
    sem: '2nd Semester',
    title: 'Wedding Coordination Management System',
    desc: 'A full-featured website for managing wedding coordination — bookings, vendors, timelines, and client communication all in one place.',
    type: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'IoT'],
    link: 'https://avatavisuals.netlify.app',
    modal: false
  },
  {
    id: 2,
    year: '1st',
    sem: '2nd Semester',
    title: 'Godzilla Sumobot',
    desc: 'Dual-MCU autonomous sumo robot with voice feedback, advanced sensing, and a reinforced scraper chassis.',
    type: 'Robotics',
    tags: ['ESP32', 'C++ / Arduino', 'Robotics', '3D Printing'],
    modal: true
  }
];

/* GALLERY */
const gallery = [
  { src: 'circle of friends.jfif', caption: 'my circle of friends' },
  { src: 'doingActivities.jfif', caption: 'doing activities' },
  { src: 'comfesta 2026.jfif', caption: 'comfesta 2026' },
  { src: 'lakbay likha 2026.jfif', caption: 'lakbay likha 2026' },
  { src: 'ha.jfif', caption: ':>' },
  { src: 'oh...jfif', caption: ':<' },
  { src: 'incomplete.jfif', caption: 'incomplete' },
  { src: 'wiring.jfif', caption: 'wiring' },
  { src: 'seminar.jfif', caption: 'seminar' },
  { src: 'webinar2.jfif', caption: 'webinar' },
  { src: 'webinar.jfif', caption: 'webinar' },
  { src: 'defense.jpg', caption: 'final defense' }
];

let activeYear = 'all';

function toggleNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  toggle.classList.toggle('open');
  links.classList.toggle('open');
}

function showPage(id, linkEl) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  document
    .getElementById('page-' + id)
    .classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a =>
    a.classList.remove('active')
  );

  if (linkEl) linkEl.classList.add('active');

  document.getElementById('navToggle').classList.remove('open');
  document.getElementById('navLinks').classList.remove('open');

  // close projects dropdown if open
  const dd = document.getElementById('projectsDropdown');
  if (dd) dd.classList.remove('open');

  window.scrollTo(0, 0);

  if (id === 'skills') {
    setTimeout(animateSkillBars, 200);
  }

  return false;
}

function renderSkillBars() {
  document.getElementById('skillBars').innerHTML =
    skillBars.map(s => `
      <div class="skill-row">
        <div class="skill-top">
          <span class="skill-name">${s.name}</span>
          <span class="skill-pct">${s.pct}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" data-pct="${s.pct}"></div>
        </div>
      </div>
    `).join('');
}

function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill')
    .forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
}

function renderSkillPills() {
  document.getElementById('skillsGrid').innerHTML =
    skills.map(skill =>
      `<span class="skill-pill">${skill}</span>`
    ).join('');
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  const filtered = activeYear === 'all'
    ? projects
    : projects.filter(p => p.year === activeYear);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="soon-card">
        <div class="soon-icon">&#9200;</div>
        <div class="soon-label">Projects coming soon — check back later!</div>
      </div>`;
    return;
  }

  filtered.forEach(project => {
    const tagsHtml = project.tags && project.tags.length
      ? '<div class="card-footer-tags">' +
        project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('') +
        '</div>'
      : '';

    const actionHtml = project.modal
      ? `<div class="card-link-wrap">
          <button class="card-link-btn" onclick="openProjectModal(event)">
            View Project →
          </button>
        </div>`
      : project.link
        ? `<div class="card-link-wrap">
            <a class="card-link-btn"
              href="${project.link}"
              target="_blank"
              rel="noopener noreferrer"
              onclick="event.stopPropagation()"
            >
              View Project →
            </a>
          </div>`
        : '';

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="card-type">${project.type || 'Project'}</div>
      <div class="card-title">${project.title}</div>
      <div class="card-desc">${project.desc}</div>
      ${actionHtml}
      ${tagsHtml}
    `;

    if (project.modal) {
      card.addEventListener('click', openProjectModal);
    } else if (project.link) {
      card.addEventListener('click', () => {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      });
    }

    grid.appendChild(card);
  });

  // show "soon" card for future years
  if (activeYear === '2nd' || activeYear === '3rd' || activeYear === '4th') {
    const soon = document.createElement('div');
    soon.className = 'soon-card';
    soon.innerHTML = `
      <div class="soon-icon">&#9200;</div>
      <div class="soon-label">More projects on the way — stay tuned!</div>
    `;
    grid.appendChild(soon);
  }
}

function switchYearTab(year, btn) {
  activeYear = year;
  document.querySelectorAll('.project-tab')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects();
}

/* PROJECT MODAL */
function openProjectModal(e) {
  e.stopPropagation();
  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* PROJECTS DROPDOWN NAV */
function toggleProjectsDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById('projectsDropdown').classList.toggle('open');
}

document.addEventListener('click', () => {
  const dd = document.getElementById('projectsDropdown');
  if (dd) dd.classList.remove('open');
});

/* GALLERY */
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  gallery.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML =
      `<img src="${entry.src}" alt="Gallery photo">` +
      (entry.caption
        ? `<div class="gallery-caption">
            <span class="gallery-caption-text">${entry.caption}</span>
          </div>`
        : '');
    item.onclick = () => openLightbox(entry.src);
    grid.appendChild(item);
  });
}

function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

window.addEventListener('load', () => {
  renderSkillBars();
  renderSkillPills();
  renderProjects();
  renderGallery();
});