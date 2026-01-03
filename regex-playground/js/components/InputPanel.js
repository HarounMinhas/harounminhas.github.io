import { highlighter } from '../modules/highlighter.js';

export class InputPanel {
    constructor(state, onUpdate) {
        this.state = state;
        this.onUpdate = onUpdate;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'input-panel panel';
        
        const showReplace = this.state.mode === 'replace';
        
        container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">Test Input</span>
                <button class="btn-tiny" id="btn-clear-input">Clear</button>
            </div>
            <div class="input-wrapper">
                <div class="textarea-container">
                    <textarea 
                        id="test-input" 
                        class="test-input"
                        placeholder="Enter test text here..."
                        spellcheck="false"
                    >${this.state.input}</textarea>
                    <div id="highlight-overlay" class="highlight-overlay"></div>
                </div>
            </div>
            ${showReplace ? `
                <div class="panel-header" style="margin-top: 12px;">
                    <span class="panel-title">Replacement</span>
                </div>
                <input 
                    type="text" 
                    id="replacement-input"
                    class="replacement-input"
                    placeholder="$1, $<name>, or text..."
                    value="${this.state.replacement || ''}"
                />
            ` : ''}
        `;
        
        // Event listeners
        const textarea = container.querySelector('#test-input');
        textarea.oninput = (e) => {
            this.onUpdate({ input: e.target.value });
        };
        
        container.querySelector('#btn-clear-input').onclick = () => {
            textarea.value = '';
            this.onUpdate({ input: '' });
        };
        
        if (showReplace) {
            const replacementInput = container.querySelector('#replacement-input');
            replacementInput.oninput = (e) => {
                this.onUpdate({ replacement: e.target.value });
            };
        }
        
        return container;
    }

    updateHighlights(matches) {
        const overlay = document.getElementById('highlight-overlay');
        if (!overlay) return;
        
        const textarea = document.getElementById('test-input');
        const text = textarea.value;
        
        overlay.innerHTML = highlighter.render(text, matches);
        
        // Sync scroll
        overlay.scrollTop = textarea.scrollTop;
        overlay.scrollLeft = textarea.scrollLeft;
    }

    update(state) {
        this.state = state;
        const textarea = document.querySelector('#test-input');
        if (textarea) textarea.value = state.input;
        
        const replacement = document.querySelector('#replacement-input');
        if (replacement) replacement.value = state.replacement || '';
    }
}
