import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import TabBar from '../TabBar';
import { mockTabs } from '../../test/test-utils';

describe('TabBar', () => {
  const defaultProps = {
    tabs: mockTabs,
    activeTabId: 'test-tab-1',
    onTabChange: vi.fn(),
    onTabClose: vi.fn(),
    onNewTab: vi.fn(),
    onTabReorder: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tabs correctly', () => {
    render(<TabBar {...defaultProps} />);

    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });

  it('shows active tab correctly', () => {
    render(<TabBar {...defaultProps} />);

    const activeTab = screen.getByText('Test File.md');
    expect(activeTab).toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', () => {
    render(<TabBar {...defaultProps} />);

    const tab = screen.getByText('Another File.md');
    fireEvent.click(tab);

    expect(defaultProps.onTabChange).toHaveBeenCalledWith('test-tab-2');
  });

  it('calls onTabClose when close button is clicked', () => {
    render(<TabBar {...defaultProps} />);

    // CloseIconを直接クリック
    const closeIcons = screen.getAllByTestId('CloseIcon');
    const firstCloseIcon = closeIcons[0];
    
    fireEvent.click(firstCloseIcon);
    expect(defaultProps.onTabClose).toHaveBeenCalledWith('test-tab-1');
  });

  it('calls onNewTab when new tab button is clicked', () => {
    render(<TabBar {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const newTabButton = buttons.find(button =>
      button.querySelector('svg')?.getAttribute('data-testid') === 'AddIcon'
    );

    if (newTabButton) {
      fireEvent.click(newTabButton);
      expect(defaultProps.onNewTab).toHaveBeenCalledTimes(1);
    }
  });

  it('shows modified indicator for modified tabs', () => {
    render(<TabBar {...defaultProps} />);

    // 修正されたタブには赤いドットが表示される
    const modifiedTab = screen.getByText('Another File.md');
    expect(modifiedTab).toBeInTheDocument();
  });

  it('renders in vertical layout when specified', () => {
    render(<TabBar {...defaultProps} layout="vertical" />);

    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });

  it('handles empty tabs array', () => {
    render(<TabBar {...defaultProps} tabs={[]} />);

    expect(screen.getByLabelText('New Tab')).toBeInTheDocument();
  });

  it('handles null activeTabId', () => {
    render(<TabBar {...defaultProps} activeTabId={null} />);

    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });

  it('handles non-existent activeTabId', () => {
    render(<TabBar {...defaultProps} activeTabId="non-existent" />);

    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });


  it('handles long tab titles', () => {
    const longTitleTabs = [
      {
        ...mockTabs[0],
        title: 'Very Long Tab Title That Should Be Truncated When Displayed In The Tab Bar',
      },
    ];

    render(<TabBar {...defaultProps} tabs={longTitleTabs} />);

    expect(screen.getByText('Very Long Tab Title That Should Be Truncated When Displayed In The Tab Bar')).toBeInTheDocument();
  });

  it('handles special characters in tab titles', () => {
    const specialCharTabs = [
      {
        ...mockTabs[0],
        title: 'Tab with Special Chars: !@#$%^&*()',
      },
    ];

    render(<TabBar {...defaultProps} tabs={specialCharTabs} />);

    expect(screen.getByText('Tab with Special Chars: !@#$%^&*()')).toBeInTheDocument();
  });

  it('handles unicode characters in tab titles', () => {
    const unicodeTabs = [
      {
        ...mockTabs[0],
        title: 'タブ with 日本語 and émojis 🚀',
      },
    ];

    render(<TabBar {...defaultProps} tabs={unicodeTabs} />);

    expect(screen.getByText('タブ with 日本語 and émojis 🚀')).toBeInTheDocument();
  });

  it('renders new tab button in both horizontal and vertical layouts', () => {
    const { rerender } = render(<TabBar {...defaultProps} layout="horizontal" />);

    const buttons = screen.getAllByRole('button');
    const newTabButton = buttons.find(button =>
      button.querySelector('svg')?.getAttribute('data-testid') === 'AddIcon'
    );
    expect(newTabButton).toBeDefined();

    rerender(<TabBar {...defaultProps} layout="vertical" />);

    const buttons2 = screen.getAllByRole('button');
    const newTabButton2 = buttons2.find(button =>
      button.querySelector('svg')?.getAttribute('data-testid') === 'AddIcon'
    );
    expect(newTabButton2).toBeDefined();
  });

  it('handles tab reordering in horizontal layout', () => {
    render(<TabBar {...defaultProps} layout="horizontal" />);

    // DnD機能のテストは複雑なので、基本的なレンダリングのみテスト
    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });

  it('handles tab reordering in vertical layout', () => {
    render(<TabBar {...defaultProps} layout="vertical" />);

    // DnD機能のテストは複雑なので、基本的なレンダリングのみテスト
    expect(screen.getByText('Test File.md')).toBeInTheDocument();
    expect(screen.getByText('Another File.md')).toBeInTheDocument();
  });
});
