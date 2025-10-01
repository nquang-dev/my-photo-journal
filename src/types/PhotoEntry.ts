export type PhotoEntry = {
  id: string; // uuid v4
  filepath: string; // Filesystem path to stored asset
  previewPath: string; // Cached webview-friendly URI (e.g., base64)
  title: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};
