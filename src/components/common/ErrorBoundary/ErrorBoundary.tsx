import { Component } from 'react';

import { H1, H2 } from 'components/kit';

import styles from './ErrorBoundary.module.scss';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component {
  public state: State = {
    hasError: false,
  };

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('In ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <H1 className={styles.spacer}>
              В работе приложения произошла критическая ошибка
            </H1>
            <H2>Перезагрузите страницу</H2>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
