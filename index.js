/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotesStore from './src/stores/NotesStore';
import {Provider} from 'mobx-react';

const RootApp = () => (
  <Provider notesStore={NotesStore}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
