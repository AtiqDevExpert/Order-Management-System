import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {styles} from '../style/main';
import {Input, Button} from 'native-base';
import {Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import FullScreenLoader from '../components/FullScreenLoader';
import {showToast} from '../utils/utils';
import {callPutApi} from '../services/apiservice';
import {setAccessToken, isLoggedIn, setFirebaseToken} from '../services/userservice';
import * as constants from '../constants/apis';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { TextInput } from 'react-native-gesture-handler';
// import iid from '@react-native-firebase/iid';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp()

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    const isDeviceTab = () => {
      return isTablet();
    };
    
    const ValueForIsDevicePhone = () => {
      const itemValue = isDeviceTab() ? 'tab' : isPortrait() ? 'phone' : 'tab';

      console.log(itemValue);
      console.log(isPortrait());
      console.log(isDeviceTab());
      return itemValue == 'phone';
    };
    this.state = {
      store_id: '',
      password: '',
      token:'',
      isLoading: false,
      orientation: isPortrait() ? 'portrait' : 'landscape',
      isDeviceIsPhone: ValueForIsDevicePhone(),
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
        isDeviceIsPhone: ValueForIsDevicePhone(),
      });
    });
    this.requestUserPermission()
    this.checkApplicationPermission()
  }
  

  async componentWillMount() {
    this.checkPermission();
    if(isLoggedIn()){
      console.log("came here even if login 2")
      this.resetAndGoToScreen("HomeScreen");
    }
  }


  requestUserPermission() {
    const authorizationStatus = messaging().requestPermission();
  
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }
  checkApplicationPermission() {
    const authorizationStatus = messaging().requestPermission();
  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }
  changeLoadingState = status => {
    setTimeout(() => {
      this.setState({
        isLoading: status,
      });
    });
  };

  resetAndGoToScreen(routeName) {
    this.props.navigation.reset({
      index: 0,
      routes: [{name: routeName}],
    });
  }

  validateAndLogin() {
    if (!this.state.isLoading) {
      let canProceed = true;
      let errorMessage = '';
      if (this.state.store_id == '') {
        canProceed = false;
        errorMessage = 'Please enter your store id';
      } else if (this.state.password == '') {
        canProceed = false;
        errorMessage = 'Please enter your password';
      }
      if (canProceed) {
        this.changeLoadingState(true);
        let reqBody = {
          store_login_id: this.state.store_id,
          store_login_password: this.state.password,
          firebaseToken: this.state.token
        };
        let url = constants.APIS.LOGIN;
        callPutApi(url, reqBody)
          .then(response => {
            if (response.data && response.data && response.data.token) {
              setAccessToken(response.data.token);
              this.resetAndGoToScreen('HomeScreen');
            } else if (response.data.message) {
              showToast(response.data.message);
            } else {
              showToast('Invalid store id or password!');
            }
            this.changeLoadingState(false);
          })
          .catch(err => {
            this.changeLoadingState(false);
            if (
              err.response &&
              err.response.data &&
              err.response.data.message
            ) {
              showToast(err.response.data.message);
            } else {
              showToast('Invalid store id or password!');
            }
          });
      } else {
        showToast(errorMessage);
        this.changeLoadingState(false);
      }
    }
  }



  //1
  async checkPermission() {
    const settings = await messaging().requestPermission();
    if (settings) {
      this.getToken();
    }else{
      showToast("Error while getting permission for notification. Please update your notification settings")
    }
  }

  

    //3
  async getToken() {
    try{
      //const fcmToken = await firebase.iid().getToken();
      const token = await firebase.messaging().getToken();
      setFirebaseToken(token);
      if (token) {
          this.setState({
            token:token
          });
      }
    }catch(error){
      showToast("Error while getting notification ID. Please check your notification setting.")
    }
  }



  render() {
    return (
      <View style={styles.f1bcd}>
        <AppStatusBar />
        <ScrollView>
          {this.state.isLoading && (
            <FullScreenLoader
              showLoader={this.state.isLoading}
              text="Please wait..."
            />
          )}

          <View style={styles.loginBorderRadiousDesign}>
            <View style={[styles.w100p, this.state.isDeviceIsPhone ? styles.maxWidth100 : styles.maxWidth50]}>
              <View style={[styles.mt30, styles.jcacfc]}>
                <Text style={[styles.authPageTitle]}>Welcome back</Text>
                <Text style={[styles.authPageDescription]}>
                  Login to your account
                </Text>
              </View>
              <View style={[styles.mt20, styles.jcacfc, styles.ph30]}>
                <View style={[styles.w100p, styles.mt20]}>
                  <Text style={styles.inputLabel}>Store ID</Text>
                  <TextInput
                    placeholder="Enter your store ID"
                    placeholderTextColor={"gray"}
                    style={styles.input}
                  
                    onChange={event => {
                      this.setState({store_id: event.nativeEvent.text});
                    }}
                  />
                </View>

                <View style={[styles.w100p, styles.mt20]}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    placeholder="Enter your password"
                    style={styles.input}
                    placeholderTextColor={"gray"}
                    onChange={event => {
                      this.setState({password: event.nativeEvent.text});
                    }}
                  />
                </View>

                <View style={[styles.w100p, styles.mt50]}>
                  <Button
                    style={[styles.w100p, styles.btn]}
                    onPress={() => {
                      this.validateAndLogin();
                    }}>
                    <Text style={styles.btnText}>Login</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
