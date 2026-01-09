# ColorHunt Theme Tester

Interactive web application for testing and managing ColorHunt palette collections with live preview.

## Features

- **Live Palette Preview** - Apply color schemes instantly to the entire page
- **URL Auto-Detection** - Paste ColorHunt URLs to automatically extract colors
- **Palette Library** - Save and organize multiple palettes with unique identifiers
- **Duplicate Detection** - Visual feedback when attempting to add existing palettes
- **One-Click Application** - Switch between saved palettes with a single click
- **Delete Management** - Remove unwanted palettes from your collection

## Technology Stack

- Vanilla JavaScript (ES6+)
- CSS3 with CSS Custom Properties
- No external dependencies or frameworks

## How It Works

### Color Extraction

The application parses ColorHunt URLs (e.g., `https://colorhunt.co/palette/5a9cb5face68faac68fa6868`) and extracts the hex color codes embedded in the path. Each 6-character segment represents one color in the palette.

### Dynamic Theme Application

Extracted colors are mapped to CSS custom properties:
- `--color-primary` - First color
- `--color-secondary` - Second color
- `--color-accent` - Third color
- `--color-highlight` - Fourth color

Both hex and RGB formats are set to support alpha channel usage in CSS.

### Duplicate Prevention

Palettes are identified by concatenating their color codes. When a duplicate is detected, the existing palette briefly highlights instead of creating a new entry.

## Usage

1. Open the floating palette widget
2. Paste a ColorHunt palette URL into the input field
3. The palette automatically extracts and adds to your collection
4. Click any palette card to apply it to the page
5. Use the delete button to remove unwanted palettes

## Default Palettes

The application initializes with three curated palettes:
- Cool Blues and Warm Oranges
- Dark Mode Cyan Accent
- Ocean Blues Gradient

## Browser Support

Compatible with all modern browsers supporting CSS Custom Properties.

---

*Note: This documentation has been formatted and reviewed with assistance from large language models (LLMs) to ensure clarity and professional presentation.*
