import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import type { PhotoEntry } from '../types/PhotoEntry';

interface PhotoGalleryContextType {
  photos: PhotoEntry[];
  loading: boolean;
  error: string | null;
  takePhoto: (customTitle?: string) => Promise<PhotoEntry | null>;
  deletePhoto: (photoId: string) => Promise<boolean>;
  updateTitle: (photoId: string, newTitle: string) => Promise<boolean>;
  sharePhoto: (photoId: string) => Promise<boolean>;
  reload: () => Promise<void>;
}

const PhotoGalleryContext = createContext<PhotoGalleryContextType | undefined>(undefined);

export const PhotoGalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const photoGallery = usePhotoGallery();

  return (
    <PhotoGalleryContext.Provider value={photoGallery}>
      {children}
    </PhotoGalleryContext.Provider>
  );
};

export const usePhotoGalleryContext = () => {
  const context = useContext(PhotoGalleryContext);
  if (!context) {
    throw new Error('usePhotoGalleryContext must be used within PhotoGalleryProvider');
  }
  return context;
};
