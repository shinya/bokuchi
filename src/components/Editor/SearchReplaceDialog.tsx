import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface SearchReplaceDialogProps {
  open: boolean;
  onClose: () => void;
  onSearch: (searchText: string, options: SearchOptions) => void;
  onReplace: (searchText: string, replaceText: string, options: SearchOptions) => void;
  onReplaceAll: (searchText: string, replaceText: string, options: SearchOptions) => void;
}

export interface SearchOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean;
}

const SearchReplaceDialog: React.FC<SearchReplaceDialogProps> = ({
  open,
  onClose,
  onSearch,
  onReplace,
  onReplaceAll,
}) => {
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  });

  const handleSearch = () => {
    if (searchText) {
      onSearch(searchText, searchOptions);
    }
  };

  const handleReplace = () => {
    if (searchText && replaceText) {
      onReplace(searchText, replaceText, searchOptions);
    }
  };

  const handleReplaceAll = () => {
    if (searchText && replaceText) {
      onReplaceAll(searchText, replaceText, searchOptions);
      onClose();
    }
  };

  const toggleOption = (option: keyof SearchOptions) => {
    setSearchOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Search and Replace
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleOption('caseSensitive')}
              sx={{ fontSize: '0.75rem' }}
            >
              {searchOptions.caseSensitive ? 'Aa' : 'Aa'}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleOption('wholeWord')}
              sx={{ fontSize: '0.75rem' }}
            >
              Word
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleOption('regex')}
              sx={{ fontSize: '0.75rem' }}
            >
              .*
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleReplace}>Replace</Button>
        <Button onClick={handleReplaceAll} variant="contained">Replace All</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchReplaceDialog;
