import { storage } from '../modules/storage.js';

export class Sidebar {
    constructor(onSelectProject) {
        this.onSelectProject = onSelectProject;
        this.projects = [];
        this.snippets = [];
    }

    async render() {
        this.projects = await storage.listProjects();
        this.snippets = await storage.listSnippets();
        
        const container = document.createElement('div');
        container.className = 'sidebar panel';
        
        container.innerHTML = `
            <div class="sidebar-section">
                <div class="section-header">
                    <span class="section-title">📁 Projects</span>
                    <button class="btn-tiny" id="btn-new-project">+</button>
                </div>
                <div class="project-list" id="project-list">
                    ${this.projects.length === 0 ? 
                        '<div class="empty-state-small">No saved projects</div>' :
                        this.projects.map(p => this.renderProjectItem(p)).join('')
                    }
                </div>
            </div>
            
            <div class="sidebar-section">
                <div class="section-header">
                    <span class="section-title">📝 Snippets</span>
                    <button class="btn-tiny" id="btn-new-snippet">+</button>
                </div>
                <div class="snippet-list" id="snippet-list">
                    ${this.snippets.length === 0 ? 
                        '<div class="empty-state-small">No saved snippets</div>' :
                        this.snippets.map(s => this.renderSnippetItem(s)).join('')
                    }
                </div>
            </div>
        `;
        
        return container;
    }

    renderProjectItem(project) {
        const date = new Date(project.updatedAt).toLocaleDateString();
        return `
            <div class="sidebar-item" data-id="${project.id}">
                <div class="item-name">${project.name}</div>
                <div class="item-meta">${date}</div>
            </div>
        `;
    }

    renderSnippetItem(snippet) {
        return `
            <div class="sidebar-item" data-id="${snippet.id}">
                <div class="item-name">${snippet.name}</div>
                <div class="item-pattern">/${snippet.pattern}/</div>
            </div>
        `;
    }
}
