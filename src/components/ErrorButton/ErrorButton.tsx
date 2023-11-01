import { Component } from 'react';
import styles from './ErrorButton.module.scss';

export class ErrorButton extends Component {
  state = {
    hasError: false,
  };

  errorButtonHandler = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Forced app crash!');
    }
    return (
      <button className={styles.error_button} onClick={this.errorButtonHandler}>
        ERROR!
      </button>
    );
  }
}
