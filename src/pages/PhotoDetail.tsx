import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { DetailActions } from '../components/DetailActions';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Toast } from '../components/Toast';
import { usePhotoGalleryContext } from '../context/PhotoGalleryProvider';
import type { PhotoEntry } from '../types/PhotoEntry';

export const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photos, deletePhoto, updateTitle, sharePhoto } = usePhotoGalleryContext();
  
  const [photo, setPhoto] = useState<PhotoEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const foundPhoto = photos.find((p) => p.id === id);
    if (foundPhoto) {
      setPhoto(foundPhoto);
      setEditedTitle(foundPhoto.title);
    } else {
      navigate('/');
    }
  }, [id, photos, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveTitle = async () => {
    if (!photo) return;
    
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      setToast({ message: 'Title cannot be empty', type: 'error' });
      return;
    }

    const success = await updateTitle(photo.id, trimmedTitle);
    if (success) {
      setIsEditing(false);
      setToast({ message: 'Title updated', type: 'success' });
    } else {
      setToast({ message: 'Failed to update title', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!photo) return;
    
    const success = await deletePhoto(photo.id);
    if (success) {
      setToast({ message: 'Photo deleted', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } else {
      setToast({ message: 'Failed to delete photo', type: 'error' });
    }
  };

  const handleShare = async () => {
    if (!photo) return;
    
    const success = await sharePhoto(photo.id);
    if (!success) {
      setToast({ message: 'Unable to share. Please try again.', type: 'error' });
    }
  };

  if (!photo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Photo Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6">
        <div className="bg-white rounded-2xl overflow-hidden card-shadow">
          {/* Image */}
          <div className="relative bg-gray-100">
            <img
              src={photo.previewPath}
              alt={photo.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Metadata */}
          <div className="p-6">
            {/* Title */}
            <div className="mb-4">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="flex-1 text-2xl font-semibold px-3 py-2 border-2 border-primary rounded-lg focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveTitle}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth"
                    aria-label="Save"
                  >
                    <CheckIcon className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <h2 className="text-2xl font-semibold text-gray-900">{photo.title}</h2>
              )}
            </div>

            {/* Date and Time */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span className="font-medium">Created:</span>
                <span>{dayjs(photo.createdAt).format('MMM D, YYYY [at] h:mm A')}</span>
              </div>
              {photo.updatedAt !== photo.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Updated:</span>
                  <span>{dayjs(photo.updatedAt).format('MMM D, YYYY [at] h:mm A')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Actions */}
      <DetailActions
        onEdit={handleEdit}
        onDelete={() => setShowDeleteDialog(true)}
        onShare={handleShare}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <ConfirmDialog
          title="Delete this memory?"
          message="This can't be undone."
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
