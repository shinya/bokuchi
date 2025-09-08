import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FileNotFoundDisplayProps {
  filePath: string;
  onClose: () => void;
}

const FileNotFoundDisplay: React.FC<FileNotFoundDisplayProps> = ({
  filePath,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        {t('fileOperations.fileNotFound')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, wordBreak: 'break-all' }}>
        {filePath}
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={onClose}
      >
        {t('fileOperations.closeTab')}
      </Button>
    </Box>
  );
};

export default FileNotFoundDisplay;
