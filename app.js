/* global $ */
if (typeof window.jQuery === 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toast').textContent = 'jQuery could not be loaded. Check your internet connection and reload.';
    document.getElementById('toast').classList.add('visible');
  });
} else {
$(function () {
  'use strict';

  const styles = [
    ['Bold', 'Bold'], ['Italic', 'Italic'], ['BoldItalic', 'Bold Italic'], ['Script', 'Script'],
    ['BoldScript', 'Bold Script'], ['Fraktur', 'Fraktur'], ['BoldFraktur', 'Bold Fraktur'],
    ['DoubleStruck', 'Double Struck'], ['SansSerif', 'Sans Serif'], ['SansSerifItalic', 'Sans Serif Italic'],
    ['SansSerifBold', 'Sans Serif Bold'], ['SansSerifBoldItalic', 'Sans Serif Bold Italic'], ['Monospace', 'Monospace'],
    ['Circled', 'Circled'], ['Parenthesized', 'Parenthesized'], ['FullWidth', 'Full Width'], ['SmallCaps', 'Small Caps'],
    ['Superscript', 'Superscript'], ['Subscript', 'Subscript'], ['Inverted', 'Inverted']
  ];
  const offsets = {
    Bold:[0x1D400-65,0x1D41A-97,0x1D7CE-48], Italic:[0x1D434-65,0x1D44E-97,0], BoldItalic:[0x1D468-65,0x1D482-97,0],
    Script:[0x1D49C-65,0x1D4B6-97,0], BoldScript:[0x1D4D0-65,0x1D4EA-97,0], Fraktur:[0x1D504-65,0x1D51E-97,0],
    BoldFraktur:[0x1D56C-65,0x1D586-97,0], DoubleStruck:[0x1D538-65,0x1D552-97,0x1D7D8-48], SansSerif:[0x1D5A0-65,0x1D5BA-97,0],
    SansSerifItalic:[0x1D608-65,0x1D622-97,0], SansSerifBold:[0x1D5D4-65,0x1D5EE-97,0x1D7EC-48],
    SansSerifBoldItalic:[0x1D63C-65,0x1D656-97,0], Monospace:[0x1D670-65,0x1D68A-97,0x1D7F6-48]
  };
  const map = (from, to) => Object.fromEntries([...from].map((c, i) => [c, [...to][i]]));
  const circled = map('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨');
  // These mathematical alphabets have gaps reserved by Unicode, so an offset
  // calculation can produce unassigned code points (rendered as boxes).
  const script = map('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻𝒼𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏');
  const fraktur = map('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷');
  const doubleStruck = map('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡');
  const parenthesized = map('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⓪⑴⑵⑶⑷⑸⑹⑺⑻⑼');
  const smallCaps = map('abcdefghijklmnopqrstuvwxyz', 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ');
  const superscript = map('abcdefghijklmnopqrstuvwxyz0123456789+-=()', 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾');
  const subscript = map('ae hijklmnoprstuvx0123456789+-=()', 'ₐₑ ₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎');
  const inverted = map('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,?!"\'()[]{}&_', 'ɐqɔpǝɟƃɥᴉɾʞlɯuo dbɹsʇnʌʍxʎz∀BƆDƎℲפHIſʞ˥WN OԀQRS┴∩ΛMX⅄ZƖᄅƐㄣϛ9ㄥ86 0˙\'¿¡„,)(][}{⅋‾'.replaceAll(' ', ''));
  const fullWidth = (c) => c === ' ' ? '　' : c >= '!' && c <= '~' ? String.fromCodePoint(c.codePointAt(0) + 0xFEE0) : c;

  styles.forEach(([value, label]) => $('#fontStyle').append($('<option>', { value, text: label })));

  function convertCharacter(c, style) {
    if (style === 'FullWidth') return fullWidth(c);
    const special = { Script:script, Fraktur:fraktur, DoubleStruck:doubleStruck, Circled:circled, Parenthesized:parenthesized, SmallCaps:smallCaps, Superscript:superscript, Subscript:subscript, Inverted:inverted }[style];
    if (special) return special[c] || c;
    const offset = offsets[style];
    if (!offset) return c;
    const code = c.codePointAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(code + offset[0]);
    if (code >= 97 && code <= 122) return String.fromCodePoint(code + offset[1]);
    if (code >= 48 && code <= 57 && offset[2]) return String.fromCodePoint(code + offset[2]);
    return c;
  }
  function formatText() {
    const input = $('#inputText').val(); const delimiter = $('#delimiter').val(); const style = $('#fontStyle').val();
    if (!input || !delimiter) return $('#outputText').val(input);
    // Delimiters mark content to format; they are not part of the final output.
    $('#outputText').val(input.split(delimiter).map((part, index) => index % 2 ? [...part].map(c => convertCharacter(c, style)).join('') : part).join(''));
  }
  function wrapSelectionInBold() {
    const input = $('#inputText')[0];
    const start = input.selectionStart, end = input.selectionEnd;
    if (start === end) return;
    const selected = input.value.slice(start, end);
    input.setRangeText('**' + selected + '**', start, end, 'select');
    input.focus();
    formatText();
  }
  let toastTimer;
  function showToast(message) { $('#toast').text(message).addClass('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').removeClass('visible'), 1500); }
  function copyOutput() {
    const text = $('#outputText').val(); if (!text) return;
    navigator.clipboard?.writeText(text).then(() => showToast('Copied to clipboard')).catch(() => { $('#outputText').trigger('focus').trigger('select'); showToast('Select output and copy'); });
  }
  $('#inputText, #delimiter, #fontStyle').on('input change', formatText);
  $('#inputText').on('keydown', function (event) { if (event.ctrlKey && event.key.toLowerCase() === 'b') { event.preventDefault(); wrapSelectionInBold(); } });
  // Preventing mouse focus change retains a desktop selection; mobile selection
  // offsets remain available after the button receives the tap.
  $('#boldButton').on('mousedown', event => event.preventDefault()).on('click', wrapSelectionInBold);
  $('#copyButton').on('click', copyOutput);
  $('#outputText').on('focus', copyOutput);
  formatText();
});
}
