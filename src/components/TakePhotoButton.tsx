import React from 'react';
import { CameraIcon } from '@heroicons/react/24/solid';

interface TakePhotoButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const TakePhotoButton: React.FC<TakePhotoButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 disabled:bg-gray-400 rounded-full shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center z-50 active:scale-95"
      aria-label="Take photo"
    >
      <CameraIcon className="w-7 h-7 text-white" />
    </button>
  );
};
