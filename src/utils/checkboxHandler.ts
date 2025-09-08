export interface CheckboxUpdateResult {
  updated: boolean;
  newContent: string;
  checkboxIndex: number;
}

export class CheckboxHandler {
  /**
   * チェックボックスの状態をエディター内容に反映する関数（位置ベース）
   */
  updateCheckboxInContentByIndex(
    content: string,
    checkboxIndex: number,
    isChecked: boolean
  ): CheckboxUpdateResult {
    const lines = content.split('\n');
    let currentCheckboxIndex = 0;
    let updated = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // 修正: リストマーカー（- または *）を含む正規表現パターン
      const checkboxPattern = /^(\s*)([-*]\s+)(\[([ x])\]\s*)(.*)$/;
      const match = line.match(checkboxPattern);

      if (match) {
        // 指定されたインデックスのチェックボックスかチェック
        if (currentCheckboxIndex === checkboxIndex) {
          const [, indent, listMarker, , , rest] = match;
          // チェックボックスの状態を更新
          const newChecked = isChecked ? 'x' : ' ';
          const newLine = `${indent}${listMarker}[${newChecked}] ${rest}`;
          lines[i] = newLine;
          updated = true;
          break;
        }
        currentCheckboxIndex++;
      }
    }

    return {
      updated,
      newContent: lines.join('\n'),
      checkboxIndex: currentCheckboxIndex,
    };
  }

  /**
   * HTMLからチェックボックスの情報を抽出
   */
  extractCheckboxInfo(html: string): Array<{
    id: string;
    index: number;
    isChecked: boolean;
    text: string;
  }> {
    const checkboxes: Array<{
      id: string;
      index: number;
      isChecked: boolean;
      text: string;
    }> = [];

    const checkboxPattern = /<li[^>]*class="checkbox-item[^"]*"[^>]*data-checkbox-id="([^"]*)"[^>]*data-checked="([^"]*)"[^>]*data-checkbox-index="([^"]*)"[^>]*>[\s\S]*?<span class="checkbox-text">([^<]*)<\/span>[\s\S]*?<\/li>/g;

    let match;
    while ((match = checkboxPattern.exec(html)) !== null) {
      checkboxes.push({
        id: match[1],
        index: parseInt(match[3]),
        isChecked: match[2] === 'true',
        text: match[4],
      });
    }

    return checkboxes;
  }

  /**
   * HTMLのチェックボックスを処理可能な形式に変換
   */
  processCheckboxesInHtml(html: string): string {
    // チェックボックスの位置を追跡するためのカウンター
    let checkboxIndex = 0;

    // disabled属性を削除し、クリック可能なチェックボックスに変換
    const checkboxPattern = /<li[^>]*>(\s*)<input\s+([^>]*?)(?:disabled="[^"]*")?\s*([^>]*?)type="checkbox"([^>]*?)>(\s*)(.*?)<\/li>/g;

    return html.replace(checkboxPattern, (_match: string, indent: string, beforeType: string, between: string, afterType: string, _afterInput: string, text: string) => {
      // checked属性があるかチェック
      const isChecked = /checked(?:="[^"]*")?/.test(beforeType + between + afterType);
      const checkboxId = `checkbox-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const result = `<li class="checkbox-item ${isChecked ? 'checked' : ''}" data-checkbox-id="${checkboxId}" data-checked="${isChecked}" data-indent="${indent.length}" data-checkbox-index="${checkboxIndex}">
        ${indent}<input type="checkbox" ${isChecked ? 'checked' : ''} class="markdown-checkbox" data-checkbox-id="${checkboxId}" data-checkbox-index="${checkboxIndex}">
        <span class="checkbox-text">${text}</span>
      </li>`;
      checkboxIndex++;
      return result;
    });
  }
}

export const checkboxHandler = new CheckboxHandler();
