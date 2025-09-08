import { marked } from 'marked';
import hljs from 'highlight.js';
import { variableApi } from '../api/variableApi';

export interface ProcessedMarkdownResult {
  html: string;
  processedContent: string;
}

export class MarkdownProcessor {
  constructor() {
    this.setupMarkedOptions();
  }

  private setupMarkedOptions() {
    // marked v16の正しいAPIを使用
    const renderer = new (marked as any).Renderer();
    
    // カスタムコードレンダラーを設定
    renderer.code = (code: string, lang?: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(code, { language: lang }).value;
          return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
        } catch (err) {
          console.warn('Highlight.js error:', err);
        }
      }
      const highlighted = hljs.highlightAuto(code).value;
      return `<pre><code class="hljs">${highlighted}</code></pre>`;
    };

    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true,
    });
  }


  async processMarkdown(
    content: string,
    globalVariables: Record<string, string> = {}
  ): Promise<ProcessedMarkdownResult> {
    if (!content) {
      return { html: '', processedContent: '' };
    }

    // 変数を展開
    const result = await variableApi.processMarkdown(content, globalVariables);
    const processedMarkdown = result.processedContent;

    // MarkdownをHTMLに変換（新しいAPIでは設定済みのオプションを使用）
    const processedHtml = await marked(processedMarkdown);

    return {
      html: processedHtml,
      processedContent: processedMarkdown,
    };
  }
}

export const markdownProcessor = new MarkdownProcessor();
