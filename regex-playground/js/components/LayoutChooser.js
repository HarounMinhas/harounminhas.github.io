export class LayoutChooser {
    constructor(onSelect) {
        this.onSelect = onSelect;
        this.layouts = [
            {
                id: 'A',
                name: '3-Panel IDE',
                description: 'Klassieke IDE met sidebar, editor en results. Perfect voor complexe workflows.',
                wireframe: this.createWireframeA()
            },
            {
                id: 'B',
                name: 'Split View',
                description: 'Snelle focus op regex en input met resultaten rechts. Ideaal voor dagelijks gebruik.',
                wireframe: this.createWireframeB()
            },
            {
                id: 'C',
                name: 'Notebook Mode',
                description: 'Document-achtige flow met blokken. Geweldig voor tutorials en documentatie.',
                wireframe: this.createWireframeC()
            }
        ];
    }

    createWireframeA() {
        const canvas = document.createElement('div');
        canvas.className = 'wf-canvas';
        canvas.innerHTML = `
            <div class="wf-grid wf-layout-a">
                <div class="wf-box"><span class="wf-label">Sidebar</span></div>
                <div class="wf-column">
                    <div class="wf-box"><span class="wf-label">Regex Editor</span></div>
                    <div class="wf-box" style="flex-grow: 1;"><span class="wf-label">Input Text</span></div>
                </div>
                <div class="wf-box"><span class="wf-label">Results / Explain</span></div>
            </div>
        `;
        return canvas;
    }

    createWireframeB() {
        const canvas = document.createElement('div');
        canvas.className = 'wf-canvas';
        canvas.innerHTML = `
            <div class="wf-grid wf-layout-b">
                <div class="wf-column">
                    <div class="wf-box"><span class="wf-label">Regex Editor</span></div>
                    <div class="wf-box" style="flex-grow: 1;"><span class="wf-label">Input Text</span></div>
                </div>
                <div class="wf-box"><span class="wf-label">Results</span></div>
            </div>
        `;
        return canvas;
    }

    createWireframeC() {
        const canvas = document.createElement('div');
        canvas.className = 'wf-canvas';
        canvas.innerHTML = `
            <div class="wf-column" style="height: 100%;">
                <div class="wf-box"><span class="wf-label">Regex Block</span></div>
                <div class="wf-box"><span class="wf-label">Test Input Block</span></div>
                <div class="wf-box"><span class="wf-label">Output Block</span></div>
                <div class="wf-box"><span class="wf-label">Notes Block</span></div>
            </div>
        `;
        return canvas;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'layout-chooser';
        
        const header = document.createElement('div');
        header.className = 'chooser-header';
        header.innerHTML = `
            <h1>🔍 Regex Playground</h1>
            <p>Kies je preferred layout om te starten</p>
        `;
        
        const grid = document.createElement('div');
        grid.className = 'layout-grid';
        
        this.layouts.forEach(layout => {
            const card = this.createCard(layout);
            grid.appendChild(card);
        });
        
        container.appendChild(header);
        container.appendChild(grid);
        
        return container;
    }

    createCard(layout) {
        const card = document.createElement('div');
        card.className = 'layout-card';
        
        const title = document.createElement('h3');
        title.textContent = layout.name;
        
        const description = document.createElement('p');
        description.textContent = layout.description;
        
        const button = document.createElement('button');
        button.className = 'btn-primary';
        button.textContent = 'Selecteer';
        button.onclick = () => this.onSelect(layout.id);
        
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(layout.wireframe);
        card.appendChild(button);
        
        return card;
    }
}
