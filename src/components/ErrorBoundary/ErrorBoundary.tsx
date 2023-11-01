import { Component } from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from '../../types';
import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState,
  string
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(`Error: ${error}`);
  }

  render() {
    return this.state.hasError ? (
      <h1 className={styles.error_message}>
        There is some Error. Refresh page!
      </h1>
    ) : (
      this.props.children
    );
  }
}
