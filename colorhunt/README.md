# ColorHunt

Interactive color palette explorer and generator for web design projects.

## Features

- **Palette Browser**: Explore curated color palettes
- **Color Extraction**: Extract colors from uploaded images
- **Export Options**: Copy hex codes, generate CSS variables, export to various formats
- **Palette Generator**: Create random color combinations
- **Contrast Checker**: Verify WCAG accessibility compliance

## Technology Stack

- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern layout with CSS Grid and Flexbox
- **Canvas API**: Image color extraction
- **LocalStorage**: Save favorite palettes

## Usage

Open `index.html` directly in a web browser or serve via a local web server.

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then navigate to `http://localhost:8000/colorhunt/`

## Features in Detail

### Palette Browsing
Browse pre-curated color palettes organized by theme, mood, or color family.

### Color Extraction
Upload an image to extract dominant colors and generate a palette automatically.

### Export Formats
- Hex codes
- RGB values
- CSS custom properties
- SCSS variables
- JSON format

### Accessibility
Built-in contrast checker ensures color combinations meet WCAG guidelines for text readability.

## Browser Support

Compatible with all modern browsers supporting ES6+ and Canvas API.

---

*Note: This documentation has been formatted and reviewed with assistance from large language models (LLMs) to ensure clarity and professional presentation.*
