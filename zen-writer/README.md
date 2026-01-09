# Zen Writer

Minimalist distraction-free writing application with full-screen focus mode and multiple export formats.

## Features

- **Focus Mode** - Fullscreen writing environment with minimal UI
- **Rich Text Editing** - Bold, italic, and underline formatting support
- **Multiple Export Formats** - Save documents as JSON or XML
- **Document Management** - New, open, and save operations
- **Keyboard Shortcuts** - Efficient workflow with keyboard commands
- **Auto-Resize Title** - Title field automatically adjusts to content
- **Welcome Tutorial** - First-time user guidance

## Technology Stack

- Vanilla JavaScript with modular architecture
- HTML5 ContentEditable API for rich text editing
- Fullscreen API for distraction-free mode
- SOLID principles for file handling system
- No external dependencies or frameworks

## Architecture

### Modular File Handler System

The application implements a plugin-style file handler architecture:

- **FileHandler** (Abstract Base Class) - Defines serialization interface
- **JSONFileHandler** - Handles JSON format with metadata
- **XMLFileHandler** - Handles XML format with proper escaping
- **FileManager** - Coordinates file operations and format selection

New formats can be added by extending the `FileHandler` class and registering with `FileManager`.

## Keyboard Shortcuts

### Text Formatting
- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+U` - Underline

### Document Operations
- `Ctrl+N` - New document
- `Ctrl+O` - Open document
- `Ctrl+S` - Save document

### Focus Mode
- `F11` - Toggle fullscreen
- `Esc` - Exit fullscreen

## File Formats

### JSON Format
```json
{
  "title": "Document Title",
  "content": "<p>HTML content</p>",
  "created": "2026-01-09T08:40:00.000Z",
  "format": "zen-writer-v1"
}
```

### XML Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<document>
  <metadata>
    <created>2026-01-09T08:40:00.000Z</created>
    <format>zen-writer-v1</format>
  </metadata>
  <title>Document Title</title>
  <content>&lt;p&gt;HTML content&lt;/p&gt;</content>
</document>
```

## Usage

1. Start typing in the title field or main editor
2. Use toolbar buttons or keyboard shortcuts for formatting
3. Click "Focus" or press F11 for fullscreen writing mode
4. Save your document in JSON or XML format
5. Open previously saved documents to continue editing

## Browser Support

Compatible with all modern browsers supporting:
- ContentEditable API
- Fullscreen API
- File API
- Blob API

---

*Note: This documentation has been formatted and reviewed with assistance from large language models (LLMs) to ensure clarity and professional presentation.*
