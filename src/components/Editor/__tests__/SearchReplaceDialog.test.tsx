import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import SearchReplaceDialog from '../SearchReplaceDialog';

describe('SearchReplaceDialog', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onSearch: vi.fn(),
    onReplace: vi.fn(),
    onReplaceAll: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search and replace dialog when open', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    expect(screen.getByText('Search and Replace')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Replace')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Replace' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Replace All' })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<SearchReplaceDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Search and Replace')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('updates search text when typing', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput).toHaveValue('test search');
  });

  it('updates replace text when typing', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const replaceInput = screen.getByLabelText('Replace');
    fireEvent.change(replaceInput, { target: { value: 'test replace' } });

    expect(replaceInput).toHaveValue('test replace');
  });

  it('calls onSearch with correct parameters when search button is clicked', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const searchInput = screen.getByLabelText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith('test', {
      caseSensitive: false,
      wholeWord: false,
      regex: false,
    });
  });

  it('calls onReplace with correct parameters when replace button is clicked', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const searchInput = screen.getByLabelText('Search');
    const replaceInput = screen.getByLabelText('Replace');
    const replaceButton = screen.getByRole('button', { name: 'Replace' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(replaceInput, { target: { value: 'replaced' } });
    fireEvent.click(replaceButton);

    expect(defaultProps.onReplace).toHaveBeenCalledWith('test', 'replaced', {
      caseSensitive: false,
      wholeWord: false,
      regex: false,
    });
  });

  it('calls onReplaceAll with correct parameters when replace all button is clicked', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const searchInput = screen.getByLabelText('Search');
    const replaceInput = screen.getByLabelText('Replace');
    const replaceAllButton = screen.getByRole('button', { name: 'Replace All' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(replaceInput, { target: { value: 'replaced' } });
    fireEvent.click(replaceAllButton);

    expect(defaultProps.onReplaceAll).toHaveBeenCalledWith('test', 'replaced', {
      caseSensitive: false,
      wholeWord: false,
      regex: false,
    });
  });

  it('toggles case sensitive option', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const caseSensitiveButton = screen.getByText('Aa');
    fireEvent.click(caseSensitiveButton);

    const searchInput = screen.getByLabelText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith('test', {
      caseSensitive: true,
      wholeWord: false,
      regex: false,
    });
  });

  it('toggles whole word option', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const wholeWordButton = screen.getByText('Word');
    fireEvent.click(wholeWordButton);

    const searchInput = screen.getByLabelText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith('test', {
      caseSensitive: false,
      wholeWord: true,
      regex: false,
    });
  });

  it('toggles regex option', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const regexButton = screen.getByText('.*');
    fireEvent.click(regexButton);

    const searchInput = screen.getByLabelText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith('test', {
      caseSensitive: false,
      wholeWord: false,
      regex: true,
    });
  });

  it('combines multiple options correctly', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const caseSensitiveButton = screen.getByText('Aa');
    const wholeWordButton = screen.getByText('Word');
    const regexButton = screen.getByText('.*');

    fireEvent.click(caseSensitiveButton);
    fireEvent.click(wholeWordButton);
    fireEvent.click(regexButton);

    const searchInput = screen.getByLabelText('Search');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).toHaveBeenCalledWith('test', {
      caseSensitive: true,
      wholeWord: true,
      regex: true,
    });
  });

  it('does not call onSearch when search text is empty', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    expect(defaultProps.onSearch).not.toHaveBeenCalled();
  });

  it('does not call onReplace when search or replace text is empty', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const replaceButton = screen.getByRole('button', { name: 'Replace' });
    fireEvent.click(replaceButton);

    expect(defaultProps.onReplace).not.toHaveBeenCalled();
  });

  it('does not call onReplaceAll when search or replace text is empty', () => {
    render(<SearchReplaceDialog {...defaultProps} />);

    const replaceAllButton = screen.getByRole('button', { name: 'Replace All' });
    fireEvent.click(replaceAllButton);

    expect(defaultProps.onReplaceAll).not.toHaveBeenCalled();
  });
});
