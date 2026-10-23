/* ==========================================================================
   Unicode Text Formatter - Main Application Logic
   Clean, Fast, Automatic Formatting & Live Styles Gallery
   ========================================================================== */

/* global $ */
if (typeof window.jQuery === 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = 'jQuery could not be loaded. Please reload the page.';
      toast.classList.add('visible');
    }
  });
} else {
  $(function () {
    'use strict';

    // ─── Style Definitions (with Categorization for UX clarity) ─────────────
    const styles = [
      ['Bold', 'Bold', 'Classic'],
      ['Italic', 'Italic', 'Classic'],
      ['BoldItalic', 'Bold Italic', 'Classic'],
      ['SansSerif', 'Sans Serif', 'Classic'],
      ['SansSerifItalic', 'Sans Serif Italic', 'Classic'],
      ['SansSerifBold', 'Sans Serif Bold', 'Classic'],
      ['SansSerifBoldItalic', 'Sans Serif Bold Italic', 'Classic'],
      ['Monospace', 'Monospace', 'Classic'],

      ['Script', 'Script', 'Mathematical & Script'],
      ['BoldScript', 'Bold Script', 'Mathematical & Script'],
      ['Fraktur', 'Fraktur', 'Mathematical & Script'],
      ['BoldFraktur', 'Bold Fraktur', 'Mathematical & Script'],
      ['DoubleStruck', 'Double Struck', 'Mathematical & Script'],

      ['Circled', 'Circled', 'Enclosed'],
      ['Parenthesized', 'Parenthesized', 'Enclosed'],
      ['Squared', 'Squared', 'Enclosed'],
      ['RegionalIndicator', 'Regional Indicator', 'Enclosed'],

      ['FullWidth', 'Full Width', 'Decorative'],
      ['SmallCaps', 'Small Caps', 'Decorative'],
      ['Superscript', 'Superscript', 'Decorative'],
      ['Subscript', 'Subscript', 'Decorative'],

      ['Inverted', 'Inverted', 'Effects'],
      ['Strikethrough', 'Strikethrough', 'Effects'],
      ['Underline', 'Underline', 'Effects'],
      ['Slash', 'Slash', 'Effects']
    ];

    const popularStyles = ['Bold', 'Italic', 'Script', 'Monospace', 'DoubleStruck', 'SmallCaps', 'Circled', 'Fraktur', 'Inverted'];

    const offsets = {
      Bold: [0x1D400 - 65, 0x1D41A - 97, 0x1D7CE - 48],
      Italic: [0x1D434 - 65, 0x1D44E - 97, 0],
      BoldItalic: [0x1D468 - 65, 0x1D482 - 97, 0],
      Script: [0x1D49C - 65, 0x1D4B6 - 97, 0],
      BoldScript: [0x1D4D0 - 65, 0x1D4EA - 97, 0],
      Fraktur: [0x1D504 - 65, 0x1D51E - 97, 0],
      BoldFraktur: [0x1D56C - 65, 0x1D586 - 97, 0],
      DoubleStruck: [0x1D538 - 65, 0x1D552 - 97, 0x1D7D8 - 48],
      SansSerif: [0x1D5A0 - 65, 0x1D5BA - 97, 0],
      SansSerifItalic: [0x1D608 - 65, 0x1D622 - 97, 0],
      SansSerifBold: [0x1D5D4 - 65, 0x1D5EE - 97, 0x1D7EC - 48],
      SansSerifBoldItalic: [0x1D63C - 65, 0x1D656 - 97, 0],
      Monospace: [0x1D670 - 65, 0x1D68A - 97, 0x1D7F6 - 48]
    };

    const map = (from, to) => Object.fromEntries([...from].map((c, i) => [c, [...to][i]]));

    const circled = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨'
    );

    const script = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻𝒼𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
    );

    const fraktur = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
    );

    const doubleStruck = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'
    );

    const parenthesized = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      '🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⓪⑴⑵⑶⑷⑸⑹⑺⑻⑼'
    );

    const smallCaps = map(
      'abcdefghijklmnopqrstuvwxyz',
      'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'
    );

    const superscript = map(
      'abcdefghijklmnopqrstuvwxyz0123456789+-=()',
      'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾'
    );

    const subscript = map(
      'ae hijklmnoprstuvx0123456789+-=()',
      'ₐₑ ₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎'
    );

    const inverted = map(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,?!"\'()[]{}&_',
      'ɐqɔpǝɟƃɥᴉɾʞlɯuo dbɹsʇnʌʍxʎz∀BƆDƎℲפHIſʞ˥WN OԀQRS┴∩ΛMX⅄ZƖᄅƐㄣϛ9ㄥ86 0˙\'¿¡„,)(][}{⅋‾'.replaceAll(' ', '')
    );

    const squared = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
    );

    const regionalIndicator = map(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿'
    );

    const fullWidth = (c) =>
      c === ' ' ? '　' : c >= '!' && c <= '~' ? String.fromCodePoint(c.codePointAt(0) + 0xFEE0) : c;

    function convertCharacter(c, style) {
      if (style === 'FullWidth') return fullWidth(c);
      if (style === 'Strikethrough') return c + '\u0336';
      if (style === 'Underline') return c + '\u0332';
      if (style === 'Slash') return c + '\u0338';

      const special = {
        Script: script,
        Fraktur: fraktur,
        DoubleStruck: doubleStruck,
        Circled: circled,
        Parenthesized: parenthesized,
        SmallCaps: smallCaps,
        Superscript: superscript,
        Subscript: subscript,
        Inverted: inverted,
        Squared: squared,
        RegionalIndicator: regionalIndicator
      }[style];

      if (special) return special[c] || c;

      const offset = offsets[style];
      if (!offset) return c;

      const code = c.codePointAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(code + offset[0]);
      if (code >= 97 && code <= 122) return String.fromCodePoint(code + offset[1]);
      if (code >= 48 && code <= 57 && offset[2]) return String.fromCodePoint(code + offset[2]);
      return c;
    }

    // ─── Core Transform Helpers ─────────────────────────────────────────────
    function transformString(text, style) {
      return [...text].map(c => convertCharacter(c, style)).join('');
    }

    // Smart Automatic Formatter:
    // If text contains the delimiter marker (e.g. **), formats only the marked portions.
    // If text has no markers, formats the entire input.
    function formatTextForStyle(input, style, delimiter) {
      if (!input) return '';
      if (delimiter && input.includes(delimiter)) {
        return input
          .split(delimiter)
          .map((part, index) => (index % 2 ? transformString(part, style) : part))
          .join('');
      }
      return transformString(input, style);
    }

    // ─── Application State ──────────────────────────────────────────────────
    let lastClearedText = '';
    let currentCategoryFilter = 'all';
    let currentSearchQuery = '';

    // ─── Setup UI Controls & Dropdowns ──────────────────────────────────────
    const categories = [...new Set(styles.map(s => s[2]))];
    categories.forEach(cat => {
      const $optgroup = $('<optgroup>', { label: cat });
      styles.filter(s => s[2] === cat).forEach(([val, label]) => {
        const preview = transformString(label, val);
        $optgroup.append($('<option>', { value: val, text: `${label} (${preview})` }));
      });
      $('#fontStyle').append($optgroup);
    });

    // Populate Popular Styles Quick Pills
    function renderPopularStyles() {
      const $list = $('#popularStylesList').empty();
      popularStyles.forEach(val => {
        const item = styles.find(s => s[0] === val);
        if (!item) return;
        const [value, label] = item;
        const preview = transformString(label, value);
        const isActive = $('#fontStyle').val() === value;
        const $pill = $('<button>', {
          type: 'button',
          class: `quick-style-pill ${isActive ? 'active' : ''}`,
          text: preview,
          title: `Switch to ${label}`,
          'data-style': value
        });
        $pill.on('click', function () {
          $('#fontStyle').val(value).trigger('change');
        });
        $list.append($pill);
      });
    }

    // ─── Character and Word Count Helpers ───────────────────────────────────
    function getCounts(text) {
      if (!text) return { chars: 0, words: 0 };
      const chars = text.length;
      const words = (text.trim().match(/\S+/g) || []).length;
      return { chars, words };
    }

    function updateCounts() {
      const inVal = $('#inputText').val();
      const outVal = $('#outputText').val();
      const inCounts = getCounts(inVal);
      const outCounts = getCounts(outVal);

      $('#inputCharCount').text(
        `${inCounts.words} ${inCounts.words === 1 ? 'word' : 'words'} • ${inCounts.chars} ${inCounts.chars === 1 ? 'char' : 'chars'}`
      );
      $('#outputCharCount').text(
        `${outCounts.words} ${outCounts.words === 1 ? 'word' : 'words'} • ${outCounts.chars} ${outCounts.chars === 1 ? 'char' : 'chars'}`
      );
    }

    // ─── Main Formatting Function ───────────────────────────────────────────
    function formatText() {
      const input = $('#inputText').val();
      const delimiter = $('#delimiter').val() || '**';
      const style = $('#fontStyle').val();

      const output = formatTextForStyle(input, style, delimiter);
      $('#outputText').val(output);
      updateCounts();
      updateGalleryPreviews();
      updatePopularStylesActive();
    }

    function updatePopularStylesActive() {
      const activeStyle = $('#fontStyle').val();
      $('.quick-style-pill').each(function () {
        const pillStyle = $(this).attr('data-style');
        $(this).toggleClass('active', pillStyle === activeStyle);
      });
    }

    // ─── All Styles Preview Gallery ─────────────────────────────────────────
    function buildGalleryGrid() {
      const $grid = $('#styleCardsGrid').empty();
      const query = currentSearchQuery.toLowerCase().trim();

      const filteredStyles = styles.filter(([val, label, cat]) => {
        const matchesCategory = currentCategoryFilter === 'all' || cat === currentCategoryFilter;
        const matchesSearch = !query || label.toLowerCase().includes(query) || cat.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      $('#stylesCountBadge').text(`${filteredStyles.length} ${filteredStyles.length === 1 ? 'style' : 'styles'}`);

      if (filteredStyles.length === 0) {
        $grid.append(
          $('<div>', {
            class: 'gallery-empty-state',
            html: '<p style="grid-column: 1/-1; text-align: center; color: var(--text-subtle); padding: 32px 0;">No matching styles found. Try searching for "script", "bold", or "caps".</p>'
          })
        );
        return;
      }

      const input = $('#inputText').val();
      const delimiter = $('#delimiter').val() || '**';
      const sampleText = input || 'Sample Text 123';

      filteredStyles.forEach(([val, label, cat]) => {
        const formatted = formatTextForStyle(sampleText, val, delimiter);

        const $card = $('<div>', {
          class: 'style-card',
          'data-style': val,
          role: 'button',
          tabindex: '0',
          'aria-label': `${label} preview: ${formatted}`
        });

        const $cardHeader = $('<div>', { class: 'style-card-header' }).append(
          $('<span>', { class: 'style-card-name', text: label }),
          $('<span>', { class: 'style-category-tag', text: cat })
        );

        const $cardPreview = $('<div>', {
          class: 'style-card-preview',
          text: formatted
        });

        const $cardActions = $('<div>', { class: 'style-card-actions' });

        const $applyBtn = $('<button>', {
          type: 'button',
          class: 'card-apply-btn',
          text: 'Use in Output',
          title: `Apply ${label} to main output`
        }).on('click', function (e) {
          e.stopPropagation();
          $('#fontStyle').val(val).trigger('change');
          showToast(`Applied style: ${label}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const $copyBtn = $('<button>', {
          type: 'button',
          class: 'card-copy-btn',
          html: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg> <span>Copy</span>',
          title: `Copy ${label} text`
        }).on('click', function (e) {
          e.stopPropagation();
          const textToCopy = formatTextForStyle($('#inputText').val() || sampleText, val, delimiter);
          copyTextToClipboard(textToCopy, $(this));
        });

        $cardActions.append($applyBtn, $copyBtn);
        $card.append($cardHeader, $cardPreview, $cardActions);

        // Clicking card selects style
        $card.on('click', function () {
          $('#fontStyle').val(val).trigger('change');
        });

        $grid.append($card);
      });
    }

    function updateGalleryPreviews() {
      const input = $('#inputText').val();
      const delimiter = $('#delimiter').val() || '**';
      const sampleText = input || 'Sample Text 123';

      $('.style-card').each(function () {
        const val = $(this).attr('data-style');
        const formatted = formatTextForStyle(sampleText, val, delimiter);
        $(this).find('.style-card-preview').text(formatted);
      });
    }

    // ─── Clipboard & Feedback Actions ───────────────────────────────────────
    let toastTimer;

    function showToast(message, actionLabel, onAction) {
      const $toast = $('#toast');
      $('#toastMessage').text(message);
      const $action = $('#toastAction');

      if (actionLabel && onAction) {
        $action.text(actionLabel).off('click').on('click', function () {
          onAction();
          $toast.removeClass('visible');
        }).prop('hidden', false);
      } else {
        $action.prop('hidden', true);
      }

      $toast.addClass('visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => $toast.removeClass('visible'), actionLabel ? 3500 : 2000);
    }

    function copyTextToClipboard(text, $btn) {
      if (!text) {
        showToast('Nothing to copy');
        return;
      }

      const markSuccess = () => {
        if ($btn && $btn.length) {
          const originalHtml = $btn.html();
          $btn.addClass('copied').html('✓ Copied!');
          setTimeout(() => {
            $btn.removeClass('copied').html(originalHtml);
          }, 1800);
        }
        showToast('Copied to clipboard');
        if (navigator.vibrate) navigator.vibrate(35);
      };

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(markSuccess).catch(() => {
          fallbackCopy(text, markSuccess);
        });
      } else {
        fallbackCopy(text, markSuccess);
      }
    }

    function fallbackCopy(text, onSuccess) {
      const temp = $('<textarea>').val(text).appendTo('body').select();
      try {
        document.execCommand('copy');
        temp.remove();
        if (onSuccess) onSuccess();
      } catch (e) {
        temp.remove();
        showToast('Copy failed. Please copy manually.');
      }
    }

    function copyOutput() {
      const text = $('#outputText').val();
      copyTextToClipboard(text, $('#copyButton'));
    }

    // ─── Input & Selection Actions ──────────────────────────────────────────
    function wrapSelectionInDelimiter() {
      const input = $('#inputText')[0];
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const delimiter = $('#delimiter').val() || '**';

      if (start === end) {
        // No selection: insert marker pair and place cursor between
        input.setRangeText(delimiter + delimiter, start, end, 'end');
        input.selectionStart = input.selectionEnd = start + delimiter.length;
      } else {
        const selected = input.value.slice(start, end);
        input.setRangeText(delimiter + selected + delimiter, start, end, 'select');
      }

      input.focus();
      formatText();
      showToast(`Wrapped with ${delimiter}`);
    }

    async function pasteInput() {
      try {
        if (!navigator.clipboard?.readText) {
          $('#inputText').focus();
          showToast('Press Ctrl+V / ⌘+V to paste');
          return;
        }
        const text = await navigator.clipboard.readText();
        if (text) {
          const input = $('#inputText')[0];
          const start = input.selectionStart;
          const end = input.selectionEnd;
          input.setRangeText(text, start, end, 'end');
          formatText();
          showToast('Pasted from clipboard');
        } else {
          showToast('Clipboard is empty');
        }
      } catch (err) {
        $('#inputText').focus();
        showToast('Clipboard access denied. Use Ctrl+V / ⌘+V');
      }
    }

    function clearInput() {
      const current = $('#inputText').val();
      if (!current) return;
      lastClearedText = current;
      $('#inputText').val('');
      formatText();
      showToast('Text cleared', 'Undo', () => {
        $('#inputText').val(lastClearedText);
        formatText();
        showToast('Text restored');
      });
    }

    function shareOutput() {
      const text = $('#outputText').val();
      if (!text) {
        showToast('Nothing to share');
        return;
      }

      if (navigator.share) {
        navigator.share({
          title: 'Unicode Text',
          text: text
        }).catch(() => {});
      } else {
        copyOutput();
        showToast('Sharing not supported on this browser. Copied to clipboard!');
      }
    }

    function downloadOutput() {
      const text = $('#outputText').val();
      if (!text) {
        showToast('Nothing to download');
        return;
      }
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'unicode-text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded unicode-text.txt');
    }

    function loadExample() {
      const delim = $('#delimiter').val() || '**';
      $('#inputText').val(
        `Welcome to ${delim}Unicode Text Formatter${delim}! Type anything to format it, or wrap ${delim}specific words${delim} with markers to format only them.`
      );
      formatText();
      showToast('Loaded example text');
    }

    // ─── Theme Management ───────────────────────────────────────────────────
    const THEMES = ['auto', 'light', 'dark'];
    let savedTheme = localStorage.getItem('unicode_formatter_theme') || 'auto';

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('unicode_formatter_theme', theme);

      const icons = { auto: '🌓', light: '☀️', dark: '🌙' };
      const labels = { auto: 'Theme (Auto)', light: 'Theme (Light)', dark: 'Theme (Dark)' };

      $('#themeIcon').text(icons[theme] || '🌓');
      $('#themeLabel').text(labels[theme] || 'Theme');

      const metaThemeColor = document.getElementById('themeColorMeta');
      if (metaThemeColor) {
        if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          metaThemeColor.setAttribute('content', '#0b0f19');
        } else {
          metaThemeColor.setAttribute('content', '#6366f1');
        }
      }
    }

    function cycleTheme() {
      const currentIndex = THEMES.indexOf(savedTheme);
      const nextIndex = (currentIndex + 1) % THEMES.length;
      savedTheme = THEMES[nextIndex];
      applyTheme(savedTheme);
      showToast(`Switched theme to ${savedTheme}`);
    }

    // ─── Help Modal Dialog ──────────────────────────────────────────────────
    const helpModal = document.getElementById('helpModal');

    function openHelp() {
      if (helpModal) {
        if (typeof helpModal.showModal === 'function') {
          helpModal.showModal();
        } else {
          helpModal.setAttribute('open', '');
        }
      }
    }

    function closeHelp() {
      if (helpModal) {
        if (typeof helpModal.close === 'function') {
          helpModal.close();
        } else {
          helpModal.removeAttribute('open');
        }
      }
    }

    // ─── Event Bindings ─────────────────────────────────────────────────────
    $('#inputText, #delimiter').on('input propertychange', formatText);
    $('#fontStyle').on('change', formatText);

    // Action Toolbar Buttons
    $('#boldButton').on('click', wrapSelectionInDelimiter);
    $('#pasteButton').on('click', pasteInput);
    $('#clearButton').on('click', clearInput);
    $('#copyButton').on('click', copyOutput);
    $('#shareButton').on('click', shareOutput);
    $('#downloadButton').on('click', downloadOutput);
    $('#loadExampleButton').on('click', loadExample);

    // Gallery Category Filter Tabs
    $('.cat-pill').on('click', function () {
      $('.cat-pill').removeClass('active').attr('aria-selected', 'false');
      $(this).addClass('active').attr('aria-selected', 'true');
      currentCategoryFilter = $(this).attr('data-cat');
      buildGalleryGrid();
    });

    // Gallery Search Box
    $('#styleSearch').on('input', function () {
      currentSearchQuery = $(this).val();
      buildGalleryGrid();
    });

    // Theme and Help
    $('#themeButton').on('click', cycleTheme);
    $('#helpButton').on('click', openHelp);
    $('#closeHelpModal').on('click', closeHelp);

    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        const rect = helpModal.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                            rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) closeHelp();
      });
    }

    // ─── Keyboard Accessibility & Shortcuts ────────────────────────────────
    $(document).on('keydown', function (e) {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + B: Wrap selection
      if (isCtrlOrCmd && e.key.toLowerCase() === 'b') {
        if ($('#inputText').is(':focus')) {
          e.preventDefault();
          wrapSelectionInDelimiter();
        }
      }

      // Ctrl/Cmd + Enter: Copy formatted output
      if (isCtrlOrCmd && e.key === 'Enter') {
        e.preventDefault();
        copyOutput();
      }

      // Ctrl/Cmd + Shift + X: Clear input
      if (isCtrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        clearInput();
      }

      // Ctrl + / or ?: Help
      if ((isCtrlOrCmd && e.key === '/') || (e.key === '?' && !$('input, textarea').is(':focus'))) {
        e.preventDefault();
        openHelp();
      }

      // Escape: Close modal
      if (e.key === 'Escape' && helpModal?.open) {
        closeHelp();
      }
    });

    // ─── Network Status Listener (Offline awareness) ────────────────────────
    window.addEventListener('online', () => showToast('Back online'));
    window.addEventListener('offline', () => showToast('Offline mode active. All formatting works 100% offline!'));

    // ─── Initialize ─────────────────────────────────────────────────────────
    applyTheme(savedTheme);
    renderPopularStyles();
    buildGalleryGrid();
    formatText();
  });
}

// ─── PWA & Service Worker Registration ─────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Unicode Text Formatter updated. Ready for next visit.');
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Handle PWA installation prompt
let deferredPrompt = null;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if (installButton) {
    installButton.hidden = false;
  }
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    installButton.hidden = true;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installation accepted by user');
    }
    deferredPrompt = null;
  });
}

window.addEventListener('appinstalled', () => {
  if (installButton) {
    installButton.hidden = true;
  }
  deferredPrompt = null;
  const toast = document.getElementById('toast');
  if (toast) {
    const toastMsg = document.getElementById('toastMessage');
    if (toastMsg) toastMsg.textContent = 'App installed successfully!';
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
  }
});
