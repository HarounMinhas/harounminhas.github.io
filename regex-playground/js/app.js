import { LayoutChooser } from './components/LayoutChooser.js';
import { RegexPlayground } from './components/RegexPlayground.js';
import { storage } from './modules/storage.js';
import { urlState } from './modules/urlState.js';

class App {
    constructor() {
        this.app = document.getElementById('app');
        this.currentView = null;
        this.init();
    }

    async init() {
        // Initialize storage
        await storage.init();
        
        // Check URL for shared state
        const sharedState = urlState.decode();
        if (sharedState) {
            // Skip chooser if coming from shared link
            localStorage.setItem('activeLayout', sharedState.layout || 'A');
            this.showPlayground(sharedState);
            return;
        }
        
        // Check for active layout
        const activeLayout = localStorage.getItem('activeLayout');
        
        if (!activeLayout) {
            this.showLayoutChooser();
        } else {
            this.showPlayground();
        }
        
        // Setup navigation
        window.addEventListener('popstate', () => this.handleNavigation());
    }

    showLayoutChooser() {
        this.app.innerHTML = '';
        this.currentView = new LayoutChooser((layoutId) => {
            localStorage.setItem('activeLayout', layoutId);
            this.showPlayground();
        });
        this.app.appendChild(this.currentView.render());
    }

    showPlayground(initialState = null) {
        this.app.innerHTML = '';
        const layout = localStorage.getItem('activeLayout') || 'A';
        this.currentView = new RegexPlayground(layout, initialState);
        this.app.appendChild(this.currentView.render());
    }

    handleNavigation() {
        const path = window.location.pathname;
        if (path.includes('playground')) {
            this.showPlayground();
        } else {
            this.showLayoutChooser();
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}
