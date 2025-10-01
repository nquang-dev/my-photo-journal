import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface SavePhotoModalProps {
  photoUrl: string;
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const SavePhotoModal: React.FC<SavePhotoModalProps> = ({ 
  photoUrl, 
  onSave, 
  onCancel 
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 animate-fade-in">
      <div className="bg-white w-full md:w-auto md:min-w-[400px] md:max-w-lg rounded-t-3xl md:rounded-2xl p-6 animate-slide-up">
        {/* Drag handle for mobile */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Save Photo</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <img
            src={photoUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this photo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              autoFocus
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-smooth font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
