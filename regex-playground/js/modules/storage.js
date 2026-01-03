class Storage {
    constructor() {
        this.db = null;
        this.dbName = 'RegexPlaygroundDB';
        this.version = 1;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => {
                console.error('Database failed to open');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('Database opened successfully');
                resolve();
            };
            
            request.onupgradeneeded = (e) => {
                this.db = e.target.result;
                
                // Create object stores
                if (!this.db.objectStoreNames.contains('projects')) {
                    const projectStore = this.db.createObjectStore('projects', { keyPath: 'id' });
                    projectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
                
                if (!this.db.objectStoreNames.contains('snippets')) {
                    const snippetStore = this.db.createObjectStore('snippets', { keyPath: 'id' });
                    snippetStore.createIndex('tags', 'tags', { unique: false, multiEntry: true });
                }
                
                if (!this.db.objectStoreNames.contains('history')) {
                    const historyStore = this.db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
                    historyStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
                
                console.log('Database setup complete');
            };
        });
    }

    // Projects
    async saveProject(project) {
        return this.put('projects', project);
    }

    async getProject(id) {
        return this.get('projects', id);
    }

    async listProjects() {
        return this.getAll('projects');
    }

    async deleteProject(id) {
        return this.delete('projects', id);
    }

    // Snippets
    async saveSnippet(snippet) {
        return this.put('snippets', snippet);
    }

    async getSnippet(id) {
        return this.get('snippets', id);
    }

    async listSnippets() {
        return this.getAll('snippets');
    }

    async deleteSnippet(id) {
        return this.delete('snippets', id);
    }

    // History
    async addHistory(entry) {
        entry.timestamp = Date.now();
        return this.add('history', entry);
    }

    async getHistory(limit = 50) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['history'], 'readonly');
            const store = transaction.objectStore('history');
            const index = store.index('timestamp');
            
            const results = [];
            let count = 0;
            
            const request = index.openCursor(null, 'prev'); // Reverse order
            
            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor && count < limit) {
                    results.push(cursor.value);
                    count++;
                    cursor.continue();
                } else {
                    resolve(results);
                }
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    // Generic CRUD operations
    async put(storeName, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(item);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async add(storeName, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(item);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Export/Import
    async exportAll() {
        const data = {
            projects: await this.listProjects(),
            snippets: await this.listSnippets(),
            exportDate: new Date().toISOString()
        };
        return data;
    }

    async importAll(data) {
        // Import projects
        if (data.projects) {
            for (const project of data.projects) {
                await this.saveProject(project);
            }
        }
        
        // Import snippets
        if (data.snippets) {
            for (const snippet of data.snippets) {
                await this.saveSnippet(snippet);
            }
        }
    }
}

export const storage = new Storage();
