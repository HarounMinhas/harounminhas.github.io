export class TestSuite {
    constructor(state) {
        this.state = state;
        this.testCases = [];
    }

    render() {
        const container = document.createElement('div');
        container.className = 'test-suite panel';
        
        container.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">Test Suite</span>
                <div>
                    <button class="btn-secondary" id="btn-add-test">+ Add Test</button>
                    <button class="btn-primary" id="btn-run-tests">▶ Run All</button>
                </div>
            </div>
            <div class="test-cases-list" id="test-cases">
                ${this.testCases.length === 0 ? 
                    '<div class="empty-state">No test cases yet. Add one to get started!</div>' :
                    this.testCases.map((test, idx) => this.renderTestCase(test, idx)).join('')
                }
            </div>
        `;
        
        // Event listeners
        container.querySelector('#btn-add-test').onclick = () => this.addTestCase();
        container.querySelector('#btn-run-tests').onclick = () => this.runAllTests();
        
        return container;
    }

    renderTestCase(testCase, index) {
        const status = testCase.status || 'pending';
        const statusIcon = {
            'pass': '✅',
            'fail': '❌',
            'pending': '⏸'
        }[status];
        
        return `
            <div class="test-case" data-index="${index}">
                <div class="test-header">
                    <span class="test-status">${statusIcon}</span>
                    <input 
                        type="text" 
                        class="test-name" 
                        value="${testCase.name}"
                        placeholder="Test name..."
                    />
                    <button class="btn-tiny btn-danger" onclick="window.deleteTest(${index})">Delete</button>
                </div>
                <div class="test-body">
                    <textarea 
                        class="test-input"
                        placeholder="Test input..."
                    >${testCase.input}</textarea>
                    <div class="test-expected">
                        <label>Expected matches (one per line):</label>
                        <textarea 
                            class="test-expected-input"
                            placeholder="Expected match 1\nExpected match 2..."
                        >${(testCase.expected || []).join('\n')}</textarea>
                    </div>
                </div>
                ${testCase.result ? `
                    <div class="test-result ${status}">
                        ${testCase.result}
                    </div>
                ` : ''}
            </div>
        `;
    }

    addTestCase() {
        this.testCases.push({
            name: `Test ${this.testCases.length + 1}`,
            input: '',
            expected: [],
            status: 'pending'
        });
        this.refresh();
    }

    runAllTests() {
        // TODO: Implement test runner logic
        console.log('Running all tests...');
    }

    refresh() {
        const container = document.querySelector('.test-cases-list');
        if (container) {
            container.innerHTML = this.testCases.map((test, idx) => 
                this.renderTestCase(test, idx)
            ).join('');
        }
    }
}

// Global helper for delete (quick hack)
window.deleteTest = (index) => {
    if (confirm('Delete this test case?')) {
        // TODO: Implement deletion
    }
};
