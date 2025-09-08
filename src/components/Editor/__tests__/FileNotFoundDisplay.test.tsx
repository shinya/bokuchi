import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import FileNotFoundDisplay from '../FileNotFoundDisplay';

describe('FileNotFoundDisplay', () => {
  it('renders file not found message with file path', () => {
    const filePath = '/path/to/missing/file.md';
    const onClose = vi.fn();

    render(
      <FileNotFoundDisplay
        filePath={filePath}
        onClose={onClose}
      />
    );

    expect(screen.getByText('fileOperations.fileNotFound')).toBeInTheDocument();
    expect(screen.getByText(filePath)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const filePath = '/path/to/missing/file.md';
    const onClose = vi.fn();

    render(
      <FileNotFoundDisplay
        filePath={filePath}
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('displays long file paths correctly', () => {
    const longFilePath = '/very/long/path/to/a/missing/file/that/has/a/very/long/name.md';
    const onClose = vi.fn();

    render(
      <FileNotFoundDisplay
        filePath={longFilePath}
        onClose={onClose}
      />
    );

    expect(screen.getByText(longFilePath)).toBeInTheDocument();
  });

  it('handles empty file path', () => {
    const filePath = '';
    const onClose = vi.fn();

    render(
      <FileNotFoundDisplay
        filePath={filePath}
        onClose={onClose}
      />
    );

    expect(screen.getByText('fileOperations.fileNotFound')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});
