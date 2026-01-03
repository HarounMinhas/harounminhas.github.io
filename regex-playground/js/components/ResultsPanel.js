export class ResultsPanel {
    constructor(state) {
        this.state = state;
        this.container = null;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'results-panel panel';
        this.update(this.state);
        return this.container;
    }

    update(state) {
        this.state = state;
        if (!this.container) return;
        
        if (state.mode === 'match') {
            this.renderMatches();
        } else if (state.mode === 'replace') {
            this.renderReplace();
        }
    }

    renderMatches() {
        const matches = this.state.matches || [];
        
        this.container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">Matches (${matches.length})</span>
                ${matches.length > 0 ? '<button class="btn-tiny" id="btn-copy-matches">Copy All</button>' : ''}
            </div>
            <div class="matches-list">
                ${matches.length === 0 ? 
                    '<div class="empty-state">No matches found</div>' :
                    matches.map((match, idx) => this.renderMatch(match, idx)).join('')
                }
            </div>
        `;
        
        if (matches.length > 0) {
            this.container.querySelector('#btn-copy-matches').onclick = () => {
                const text = matches.map(m => m.text).join('\n');
                navigator.clipboard.writeText(text);
            };
        }
    }

    renderMatch(match, index) {
        const groups = match.groups || [];
        
        return `
            <div class="match-item">
                <div class="match-header">
                    <span class="match-index">#${index + 1}</span>
                    <span class="match-range">[${match.start}-${match.end}]</span>
                    <button class="btn-tiny" onclick="navigator.clipboard.writeText('${match.text.replace(/'/g, "\\'")}')">Copy</button>
                </div>
                <div class="match-text">${this.escapeHtml(match.text)}</div>
                ${groups.length > 0 ? `
                    <div class="groups-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Group</th>
                                    <th>Name</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${groups.map((g, i) => `
                                    <tr>
                                        <td>${i}</td>
                                        <td>${g.name || '-'}</td>
                                        <td class="group-value">${this.escapeHtml(g.value)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderReplace() {
        const output = this.state.output || '';
        const matches = this.state.matches || [];
        
        this.container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">Replace Output</span>
                <span class="match-count">${matches.length} replacement${matches.length !== 1 ? 's' : ''}</span>
                ${output ? '<button class="btn-tiny" id="btn-copy-output">Copy Output</button>' : ''}
            </div>
            <div class="output-display">
                ${output ? 
                    `<pre class="output-text">${this.escapeHtml(output)}</pre>` :
                    '<div class="empty-state">No replacements</div>'
                }
            </div>
        `;
        
        if (output) {
            this.container.querySelector('#btn-copy-output').onclick = () => {
                navigator.clipboard.writeText(output);
            };
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
