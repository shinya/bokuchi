import { ThemeName } from '../themes';

/**
 * テーマのプレビュー用CSSを取得する
 * @param themeName テーマ名
 * @returns テーマのCSS文字列
 */
export const getThemePreviewCSS = (themeName: ThemeName): string => {
  // 各テーマのプレビュー用CSSを定義
  const themeCSS: Record<ThemeName, string> = {
    default: `
/* Default Theme - Preview Styles */
.markdown-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fff;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-preview p {
  margin-bottom: 16px;
}

.markdown-preview code {
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-preview pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-bottom: 16px;
}

.markdown-preview pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
}

.markdown-preview blockquote {
  border-left: 0.25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
  margin: 0 0 16px 0;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
}

.markdown-preview table th,
.markdown-preview table td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.markdown-preview table th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-preview li {
  margin-bottom: 0.25em;
}

.markdown-preview a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-preview a:hover {
  text-decoration: underline;
}
`,

    dark: `
/* Dark Theme - Preview Styles */
.markdown-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #e6edf3;
  background-color: #0d1117;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #f0f6fc;
}

.markdown-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #30363d;
  padding-bottom: 0.3em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #30363d;
  padding-bottom: 0.3em;
}

.markdown-preview p {
  margin-bottom: 16px;
}

.markdown-preview code {
  background-color: rgba(110, 118, 129, 0.4);
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  color: #f0f6fc;
}

.markdown-preview pre {
  background-color: #161b22;
  border-radius: 6px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #30363d;
}

.markdown-preview pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
  color: #e6edf3;
}

.markdown-preview blockquote {
  border-left: 0.25em solid #30363d;
  color: #8b949e;
  padding: 0 1em;
  margin: 0 0 16px 0;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
}

.markdown-preview table th,
.markdown-preview table td {
  border: 1px solid #30363d;
  padding: 6px 13px;
}

.markdown-preview table th {
  background-color: #161b22;
  font-weight: 600;
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-preview li {
  margin-bottom: 0.25em;
}

.markdown-preview a {
  color: #58a6ff;
  text-decoration: none;
}

.markdown-preview a:hover {
  text-decoration: underline;
}
`,

    pastel: `
/* Pastel Theme - Preview Styles */
.markdown-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #4a4a4a;
  background-color: #fefefe;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #6b5b95;
}

.markdown-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #e8d5e8;
  padding-bottom: 0.3em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #e8d5e8;
  padding-bottom: 0.3em;
}

.markdown-preview p {
  margin-bottom: 16px;
}

.markdown-preview code {
  background-color: #f0e6f0;
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  color: #8b5a8b;
}

.markdown-preview pre {
  background-color: #f8f0f8;
  border-radius: 6px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e8d5e8;
}

.markdown-preview pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
  color: #6b5b95;
}

.markdown-preview blockquote {
  border-left: 0.25em solid #d4a5d4;
  color: #8b5a8b;
  padding: 0 1em;
  margin: 0 0 16px 0;
  background-color: #faf5fa;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
}

.markdown-preview table th,
.markdown-preview table td {
  border: 1px solid #e8d5e8;
  padding: 6px 13px;
}

.markdown-preview table th {
  background-color: #f8f0f8;
  font-weight: 600;
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-preview li {
  margin-bottom: 0.25em;
}

.markdown-preview a {
  color: #9b59b6;
  text-decoration: none;
}

.markdown-preview a:hover {
  text-decoration: underline;
}
`,

    vivid: `
/* Vivid Theme - Preview Styles */
.markdown-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background-color: #ffffff;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #e74c3c;
}

.markdown-preview h1 {
  font-size: 2em;
  border-bottom: 2px solid #e74c3c;
  padding-bottom: 0.3em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.3em;
}

.markdown-preview p {
  margin-bottom: 16px;
}

.markdown-preview code {
  background-color: #f39c12;
  color: #ffffff;
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-preview pre {
  background-color: #34495e;
  color: #ecf0f1;
  border-radius: 6px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-bottom: 16px;
}

.markdown-preview pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
  color: #ecf0f1;
}

.markdown-preview blockquote {
  border-left: 0.25em solid #f39c12;
  color: #7f8c8d;
  padding: 0 1em;
  margin: 0 0 16px 0;
  background-color: #f8f9fa;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
}

.markdown-preview table th,
.markdown-preview table td {
  border: 1px solid #bdc3c7;
  padding: 6px 13px;
}

.markdown-preview table th {
  background-color: #3498db;
  color: #ffffff;
  font-weight: 600;
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-preview li {
  margin-bottom: 0.25em;
}

.markdown-preview a {
  color: #e74c3c;
  text-decoration: none;
  font-weight: 500;
}

.markdown-preview a:hover {
  text-decoration: underline;
}
`,

    darcula: `
/* Darcula Theme - Preview Styles */
.markdown-preview {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  line-height: 1.6;
  color: #a9b7c6;
  background-color: #2b2b2b;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  color: #ffc66d;
}

.markdown-preview h1 {
  font-size: 2em;
  border-bottom: 1px solid #3c3f41;
  padding-bottom: 0.3em;
}

.markdown-preview h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #3c3f41;
  padding-bottom: 0.3em;
}

.markdown-preview p {
  margin-bottom: 16px;
}

.markdown-preview code {
  background-color: #3c3f41;
  border-radius: 3px;
  font-size: 85%;
  margin: 0;
  padding: 0.2em 0.4em;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  color: #a9b7c6;
}

.markdown-preview pre {
  background-color: #1e1e1e;
  border-radius: 6px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #3c3f41;
}

.markdown-preview pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
  color: #a9b7c6;
}

.markdown-preview blockquote {
  border-left: 0.25em solid #3c3f41;
  color: #808080;
  padding: 0 1em;
  margin: 0 0 16px 0;
  background-color: #323232;
}

.markdown-preview table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
}

.markdown-preview table th,
.markdown-preview table td {
  border: 1px solid #3c3f41;
  padding: 6px 13px;
}

.markdown-preview table th {
  background-color: #323232;
  font-weight: 600;
}

.markdown-preview ul,
.markdown-preview ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-preview li {
  margin-bottom: 0.25em;
}

.markdown-preview a {
  color: #cc7832;
  text-decoration: none;
}

.markdown-preview a:hover {
  text-decoration: underline;
}
`
  };

  return themeCSS[themeName] || themeCSS.default;
};
