class RegexEngine {
    constructor() {
        this.timeout = 5000; // 5 second timeout
    }

    execute(pattern, flags, input, mode = 'match', replacement = '') {
        try {
            const regex = this.compile(pattern, flags);
            
            if (!regex.ok) {
                return { error: regex.error, matches: [] };
            }
            
            const startTime = performance.now();
            
            if (mode === 'replace') {
                const output = input.replace(regex.regex, replacement);
                const matches = this.matchAll(regex.regex, input);
                const duration = performance.now() - startTime;
                
                return {
                    output,
                    matches,
                    performance: duration
                };
            } else {
                const matches = this.matchAll(regex.regex, input);
                const duration = performance.now() - startTime;
                
                if (duration > 1000) {
                    console.warn(`⚠️ Slow regex detected: ${duration.toFixed(2)}ms`);
                }
                
                return {
                    matches,
                    performance: duration
                };
            }
        } catch (error) {
            return {
                error: error.message,
                matches: []
            };
        }
    }

    compile(pattern, flags) {
        try {
            if (!pattern) {
                return { ok: false, error: 'Empty pattern' };
            }
            
            const flagStr = Object.entries(flags)
                .filter(([_, enabled]) => enabled)
                .map(([flag, _]) => flag)
                .join('');
            
            const regex = new RegExp(pattern, flagStr);
            
            return { ok: true, regex };
        } catch (error) {
            return { ok: false, error: error.message };
        }
    }

    matchAll(regex, input) {
        if (!input) return [];
        
        const matches = [];
        
        if (regex.global) {
            // Use matchAll for global flag
            const results = [...input.matchAll(regex)];
            results.forEach((match, idx) => {
                matches.push(this.createMatchResult(match, idx));
            });
        } else {
            // Single match
            const match = regex.exec(input);
            if (match) {
                matches.push(this.createMatchResult(match, 0));
            }
        }
        
        return matches;
    }

    createMatchResult(match, index) {
        const groups = [];
        
        // Captured groups
        for (let i = 1; i < match.length; i++) {
            if (match[i] !== undefined) {
                groups.push({
                    index: i,
                    value: match[i],
                    name: null
                });
            }
        }
        
        // Named groups
        if (match.groups) {
            Object.entries(match.groups).forEach(([name, value]) => {
                const groupIndex = groups.findIndex(g => g.value === value);
                if (groupIndex >= 0) {
                    groups[groupIndex].name = name;
                }
            });
        }
        
        return {
            text: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups,
            namedGroups: match.groups || {}
        };
    }

    // Lint regex for common issues
    lint(pattern) {
        const issues = [];
        
        // Check for unnecessary escapes
        const unnecessaryEscapes = /\\[a-zA-Z0-9]/g;
        if (unnecessaryEscapes.test(pattern)) {
            issues.push({
                type: 'warning',
                message: 'Potentially unnecessary escape sequences'
            });
        }
        
        // Check for catastrophic backtracking patterns
        const dangerousPatterns = [
            /(\(.*\*.*\)\+)/,  // (a*)+
            /(\(.*\+.*\)\*)/,  // (a+)*
            /(\(.*\*.*\)\*)/   // (a*)*
        ];
        
        dangerousPatterns.forEach(dangerous => {
            if (dangerous.test(pattern)) {
                issues.push({
                    type: 'error',
                    message: 'Potential catastrophic backtracking detected'
                });
            }
        });
        
        return issues;
    }
}

export const regexEngine = new RegexEngine();
