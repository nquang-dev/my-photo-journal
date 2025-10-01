import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import type { PhotoEntry } from '../types/PhotoEntry';

const PHOTOS_STORAGE_KEY = 'user_photos';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load photos from preferences on mount
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const { value } = await Preferences.get({ key: PHOTOS_STORAGE_KEY });
      if (value) {
        const loadedPhotos = JSON.parse(value) as PhotoEntry[];
        // Sort by createdAt descending
        loadedPhotos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPhotos(loadedPhotos);
      }
    } catch (err) {
      console.error('Error loading photos:', err);
      setError('Failed to load photos');
    }
  };

  const savePhotos = async (photosToSave: PhotoEntry[]) => {
    try {
      await Preferences.set({
        key: PHOTOS_STORAGE_KEY,
        value: JSON.stringify(photosToSave),
      });
    } catch (err) {
      console.error('Error saving photos:', err);
      throw new Error('Failed to save photos');
    }
  };

  const takePhoto = async (customTitle?: string): Promise<PhotoEntry | null> => {
    try {
      setLoading(true);
      setError(null);

      // Capture photo
      const photo = await Camera.getPhoto({
        source: CameraSource.Camera,
        resultType: CameraResultType.Uri,
        quality: 90,
      });

      if (!photo.webPath) {
        throw new Error('Failed to capture photo');
      }

      // Generate filename and metadata
      const fileName = `${Date.now()}.jpeg`;
      const title = customTitle || `Photo ${dayjs().format('MMM D, HH:mm')}`;

      // Read photo data
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const base64Data = await convertBlobToBase64(blob);

      // Save to filesystem
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      // Create photo entry
      const newPhoto: PhotoEntry = {
        id: uuidv4(),
        filepath: savedFile.uri,
        previewPath: photo.webPath,
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update photos array
      const updatedPhotos = [newPhoto, ...photos];
      setPhotos(updatedPhotos);
      await savePhotos(updatedPhotos);

      setLoading(false);
      return newPhoto;
    } catch (err: any) {
      console.error('Error taking photo:', err);
      setError(err.message || 'Failed to take photo');
      setLoading(false);
      return null;
    }
  };

  const deletePhoto = async (photoId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const photoToDelete = photos.find((p) => p.id === photoId);
      if (!photoToDelete) {
        throw new Error('Photo not found');
      }

      // Delete from filesystem
      const fileName = photoToDelete.filepath.split('/').pop();
      if (fileName) {
        try {
          await Filesystem.deleteFile({
            path: fileName,
            directory: Directory.Data,
          });
        } catch (err) {
          console.warn('File may already be deleted:', err);
        }
      }

      // Update photos array
      const updatedPhotos = photos.filter((p) => p.id !== photoId);
      setPhotos(updatedPhotos);
      await savePhotos(updatedPhotos);

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error deleting photo:', err);
      setError(err.message || 'Failed to delete photo');
      setLoading(false);
      return false;
    }
  };

  const updateTitle = async (photoId: string, newTitle: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const trimmedTitle = newTitle.trim();
      if (!trimmedTitle) {
        throw new Error('Title cannot be empty');
      }

      // Update photos array
      const updatedPhotos = photos.map((p) =>
        p.id === photoId
          ? { ...p, title: trimmedTitle, updatedAt: new Date().toISOString() }
          : p
      );

      setPhotos(updatedPhotos);
      await savePhotos(updatedPhotos);

      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error updating title:', err);
      setError(err.message || 'Failed to update title');
      setLoading(false);
      return false;
    }
  };

  const sharePhoto = async (photoId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const photo = photos.find((p) => p.id === photoId);
      if (!photo) {
        throw new Error('Photo not found');
      }

      await Share.share({
        title: photo.title,
        text: 'Check out this memory!',
        url: photo.previewPath,
      });

      setLoading(false);
      return true;
    } catch (err: any) {
      // User cancelled share or share failed
      console.error('Error sharing photo:', err);
      if (err.message !== 'Share canceled') {
        setError('Unable to share. Please try again.');
      }
      setLoading(false);
      return false;
    }
  };

  const reload = async () => {
    await loadPhotos();
  };

  return {
    photos,
    loading,
    error,
    takePhoto,
    deletePhoto,
    updateTitle,
    sharePhoto,
    reload,
  };
}

// Helper function to convert blob to base64
function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
}
