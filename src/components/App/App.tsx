import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AppContextProvider } from './Context/AppContext';

export function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}
