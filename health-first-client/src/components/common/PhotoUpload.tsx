import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
} from '@mui/material';
import { Delete, Person } from '@mui/icons-material';

interface PhotoUploadProps {
  onFileSelect: (file: File) => boolean;
  currentFile?: File;
  error?: string;
  disabled?: boolean;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onFileSelect,
  currentFile,
  error,
  disabled = false,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (currentFile) {
      const url = URL.createObjectURL(currentFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [currentFile]);

  const handleFileSelect = (file: File) => {
    const success = onFileSelect(file);
    if (success) {
      setIsDragOver(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    handleFileSelect(null as unknown as File);
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      
      <Box
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: `2px dashed ${error ? theme.palette.error.main : isDragOver ? theme.palette.primary.main : theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: isDragOver ? theme.palette.primary.light + '20' : theme.palette.background.paper,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: disabled ? theme.palette.divider : theme.palette.primary.main,
            backgroundColor: disabled ? theme.palette.background.paper : theme.palette.primary.light + '10',
          },
        }}
      >
        {previewUrl ? (
          <>
            <Avatar
              src={previewUrl}
              alt="Profile photo"
              sx={{
                width: 116,
                height: 116,
                borderRadius: '50%',
              }}
            />
            {!disabled && (
              <IconButton
                onClick={handleRemove}
                size="small"
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Person sx={{ fontSize: 48, color: theme.palette.text.secondary }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              {isDragOver ? 'Drop here' : 'Upload Photo'}
            </Typography>
          </Box>
        )}
      </Box>
      
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Drag and drop or click to upload (JPG, PNG, max 5MB)
      </Typography>
    </Box>
  );
}; 