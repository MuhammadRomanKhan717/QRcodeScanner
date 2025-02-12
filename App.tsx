// App.tsx

import React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import {LocalizationProvider} from './src/context';

const App = () => {
  return (
    <LocalizationProvider>
      <AppNavigation />
    </LocalizationProvider>
  );
};

export default App;
