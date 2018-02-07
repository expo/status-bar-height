import StatusBarHeight from '@expo/status-bar-height';
import { Constants } from 'expo';
import React, { Component } from 'react';
import { LayoutAnimation, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

export default class App extends Component {
  state = {
    useListener: true,
    statusBarHeight: null,
  };

  componentDidMount() {
    this.syncHeight();
    StatusBarHeight.addEventListener(this.onStatusBarHeightChanged);
  }

  componentWillUnmount() {
    StatusBarHeight.removeEventListener(this.onStatusBarHeightChanged);
  }

  onStatusBarHeightChanged = height => {
    console.log('new height', height, this.state.statusBarHeight);
    this.state.useListener && this.setState({ statusBarHeight: height });
  };

  get runningAnotherTask() {
    return this.state.statusBarHeight > 20;
  }

  syncHeight = async () => {
    const height = await StatusBarHeight.getAsync();
    this.setState({ statusBarHeight: height });
  };

  toggleListener = () => this.setState({ useListener: !this.state.useListener });

  get useListenerButton() {
    const title = this.state.useListener ? 'Disable Listener' : 'Enable Listener';
    return (
      <Text style={styles.paragraph} onPress={this.toggleListener}>
        {title}
      </Text>
    );
  }

  get syncHeightButton() {
    if (this.state.useListener) {
      return null;
    }
    return (
      <Text style={styles.paragraph} onPress={this.syncHeight}>
        Sync Height
      </Text>
    );
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const title = this.runningAnotherTask
      ? "Looks like you're busy... 😝"
      : 'Glad I have your attention 😘';

    return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.paragraph}>{title}</Text>
        <Card title="Status Bar Height">
          <Text>Current height is: {this.state.statusBarHeight}</Text>
        </Card>
        {this.useListenerButton}

        {this.syncHeightButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
