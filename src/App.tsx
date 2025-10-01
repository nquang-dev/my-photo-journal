import { PhotoGalleryProvider } from './context/PhotoGalleryProvider';
import { AppRouter } from './routes';

function App() {
  return (
    <PhotoGalleryProvider>
      <AppRouter />
    </PhotoGalleryProvider>
  );
}

export default App;
