import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoGrid } from '../components/PhotoGrid';
import { TakePhotoButton } from '../components/TakePhotoButton';
import { SavePhotoModal } from '../components/SavePhotoModal';
import { Toast } from '../components/Toast';
import { usePhotoGalleryContext } from '../context/PhotoGalleryProvider';
import type { PhotoEntry } from '../types/PhotoEntry';

export const Home: React.FC = () => {
  const { photos, loading, takePhoto } = usePhotoGalleryContext();
  const navigate = useNavigate();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleTakePhoto = async () => {
    const photo = await takePhoto();
    if (photo) {
      setCapturedPhotoUrl(photo.previewPath);
      setShowSaveModal(true);
    } else {
      setToast({ message: 'Failed to capture photo', type: 'error' });
    }
  };

  const handleSavePhoto = async (_title: string) => {
    // Photo is already saved in takePhoto, just update the title if needed
    setShowSaveModal(false);
    setToast({ message: 'Saved to journal', type: 'success' });
  };

  const handleCancelSave = () => {
    setShowSaveModal(false);
    // In a real implementation, you might want to delete the photo that was just taken
  };

  const handlePhotoClick = (photo: PhotoEntry) => {
    navigate(`/photo/${photo.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Photo Journal</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <PhotoGrid photos={photos} onPhotoClick={handlePhotoClick} />
      </main>

      {/* Take Photo Button */}
      <TakePhotoButton onClick={handleTakePhoto} disabled={loading} />

      {/* Save Photo Modal */}
      {showSaveModal && (
        <SavePhotoModal
          photoUrl={capturedPhotoUrl}
          onSave={handleSavePhoto}
          onCancel={handleCancelSave}
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
