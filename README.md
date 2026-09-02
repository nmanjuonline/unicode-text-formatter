# Unicode Text Formatter

A lightweight, browser-based tool for converting delimited portions of text into Unicode display styles. It is a static HTML + jQuery application: no server, build process, database, or API key is required.

Use it to make selected text appear bold, italic, script, Fraktur, double-struck, full-width, circled, superscript, and more in places that support Unicode text.

## Features

- Converts only text enclosed by a chosen delimiter.
- Removes delimiters from the resulting output.
- Updates the formatted output live while you type.
- Includes 20 Unicode styles.
- Provides a Copy button and copies the output when the output field is focused.
- Supports `Ctrl+B` on desktop to wrap a selection in `**` markers.
- Provides a mobile-only **Bold selection** button as an alternative to `Ctrl+B`.
- Bundles jQuery locally, so the app works without an internet connection after it has been downloaded.
- Uses Unicode-capable font fallbacks to display mathematical alphabets where the operating system supports them.

## Run locally

This is a static site. Open [index.html](index.html) in a modern browser.

No installation or local web server is needed. If you prefer to use a local server during development, serve this folder with any static-file server.

## How to use it

1. Choose a **Font style**.
2. Set the **Delimiter**. The default is `**`.
3. Write or paste your text into the **Input** pane.
4. Put the delimiter before and after each section that should be formatted.
5. Copy the value from the **Formatted output** pane.

For example, with the delimiter set to `**`:

```text
Make **this text** bold.
```

Using the **Bold** style produces:

```text
Make 𝐭𝐡𝐢𝐬 𝐭𝐞𝐱𝐭 bold.
```

The marker characters (`**`) are instructions to the formatter only; they never appear in the output.

### Multiple formatted sections

You can format more than one section in a sentence:

```text
**First section**, plain text, then **second section**.
```

Every odd delimiter-pair section is converted. Text outside delimiters remains unchanged.

### Delimiter behavior

- A delimiter can contain one or more characters: `**`, `__`, `[[`, `%%`, and so on.
- The opening and closing marker must be identical.
- An empty delimiter turns off formatting and returns the input unchanged.
- If a delimiter is not closed, the text after it is treated as the formatted section.

### Desktop shortcut

Select text in the input field, then press `Ctrl+B`. The app wraps the selection in `**` markers and refreshes the output.

### Mobile control

On narrow/mobile screens, select text in the input field and tap **B Bold selection**. It performs the same action as the desktop shortcut. The button is intentionally hidden on desktop, where `Ctrl+B` is available.

## Available styles

| Style | Example for `Text 85` |
| --- | --- |
| Bold | 𝐓𝐞𝐱𝐭 𝟖𝟓 |
| Italic | 𝑇𝑒𝑥𝑡 85 |
| Bold Italic | 𝑻𝒆𝒙𝒕 85 |
| Script | 𝒯ℯ𝓍𝓉 85 |
| Bold Script | 𝓣𝓮𝔁𝓽 85 |
| Fraktur | 𝔗𝔢𝔵𝔱 85 |
| Bold Fraktur | 𝕿𝖊𝖝𝖙 85 |
| Double Struck | 𝕋𝕖𝕩𝕥 𝟠𝟝 |
| Sans Serif | 𝖳𝖾𝗑𝗍 85 |
| Sans Serif Italic | 𝘛𝘦𝘹𝘵 85 |
| Sans Serif Bold | 𝗧𝗲𝘅𝘁 𝟴𝟱 |
| Sans Serif Bold Italic | 𝙏𝙚𝙭𝙩 85 |
| Monospace | 𝚃𝚎𝚡𝚝 𝟾𝟻 |
| Circled | Ⓣⓔⓧⓣ ⑧⑤ |
| Parenthesized | 🄣⒠⒳⒯ ⑻⑸ |
| Full Width | Ｔｅｘｔ　８５ |
| Small Caps | Tᴇxᴛ 85 |
| Superscript | ᵀᵉˣᵗ ⁸⁵ |
| Subscript | Tₑₓₜ ₈₅ |
| Inverted | ┴ǝxʇ 8ϛ |

Not every Unicode style includes an equivalent for every character. When a character has no suitable Unicode equivalent, it is left unchanged.

## Unicode rendering notes

The app outputs real Unicode characters, not CSS font styling. This lets formatted text be pasted into social platforms, messages, documents, and other compatible services.

Unicode coverage varies between browsers, operating systems, and apps. Script, Fraktur, and Double Struck use mathematical Unicode alphabets. The app prioritizes `Cambria Math` and other Unicode-capable fonts, but a device that lacks the glyphs may still show a fallback symbol or box. The copied output is still the correct Unicode text.

## File structure

```text
UnicodeTextFormatter/
├── index.html             # Page structure and controls
├── styles.css             # Responsive layout and fonts
├── app.js                 # jQuery event handling and Unicode conversion
├── jquery-3.7.1.min.js    # Bundled jQuery dependency for offline use
└── README.md              # Project documentation
```

## Deployment with GitHub Pages

GitHub Pages is a simple free host for this static app.

1. Create a public GitHub repository, for example `unicode-text-formatter`.
2. Upload `index.html`, `styles.css`, `app.js`, and `jquery-3.7.1.min.js` to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. GitHub will publish the site at `https://YOUR-USERNAME.github.io/unicode-text-formatter/`.

See the [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart) for current GitHub-specific instructions.

## Development notes

- jQuery is loaded from the local `jquery-3.7.1.min.js` file, rather than a CDN, to avoid a network dependency.
- `app.js` contains exact maps for Script, Fraktur, and Double Struck. These alphabets include gaps in Unicode, so simple code-point offsets can create invalid characters.
- The original WinForms source files are retained in the repository as legacy source. The browser app is started through `index.html`.

## License

No project license has been specified. Add a license file before distributing or accepting contributions.
