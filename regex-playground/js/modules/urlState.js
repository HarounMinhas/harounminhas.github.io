class UrlState {
    encode(state, layout) {
        const data = {
            p: state.pattern,
            f: this.encodeFlags(state.flags),
            i: state.input,
            m: state.mode,
            r: state.replacement || '',
            l: layout
        };
        
        const json = JSON.stringify(data);
        const encoded = btoa(encodeURIComponent(json));
        
        const url = new URL(window.location.href);
        url.searchParams.set('s', encoded);
        
        return url.toString();
    }

    decode() {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('s');
        
        if (!encoded) return null;
        
        try {
            const json = decodeURIComponent(atob(encoded));
            const data = JSON.parse(json);
            
            return {
                pattern: data.p || '',
                flags: this.decodeFlags(data.f),
                input: data.i || '',
                mode: data.m || 'match',
                replacement: data.r || '',
                layout: data.l || 'A'
            };
        } catch (e) {
            console.error('Failed to decode URL state:', e);
            return null;
        }
    }

    encodeFlags(flags) {
        return Object.entries(flags)
            .filter(([_, enabled]) => enabled)
            .map(([flag, _]) => flag)
            .join('');
    }

    decodeFlags(flagStr) {
        const flags = { g: false, i: false, m: false, s: false, u: false };
        if (!flagStr) return flags;
        
        for (const char of flagStr) {
            if (flags.hasOwnProperty(char)) {
                flags[char] = true;
            }
        }
        
        return flags;
    }
}

export const urlState = new UrlState();
