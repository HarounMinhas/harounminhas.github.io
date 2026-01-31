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

const slotConfig = [
  { key: 'morning', label: 'Morning' },
  { key: 'afternoon', label: 'Afternoon' }
];

const weeks = [];
const schedule = {};
const leaves = new Map();

const weekContainer = document.getElementById('weekContainer');
const employeeList = document.getElementById('employeeList');
const employeeDetails = document.getElementById('employeeDetails');
const leaveEmployeeSelect = document.getElementById('leaveEmployee');
const leaveForm = document.getElementById('leaveForm');
const leaveList = document.getElementById('leaveList');
const leaveManagerList = document.getElementById('leaveManagerList');
const autoFillButton = document.getElementById('autoFill');
const resetButton = document.getElementById('resetSchedule');
const collapseAllButton = document.getElementById('collapseAll');
const expandAllButton = document.getElementById('expandAll');
const leaveOverviewBar = document.getElementById('leaveOverviewBar');
const leaveOverviewToggle = document.getElementById('leaveOverviewToggle');
const leaveModalElement = document.getElementById('leaveManagerModal');
const leaveModal = leaveModalElement && window.bootstrap ? new bootstrap.Modal(leaveModalElement) : null;

let selectedEmployeeId = null;

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
    schedule[dateStr] = slotConfig.reduce((acc, slot) => {
      acc[slot.key] = { status: 'empty', employeeId: null, manual: false, coverForId: null };
      return acc;
    }, {});
  }
}

function getSortedEmployees() {
  return [...employees].sort((a, b) => a.name.localeCompare(b.name));
}

function getMonthlyCapacity(employee) {
  return contractLimits[employee.contract] * weeks.length;
}

function getTotalAssignments(employeeId) {
  return Object.keys(schedule).reduce((total, dateStr) => {
    const daySlots = schedule[dateStr];
    const dayCount = slotConfig.reduce((count, { key }) => {
      const slot = daySlots[key];
      if (slot.status === 'working' && slot.employeeId === employeeId) {
        return count + 1;
      }
      return count;
    }, 0);
    return total + dayCount;
  }, 0);
}

function renderEmployees() {
  employeeList.innerHTML = '';
  leaveEmployeeSelect.innerHTML = '';

  getSortedEmployees().forEach((employee) => {
    const totalAssigned = getTotalAssignments(employee.id);
    const capacity = getMonthlyCapacity(employee);
    const remaining = capacity - totalAssigned;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'employee-cell';
    card.dataset.employeeId = employee.id;
    if (selectedEmployeeId === employee.id) {
      card.classList.add('active');
    }

    card.innerHTML = `
      <div class="employee-name">${employee.name}</div>
      <div class="employee-contract">${employee.contract}</div>
      <div class="employee-meta">
        <span>${remaining} remaining</span>
        <span>${totalAssigned}/${capacity} slots</span>
      </div>
    `;

    card.addEventListener('click', () => {
      selectedEmployeeId = employee.id;
      renderEmployees();
      renderEmployeeDetails();
    });

    employeeList.appendChild(card);

    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = employee.name;
    leaveEmployeeSelect.appendChild(option);
  });
}

function getLeaveRanges(datesSet) {
  if (!datesSet || datesSet.size === 0) {
    return [];
  }

  const sortedDates = Array.from(datesSet).sort();
  const ranges = [];
  let rangeStart = sortedDates[0];
  let rangeEnd = sortedDates[0];

  const toDate = (dateStr) => new Date(`${dateStr}T00:00:00`);

  for (let index = 1; index < sortedDates.length; index += 1) {
    const current = sortedDates[index];
    const previousDate = toDate(rangeEnd);
    previousDate.setDate(previousDate.getDate() + 1);
    const expectedNext = toISODate(previousDate);

    if (current === expectedNext) {
      rangeEnd = current;
    } else {
      ranges.push({ start: rangeStart, end: rangeEnd });
      rangeStart = current;
      rangeEnd = current;
    }
  }

  ranges.push({ start: rangeStart, end: rangeEnd });
  return ranges;
}

function renderLeaves() {
  const lists = [leaveList, leaveManagerList].filter(Boolean);
  lists.forEach((list) => {
    list.innerHTML = '';
  });

  const entries = Array.from(leaves.entries());

  if (entries.length === 0) {
    lists.forEach((list) => {
      list.innerHTML = '<li class="text-muted">No leave registered yet.</li>';
    });
    return;
  }

  entries.forEach(([employeeId, dates]) => {
    const employee = employees.find((item) => item.id === employeeId);
    if (!employee || dates.size === 0) {
      return;
    }

    const ranges = getLeaveRanges(dates);
    ranges.forEach((range) => {
      const startLabel = range.start;
      const endLabel = range.end;
      const totalDays =
        (new Date(`${endLabel}T00:00:00`) - new Date(`${startLabel}T00:00:00`)) /
          (1000 * 60 * 60 * 24) +
        1;
      const li = document.createElement('li');
      li.textContent = `${employee.name}: ${startLabel} → ${endLabel} (${totalDays} day(s))`;
      lists.forEach((list) => list.appendChild(li.cloneNode(true)));
    });
  });
}

function renderEmployeeDetails() {
  if (!employeeDetails) {
    return;
  }

  if (!selectedEmployeeId) {
    employeeDetails.classList.add('empty');
    employeeDetails.textContent =
      'Select an employee from the table to see their schedule details and leave manager.';
    return;
  }

  const employee = employees.find((item) => item.id === selectedEmployeeId);
  if (!employee) {
    employeeDetails.classList.add('empty');
    employeeDetails.textContent =
      'Select an employee from the table to see their schedule details and leave manager.';
    return;
  }

  employeeDetails.classList.remove('empty');

  const totalAssigned = getTotalAssignments(employee.id);
  const capacity = getMonthlyCapacity(employee);
  const remaining = capacity - totalAssigned;
  const weeklySummaries = weeks.map((week) => {
    const weekCounts = getWeekCounts(week);
    const count = weekCounts.get(employee.id) || 0;
    return { label: week.label, count };
  });

  const ranges = getLeaveRanges(leaves.get(employee.id));
  const leaveListHtml =
    ranges.length === 0
      ? '<li class="text-muted">No leave registered yet.</li>'
      : ranges
          .map((range) => {
            const totalDays =
              (new Date(`${range.end}T00:00:00`) - new Date(`${range.start}T00:00:00`)) /
                (1000 * 60 * 60 * 24) +
              1;
            return `
              <li class="leave-range-item">
                <span>${range.start} → ${range.end} (${totalDays} day(s))</span>
                <button class="btn btn-sm btn-outline-danger" data-remove-start="${range.start}" data-remove-end="${range.end}">
                  Remove
                </button>
              </li>
            `;
          })
          .join('');

  employeeDetails.innerHTML = `
    <div class="employee-detail-header">
      <div>
        <h3 class="h6 mb-1">${employee.name}</h3>
        <p class="text-muted small mb-0">${employee.contract} contract</p>
      </div>
      <span class="badge bg-light text-dark">${remaining} remaining</span>
    </div>
    <div class="employee-metrics">
      <div><strong>${totalAssigned}</strong> scheduled slots</div>
      <div><strong>${capacity}</strong> monthly capacity</div>
    </div>
    <div class="employee-weekly">
      <h4 class="h6 text-uppercase">Weekly slots</h4>
      <ul class="list-unstyled mb-0">
        ${weeklySummaries
          .map(
            (summary) =>
              `<li>${summary.label}: ${summary.count}/${contractLimits[employee.contract]} slots</li>`
          )
          .join('')}
      </ul>
    </div>
    <div class="employee-leave-panel">
      <h4 class="h6 text-uppercase">Leave manager</h4>
      <form id="employeeLeaveForm" class="employee-leave-form">
        <div class="row g-2">
          <div class="col-sm-6">
            <label class="form-label small" for="employeeLeaveStart">Start date</label>
            <input id="employeeLeaveStart" type="date" class="form-control" required />
          </div>
          <div class="col-sm-6">
            <label class="form-label small" for="employeeLeaveEnd">End date</label>
            <input id="employeeLeaveEnd" type="date" class="form-control" required />
          </div>
        </div>
        <div class="employee-leave-actions">
          <button class="btn btn-sm btn-danger" type="button" data-action="add">Add leave</button>
          <button class="btn btn-sm btn-outline-secondary" type="button" data-action="remove">
            Remove leave
          </button>
        </div>
      </form>
      <div class="employee-leave-overview">
        <h5 class="h6 text-uppercase">Leave overview</h5>
        <ul class="list-unstyled">${leaveListHtml}</ul>
      </div>
    </div>
  `;

  const leaveFormEl = employeeDetails.querySelector('#employeeLeaveForm');
  const startInput = employeeDetails.querySelector('#employeeLeaveStart');
  const endInput = employeeDetails.querySelector('#employeeLeaveEnd');

  if (leaveFormEl && startInput && endInput) {
    leaveFormEl.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action;
      if (!action) {
        return;
      }
      const startDate = startInput.value;
      const endDate = endInput.value;
      if (!startDate || !endDate) {
        return;
      }
      if (action === 'add') {
        addLeave(employee.id, startDate, endDate);
      }
      if (action === 'remove') {
        removeLeaveRange(employee.id, startDate, endDate);
      }
      startInput.value = '';
      endInput.value = '';
    });
  }

  employeeDetails.querySelectorAll('[data-remove-start]').forEach((button) => {
    button.addEventListener('click', () => {
      const startDate = button.dataset.removeStart;
      const endDate = button.dataset.removeEnd;
      if (startDate && endDate) {
        removeLeaveRange(employee.id, startDate, endDate);
      }
    });
  });
}

function renderSchedule() {
  weekContainer.innerHTML = '';

  weeks.forEach((week) => {
    const collapseId = `week-${week.id}`;

    const weekCard = document.createElement('div');
    weekCard.className = 'week-card';

    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';

    const weekTitle = document.createElement('div');
    weekTitle.className = 'week-title';
    weekTitle.textContent = `${week.label} · ${week.days[0].label} - ${week.days[week.days.length - 1].label}`;

    const toggleButton = document.createElement('button');
    toggleButton.className = 'btn btn-sm btn-outline-primary week-toggle';
    toggleButton.type = 'button';
    toggleButton.textContent = 'Collapse';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', `#${collapseId}`);
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.setAttribute('aria-controls', collapseId);

    weekHeader.appendChild(weekTitle);
    weekHeader.appendChild(toggleButton);
    weekCard.appendChild(weekHeader);

    const grid = document.createElement('div');
    grid.className = 'week-grid collapse show';
    grid.id = collapseId;

    grid.addEventListener('shown.bs.collapse', () => {
      toggleButton.textContent = 'Collapse';
      toggleButton.setAttribute('aria-expanded', 'true');
    });

    grid.addEventListener('hidden.bs.collapse', () => {
      toggleButton.textContent = 'Expand';
      toggleButton.setAttribute('aria-expanded', 'false');
    });

    week.days.forEach((day) => {
      const dayCard = document.createElement('div');
      dayCard.className = 'day-card';

      const header = document.createElement('div');
      header.className = 'day-header';
      header.innerHTML = `<span>${day.label}</span><span class="text-muted">${day.dateStr}</span>`;

      dayCard.appendChild(header);

      slotConfig.forEach((slotInfo) => {
        const slotKey = slotInfo.key;
        const slot = schedule[day.dateStr][slotKey];
        const employee = employees.find((item) => item.id === slot.employeeId);
        const isEmpty = slot.status === 'empty';

        const slotCard = document.createElement('div');
        slotCard.className = `slot-card status-${slot.status}`;
        slotCard.dataset.date = day.dateStr;
        slotCard.dataset.slot = slotKey;
        if (isEmpty) {
          slotCard.classList.add('slot-empty');
        }

        const header = document.createElement('div');
        header.className = 'slot-header';
        header.textContent = slotInfo.label;
        slotCard.appendChild(header);

        const employeeLabel = document.createElement('div');
        employeeLabel.className = 'slot-employee';

        if (isEmpty) {
          const addIcon = document.createElement('span');
          addIcon.className = 'slot-add-icon';
          addIcon.textContent = '+';
          const addText = document.createElement('span');
          addText.className = 'slot-add-text';
          addText.textContent = 'Add employee';
          employeeLabel.appendChild(addIcon);
          employeeLabel.appendChild(addText);

          const assignPanel = document.createElement('div');
          assignPanel.className = 'slot-assign-panel';

          const select = document.createElement('select');
          select.className = 'form-select form-select-sm';

          const availableEmployees = getAvailableEmployees(day.dateStr, week);
          if (availableEmployees.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No available employees';
            select.appendChild(option);
            select.disabled = true;
          } else {
            availableEmployees.forEach((candidate) => {
              const option = document.createElement('option');
              option.value = candidate.id;
              option.textContent = `${candidate.name} (${candidate.remaining} remaining)`;
              select.appendChild(option);
            });
          }

          const assignButton = document.createElement('button');
          assignButton.type = 'button';
          assignButton.className = 'btn btn-sm btn-primary';
          assignButton.textContent = 'Assign';
          assignButton.disabled = availableEmployees.length === 0;

          assignButton.addEventListener('click', () => {
            const employeeId = Number(select.value);
            if (!employeeId) {
              return;
            }
            assignEmployee(day.dateStr, slotKey, employeeId, true);
          });

          assignPanel.appendChild(select);
          assignPanel.appendChild(assignButton);

          const toggleButton = document.createElement('button');
          toggleButton.type = 'button';
          toggleButton.className = 'btn btn-sm btn-outline-secondary slot-add-button';
          toggleButton.textContent = 'Add employee';
          toggleButton.addEventListener('click', () => {
            assignPanel.classList.toggle('show');
          });

          slotCard.appendChild(employeeLabel);
          slotCard.appendChild(toggleButton);
          slotCard.appendChild(assignPanel);
        } else {
          employeeLabel.textContent = employee?.name || 'Unassigned';

          const removeButton = document.createElement('button');
          removeButton.type = 'button';
          removeButton.className = 'btn btn-sm btn-outline-danger slot-remove-button';
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => {
            clearSlot(day.dateStr, slotKey);
          });

          slotCard.appendChild(employeeLabel);
          slotCard.appendChild(removeButton);
        }

        dayCard.appendChild(slotCard);
      });

      grid.appendChild(dayCard);
    });

    weekCard.appendChild(grid);
    weekContainer.appendChild(weekCard);
  });

  renderEmployees();
  renderEmployeeDetails();
}

function clearSlot(dateStr, slotKey) {
  const slot = schedule[dateStr][slotKey];
  slot.employeeId = null;
  slot.status = 'empty';
  slot.manual = false;
  slot.coverForId = null;
  renderSchedule();
}

function assignEmployee(dateStr, slotKey, employeeId, manual) {
  if (isOnLeave(employeeId, dateStr)) {
    return;
  }
  const week = getWeekForDate(dateStr);
  if (week) {
    const weekCounts = getWeekCounts(week);
    const employee = employees.find((item) => item.id === employeeId);
    if (employee && weekCounts.get(employeeId) >= contractLimits[employee.contract]) {
      return;
    }
  }
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
    slotConfig.forEach(({ key }) => {
      const slotKey = key;
      const slot = schedule[day.dateStr][slotKey];
      if (slot.status === 'working' && slot.employeeId) {
        counts.set(slot.employeeId, counts.get(slot.employeeId) + 1);
      }
    });
  });

  return counts;
}

function getWeekForDate(dateStr) {
  return weeks.find((week) => week.days.some((day) => day.dateStr === dateStr)) || null;
}

function getAvailableEmployees(dateStr, week) {
  const weekCounts = week ? getWeekCounts(week) : new Map();
  return getSortedEmployees()
    .filter((employee) => !isOnLeave(employee.id, dateStr))
    .filter((employee) =>
      week ? weekCounts.get(employee.id) < contractLimits[employee.contract] : true
    )
    .map((employee) => {
      const remaining = week
        ? contractLimits[employee.contract] - (weekCounts.get(employee.id) || 0)
        : contractLimits[employee.contract];
      return { ...employee, remaining };
    });
}

function isOnLeave(employeeId, dateStr) {
  const dates = leaves.get(employeeId);
  return dates ? dates.has(dateStr) : false;
}

function autoSchedule() {
  weeks.forEach((week) => {
    const counts = getWeekCounts(week);

    week.days.forEach((day) => {
      slotConfig.forEach(({ key }) => {
        const slot = schedule[day.dateStr][key];
        if (slot.employeeId && slot.status === 'working' && isOnLeave(slot.employeeId, day.dateStr)) {
          const removedId = slot.employeeId;
          slot.employeeId = null;
          slot.status = 'empty';
          slot.coverForId = null;
          slot.manual = false;
        }
      });

      slotConfig.forEach(({ key }) => {
        const slotKey = key;
        const slot = schedule[day.dateStr][slotKey];

        if (slot.status === 'working') {
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
        slotConfig.forEach(({ key }) => {
          const slot = schedule[dateStr][key];
          if (slot.employeeId === employeeId) {
            slot.employeeId = null;
            slot.status = 'empty';
            slot.coverForId = null;
            slot.manual = false;
          }
        });
      }
    }
    current.setDate(current.getDate() + 1);
  }

  renderLeaves();
  renderEmployeeDetails();
  renderSchedule();
}

function removeLeaveRange(employeeId, startDate, endDate) {
  const leaveDates = leaves.get(employeeId);
  if (!leaveDates) {
    return;
  }

  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    if (isWeekday(current)) {
      leaveDates.delete(toISODate(current));
    }
    current.setDate(current.getDate() + 1);
  }

  if (leaveDates.size === 0) {
    leaves.delete(employeeId);
  }

  renderLeaves();
  renderEmployeeDetails();
  renderSchedule();
}

function resetSchedule() {
  Object.keys(schedule).forEach((dateStr) => {
    slotConfig.forEach(({ key }) => {
      schedule[dateStr][key] = {
        status: 'empty',
        employeeId: null,
        manual: false,
        coverForId: null
      };
    });
  });
  renderSchedule();
  renderEmployees();
  renderEmployeeDetails();
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
  if (leaveModal) {
    leaveModal.hide();
  }
  if (leaveOverviewBar) {
    leaveOverviewBar.classList.remove('d-none');
  }
});

autoFillButton.addEventListener('click', autoSchedule);
resetButton.addEventListener('click', resetSchedule);
if (collapseAllButton) {
  collapseAllButton.addEventListener('click', () => {
    if (!window.bootstrap) {
      return;
    }
    document.querySelectorAll('.week-grid').forEach((grid) => {
      const collapse = bootstrap.Collapse.getOrCreateInstance(grid, { toggle: false });
      collapse.hide();
    });
  });
}

if (expandAllButton) {
  expandAllButton.addEventListener('click', () => {
    if (!window.bootstrap) {
      return;
    }
    document.querySelectorAll('.week-grid').forEach((grid) => {
      const collapse = bootstrap.Collapse.getOrCreateInstance(grid, { toggle: false });
      collapse.show();
    });
  });
}

if (leaveModalElement && leaveOverviewBar) {
  leaveModalElement.addEventListener('shown.bs.modal', () => {
    leaveOverviewBar.classList.remove('d-none');
  });
}

if (leaveOverviewToggle) {
  const leaveOverviewCollapse = document.getElementById('leaveOverviewCollapse');
  if (leaveOverviewCollapse) {
    leaveOverviewCollapse.addEventListener('shown.bs.collapse', () => {
      leaveOverviewToggle.textContent = 'Collapse';
      leaveOverviewToggle.setAttribute('aria-expanded', 'true');
    });
    leaveOverviewCollapse.addEventListener('hidden.bs.collapse', () => {
      leaveOverviewToggle.textContent = 'Expand';
      leaveOverviewToggle.setAttribute('aria-expanded', 'false');
    });
  }
}

buildWeeks();
renderEmployees();
renderLeaves();
renderSchedule();
