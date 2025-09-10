// PATHFIT.js — with video button for every lesson
(function () {
  'use strict';

  // -----------------------
  // Lesson Data (15 lessons)
  // -----------------------
  const lessons = [
    { title: "Lesson 01: Introduction to PATHFIT", content: "<p>Overview of PATHFIT and its goals.</p>" },
    { title: "Lesson 02: Warm-Up Basics", content: "<p>Simple warm-up routines and why they matter.</p>" },
    { title: "Lesson 03: Dynamic Stretching", content: "<p>Dynamic stretches to prepare the body.</p>" },
    { title: "Lesson 04: Cardiovascular Basics", content: "<p>Intro to aerobic work and endurance concepts.</p>" },
    { title: "Lesson 05: Strength Fundamentals", content: "<p>Foundational movements for strength development.</p>" },
    { title: "Lesson 06: Mobility Drills", content: "<p>Mobility drills to improve joint range and movement quality.</p>" },
    { title: "Lesson 07: Balance & Coordination", content: "<p>Exercises to enhance stability and coordination.</p>" },
    { title: "Lesson 08: Plyometrics & Power", content: "<p>Basic plyometric drills for power development.</p>" },
    { title: "Lesson 09: Flexibility Routines", content: "<p>Static and PNF stretches for flexibility.</p>" },
    { title: "Lesson 10: Recovery Techniques", content: "<p>Cooldowns, foam rolling, and recovery strategies.</p>" },
    { title: "Lesson 11: Nutrition Basics", content: "<p>Simple nutrition principles for activity and recovery.</p>" },
    { title: "Lesson 12: Injury Prevention", content: "<p>Key tips to reduce risk of common injuries.</p>" },
    { title: "Lesson 13: Group Activity Strategies", content: "<p>How to run safe and effective group sessions.</p>" },
    { title: "Lesson 14: Tracking Progress", content: "<p>Methods to log and measure improvement.</p>" },
    { title: "Lesson 15: Lifelong Movement", content: "<p>Keeping fitness sustainable across life stages.</p>" }
  ];

  // -----------------------
  // DOM references
  // -----------------------
  const lessonListNodes = document.querySelectorAll('#pathfitLessonList');
  const lessonContent = document.getElementById('pathfitLessonContent');
  const burger = document.getElementById('pathfitBurger');
  const sidebar = document.getElementById('pathfitSidebar');
  const closeBtn = document.getElementById('pathfitCloseSidebar');

  // -----------------------
  // Sidebar open/close
  // -----------------------
  function openSidebar() {
    sidebar.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }
  function toggleSidebar() {
    sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
  }

  // -----------------------
  // Render lesson list(s)
  // -----------------------
  function renderLessonLists() {
    lessonListNodes.forEach((listEl) => {
      listEl.innerHTML = '';
      lessons.forEach((lesson, i) => {
        const li = document.createElement('li');
        li.textContent = lesson.title;
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.dataset.index = i;

        li.addEventListener('click', () => {
          selectLesson(i);
          closeSidebar();
        });

        li.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectLesson(i);
            closeSidebar();
          }
        });

        listEl.appendChild(li);
      });
    });
  }

  // -----------------------
  // Select / display lesson
  // -----------------------
  function selectLesson(index) {
    lessonListNodes.forEach((listEl) => {
      Array.from(listEl.children).forEach((child) => {
        child.classList.remove('active');
        child.setAttribute('aria-pressed', 'false');
      });
      const sel = listEl.querySelector(`[data-index="${index}"]`);
      if (sel) {
        sel.classList.add('active');
        sel.setAttribute('aria-pressed', 'true');
      }
    });

    const lesson = lessons[index];
    lessonContent.innerHTML = `
      <h3>${lesson.title}</h3>
      ${lesson.content}
      <button class="video-btn" onclick="window.location.href='PEVID.html?lesson=${index + 1}'">
        🎥 Watch Video
      </button>
    `;
    lessonContent.focus();
  }

  // -----------------------
  // Event wiring
  // -----------------------
  burger.addEventListener('click', toggleSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !burger.contains(e.target)) {
      closeSidebar();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // -----------------------
  // Initialize
  // -----------------------
  renderLessonLists();
})();
