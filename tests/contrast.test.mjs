import test from 'node:test';
import assert from 'node:assert';

/**
 * Calculates luminance for a given hex color following WCAG 2.1 specs
 */
function getRelativeLuminance(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates WCAG contrast ratio between two hex colors
 */
function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

test('1.4.1 - Black text (#000000) on Win2K 3D Face (#D4D0C8) meets WCAG AAA standards (>= 7:1)', () => {
  const ratio = getContrastRatio('#000000', '#D4D0C8');
  assert.ok(ratio >= 7.0, `Contrast ratio (${ratio.toFixed(2)}) must meet WCAG AAA standard (>= 7.0)`);
});

test('1.4.2 - White text (#FFFFFF) on Active Titlebar Navy (#0A246A) meets WCAG AAA standards (>= 7:1)', () => {
  const ratio = getContrastRatio('#FFFFFF', '#0A246A');
  assert.ok(ratio >= 7.0, `Contrast ratio (${ratio.toFixed(2)}) must meet WCAG AAA standard (>= 7.0)`);
});

test('1.4.3 - Phosphor Green (#00FF66) on Terminal Black (#000000) meets WCAG AAA standards (>= 7:1)', () => {
  const ratio = getContrastRatio('#00FF66', '#000000');
  assert.ok(ratio >= 7.0, `Contrast ratio (${ratio.toFixed(2)}) must meet WCAG AAA standard (>= 7.0)`);
});

test('1.4.4 - Classic Win32 hyperlink (#0000EE) on White (#FFFFFF) meets WCAG AA standards (>= 4.5:1)', () => {
  const ratio = getContrastRatio('#0000EE', '#FFFFFF');
  assert.ok(ratio >= 4.5, `Contrast ratio (${ratio.toFixed(2)}) must meet WCAG AA standard (>= 4.5)`);
});
