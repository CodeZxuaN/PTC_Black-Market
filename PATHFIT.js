(function () {
  'use strict';

  // -----------------------
  // Lesson Data with videos (3 videos per lesson)
  // -----------------------
  // Replace video IDs with your actual YouTube video IDs or URLs
  const lessons = [
    {
      title: "Lesson 01: Introduction to PATHFIT",
      content: "<p>Overview of PATHFIT and its goals.</p>",
      videos: [
        "NU-LwPxsrAA",
        "dQw4w9WgXcQ",
        "3JZ_D3ELwOQ"
      ]
    },
    {
      title: "Lesson 02: Not Available",
      content: "<p>Simple warm-up routines and why they matter.</p>",
      videos: [
        "M7lc1UVf-VE",
        "e-ORhEE9VVg",
        "kXYiU_JCYtU"
      ]
    },
    {
      title: "Lesson 03: Not Available",
      content: "<p>Dynamic stretches to prepare the body.</p>",
      videos: [
        "VbfpW0pbvaU",
        "RgKAFK5djSk",
        "uelHwf8o7_U"
      ]
    },
    
    
    // Add more lessons with videos as needed
  ];

  // -----------------------
  // DOM references
  // -----------------------
  const lessonListNode = document.getElementById('pathfitLessonList');
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
  // Render lesson list
  // -----------------------
  function renderLessonList() {
    lessonListNode.innerHTML = '';
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

      lessonListNode.appendChild(li);
    });
  }

  // -----------------------
  // Select / display lesson with multiple video buttons
  // -----------------------
  function selectLesson(index) {
    // Highlight active lesson in sidebar
    Array.from(lessonListNode.children).forEach((child) => {
      child.classList.remove('active');
      child.setAttribute('aria-pressed', 'false');
    });
    const sel = lessonListNode.querySelector(`[data-index="${index}"]`);
    if (sel) {
      sel.classList.add('active');
      sel.setAttribute('aria-pressed', 'true');
    }

    const lesson = lessons[index];
    // Build video buttons HTML
    let videoButtonsHTML = '';
    if (lesson.videos && lesson.videos.length > 0) {
      videoButtonsHTML = '<div id="videoButtonsContainer" aria-label="Video selection buttons">';
      lesson.videos.forEach((videoId, idx) => {
        videoButtonsHTML += `
          <button class="video-btn" 
            onclick="window.location.href='PEVID.html?lesson=${index + 1}&video=${idx + 1}'"
            aria-label="Watch Video ${idx + 1} of ${lesson.title}">
            🎥 Video ${idx + 1}
          </button>
        `;
      });
      videoButtonsHTML += '</div>';
    } else {
      videoButtonsHTML = '<p><em>No videos available for this lesson.</em></p>';
    }

    lessonContent.innerHTML = `
      <h3>${lesson.title}</h3>
      ${lesson.content}
      ${videoButtonsHTML}
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
  renderLessonList();
})();
