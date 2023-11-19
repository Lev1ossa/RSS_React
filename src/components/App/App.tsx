import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
// import { AppContextProvider } from './Context/AppContext';
import { Provider } from 'react-redux';
import { store } from './appReduxStore/store';

export function App() {
  return (
    // <AppContextProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    // </AppContextProvider>
  );
}
