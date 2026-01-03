export class ExplainPanel {
    constructor(state) {
        this.state = state;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'explain-panel panel';
        
        container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">🧠 Explanation</span>
            </div>
            <div class="explain-content">
                ${this.explainPattern(this.state.pattern)}
            </div>
        `;
        
        return container;
    }

    explainPattern(pattern) {
        if (!pattern) {
            return '<div class="empty-state">Enter a regex pattern to see explanation</div>';
        }
        
        // Simple token-based explanation
        const tokens = this.tokenize(pattern);
        
        return `
            <div class="token-list">
                ${tokens.map(token => this.renderToken(token)).join('')}
            </div>
        `;
    }

    tokenize(pattern) {
        // Very basic tokenizer - can be expanded
        const tokens = [];
        const explanations = {
            '^': 'Start of string/line',
            '$': 'End of string/line',
            '.': 'Any character (except newline)',
            '*': 'Zero or more times',
            '+': 'One or more times',
            '?': 'Zero or one time (optional)',
            '\\d': 'Any digit (0-9)',
            '\\D': 'Any non-digit',
            '\\w': 'Any word character (a-z, A-Z, 0-9, _)',
            '\\W': 'Any non-word character',
            '\\s': 'Any whitespace character',
            '\\S': 'Any non-whitespace character',
            '\\b': 'Word boundary',
            '\\B': 'Not a word boundary'
        };
        
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            const next = pattern[i + 1];
            
            if (char === '\\' && next) {
                const combo = char + next;
                tokens.push({
                    token: combo,
                    explanation: explanations[combo] || 'Escaped character'
                });
                i++; // Skip next char
            } else {
                tokens.push({
                    token: char,
                    explanation: explanations[char] || `Literal character: ${char}`
                });
            }
        }
        
        return tokens;
    }

    renderToken(token) {
        return `
            <div class="token-item">
                <code class="token-code">${this.escapeHtml(token.token)}</code>
                <span class="token-explain">${token.explanation}</span>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    update(state) {
        this.state = state;
        // Re-render explanation
    }
}
