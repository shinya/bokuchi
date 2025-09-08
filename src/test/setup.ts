import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Monaco Editorのモック
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(({ onMount, onChange, value }) => {
    // モックのエディターインスタンス
    const mockEditor = {
      getPosition: vi.fn(() => ({ lineNumber: 1, column: 1 })),
      getSelection: vi.fn(() => null),
      getModel: vi.fn(() => ({
        getValue: vi.fn(() => value || ''),
        setValue: vi.fn(),
        getValueInRange: vi.fn(() => ''),
      })),
      onDidChangeCursorPosition: vi.fn(),
      onDidChangeCursorSelection: vi.fn(),
      onDidChangeModelContent: vi.fn(),
      addCommand: vi.fn(),
      deltaDecorations: vi.fn(() => []),
    }

    // onMountが呼ばれた場合の処理
    if (onMount) {
      setTimeout(() => onMount(mockEditor), 0)
    }

    // onChangeが呼ばれた場合の処理
    if (onChange && value !== undefined) {
      setTimeout(() => onChange(value), 0)
    }

    return null
  }),
}))

// Tauri APIのモック
vi.mock('../api/desktopApi', () => ({
  desktopApi: {
    saveHtmlFile: vi.fn(() => Promise.resolve({ success: true })),
  },
}))

vi.mock('../api/variableApi', () => ({
  variableApi: {
        processMarkdown: vi.fn((content) =>
          Promise.resolve({ processedContent: content })
        ),
  },
}))

// i18nextのモック
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
        I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}))

// markedライブラリのモック
vi.mock('marked', () => ({
  marked: vi.fn((content) => Promise.resolve(`<p>${content}</p>`)),
  Renderer: vi.fn(() => ({
    code: vi.fn(),
  })),
}))

// highlight.jsのモック
vi.mock('highlight.js', () => ({
  default: {
    highlight: vi.fn(() => ({ value: 'highlighted code' })),
    highlightAuto: vi.fn(() => ({ value: 'auto highlighted code' })),
    getLanguage: vi.fn(() => true),
  },
}))

// グローバルなwindow.monacoのモック
Object.defineProperty(window, 'monaco', {
  value: {
    KeyMod: { CtrlCmd: 1 },
    KeyCode: { KeyF: 70, KeyH: 72 },
  },
  writable: true,
})
