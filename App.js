import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, LogBox, ActivityIndicator} from 'react-native'; //YellowBox,
import {NativeBaseProvider, Root} from 'native-base';
import StackNavigation from './src/components/StackNavigation';
import SplashScreen from 'react-native-splash-screen';
import SyncStorage from 'sync-storage';
import messaging from '@react-native-firebase/messaging';
import Orientation from 'react-native-orientation-locker';
import {isTablet} from 'react-native-device-info';

LogBox.ignoreAllLogs();
// YellowBox.ignoreWarnings([
//   'VirtualizedLists should never be nested', // TODO: Remove when fixed
// ])

const Stack = createNativeStackNavigator();

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isAppReady: false,
    };
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    if(!isTablet()){
      Orientation.lockToPortrait();
    }
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
    this.initApp();
  }

  async initApp() {
    const data = await SyncStorage.init();
    this.setState({isAppReady: true});
    SplashScreen.hide();
  }

  render() {
    return (
      <>
        {!this.state.isAppReady && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <ActivityIndicator />
          </View>
        )}
        {this.state.isAppReady && (
          <NativeBaseProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </NativeBaseProvider>
        )}
      </>
    );
  }
}

export default App;
