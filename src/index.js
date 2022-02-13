import { registerRootComponent } from 'expo';
import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';

import { App } from './components/app/app';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { appReady: false };
  }

  componentDidMount() {
    this.setState({ appReady: true });
  }

  render() {
    const { appReady } = this.state;

    if (!appReady) return <AppLoading />;

    return <App />;
  }
}

registerRootComponent(Main);
