// UTS.js
const burger = document.getElementById('utsBurger');
const sidebar = document.getElementById('utsSidebar');
const closeBtn = document.getElementById('utsCloseSidebar');
const lessonListEl = document.getElementById('utsLessonList');
const lessonContentEl = document.getElementById('utsLessonContent');

function openSidebar() {
  sidebar.classList.add('active');
  burger.classList.add('open');
  burger.style.transform = 'rotate(45deg)';
}

function closeSidebar() {
  sidebar.classList.remove('active');
  burger.classList.remove('open');
  burger.style.transform = '';
}

burger.addEventListener('click', () => {
  if (sidebar.classList.contains('active')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

burger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    burger.click();
  }
});

closeBtn.addEventListener('click', () => {
  closeSidebar();
});

// Close sidebar on outside click (only if sidebar is open)
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    closeSidebar();
  }
});

// Close sidebar on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('active')) {
    closeSidebar();
  }
});

// Lessons data
const lessons = [
  {
    title: "Orientation & Course Overview – What is Self?",
    content: `
      <p><strong>Familiarize with the course, expectations, and importance of self-awareness.</strong></p>
      <p>This lesson introduces the course structure and highlights why understanding the self is essential for personal growth and academic success.</p>
    `
  },
  {
    title: "Philosophical Perspectives of the Self (Plato, St. Augustine, Descartes, Hume, Kant, Ryle, Merleau-Ponty)",
    content: `
      <p><strong>Compare and contrast classical and modern views of the self.</strong></p>
      <p>This lesson explores major philosophical thinkers and their contributions to the concept of self, from ancient to modern philosophy.</p>
    `
  },
  {
    title: "Sociological & Anthropological Perspectives (Mead, Cooley, Socialization, Culture & Identity)",
    content: `
      <p><strong>Explain how social interaction and culture influence self-concept.</strong></p>
      <p>This lesson examines how society and culture shape our identity and the development of the self through socialization.</p>
    `
  },
  {
    title: "Psychological Perspectives of the Self (Freud, Erikson, Jung, Bandura, Rogers, Maslow)",
    content: `
      <p><strong>Discuss theories of personality, identity formation, and motivation.</strong></p>
      <p>This lesson covers key psychological theories explaining how personality and identity develop.</p>
    `
  },
  {
    title: "The Biological Basis of the Self",
    content: `
      <p><strong>Recognize how heredity, brain, hormones, and health affect self and behavior.</strong></p>
      <p>This lesson explores the biological factors that influence our sense of self and behavior.</p>
    `
  },
  {
    title: "The Cognitive Self",
    content: `
      <p><strong>Understand thinking, memory, and decision-making in self-development.</strong></p>
      <p>This lesson discusses cognitive processes that shape how we perceive and develop our self.</p>
    `
  },
  {
    title: "The Emotional Self",
    content: `
      <p><strong>Analyze how emotions, self-esteem, and emotional intelligence shape behavior.</strong></p>
      <p>This lesson focuses on the role of emotions and emotional intelligence in self-awareness and behavior.</p>
    `
  },
  {
    title: "The Digital Self",
    content: `
      <p><strong>Evaluate the effects of social media, online identity, and digital footprint.</strong></p>
      <p>This lesson explores how digital presence influences our self-concept and social interactions.</p>
    `
  },
  {
    title: "The Physical Self",
    content: `
      <p><strong>Appreciate body image, wellness, and lifestyle choices in shaping the self.</strong></p>
      <p>This lesson discusses the connection between physical health and self-perception.</p>
    `
  },
  {
    title: "Summary & Reflection",
    content: `
      <p><strong>Review key concepts and reflect on personal growth.</strong></p>
      <p>This lesson summarizes the course topics and encourages reflection on how understanding the self can impact your life.</p>
    `
  }
];

// Render lesson list
function renderLessonList() {
  lessonListEl.innerHTML = '';
  lessons.forEach((lesson, index) => {
    const li = document.createElement('li');
    li.textContent = lesson.title;
    li.setAttribute('tabindex', '0');
    li.setAttribute('role', 'button');
    li.setAttribute('aria-pressed', 'false');
    li.dataset.index = index;
    li.addEventListener('click', () => selectLesson(index));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLesson(index);
      }
    });
    lessonListEl.appendChild(li);
  });
}

// Select and show lesson content
function selectLesson(index) {
  [...lessonListEl.children].forEach(li => {
    li.classList.remove('active');
    li.setAttribute('aria-pressed', 'false');
  });
  const selectedLi = lessonListEl.children[index];
  selectedLi.classList.add('active');
  selectedLi.setAttribute('aria-pressed', 'true');

  const lesson = lessons[index];
  lessonContentEl.innerHTML = lesson.content;
  lessonContentEl.focus();
}

renderLessonList();
