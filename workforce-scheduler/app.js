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
const scheduleNotice = document.getElementById('scheduleNotice');
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
      acc[slot.key] = { assignments: [] };
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
      return count + slot.assignments.filter((assignment) => assignment.employeeId === employeeId).length;
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
    card.className = 'employee-cell draggable-employee';
    card.dataset.employeeId = employee.id;
    card.setAttribute('draggable', 'true');
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

    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', String(employee.id));
      event.dataTransfer.effectAllowed = 'copy';
    });

    employeeList.appendChild(card);

    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = employee.name;
    leaveEmployeeSelect.appendChild(option);
  });
}

function normalizeLeaveRange(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (start <= end) {
    return { start: toISODate(start), end: toISODate(end) };
  }
  return { start: toISODate(end), end: toISODate(start) };
}

function addDaysToISO(dateStr, days) {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

function mergeLeaveRanges(ranges) {
  if (!ranges || ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((a, b) => a.start.localeCompare(b.start));
  return sorted.reduce((merged, range) => {
    if (merged.length === 0) {
      merged.push({ ...range });
      return merged;
    }
    const last = merged[merged.length - 1];
    const nextDayAfterLast = addDaysToISO(last.end, 1);
    if (range.start <= nextDayAfterLast) {
      if (range.end > last.end) {
        last.end = range.end;
      }
    } else {
      merged.push({ ...range });
    }
    return merged;
  }, []);
}

function getLeaveRangesForEmployee(employeeId) {
  return leaves.get(employeeId) || [];
}

function countWeekdaysInRange(startDate, endDate) {
  let total = 0;
  const current = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  while (current <= end) {
    if (isWeekday(current)) {
      total += 1;
    }
    current.setDate(current.getDate() + 1);
  }
  return total;
}

function forEachLeaveDay(startDate, endDate, callback) {
  const current = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  while (current <= end) {
    if (isWeekday(current)) {
      callback(toISODate(current));
    }
    current.setDate(current.getDate() + 1);
  }
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

  entries.forEach(([employeeId, ranges]) => {
    const employee = employees.find((item) => item.id === employeeId);
    if (!employee || !ranges || ranges.length === 0) {
      return;
    }

    ranges.forEach((range) => {
      const startLabel = range.start;
      const endLabel = range.end;
      const totalDays = countWeekdaysInRange(startLabel, endLabel);
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

  const ranges = getLeaveRangesForEmployee(employee.id);
  const leaveListHtml =
    ranges.length === 0
      ? '<li class="text-muted">No leave registered yet.</li>'
      : ranges
          .map((range) => {
            const totalDays = countWeekdaysInRange(range.start, range.end);
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
      header.innerHTML = `
        <span>${day.label}</span>
        <span class="text-muted">${day.dateStr}</span>
        <span class="day-drop-zone" data-date="${day.dateStr}" data-slot="full-day">
          Full day drop
        </span>
      `;

      dayCard.appendChild(header);

      const dayDropZone = header.querySelector('.day-drop-zone');
      if (dayDropZone) {
        setupDropZone(dayDropZone, (employeeId) => {
          const weekForDay = getWeekForDate(day.dateStr);
          const morningError = getAssignmentError(day.dateStr, 'morning', employeeId, weekForDay);
          const afternoonError = getAssignmentError(day.dateStr, 'afternoon', employeeId, weekForDay);
          if (morningError || afternoonError) {
            showNotice(morningError || afternoonError, 'warning');
            return;
          }
          const morningAssigned = assignEmployee(day.dateStr, 'morning', employeeId, true, {
            skipRender: true
          });
          const afternoonAssigned = assignEmployee(day.dateStr, 'afternoon', employeeId, true, {
            skipRender: true
          });
          if (!morningAssigned || !afternoonAssigned) {
            showNotice('Unable to assign full day due to conflicts or leave.', 'warning');
          }
          renderSchedule();
        });
      }

      slotConfig.forEach((slotInfo) => {
        const slotKey = slotInfo.key;
        const slot = schedule[day.dateStr][slotKey];
        const assignments = slot.assignments;
        const isEmpty = assignments.length === 0;

        const slotCard = document.createElement('div');
        slotCard.className = `slot-card status-${isEmpty ? 'empty' : 'working'}`;
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
        } else {
          const list = document.createElement('div');
          list.className = 'slot-employee-list';
          assignments.forEach((assignment) => {
            const employee = employees.find((item) => item.id === assignment.employeeId);
            const chip = document.createElement('div');
            chip.className = 'slot-employee-chip';
            const name = document.createElement('span');
            name.textContent = employee?.name || 'Unassigned';
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'btn btn-sm btn-outline-danger';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
              removeAssignment(day.dateStr, slotKey, assignment.employeeId);
            });
            chip.appendChild(name);
            chip.appendChild(removeButton);
            list.appendChild(chip);
          });
          employeeLabel.appendChild(list);
        }

        const assignPanel = document.createElement('div');
        assignPanel.className = 'slot-assign-panel';

        const select = document.createElement('select');
        select.className = 'form-select form-select-sm';

        const availableEmployees = getAvailableEmployees(day.dateStr, slotKey, week);
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
          const wasAssigned = assignEmployee(day.dateStr, slotKey, employeeId, true);
          if (!wasAssigned) {
            showNotice(getAssignmentError(day.dateStr, slotKey, employeeId), 'warning');
          }
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

        setupDropZone(slotCard, (employeeId) => {
          const assigned = assignEmployee(day.dateStr, slotKey, employeeId, true);
          if (!assigned) {
            showNotice(getAssignmentError(day.dateStr, slotKey, employeeId), 'warning');
          }
        });

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
  schedule[dateStr][slotKey].assignments = [];
  renderSchedule();
}

function assignEmployee(dateStr, slotKey, employeeId, manual, options = {}) {
  const week = getWeekForDate(dateStr);
  const error = getAssignmentError(dateStr, slotKey, employeeId, week);
  if (error) {
    return false;
  }
  schedule[dateStr][slotKey].assignments.push({ employeeId, manual });
  if (!options.skipRender) {
    renderSchedule();
  }
  return true;
}

function removeAssignment(dateStr, slotKey, employeeId) {
  const slot = schedule[dateStr][slotKey];
  slot.assignments = slot.assignments.filter((assignment) => assignment.employeeId !== employeeId);
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
      slot.assignments.forEach((assignment) => {
        counts.set(
          assignment.employeeId,
          (counts.get(assignment.employeeId) || 0) + 1
        );
      });
    });
  });

  return counts;
}

function getWeekForDate(dateStr) {
  return weeks.find((week) => week.days.some((day) => day.dateStr === dateStr)) || null;
}

function getAvailableEmployees(dateStr, slotKey, week) {
  const weekCounts = week ? getWeekCounts(week) : new Map();
  const slotAssignments = schedule[dateStr][slotKey].assignments;
  return getSortedEmployees()
    .filter((employee) => !isOnLeave(employee.id, dateStr))
    .filter((employee) =>
      week ? weekCounts.get(employee.id) < contractLimits[employee.contract] : true
    )
    .filter(
      (employee) =>
        !slotAssignments.some((assignment) => assignment.employeeId === employee.id)
    )
    .map((employee) => {
      const remaining = week
        ? contractLimits[employee.contract] - (weekCounts.get(employee.id) || 0)
        : contractLimits[employee.contract];
      return { ...employee, remaining };
    });
}

function isOnLeave(employeeId, dateStr) {
  const ranges = leaves.get(employeeId);
  if (!ranges || ranges.length === 0) {
    return false;
  }
  return ranges.some((range) => dateStr >= range.start && dateStr <= range.end);
}

function autoSchedule() {
  weeks.forEach((week) => {
    const counts = getWeekCounts(week);

    week.days.forEach((day) => {
      slotConfig.forEach(({ key }) => {
        const slot = schedule[day.dateStr][key];
        slot.assignments = slot.assignments.filter(
          (assignment) => !isOnLeave(assignment.employeeId, day.dateStr)
        );
      });
    });

    const weekSlots = week.days.flatMap((day) =>
      slotConfig.map(({ key }) => ({ dateStr: day.dateStr, slotKey: key }))
    );

    let progress = true;
    while (progress) {
      progress = false;
      const sortedEmployees = getSortedEmployees().sort((a, b) => {
        const weekDiff = counts.get(a.id) - counts.get(b.id);
        if (weekDiff !== 0) {
          return weekDiff;
        }
        return getTotalAssignments(a.id) - getTotalAssignments(b.id);
      });

      sortedEmployees.forEach((employee) => {
        if (counts.get(employee.id) >= contractLimits[employee.contract]) {
          return;
        }

        const availableSlots = weekSlots
          .filter((slotInfo) => !isOnLeave(employee.id, slotInfo.dateStr))
          .filter(
            (slotInfo) =>
              !schedule[slotInfo.dateStr][slotInfo.slotKey].assignments.some(
                (assignment) => assignment.employeeId === employee.id
              )
          )
          .sort((a, b) => {
            const aCount = schedule[a.dateStr][a.slotKey].assignments.length;
            const bCount = schedule[b.dateStr][b.slotKey].assignments.length;
            return aCount - bCount || a.dateStr.localeCompare(b.dateStr);
          });

        if (availableSlots.length === 0) {
          return;
        }

        const chosenSlot = availableSlots[0];
        const assigned = assignEmployee(chosenSlot.dateStr, chosenSlot.slotKey, employee.id, false, {
          skipRender: true
        });
        if (assigned) {
          counts.set(employee.id, counts.get(employee.id) + 1);
          progress = true;
        }
      });
    }
  });

  renderSchedule();
}

function addLeave(employeeId, startDate, endDate) {
  const normalizedRange = normalizeLeaveRange(startDate, endDate);
  const existing = leaves.get(employeeId) || [];
  const merged = mergeLeaveRanges([...existing, normalizedRange]);
  leaves.set(employeeId, merged);

  forEachLeaveDay(normalizedRange.start, normalizedRange.end, (dateStr) => {
    if (schedule[dateStr]) {
      slotConfig.forEach(({ key }) => {
        const slot = schedule[dateStr][key];
        slot.assignments = slot.assignments.filter(
          (assignment) => assignment.employeeId !== employeeId
        );
      });
    }
  });

  renderLeaves();
  renderEmployeeDetails();
  renderSchedule();
}

function removeLeaveRange(employeeId, startDate, endDate) {
  const ranges = leaves.get(employeeId);
  if (!ranges) {
    return;
  }

  const normalizedRange = normalizeLeaveRange(startDate, endDate);
  const remaining = ranges.filter(
    (range) => range.start !== normalizedRange.start || range.end !== normalizedRange.end
  );

  if (remaining.length === 0) {
    leaves.delete(employeeId);
  } else {
    leaves.set(employeeId, remaining);
  }

  renderLeaves();
  renderEmployeeDetails();
  renderSchedule();
}

function resetSchedule() {
  Object.keys(schedule).forEach((dateStr) => {
    slotConfig.forEach(({ key }) => {
      schedule[dateStr][key] = {
        assignments: []
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
  const startDate = leaveForm.querySelector('#leaveStart')?.value;
  const endDate = leaveForm.querySelector('#leaveEnd')?.value;

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

function getAssignmentError(dateStr, slotKey, employeeId, week = null) {
  if (isOnLeave(employeeId, dateStr)) {
    return `${getEmployeeName(employeeId)} is on leave on ${dateStr}.`;
  }
  const slotAssignments = schedule[dateStr][slotKey].assignments;
  if (slotAssignments.some((assignment) => assignment.employeeId === employeeId)) {
    return `${getEmployeeName(employeeId)} is already booked for this ${slotKey}.`;
  }
  const targetWeek = week || getWeekForDate(dateStr);
  if (targetWeek) {
    const weekCounts = getWeekCounts(targetWeek);
    const employee = employees.find((item) => item.id === employeeId);
    if (employee && weekCounts.get(employeeId) >= contractLimits[employee.contract]) {
      return `${getEmployeeName(employeeId)} has reached the weekly limit.`;
    }
  }
  return null;
}

function showNotice(message, type = 'warning') {
  if (!scheduleNotice || !message) {
    return;
  }
  scheduleNotice.classList.remove('d-none', 'alert-warning', 'alert-danger', 'alert-success');
  scheduleNotice.classList.add(`alert-${type}`);
  scheduleNotice.textContent = message;
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => {
    scheduleNotice.classList.add('d-none');
  }, 4000);
}

function setupDropZone(element, handler) {
  element.addEventListener('dragover', (event) => {
    event.preventDefault();
    element.classList.add('drop-active');
  });
  element.addEventListener('dragleave', () => {
    element.classList.remove('drop-active');
  });
  element.addEventListener('drop', (event) => {
    event.preventDefault();
    element.classList.remove('drop-active');
    const employeeId = Number(event.dataTransfer.getData('text/plain'));
    if (!employeeId) {
      return;
    }
    handler(employeeId);
  });
}

document.addEventListener('dragend', () => {
  document.querySelectorAll('.drop-active').forEach((node) => node.classList.remove('drop-active'));
});
