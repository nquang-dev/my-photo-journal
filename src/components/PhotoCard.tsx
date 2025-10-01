import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { PhotoEntry } from '../types/PhotoEntry';

dayjs.extend(relativeTime);

interface PhotoCardProps {
  photo: PhotoEntry;
  onClick: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:scale-[1.02] transition-smooth cursor-pointer group aspect-square"
    >
      <img
        src={photo.previewPath}
        alt={photo.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-semibold text-lg mb-1 truncate">{photo.title}</h3>
        <p className="text-sm text-gray-200">{dayjs(photo.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};
