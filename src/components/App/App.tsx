import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './appReduxStore/store';

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
