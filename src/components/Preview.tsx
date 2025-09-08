import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { Download } from '@mui/icons-material';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';
import { markdownProcessor } from '../utils/markdownProcessor';
import { checkboxHandler } from '../utils/checkboxHandler';
import { exportHandler } from '../utils/exportHandler';

interface PreviewProps {
  content: string;
  darkMode: boolean;
  theme?: string;
  globalVariables?: Record<string, string>;
  zoomLevel?: number;
  onContentChange?: (newContent: string) => void;
}

const MarkdownPreview: React.FC<PreviewProps> = ({ content, darkMode, theme, globalVariables = {}, zoomLevel = 1.0, onContentChange }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState(content || '');
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    const processContent = async () => {
      if (content) {
        // Markdownを処理
        const result = await markdownProcessor.processMarkdown(content, globalVariables);

        // チェックボックスを処理
        const processedHtml = checkboxHandler.processCheckboxesInHtml(result.html);

        setProcessedContent(processedHtml);
      } else {
        setProcessedContent('');
      }
    };

    processContent();
  }, [content, globalVariables]);

  useEffect(() => {
    // リンクのクリックイベントを処理
    if (previewRef.current) {
      const links = previewRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href) {
            // 外部リンクの場合は新しいタブで開く
            if (href.startsWith('http://') || href.startsWith('https://')) {
              window.open(href, '_blank', 'noopener,noreferrer');
            } else if (href.startsWith('mailto:')) {
              window.location.href = href;
            } else if (href.startsWith('#')) {
              // アンカーリンク
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        });
      });

      // チェックボックスのクリックイベントを処理
      const checkboxes = previewRef.current.querySelectorAll('.markdown-checkbox');
      console.log('Found checkboxes:', checkboxes.length);
      checkboxes.forEach((checkbox, index) => {
        console.log('Adding event listener to checkbox:', index);
        checkbox.addEventListener('change', (e) => {
          console.log('Checkbox change event triggered:', index);
          e.stopPropagation();

          const checkboxElement = e.target as HTMLInputElement;
          const isChecked = checkboxElement.checked;
          console.log('Checkbox state:', isChecked);

          // 即座に視覚的フィードバックを提供
          const checkboxItem = checkboxElement.closest('.checkbox-item');
          if (checkboxItem) {
            console.log('Found checkbox item, updating classes');
            if (isChecked) {
              checkboxItem.classList.add('checked');
            } else {
              checkboxItem.classList.remove('checked');
            }
          } else {
            console.log('Checkbox item not found');
          }

          if (onContentChange) {
            // チェックボックスのテキスト内容と位置情報を取得
            // const checkboxText = checkboxItem?.querySelector('.checkbox-text')?.textContent?.trim(); // 現在未使用のためコメントアウト
            const checkboxIndex = checkboxElement.getAttribute('data-checkbox-index');
            // エディター内容を更新（位置ベース）
            updateCheckboxInContentByIndex(parseInt(checkboxIndex || '0'), isChecked);
          }
        });
      });
    }
  }, [processedContent, onContentChange]);

  // チェックボックスの状態をエディター内容に反映する関数（位置ベース）
  const updateCheckboxInContentByIndex = (checkboxIndex: number, isChecked: boolean) => {
    if (!onContentChange) {
      return;
    }

    const result = checkboxHandler.updateCheckboxInContentByIndex(content, checkboxIndex, isChecked);

    if (result.updated) {
      onContentChange(result.newContent);
    }
  };



  const handleExportHTML = async () => {
    const result = await exportHandler.exportAsHTML(processedContent, {
      darkMode,
      theme,
    });

    if (!result.success) {
      setExportError(result.error || 'Failed to export HTML file');
    }
  };

  // 処理済みHTMLをそのまま使用
  const htmlContent = processedContent || '';

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary">
          Preview
        </Typography>
        <Tooltip title="Export as HTML">
          <IconButton size="small" onClick={handleExportHTML}>
            <Download />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: 'auto',
          backgroundColor: theme === 'darcula' ? '#2B2B2B' : (darkMode ? 'grey.900' : 'grey.50'),
          color: theme === 'darcula' ? '#A9B7C6' : (darkMode ? 'grey.100' : 'text.primary'),
        }}
      >
        <div
          ref={previewRef}
          className={`markdown-preview ${theme === 'darcula' ? 'hljs-dark' : (darkMode ? 'hljs-dark' : 'hljs-light')}`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            fontSize: `${Math.round(16 * zoomLevel)}px`,
            lineHeight: `${Math.round(1.6 * zoomLevel)}`,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}
        />
        <style>
          {`
            .markdown-preview {
              word-break: break-word;
              overflow-wrap: break-word;
              hyphens: auto;
              max-width: 100%;
              overflow-x: hidden;
            }

            .markdown-preview * {
              word-break: break-word;
              overflow-wrap: break-word;
              max-width: 100%;
            }

            .markdown-preview h1:first-child,
            .markdown-preview h2:first-child,
            .markdown-preview h3:first-child,
            .markdown-preview h4:first-child,
            .markdown-preview h5:first-child,
            .markdown-preview h6:first-child {
              margin-top: 0 !important;
            }

            .markdown-preview h1,
            .markdown-preview h2,
            .markdown-preview h3,
            .markdown-preview h4,
            .markdown-preview h5,
            .markdown-preview h6 {
              margin-top: 1.5em;
              margin-bottom: 0.5em;
              font-weight: 600;
            }

            .markdown-preview h1 {
              font-size: 2em;
              border-bottom: 1px solid ${theme === 'darcula' ? '#404040' : (darkMode ? '#404040' : '#eaecef')};
              padding-bottom: 0.3em;
            }

            .markdown-preview h2 {
              font-size: 1.5em;
              border-bottom: 1px solid ${theme === 'darcula' ? '#404040' : (darkMode ? '#404040' : '#eaecef')};
              padding-bottom: 0.3em;
            }

            .markdown-preview p {
              margin-bottom: 1em;
            }

            .markdown-preview ul,
            .markdown-preview ol {
              margin-bottom: 1em;
              padding-left: 2em;
            }

            .markdown-preview li {
              margin-bottom: 0.25em;
            }

            .markdown-preview blockquote {
              border-left: 4px solid ${theme === 'darcula' ? '#404040' : (darkMode ? '#404040' : '#dfe2e5')};
              padding-left: 1em;
              margin: 1em 0;
              color: ${theme === 'darcula' ? '#a0a0a0' : (darkMode ? '#a0a0a0' : '#6a737d')};
            }

            .markdown-preview code {
              background-color: ${theme === 'darcula' ? 'rgba(255,255,255,0.1)' : (darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(27,31,35,0.05)')};
              padding: 0.2em 0.4em;
              border-radius: 3px;
              font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
              font-size: 85%;
              line-height: 1.2;
            }

                        .markdown-preview pre {
              background-color: ${theme === 'darcula' ? '#2d2d2d' : (darkMode ? '#2d2d2d' : '#f6f8fa')};
              border-radius: 3px;
              padding: 16px;
              overflow: auto;
              margin: 1em 0;
              line-height: 1.4;
              word-break: break-word;
              overflow-wrap: break-word;
              white-space: pre-wrap;
            }

            .markdown-preview pre code {
              background-color: transparent;
              padding: 0;
              line-height: 1.4;
              word-break: break-word;
              overflow-wrap: break-word;
              white-space: pre-wrap;
            }

            .markdown-preview table {
              border-collapse: collapse;
              width: 100%;
              margin: 1em 0;
              table-layout: fixed;
              word-break: break-word;
              overflow-wrap: break-word;
            }

            .markdown-preview th,
            .markdown-preview td {
              border: 1px solid ${theme === 'darcula' ? '#404040' : (darkMode ? '#404040' : '#dfe2e5')};
              padding: 6px 13px;
              word-break: break-word;
              overflow-wrap: break-word;
              max-width: 0;
            }

            .markdown-preview th {
              background-color: ${theme === 'darcula' ? '#2d2d2d' : (darkMode ? '#2d2d2d' : '#f6f8fa')};
              font-weight: 600;
            }

            .markdown-preview a {
              color: ${theme === 'darcula' ? '#58a6ff' : (darkMode ? '#58a6ff' : '#0366d6')};
              text-decoration: none;
            }

            .markdown-preview a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </Box>

      {/* エラー表示用のSnackbar */}
      <Snackbar
        open={!!exportError}
        autoHideDuration={6000}
        onClose={() => setExportError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setExportError(null)} severity="error" sx={{ width: '100%' }}>
          {exportError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MarkdownPreview;
