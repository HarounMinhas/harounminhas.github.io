# 🔍 Regex Playground

> **Write, test, and master regex — with live highlights, test suites, and visual explanations**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://harounminhas.github.io/regex-playground/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🎯 Core Functionality
- **Live Regex Editor** with syntax highlighting and error detection
- **Real-time Matching** with highlighted results in test input
- **Replace Mode** with live preview and diff view
- **Test Suite Runner** with pass/fail indicators (like unit tests!)
- **Local Storage** - all data saved in IndexedDB, no backend needed

### 🎨 Three Layout Modes
1. **3-Panel IDE** - Classic developer tool layout
2. **Split View** - Fast workflow for quick testing
3. **Notebook Mode** - Document-style for tutorials and lessons

### 🚀 Advanced Features
- **Share via URL** - Encode regex + input in shareable link
- **Snippet Library** - Save and organize regex patterns
- **Groups Table** - View captured groups with named group support
- **Export/Import** - Backup and share projects as JSON
- **Performance Guard** - Warns about slow regex patterns
- **Dark/Light Theme** - Easy on the eyes

### 🔬 Experimental Features (Coming Soon)
- **Explain Panel** - Human-readable regex breakdown
- **Catastrophic Backtracking Detector**
- **Regex Linting** - Best practice suggestions
- **Railroad Diagram** - Visual regex flow
- **Fuzz Generator** - Generate test strings

## 🛠 Tech Stack

- **100% Client-Side** - Pure vanilla JavaScript ES6+
- **No Dependencies** - No frameworks, just modern web APIs
- **IndexedDB** - For persistent local storage
- **CSS Grid/Flexbox** - Responsive layouts
- **GitHub Pages Ready** - Deploy anywhere

## 📁 Project Structure

```
regex-playground/
├── index.html              # Entry point
├── js/
│   ├── app.js             # Main application
│   ├── modules/
│   │   ├── regexEngine.js     # Regex matching logic
│   │   ├── storage.js         # IndexedDB wrapper
│   │   ├── highlighter.js     # Match highlighting
│   │   └── urlState.js        # URL encoding/decoding
│   └── components/
│       ├── LayoutChooser.js   # Layout selection UI
│       ├── RegexEditor.js     # Regex input component
│       ├── InputPanel.js      # Test input component
│       ├── ResultsPanel.js    # Match results display
│       ├── TestSuite.js       # Test runner component
│       ├── Sidebar.js         # Snippets/Projects sidebar
│       └── ExplainPanel.js    # Regex explanation
└── styles/
    ├── main.css           # Base styles
    ├── wireframe.css      # Wireframe components
    ├── layouts.css        # Layout grids
    ├── components.css     # Component styles
    └── themes.css         # Dark/light themes
```

## 🎓 Data Model

```javascript
// Snippet
{
  id: string,
  name: string,
  pattern: string,
  flags: string,
  description: string,
  tags: string[],
  createdAt: Date,
  updatedAt: Date
}

// Test Case
{
  id: string,
  name: string,
  mode: 'match' | 'replace',
  input: string,
  replacement?: string,
  expectedMatches?: string[],
  expectedOutput?: string
}

// Project
{
  id: string,
  name: string,
  snippets: Snippet[],
  testCases: TestCase[],
  notes: string,
  activeLayoutId: 'A' | 'B' | 'C',
  updatedAt: Date
}
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarounMinhas/harounminhas.github.io.git
   cd harounminhas.github.io/regex-playground
   ```

2. **Serve locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 💡 Usage Examples

### Email Validation
```regex
/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
```

### Extract URLs
```regex
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
```

### Phone Number (US)
```regex
/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/
```

## 🎯 Roadmap

- [x] MVP: Layout chooser + core matching
- [x] Replace mode + diff preview
- [x] Test suite runner
- [x] Local storage (IndexedDB)
- [x] Share via URL
- [ ] Explain panel (token breakdown)
- [ ] Railroad diagram visualizer
- [ ] Catastrophic backtracking detector
- [ ] Regex linting
- [ ] Fuzz generator
- [ ] Multi-language support (PCRE, Python)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Inspired by regex101.com and regexr.com
- Built as a portfolio project to demonstrate:
  - Clean architecture (modules, components)
  - Modern web APIs (IndexedDB, URL API)
  - Client-side data persistence
  - Responsive UI/UX design

---

**Made with ❤️ by [Haroun Minhas](https://github.com/HarounMinhas)**
