import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import type { i18n as I18nType } from 'i18next';

// テスト用のテーマ
const testTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// テスト用のi18nインスタンス
const testI18n = {
  ...i18n,
  t: (key: string) => key, // 翻訳キーをそのまま返す
  changeLanguage: () => Promise.resolve(),
  language: 'en',
} as unknown as I18nType;

// カスタムレンダラー
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: typeof testTheme;
  locale?: string;
}

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={testTheme}>
      <I18nextProvider i18n={testI18n}>
        {children}
      </I18nextProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => render(ui, { wrapper: AllTheProviders, ...options });

// テスト用のモックデータ
export const mockTab = {
  id: 'test-tab-1',
  title: 'Test File.md',
  content: '# Test Content\n\nThis is a test file.',
  filePath: '/test/file.md',
  isModified: false,
  isNew: false,
};

export const mockTabs = [
  mockTab,
  {
    id: 'test-tab-2',
    title: 'Another File.md',
    content: '# Another Test\n\nMore content here.',
    filePath: '/test/another.md',
    isModified: true,
    isNew: false,
  },
];

export const mockSettings = {
  appearance: {
    theme: 'default',
  },
  editor: {
    fontSize: 14,
    showLineNumbers: true,
    tabSize: 2,
    wordWrap: true,
    minimap: false,
    showWhitespace: false,
  },
  interface: {
    language: 'en',
    tabLayout: 'horizontal',
    zoomLevel: 1.0,
  },
  globalVariables: {
    name: 'Test User',
    project: 'Test Project',
  },
  advanced: {
    autoSave: false,
    showWhitespace: false,
  },
};

// テスト用のヘルパー関数
export const createMockFileNotFound = (filePath: string) => ({
  filePath,
  onClose: () => {},
});

export const createMockStatusChange = () => ({
  line: 1,
  column: 1,
  totalCharacters: 100,
  selectedCharacters: 0,
});

// テスト用のイベントハンドラー
export const mockHandlers = {
  onTabChange: () => {},
  onTabClose: () => {},
  onNewTab: () => {},
  onTabReorder: () => {},
  onContentChange: () => {},
  onSettingsChange: () => {},
  onViewModeChange: () => {},
  onFileMenuOpen: () => {},
  onFileMenuClose: () => {},
  onOpenFile: () => {},
  onSaveFile: () => {},
  onSaveFileAs: () => {},
  onSaveWithVariables: () => {},
  onSettingsOpen: () => {},
  onHelpOpen: () => {},
  onRecentFileSelect: () => {},
  onThemeChange: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
  onResetZoom: () => {},
};

// テスト用のMarkdownコンテンツ
export const testMarkdownContent = `# Test Document

This is a test markdown document.

## Features

- [x] Completed task
- [ ] Pending task
- [x] Another completed task

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Variables

Hello {{name}}, welcome to {{project}}!
`;

// テスト用のHTMLコンテンツ
export const testHtmlContent = `<h1>Test Document</h1>
<p>This is a test markdown document.</p>
<h2>Features</h2>
<ul>
<li class="checkbox-item checked" data-checkbox-id="test-1" data-checked="true" data-checkbox-index="0">
  <input type="checkbox" checked class="markdown-checkbox" data-checkbox-id="test-1" data-checkbox-index="0">
  <span class="checkbox-text">Completed task</span>
</li>
<li class="checkbox-item" data-checkbox-id="test-2" data-checked="false" data-checkbox-index="1">
  <input type="checkbox" class="markdown-checkbox" data-checkbox-id="test-2" data-checkbox-index="1">
  <span class="checkbox-text">Pending task</span>
</li>
</ul>`;

// テスト用のユーティリティ関数
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

export const createMockElement = (tagName: string, attributes: Record<string, string> = {}) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

// テスト用のモック関数
export const createMockFunction = () => {
  const fn = () => {};
  fn.mockClear = () => {};
  fn.mockReturnValue = () => fn;
  fn.mockImplementation = (impl: Function) => impl;
  return fn;
};

// テスト用のモックAPI
export const mockApi = {
  desktopApi: {
    saveHtmlFile: () => Promise.resolve({ success: true }),
    exportSettingsFile: () => Promise.resolve({ success: true }),
    importSettingsFile: () => Promise.resolve({ success: true, content: '{}' }),
  },
  storeApi: {
    loadRecentFiles: () => Promise.resolve([]),
    loadAppSettings: () => Promise.resolve(mockSettings),
    saveAppSettings: () => Promise.resolve(),
    exportAppSettings: () => Promise.resolve('{}'),
    importAppSettings: () => Promise.resolve(),
    resetAppSettings: () => Promise.resolve(),
  },
  variableApi: {
    processMarkdown: (content: string) =>
      Promise.resolve({ processedContent: content }),
  },
};

// re-export everything
export * from '@testing-library/react';
export { customRender as render };
