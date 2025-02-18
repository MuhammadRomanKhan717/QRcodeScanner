import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './src/navigations/AppNavigation';
import {LocalizationProvider} from './src/context';
import BottomSheetModal from './src/components/homeComponents/BottomSheetModal';

const App = () => {
  return (
    <GestureHandlerRootView>
      <LocalizationProvider>
        <AppNavigation />
        {/* <BottomSheetModal /> */}
      </LocalizationProvider>
    </GestureHandlerRootView>
  );
};

export default App;
