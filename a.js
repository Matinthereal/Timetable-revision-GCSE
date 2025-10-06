// Toggle between today view and full timetable
const toggleViewBtn = document.getElementById('toggle-view');
const fullTable = document.getElementById('full-timetable');
const todayCards = document.querySelectorAll('.layout > div:first-child > .card');

toggleViewBtn.onclick = () => {
  const showing = fullTable.style.display !== 'none';
  if (showing){
    fullTable.style.display = 'none';
    todayCards.forEach(c => c.style.display = '');
    toggleViewBtn.textContent = 'Switch to Full Timetable';
  } else {
    renderFullTimetable();
    fullTable.style.display = '';
    todayCards.forEach(c => c.style.display = 'none');
    toggleViewBtn.textContent = 'Back to Today’s Plan';
  }
};

// Render full timetable grid
function renderFullTimetable(){
  const tbody = document.getElementById('week-body');
  tbody.innerHTML = '';
  // Collect all unique time slots
  const times = [...new Set([].concat(...Object.values(SCHEDULE)).map(b => b.time))];
  times.forEach(time => {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.textContent = time; tr.appendChild(th);
    DAYS.forEach(d => {
      const cell = document.createElement('td');
      const block = SCHEDULE[d].find(b => b.time === time);
      if (block){
        cell.innerHTML = `<div class="slot"><div class="chip ${block.color}"></div><div><strong>${block.subject}</strong><br><span class="muted">${block.tag}</span></div></div>`;
      }
      tr.appendChild(cell);
    });
    tbody.appendChild(tr);
  });
}
