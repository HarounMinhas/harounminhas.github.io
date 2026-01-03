class Highlighter {
    render(text, matches) {
        if (!matches || matches.length === 0) {
            return this.escapeHtml(text);
        }
        
        // Sort matches by start position
        const sorted = [...matches].sort((a, b) => a.start - b.start);
        
        let result = '';
        let lastIndex = 0;
        
        sorted.forEach((match, idx) => {
            // Add text before match
            if (match.start > lastIndex) {
                result += this.escapeHtml(text.substring(lastIndex, match.start));
            }
            
            // Add highlighted match
            const matchText = text.substring(match.start, match.end);
            result += `<span class="highlight match-${idx % 5}" data-match="${idx}" title="Match #${idx + 1}">${this.escapeHtml(matchText)}</span>`;
            
            lastIndex = match.end;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
            result += this.escapeHtml(text.substring(lastIndex));
        }
        
        return result;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Generate color for match index
    getMatchColor(index) {
        const colors = [
            '#ffeb3b44',  // Yellow
            '#4caf5044',  // Green
            '#2196f344',  // Blue
            '#ff980044',  // Orange
            '#9c27b044'   // Purple
        ];
        return colors[index % colors.length];
    }
}

export const highlighter = new Highlighter();
