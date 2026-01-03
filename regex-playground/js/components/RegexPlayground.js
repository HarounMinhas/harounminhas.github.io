import { RegexEditor } from './RegexEditor.js';
import { InputPanel } from './InputPanel.js';
import { ResultsPanel } from './ResultsPanel.js';
import { TestSuite } from './TestSuite.js';
import { Sidebar } from './Sidebar.js';
import { regexEngine } from '../modules/regexEngine.js';
import { storage } from '../modules/storage.js';
import { urlState } from '../modules/urlState.js';

export class RegexPlayground {
    constructor(layout, initialState = null) {
        this.layout = layout;
        this.state = initialState || {
            pattern: '',
            flags: { g: true, i: false, m: false, s: false, u: false },
            input: '',
            mode: 'match',
            replacement: '',
            matches: [],
            currentProject: null
        };
        
        this.components = {};
        this.debounceTimer = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = `playground playground-layout-${this.layout.toLowerCase()}`;
        
        // Topbar
        const topbar = this.createTopbar();
        container.appendChild(topbar);
        
        // Main content based on layout
        const main = document.createElement('div');
        main.className = 'playground-main';
        
        if (this.layout === 'A') {
            main.appendChild(this.createLayoutA());
        } else if (this.layout === 'B') {
            main.appendChild(this.createLayoutB());
        } else {
            main.appendChild(this.createLayoutC());
        }
        
        container.appendChild(main);
        
        return container;
    }

    createTopbar() {
        const topbar = document.createElement('div');
        topbar.className = 'topbar';
        topbar.innerHTML = `
            <div class="topbar-left">
                <button class="btn-icon" id="btn-home" title="Terug naar layout keuze">🏠</button>
                <span class="project-name">Regex Playground</span>
            </div>
            <div class="topbar-center">
                <div class="tab-group">
                    <button class="tab ${this.state.mode === 'match' ? 'active' : ''}" data-mode="match">Match</button>
                    <button class="tab ${this.state.mode === 'replace' ? 'active' : ''}" data-mode="replace">Replace</button>
                    <button class="tab ${this.state.mode === 'test' ? 'active' : ''}" data-mode="test">Tests</button>
                </div>
            </div>
            <div class="topbar-right">
                <button class="btn-secondary" id="btn-save">💾 Save</button>
                <button class="btn-secondary" id="btn-share">🔗 Share</button>
                <button class="btn-icon" id="btn-theme" title="Toggle theme">🌓</button>
            </div>
        `;
        
        // Event listeners
        topbar.querySelector('#btn-home').onclick = () => {
            localStorage.removeItem('activeLayout');
            window.location.reload();
        };
        
        topbar.querySelector('#btn-save').onclick = () => this.saveProject();
        topbar.querySelector('#btn-share').onclick = () => this.shareUrl();
        topbar.querySelector('#btn-theme').onclick = () => this.toggleTheme();
        
        topbar.querySelectorAll('.tab').forEach(tab => {
            tab.onclick = () => this.switchMode(tab.dataset.mode);
        });
        
        return topbar;
    }

    createLayoutA() {
        const grid = document.createElement('div');
        grid.className = 'layout-grid layout-a';
        
        // Sidebar
        this.components.sidebar = new Sidebar((project) => this.loadProject(project));
        grid.appendChild(this.components.sidebar.render());
        
        // Editor + Input
        const middle = document.createElement('div');
        middle.className = 'middle-column';
        
        this.components.editor = new RegexEditor(this.state, (newState) => this.updateState(newState));
        middle.appendChild(this.components.editor.render());
        
        this.components.input = new InputPanel(this.state, (newState) => this.updateState(newState));
        middle.appendChild(this.components.input.render());
        
        grid.appendChild(middle);
        
        // Results
        this.components.results = new ResultsPanel(this.state);
        grid.appendChild(this.components.results.render());
        
        return grid;
    }

    createLayoutB() {
        const grid = document.createElement('div');
        grid.className = 'layout-grid layout-b';
        
        // Left column
        const left = document.createElement('div');
        left.className = 'left-column';
        
        this.components.editor = new RegexEditor(this.state, (newState) => this.updateState(newState));
        left.appendChild(this.components.editor.render());
        
        this.components.input = new InputPanel(this.state, (newState) => this.updateState(newState));
        left.appendChild(this.components.input.render());
        
        grid.appendChild(left);
        
        // Results
        this.components.results = new ResultsPanel(this.state);
        grid.appendChild(this.components.results.render());
        
        return grid;
    }

    createLayoutC() {
        const column = document.createElement('div');
        column.className = 'notebook-column';
        
        this.components.editor = new RegexEditor(this.state, (newState) => this.updateState(newState));
        column.appendChild(this.components.editor.render());
        
        this.components.input = new InputPanel(this.state, (newState) => this.updateState(newState));
        column.appendChild(this.components.input.render());
        
        this.components.results = new ResultsPanel(this.state);
        column.appendChild(this.components.results.render());
        
        return column;
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        
        // Debounced regex execution
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.executeRegex();
        }, 300);
    }

    executeRegex() {
        const result = regexEngine.execute(
            this.state.pattern,
            this.state.flags,
            this.state.input,
            this.state.mode,
            this.state.replacement
        );
        
        this.state.matches = result.matches || [];
        this.state.output = result.output;
        this.state.error = result.error;
        
        // Update results panel
        if (this.components.results) {
            this.components.results.update(this.state);
        }
        
        // Update input highlighting
        if (this.components.input) {
            this.components.input.updateHighlights(this.state.matches);
        }
    }

    switchMode(mode) {
        this.state.mode = mode;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        if (mode === 'test') {
            // Show test suite
            this.showTestSuite();
        } else {
            this.executeRegex();
        }
    }

    showTestSuite() {
        if (!this.components.testSuite) {
            this.components.testSuite = new TestSuite(this.state);
        }
        // TODO: Replace results panel with test suite
    }

    async saveProject() {
        const project = {
            id: this.state.currentProject?.id || Date.now().toString(),
            name: prompt('Project naam:', this.state.currentProject?.name || 'Untitled') || 'Untitled',
            pattern: this.state.pattern,
            flags: this.state.flags,
            input: this.state.input,
            replacement: this.state.replacement,
            updatedAt: new Date()
        };
        
        await storage.saveProject(project);
        alert('✅ Project opgeslagen!');
    }

    shareUrl() {
        const url = urlState.encode(this.state, this.layout);
        navigator.clipboard.writeText(url).then(() => {
            alert('🔗 Link gekopieerd naar clipboard!');
        });
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    async loadProject(project) {
        this.state = {
            ...this.state,
            pattern: project.pattern,
            flags: project.flags,
            input: project.input,
            replacement: project.replacement || '',
            currentProject: project
        };
        
        this.executeRegex();
        
        // Update all components
        Object.values(this.components).forEach(comp => {
            if (comp.update) comp.update(this.state);
        });
    }
}
