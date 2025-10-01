import React from 'react';
import { PencilIcon, TrashIcon, ShareIcon } from '@heroicons/react/24/outline';

interface DetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export const DetailActions: React.FC<DetailActionsProps> = ({ 
  onEdit, 
  onDelete, 
  onShare 
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-6 bg-white border-t border-gray-100">
      <button
        onClick={onEdit}
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth font-medium"
      >
        <PencilIcon className="w-5 h-5" />
        <span>Edit</span>
      </button>
      
      <button
        onClick={onShare}
        className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-smooth font-medium"
      >
        <ShareIcon className="w-5 h-5" />
        <span>Share</span>
      </button>
      
      <button
        onClick={onDelete}
        className="flex items-center space-x-2 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-smooth font-medium"
      >
        <TrashIcon className="w-5 h-5" />
        <span>Delete</span>
      </button>
    </div>
  );
};
