import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { wrapper } from '../components/App/appReduxStore/store';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import './index.scss';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Head>
          <title>Products Application</title>
        </Head>
        <Component {...props.pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
