const employees = [
  { id: 1, name: 'Emma', contract: 'fulltime' },
  { id: 2, name: 'Lucas', contract: 'fulltime' },
  { id: 3, name: 'Noah', contract: '4/5' },
  { id: 4, name: 'Mila', contract: 'fulltime' },
  { id: 5, name: 'Finn', contract: '4/5' },
  { id: 6, name: 'Louise', contract: 'fulltime' },
  { id: 7, name: 'Jules', contract: '4/5' },
  { id: 8, name: 'Lina', contract: 'fulltime' },
  { id: 9, name: 'Victor', contract: 'fulltime' },
  { id: 10, name: 'Sara', contract: '4/5' }
];

const contractLimits = {
  fulltime: 10,
  '4/5': 8
};

const weeks = [];
const schedule = {};
const leaves = new Map();

const weekContainer = document.getElementById('weekContainer');
const employeeList = document.getElementById('employeeList');
const leaveEmployeeSelect = document.getElementById('leaveEmployee');
const leaveForm = document.getElementById('leaveForm');
const leaveList = document.getElementById('leaveList');
const autoFillButton = document.getElementById('autoFill');
const resetButton = document.getElementById('resetSchedule');

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
}

function toISODate(date) {
  return date.toISOString().split('T')[0];
}

function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function buildWeeks() {
  const year = 2026;
  const monthIndex = 2; // March
  let currentWeek = null;

  for (let day = 1; day <= 31; day += 1) {
    const date = new Date(year, monthIndex, day);
    if (!isWeekday(date)) {
      continue;
    }

    if (!currentWeek || date.getDay() === 1) {
      currentWeek = {
        id: weeks.length + 1,
        label: `Week ${weeks.length + 1}`,
        days: []
      };
      weeks.push(currentWeek);
    }

    const dateStr = toISODate(date);
    const dayInfo = {
      date,
      dateStr,
      label: formatDate(date)
    };

    currentWeek.days.push(dayInfo);
    schedule[dateStr] = {
      AM: { status: 'empty', employeeId: null, manual: false, coverForId: null },
      PM: { status: 'empty', employeeId: null, manual: false, coverForId: null }
    };
  }
}

function renderEmployees() {
  employeeList.innerHTML = '';
  leaveEmployeeSelect.innerHTML = '';

  employees.forEach((employee) => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.draggable = true;
    card.dataset.employeeId = employee.id;

    card.innerHTML = `
      <div>
        <div class="employee-name">${employee.name}</div>
        <div class="employee-contract">${employee.contract}</div>
      </div>
      <span class="badge bg-light text-dark">${contractLimits[employee.contract]} slots</span>
    `;

    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', employee.id.toString());
    });

    employeeList.appendChild(card);

    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = employee.name;
    leaveEmployeeSelect.appendChild(option);
  });
}

function renderLeaves() {
  leaveList.innerHTML = '';
  const entries = Array.from(leaves.entries());

  if (entries.length === 0) {
    leaveList.innerHTML = '<li class="text-muted">No leave registered yet.</li>';
    return;
  }

  entries.forEach(([employeeId, dates]) => {
    const employee = employees.find((item) => item.id === employeeId);
    if (!employee || dates.size === 0) {
      return;
    }

    const sortedDates = Array.from(dates).sort();
    const li = document.createElement('li');
    li.textContent = `${employee.name}: ${sortedDates[0]} → ${sortedDates[sortedDates.length - 1]} (${sortedDates.length} day(s))`;
    leaveList.appendChild(li);
  });
}

function renderSchedule() {
  weekContainer.innerHTML = '';

  weeks.forEach((week) => {
    const weekCard = document.createElement('div');
    weekCard.className = 'week-card';

    const weekTitle = document.createElement('div');
    weekTitle.className = 'week-title';
    weekTitle.textContent = `${week.label} · ${week.days[0].label} - ${week.days[week.days.length - 1].label}`;
    weekCard.appendChild(weekTitle);

    const grid = document.createElement('div');
    grid.className = 'week-grid';

    week.days.forEach((day) => {
      const dayCard = document.createElement('div');
      dayCard.className = 'day-card';

      const header = document.createElement('div');
      header.className = 'day-header';
      header.innerHTML = `<span>${day.label}</span><span class="text-muted">${day.dateStr}</span>`;

      dayCard.appendChild(header);

      ['AM', 'PM'].forEach((slotKey) => {
        const slot = schedule[day.dateStr][slotKey];
        const employee = employees.find((item) => item.id === slot.employeeId);

        const slotCard = document.createElement('div');
        slotCard.className = `slot-card status-${slot.status}`;
        slotCard.dataset.date = day.dateStr;
        slotCard.dataset.slot = slotKey;

        slotCard.innerHTML = `
          <div class="slot-header">${slotKey}</div>
          <div class="slot-employee">${employee ? employee.name : 'Empty slot'}</div>
          <div class="slot-meta">
            ${slot.coverForId ? `Covering ${getEmployeeName(slot.coverForId)} (leave)` : ''}
            ${slot.status === 'leave' && !slot.coverForId ? 'On leave' : ''}
          </div>
          <select class="status-select">
            <option value="working" ${slot.status === 'working' ? 'selected' : ''}>Working</option>
            <option value="leave" ${slot.status === 'leave' ? 'selected' : ''}>Leave</option>
            <option value="empty" ${slot.status === 'empty' ? 'selected' : ''}>Empty</option>
          </select>
        `;

        const select = slotCard.querySelector('.status-select');
        select.addEventListener('change', (event) => {
          updateSlotStatus(day.dateStr, slotKey, event.target.value);
        });

        slotCard.addEventListener('dragover', (event) => {
          event.preventDefault();
        });

        slotCard.addEventListener('drop', (event) => {
          event.preventDefault();
          const employeeId = Number(event.dataTransfer.getData('text/plain'));
          if (!employeeId) {
            return;
          }
          assignEmployee(day.dateStr, slotKey, employeeId, true);
        });

        dayCard.appendChild(slotCard);
      });

      grid.appendChild(dayCard);
    });

    weekCard.appendChild(grid);
    weekContainer.appendChild(weekCard);
  });
}

function updateSlotStatus(dateStr, slotKey, status) {
  const slot = schedule[dateStr][slotKey];

  if (status === 'empty') {
    slot.status = 'empty';
    slot.employeeId = null;
    slot.coverForId = null;
    slot.manual = true;
  } else if (status === 'working') {
    if (slot.employeeId) {
      slot.status = 'working';
      slot.coverForId = null;
      slot.manual = true;
    } else {
      slot.status = 'empty';
    }
  } else if (status === 'leave') {
    if (slot.employeeId) {
      slot.status = 'leave';
      slot.coverForId = null;
      slot.manual = true;
    } else {
      slot.status = 'empty';
    }
  }

  renderSchedule();
}

function assignEmployee(dateStr, slotKey, employeeId, manual) {
  const slot = schedule[dateStr][slotKey];
  slot.employeeId = employeeId;
  slot.status = 'working';
  slot.manual = manual;
  slot.coverForId = null;
  renderSchedule();
}

function getEmployeeName(employeeId) {
  const employee = employees.find((item) => item.id === employeeId);
  return employee ? employee.name : 'Unknown';
}

function getWeekCounts(week) {
  const counts = new Map();
  employees.forEach((employee) => counts.set(employee.id, 0));

  week.days.forEach((day) => {
    ['AM', 'PM'].forEach((slotKey) => {
      const slot = schedule[day.dateStr][slotKey];
      if (slot.status === 'working' && slot.employeeId) {
        counts.set(slot.employeeId, counts.get(slot.employeeId) + 1);
      }
    });
  });

  return counts;
}

function isOnLeave(employeeId, dateStr) {
  const dates = leaves.get(employeeId);
  return dates ? dates.has(dateStr) : false;
}

function autoSchedule() {
  weeks.forEach((week) => {
    const counts = getWeekCounts(week);

    week.days.forEach((day) => {
      ['AM', 'PM'].forEach((slotKey) => {
        const slot = schedule[day.dateStr][slotKey];

        if (slot.status === 'working') {
          return;
        }

        if (slot.status === 'leave' && slot.employeeId) {
          slot.coverForId = slot.employeeId;
        }

        if (slot.status !== 'empty' && slot.status !== 'leave') {
          return;
        }

        const candidates = employees
          .filter((employee) => !isOnLeave(employee.id, day.dateStr))
          .filter((employee) => counts.get(employee.id) < contractLimits[employee.contract])
          .sort((a, b) => counts.get(a.id) - counts.get(b.id) || a.id - b.id);

        if (candidates.length === 0) {
          return;
        }

        const chosen = candidates[0];
        slot.employeeId = chosen.id;
        slot.status = 'working';
        slot.manual = false;
        counts.set(chosen.id, counts.get(chosen.id) + 1);
      });
    });
  });

  renderSchedule();
}

function addLeave(employeeId, startDate, endDate) {
  if (!leaves.has(employeeId)) {
    leaves.set(employeeId, new Set());
  }

  const leaveDates = leaves.get(employeeId);
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    if (isWeekday(current)) {
      const dateStr = toISODate(current);
      leaveDates.add(dateStr);

      if (schedule[dateStr]) {
        ['AM', 'PM'].forEach((slotKey) => {
          const slot = schedule[dateStr][slotKey];
          if (!slot.employeeId || slot.employeeId === employeeId) {
            slot.employeeId = employeeId;
            slot.status = 'leave';
            slot.coverForId = null;
            slot.manual = true;
          }
        });
      }
    }
    current.setDate(current.getDate() + 1);
  }

  renderLeaves();
  renderSchedule();
}

function resetSchedule() {
  Object.keys(schedule).forEach((dateStr) => {
    ['AM', 'PM'].forEach((slotKey) => {
      schedule[dateStr][slotKey] = {
        status: 'empty',
        employeeId: null,
        manual: false,
        coverForId: null
      };
    });
  });
  leaves.clear();
  renderLeaves();
  renderSchedule();
}

leaveForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const employeeId = Number(leaveEmployeeSelect.value);
  const startDate = leaveForm.leaveStart.value;
  const endDate = leaveForm.leaveEnd.value;

  if (!employeeId || !startDate || !endDate) {
    return;
  }

  addLeave(employeeId, startDate, endDate);
  leaveForm.reset();
});

autoFillButton.addEventListener('click', autoSchedule);
resetButton.addEventListener('click', resetSchedule);

buildWeeks();
renderEmployees();
renderLeaves();
renderSchedule();
