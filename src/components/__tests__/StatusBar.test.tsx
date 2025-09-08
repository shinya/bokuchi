import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import StatusBar from '../StatusBar';

describe('StatusBar', () => {
  const defaultProps = {
    line: 1,
    column: 1,
    totalCharacters: 100,
    selectedCharacters: 0,
    darkMode: false,
    zoomPercentage: 100,
    onZoomIn: vi.fn(),
    onZoomOut: vi.fn(),
    onResetZoom: vi.fn(),
    canZoomIn: true,
    canZoomOut: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders status information correctly', () => {
    render(<StatusBar {...defaultProps} />);

    expect(screen.getByText('statusBar.line 1, statusBar.column 1')).toBeInTheDocument();
    expect(screen.getByText('100 statusBar.characters')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('shows selected characters when text is selected', () => {
    render(<StatusBar {...defaultProps} selectedCharacters={10} />);

    expect(screen.getByText('10 statusBar.selected')).toBeInTheDocument();
  });

  it('renders zoom controls', () => {
    render(<StatusBar {...defaultProps} />);

    // ズームコントロールが表示されることを確認
    expect(screen.getByText('100%')).toBeInTheDocument();

    // ボタンが存在することを確認
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('shows correct zoom percentage', () => {
    render(<StatusBar {...defaultProps} zoomPercentage={150} />);

    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('shows theme name when theme is provided', () => {
    render(<StatusBar {...defaultProps} theme="darcula" />);

    expect(screen.getByText('Darcula')).toBeInTheDocument();
  });

  it('shows Default when no theme is provided', () => {
    render(<StatusBar {...defaultProps} />);

    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('opens theme menu when theme button is clicked', () => {
    render(<StatusBar {...defaultProps} onThemeChange={vi.fn()} />);

    const themeButton = screen.getByText('Default');
    fireEvent.click(themeButton);

    // テーマメニューが開かれることを確認
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('calls onThemeChange when theme is selected', () => {
    const onThemeChange = vi.fn();
    render(<StatusBar {...defaultProps} onThemeChange={onThemeChange} />);

    const themeButton = screen.getByText('Default');
    fireEvent.click(themeButton);

    // テーマメニューからテーマを選択
    const themeOption = screen.getByText('Darcula');
    fireEvent.click(themeOption);

    expect(onThemeChange).toHaveBeenCalledWith('darcula');
  });

  it('handles dark mode styling correctly', () => {
    render(<StatusBar {...defaultProps} darkMode={true} />);

    const statusBar = document.querySelector('.status-bar');
    expect(statusBar).toBeInTheDocument();
  });

  it('handles darcula theme styling correctly', () => {
    render(<StatusBar {...defaultProps} theme="darcula" />);

    const statusBar = document.querySelector('.status-bar');
    expect(statusBar).toBeInTheDocument();
  });

  it('updates status information when props change', () => {
    const { rerender } = render(<StatusBar {...defaultProps} />);

    expect(screen.getByText('statusBar.line 1, statusBar.column 1')).toBeInTheDocument();

    rerender(<StatusBar {...defaultProps} line={5} column={10} />);

    expect(screen.getByText('statusBar.line 5, statusBar.column 10')).toBeInTheDocument();
  });

  it('handles large character counts', () => {
    render(<StatusBar {...defaultProps} totalCharacters={1000000} />);

    expect(screen.getByText('1000000 statusBar.characters')).toBeInTheDocument();
  });

  it('handles zero characters', () => {
    render(<StatusBar {...defaultProps} totalCharacters={0} />);

    expect(screen.getByText('0 statusBar.characters')).toBeInTheDocument();
  });
});
