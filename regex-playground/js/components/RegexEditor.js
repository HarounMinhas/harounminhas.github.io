export class RegexEditor {
    constructor(state, onUpdate) {
        this.state = state;
        this.onUpdate = onUpdate;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'regex-editor panel';
        
        container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">Regex Pattern</span>
                <div class="quick-insert">
                    <button class="btn-tiny" data-insert="\\d" title="Digit">\\d</button>
                    <button class="btn-tiny" data-insert="\\w" title="Word char">\\w</button>
                    <button class="btn-tiny" data-insert="\\s" title="Whitespace">\\s</button>
                    <button class="btn-tiny" data-insert="^" title="Start">^</button>
                    <button class="btn-tiny" data-insert="$" title="End">$</button>
                    <button class="btn-tiny" data-insert="(?: )" title="Non-capturing group">(?:)</button>
                </div>
            </div>
            <div class="regex-input-wrapper">
                <span class="regex-delimiter">/</span>
                <input 
                    type="text" 
                    class="regex-input" 
                    id="regex-pattern"
                    placeholder="Enter regex pattern..."
                    value="${this.state.pattern}"
                    spellcheck="false"
                />
                <span class="regex-delimiter">/</span>
                <div class="flags-group">
                    ${this.createFlagCheckbox('g', 'global')}
                    ${this.createFlagCheckbox('i', 'case insensitive')}
                    ${this.createFlagCheckbox('m', 'multiline')}
                    ${this.createFlagCheckbox('s', 'dotAll')}
                    ${this.createFlagCheckbox('u', 'unicode')}
                </div>
            </div>
            <div class="error-display" id="regex-error" style="display: none;"></div>
        `;
        
        // Event listeners
        const input = container.querySelector('#regex-pattern');
        input.oninput = (e) => {
            this.onUpdate({ pattern: e.target.value });
            this.validatePattern(e.target.value);
        };
        
        // Quick insert buttons
        container.querySelectorAll('[data-insert]').forEach(btn => {
            btn.onclick = () => {
                const insert = btn.dataset.insert;
                const cursorPos = input.selectionStart;
                const newValue = input.value.substring(0, cursorPos) + insert + input.value.substring(cursorPos);
                input.value = newValue;
                input.focus();
                input.setSelectionRange(cursorPos + insert.length, cursorPos + insert.length);
                this.onUpdate({ pattern: newValue });
            };
        });
        
        // Flag checkboxes
        container.querySelectorAll('.flag-checkbox').forEach(checkbox => {
            checkbox.onchange = (e) => {
                const flag = e.target.dataset.flag;
                const flags = { ...this.state.flags, [flag]: e.target.checked };
                this.onUpdate({ flags });
            };
        });
        
        return container;
    }

    createFlagCheckbox(flag, label) {
        const checked = this.state.flags[flag] ? 'checked' : '';
        return `
            <label class="flag-label" title="${label}">
                <input 
                    type="checkbox" 
                    class="flag-checkbox" 
                    data-flag="${flag}"
                    ${checked}
                />
                ${flag}
            </label>
        `;
    }

    validatePattern(pattern) {
        const errorDiv = document.getElementById('regex-error');
        try {
            new RegExp(pattern);
            errorDiv.style.display = 'none';
            document.querySelector('.regex-input').classList.remove('error');
        } catch (e) {
            errorDiv.textContent = `❌ ${e.message}`;
            errorDiv.style.display = 'block';
            document.querySelector('.regex-input').classList.add('error');
        }
    }

    update(state) {
        this.state = state;
        const input = document.querySelector('#regex-pattern');
        if (input) input.value = state.pattern;
        
        // Update flags
        Object.keys(state.flags).forEach(flag => {
            const checkbox = document.querySelector(`[data-flag="${flag}"]`);
            if (checkbox) checkbox.checked = state.flags[flag];
        });
    }
}
