# Unicode Text Formatter

A modern, accessible, browser-based tool for converting text into 25+ Unicode display styles. It is a static HTML + jQuery Progressive Web App (PWA): no server, build process, database, or API key is required.

Use it to make your text bold, italic, script, Fraktur, double-struck, full-width, circled, superscript, small caps, and more for social media, bios, chat messages, documents, and anywhere Unicode is supported.

## Key Features & UX Highlights

- **Dual Formatting Modes**:
  - **Format Entire Text**: Automatically transforms all entered or pasted text live — no delimiters needed. Ideal for quick tweets, captions, and titles.
  - **Marked Text**: Converts only text wrapped in a delimiter (e.g. `**bold**`). Text outside delimiters remains unchanged.
- **Live All-Styles Preview Gallery**: View your text converted into all 25 styles simultaneously in responsive cards with 1-click copy buttons and category filters (Classic, Math & Script, Enclosed, Decorative, Effects).
- **Fast Popular Styles Switcher**: Instant one-click pills for top styles (Bold, Italic, Script, Monospace, Double Struck, Small Caps, Circled, Fraktur, Inverted).
- **Theme Switching**: Built-in support for Light Mode, Dark Mode, and Auto (system preference) with smooth glassmorphism styling and zero eye strain.
- **Productivity Toolbar**:
  - **Try Example**: One-click sample text loader to immediately test features.
  - **Wrap Selection**: Works across desktop and mobile. Supports `Ctrl+B` (Windows/Linux) and `⌘+B` (macOS).
  - **Paste from Clipboard**: One-click paste into the input editor.
  - **Clear with Undo**: Clear text instantly with a toast option to restore in one click.
  - **Copy with Visual Feedback**: Copy button shows animated success state (`✓ Copied!`) with accessible status announcements.
  - **Share & Download**: Native Web Share API integration on mobile/desktop and one-click `.txt` file downloads.
  - **Live Word & Character Counters**: Displays both word and character counts for both input and formatted output.
- **Progressive Web App (PWA) & 100% Offline**: Full offline functionality powered by Service Worker caching and bundled local assets. Installable on desktop and mobile.
- **WCAG 2.1 AA Accessibility**: High-contrast ratios, visible focus indicators (`:focus-visible`), keyboard shortcuts (`Ctrl+Enter` to copy, `Ctrl+Shift+X` to clear, `?` for help), screen reader polite announcements, and reduced motion support.

## Run locally

This is a static PWA. Open [index.html](index.html) in any modern browser, or serve it with a local static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## How to use it

### Mode 1: Format Entire Text (Default)
1. Select your preferred style from the dropdown or quick style pills.
2. Type or paste your text into the **Input** pane (or click **Try Example**).
3. The **Formatted Output** pane updates instantly as you type.
4. Click **Copy** (or press `Ctrl+Enter` / `⌘+Enter`).

### Mode 2: Marked Text
1. Switch to **Marked Text (`**text**`)** mode using the top segmented control.
2. Choose or customize your marker (presets available: `**`, `*`, `_`, `~`, `[[ ]]`).
3. Surround the specific words you want formatted with the marker.
4. Only marked sections are converted; unmarked text remains unchanged.

### Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+B` / `⌘+B` | Wrap selection with active delimiter marker |
| `Ctrl+Enter` / `⌘+Enter` | Copy formatted output to clipboard |
| `Ctrl+Shift+X` / `⌘+Shift+X` | Clear input text (with Undo available) |
| `Ctrl+/` or `?` | Open Help & Shortcuts dialog |
| `Esc` | Close open modal dialog |

## Available styles

| Style | Category | Example for `Text 85` |
| --- | --- | --- |
| Bold | Classic | 𝐓𝐞𝐱𝐭 𝟖𝟓 |
| Italic | Classic | 𝑇𝑒𝑥𝑡 85 |
| Bold Italic | Classic | 𝑻𝒆𝒙𝒕 85 |
| Sans Serif | Classic | 𝖳𝖾𝗑𝗍 85 |
| Sans Serif Italic | Classic | 𝘛𝘦𝘹𝘵 85 |
| Sans Serif Bold | Classic | 𝗧𝗲𝘅𝘁 𝟴𝟱 |
| Sans Serif Bold Italic | Classic | 𝙏𝙚𝙭𝙩 85 |
| Monospace | Classic | 𝚃𝚎𝚡𝚝 𝟾𝟻 |
| Script | Math & Script | 𝒯ℯ𝓍𝓉 85 |
| Bold Script | Math & Script | 𝓣𝓮𝔁𝓽 85 |
| Fraktur | Math & Script | 𝔗𝔢𝔵𝔱 85 |
| Bold Fraktur | Math & Script | 𝕿𝖊𝖝𝖙 85 |
| Double Struck | Math & Script | 𝕋𝕖𝕩𝕥 𝟠𝟝 |
| Circled | Enclosed | Ⓣⓔⓧⓣ ⑧⑤ |
| Parenthesized | Enclosed | 🄣⒠⒳⒯ ⑻⑸ |
| Squared | Enclosed | 🅃🄴🅇🅃 85 |
| Regional Indicator | Enclosed | 🇹🇪🇽🇹 85 |
| Full Width | Decorative | Ｔｅｘｔ　８５ |
| Small Caps | Decorative | Tᴇxᴛ 85 |
| Superscript | Decorative | ᵀᵉˣᵗ ⁸⁵ |
| Subscript | Decorative | Tₑₓₜ ₈₅ |
| Inverted | Effects | ┴ǝxʇ 8ϛ |
| Strikethrough | Effects | T̶e̶x̶t̶ ̶8̶5̶ |
| Underline | Effects | T̲e̲x̲t̲ ̲8̲5̲ |
| Slash | Effects | T̷e̷x̷t̷ ̷8̷5̷ |

## Unicode rendering notes

The app outputs true Unicode characters, not CSS font styles. This allows the formatted text to be copied and pasted directly into social platforms, messaging apps, comments, and profile bios.

Mathematical styles (Script, Fraktur, Double Struck) use mathematical Unicode alphabets. The application includes fallback font declarations (`Cambria Math`, `Segoe UI Symbol`, `Noto Sans Math`) to maximize compatibility across Windows, macOS, iOS, Android, and Linux.

## File structure

```text
UnicodeTextFormatter/
├── index.html             # Semantic page structure & accessible UI components
├── styles.css             # Glassmorphism design system, dark/light themes, responsive layout
├── app.js                 # Event handling, state management, Unicode transformations
├── sw.js                  # Service Worker for offline caching & instant loads
├── manifest.webmanifest   # PWA installation metadata
├── jquery-3.7.1.min.js    # Bundled jQuery dependency for 100% offline reliability
└── README.md              # Project documentation
```

## Deployment with GitHub Pages

1. Create a public GitHub repository (e.g. `unicode-text-formatter`).
2. Push all repository files to the root of your `main` branch.
3. Open **Settings → Pages** in your repository.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` branch and `/ (root)` folder, then click **Save**.
6. GitHub will publish your site at `https://YOUR-USERNAME.github.io/unicode-text-formatter/`.

## License

MIT License. Feel free to use, modify, and distribute.
