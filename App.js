import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Routes from './src/routes/Routes';

class App extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#60DAC4" />
          <Routes />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: '#60DAC4',
  },
  container: {
    flex: 1,
  },
});

export default App;
