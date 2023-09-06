import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  AppState,
  Platform,
  Image,
  TouchableHighlight
} from 'react-native';
import { styles, colors } from '../style/main';
import {getPrinterReference,savePrinterReference} from '../services/userservice';
import AppStatusBar from '../components/AppStatusBar';
import { FloatingAction } from "react-native-floating-action";
import {
  Button,
  Checkbox,
  FlatList,
  AlertDialog,
  Modal,
  Select,
  CheckIcon,
} from 'native-base';
import { BackIcon, BrifcaseIcon, LogoutIcon, PrinterIcon } from '../icons/main';
import { Dimensions } from 'react-native';
import FullScreenLoader from '../components/FullScreenLoader';
import { showToast } from '../utils/utils';
import { captureRef } from "react-native-view-shot";
import { callPutApi } from '../services/apiservice';
import {
  setAccessToken,
  isLoggedIn,
  getStoreId,
  removeAccessToken,
  getStoreStatus,
  getFirebaseToken,
  removeFirebaseToken,
} from '../services/userservice';
import firebase from '@react-native-firebase/app';
import * as constants from '../constants/apis';
import messaging from '@react-native-firebase/messaging';
import Sound from 'react-native-sound';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isTablet } from 'react-native-device-info';
import EventBus from 'react-native-event-bus';
import { TextInput } from 'react-native-gesture-handler';
import { Countdown } from 'react-native-element-timer';
let localSound = require('../assets/notification.mp3');
let printerImage = require("../assets/ic_printer.png")
let bleprinter = require("../assets/bleprinter.png")
let netprinter = require("../assets/netprinter.png")
let usbprinter = require("../assets/usbprinter.png")
import {
  BLEPrinter,
  NetPrinter,
  USBPrinter,
  IUSBPrinter,
  IBLEPrinter,
  INetPrinter,
} from "react-native-thermal-receipt-printer";
import RNPrint from 'react-native-print';
import RNImageToPdf from 'react-native-image-to-pdf';
// isDeviceIsPhone

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    // if(!isLoggedIn()){
    //   return
    // }
    firebase.initializeApp();
    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    const isLandscape = () => {
      const dim = Dimensions.get('screen');
      return dim.width >= dim.height;
    };
    const isDeviceTab = () => {
      return isTablet();
    };
    const ValueIsLandscape = () => {
      return isLandscape();
    };
    const ValueForIsDevicePhone = () => {
      const itemValue = isDeviceTab() ? 'tab' : isPortrait() ? 'phone' : 'tab';

      console.log(itemValue);
      console.log(isPortrait());
      console.log(isDeviceTab());
      return itemValue == 'phone';
    };
    const isAndroidPhone = () => {
      return Platform.OS == "android"
    }

    this.state = {
      appState: AppState.currentState,
      orientation: isPortrait() ? 'portrait' : 'landscape',
      isDeviceIsPhone: ValueForIsDevicePhone(),
      isDeviceLandscape: ValueIsLandscape(),
      isPhoneAndroid: isAndroidPhone(),
      screen: Dimensions.get('screen'),
      printerSelected: getPrinterReference(),
      isLoading: false,
      confirmTextValue: '',
      isTodayNeedUpdate: false,
      isSideOptionOpen: false,
      isLoadingFullScreen: false,
      isStoreActive: getStoreStatus(),
      isDeletePopupOpened: false,
      isLogoutPopupOpened: false,
      activeOrderId: 0,
      orders: [],
      selectedOrder: null,
      isOpenOrderConfirmPopup: false,
      isOpenPrinterConfirmPopup: false,
      isOpenPrintRecepitConfirmPopup: false,
      isOpenOrderNotificationPopup: false,
      minTimeToPrepare: '15',
      timeArray: [5, 10, 15, 20, 25],
      isOtherTimeActive: false,
      isOpenOtherTimePopup: false,
      isOpenOrderHandoverPopup: false,
      userOrderOTP: '',
      cancellationReason: '',
      cancellationReasonOther: '',
      noOfNotification: 0,
      no_otp: false,
      fileUriPath: "",
      printersBlue:Array(),//[IUSBPrinter],
      printersBle:Array(),//[IBLEPrinter],
      printersNet:Array(),//[INetPrinter],
      currentPrinterBlue:null,
      currentPrinterBle:null,
      currentPrinterNet:null,

    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
        isDeviceIsPhone: ValueForIsDevicePhone(),
        isDeviceLandscape: ValueIsLandscape(),
        screen: Dimensions.get('screen'),
      });
    });
    this.requestUserPermission();
    this.checkApplicationPermission();
    this.timerRef = React.createRef();
    this.cancelRef = React.createRef();
    this.confirmRef = React.createRef();
    this.refScreen = React.createRef();
    // const [printers, setPrinters] = useState([]);
    // const [currentPrinter, setCurrentPrinter] = useState();
    Sound.setCategory('Playback', true);
    if (!isLoggedIn()) {
      this.resetAndGoToScreen('LoginScreen');
    } else {
      this.getStoreInfo();
      this.messageListener();
    }
  }

  componentDidMount() {
    EventBus.getInstance().addListener(
      'CheckCameBack',
      (this.listener = data => {
        this.getTodaysOrders();
      }),
    );
    console.log('here come thula');
    this.getTodaysOrders();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.getTodaysOrders();
      },
    );
    AppState.addEventListener('change', this._handleAppStateChange);
    NetPrinter.init().then(() => {
      this.setState(Object.assign({}, this.state, {printersNet: [{host: '192.168.10.241', port: 9100}]}))
    })
    console.log("don ehit")
    BLEPrinter.init().then(( printers)=> {
      this.setState(Object.assign({}, this.state, {printersBle: printers}))
    });
    if(Platform.OS == 'android'){
      USBPrinter.init().then((printers)=> {
        //list printers
        this.setState(Object.assign({}, this.state, {printersBlue: printers}))
      })
    }
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
    this.willFocusSubscription();
    AppState.removeEventListener('change', this._handleAppStateChange); //('change', this._handleAppStateChange);
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
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }

    let token = firebase.messaging().getToken();
    if (Platform.OS === 'ios') {
      firebase.messaging().registerDeviceForRemoteMessages(); //.messaging().ios.registerForRemoteNotifications();
    }
  }
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      this.getTodaysOrders();
    }
    this.setState({ appState: nextAppState });
  };


  _connectPrinterBlue(printer) {
    USBPrinter.connectPrinter(printer.vendorID, printer.productId).then((printer) => 
    this.setState({currentPrinterBlue : printer})
    )
  }
  _connectPrinterBle(printer) {
    BLEPrinter.connectPrinter(printer.inner_mac_address).then((printer) => 
    this.setState({currentPrinterBle : printer})
    ,error => console.warn(error))

  }
  _connectPrinterNet(host, port) {
    NetPrinter.connectPrinter(host, port).then(
      (printer) => this.setState(Object.assign({}, this.state, {currentPrinterNet: printer})),
      error => console.warn(error))
  }


  getStoreInfo() {
    this.changeLoadingStateFillScreen(true);
    let reqBody = {
      store_id: getStoreId(),
    };
    let url = constants.APIS.GET_STORE_INFO;
    callPutApi(url, reqBody)
      .then(response => {
        if (response.data && response.data && response.data.token) {
          setAccessToken(response.data.token);
          this.setState({
            isStoreActive: getStoreStatus(),
          });
        }
        this.changeLoadingStateFillScreen(false);
        this.getTodaysOrders();
      })
      .catch(err => {
        this.changeLoadingStateFillScreen(false);
        this.getTodaysOrders();
      });
  }

  playSoundLocal() {
    let control_Local = new Sound(localSound, (error, _sound) => {
      if (error) {
        return;
      }
      control_Local.play(() => {
        control_Local.release();
      });
    });
  }

  updateNotificationData(remoteMessage) {
    let orderObj = JSON.parse(remoteMessage.data.sessionObject);
    let allOrder = this.state.orders;
    allOrder.unshift(orderObj);
    this.setState({
      orders: allOrder,
      noOfNotification: this.state.noOfNotification + 1,
      isOpenOrderNotificationPopup: true,
    });
  }

  messageListener = async () => {
    messaging().onMessage(async remoteMessage => {
      this.updateNotificationData(remoteMessage);
      this.playSoundLocal();
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      this.updateNotificationData(remoteMessage);
      this.playSoundLocal();
    });
  };

  viewNotificationOrderOrder() {
    this.setState({
      isOpenOrderNotificationPopup: false,
      noOfNotification: 0,
      activeOrderId: this.state.orders[0] ? this.state.orders[0].order_id : 0,
      selectedOrder: this.state.orders[0] ? this.state.orders[0] : null,
    });
  }

  changeLoadingState = status => {
    setTimeout(() => {
      this.setState({
        isLoading: status,
      });
    });
  };

  changeLoadingStateFillScreen = status => {
    setTimeout(() => {
      this.setState({
        isLoadingFullScreen: status,
      });
    });
  };

  printTxt(txt){
    var printerType = getPrinterReference()
    if(printerType == "usb" && this.state.currentPrinterBlue){
      USBPrinter.printText(`<C>${txt}</C>\n`)
    }
    else if(printerType == "ble" && this.state.currentPrinterBle){
      BLEPrinter.printText(`<C>${txt}</C>\n`)
    }
    else if(printerType == "net" && this.state.currentPrinterNet){
      NetPrinter.printText(`<C>${txt}</C>\n`) 
    }
  }
  printTxtBill(txt){
    var printerType = getPrinterReference()
    if(printerType == "usb" && this.state.currentPrinterBlue){
      USBPrinter.printBill(`<C>${txt}</C>\n`)
    }
    else if(printerType == "ble" && this.state.currentPrinterBle){
      BLEPrinter.printBill(`<C>${txt}</C>\n`)
    }
    else if(printerType == "net" && this.state.currentPrinterNet){
      NetPrinter.printBill(`<C>${txt}</C>\n`)
    }
  }
  printScreen() {

    var printerType = getPrinterReference()
    if(printerType == "usb" && this.state.printersBlue?.length > 0){
      var firstItem = this.state.printersBlue[0]
      this._connectPrinterBlue(firstItem)
    }else if(printerType == "net"  && this.state.printersNet?.length > 0){
      var firstItem = this.state.printersNet[0]
      this._connectPrinterNet(firstItem.host,firstItem.port)
    }else if(printerType == "ble" && this.state.printersBle?.length > 0){
      var firstItem = this.state.printersBle[0]
      this._connectPrinterBle(firstItem)
    }else{
      showToast("No printer is connected")
      return 
    }

    var name = `Customer : ${this.state.selectedOrder.customer_name}`
    var orderId = `Order ID : ${this.state.selectedOrder.order_id}`
    var phoneNumber = `Customer Phone : ${this.state.selectedOrder.phonenumber}`
    var itemQuantity = `${this.getItemSize()} Items`
    this.printTxt(name)
    this.printTxt("------------")
    this.printTxt(orderId)
    this.printTxt("------------")
    this.printTxt(phoneNumber)
    this.printTxt("------------")
    this.printTxt(itemQuantity)
    this.printTxt("------------")
    this.state.selectedOrder.items.forEach(item => {
      if(item.item_available){
        var txt = `${item.item_qty}x ${item.item_name ?? ""}`
        this.printTxt(txt)
        var prince = `$${item.item_price}`
        this.printTxt(prince)
        if(item.option){
          item.option.forEach(option => {
            var txt1 = `  ${option.option_name}`
            this.printTxt(txt1)
            var prince1 = `  $${option.option_price}`
            this.printTxt(prince1)
          })
        }
        this.printTxt("------------")
      }
    });



    var subtotal = `Subtotal (After Discount) : ${this.state.selectedOrder.sub_total.toFixed(2)}`
    var taxValue = `TAX(${this.state.selectedOrder.tax_percentage}%) : ${this.state.selectedOrder.tax_amount.toFixed(2)}`
    var total = `Total : ${this.state.selectedOrder.total_amount.toFixed(2)}`

    this.printTxt(subtotal)
    this.printTxt("------------")
    this.printTxt(taxValue)
    this.printTxt("------------")
    this.printTxt(total)
    this.printTxt("------------")
    this.printTxtBill("Orders Manager")
  

  };
  gotToScreen(screenName) {
    // this.printScreen()
    this.props.navigation.navigate(screenName);
  }

  resetAndGoToScreen(routeName) {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  }

  logout() {
    this.setState({ isLogoutPopupOpened: false });
    removeAccessToken();
    removeFirebaseToken();
    this.resetAndGoToScreen('LoginScreen');
  }

  getTodaysOrders() {



    if (!isLoggedIn()) {
      return;
    }

    console.log('came here even if login 1');
    this.changeLoadingState(true);
    let reqBody = {
      store_id: getStoreId(),
    };

    let url = constants.APIS.ORDERS;

    callPutApi(url, reqBody)
      .then(response => {
        setTimeout(() => {
          this.timerRef.current.start()

        }, 2000)
        if (response.data) {
          // && response.data
          // showToast(response.data.message);
          let selectedOrder = null;
          if (this.state.selectedOrder) {
            let index = response.data.findIndex(
              item => item.order_id === this.state.selectedOrder.order_id,
            );
            selectedOrder = response.data[index];
          }
          this.setState({ orders: response.data, selectedOrder: selectedOrder });
        } else if (response.data.message) {
          showToast(response.data.message);
        } else {
          showToast('Unable to process your request!');
        }
        this.changeLoadingState(false);
      })
      .catch(err => {
        setTimeout(() => {
          this.timerRef.current.start()

        }, 2000)
        this.changeLoadingState(false);
        if (err.response && err.response.data && err.response.data.message) {
          showToast(err.response.data.message);
        } else {
          showToast(err.response.data ?? 'Unable to process your request!');
        }
      });
  }

  getOrderStatusClass(status) {
    let returnVal = { class: '', text: '' };
    if (status === 'Order Placed') {
      returnVal.class = 'pendingStatus';
      returnVal.text = 'PLEASE CONFIRM';
    } else if (status === 'Preparing') {
      returnVal.class = 'inprogressStatus';
      returnVal.text = 'BEING PREPARED';
    } else if (status === 'Ready to Pickup') {
      returnVal.class = 'readyStatus';
      returnVal.text = 'READY TO PICKUP';
    } else if (status === 'Picked Up') {
      returnVal.class = 'completedStatus';
      returnVal.text = 'COMPLETED';
    } else if (status === 'Canceled') {
      returnVal.class = 'cancelledStatus';
      returnVal.text = 'CANCELLED';
    }
    return returnVal;
  }

  updateAvailabeItem(index) {
    let data = { ...this.state.selectedOrder };
    data.items[index]['item_available'] = !data.items[index].item_available;
    this.setState({ selectedOrder: data });
  }

  makeUpdateOrderApi(reqBody) {
    this.changeLoadingStateFillScreen(true);
    let url = constants.APIS.UPDATE_ORDER_STATUS;
    callPutApi(url, reqBody)
      .then(response => {
        console.log(JSON.stringify(response));
        if (response.data && response.data) {
          let allOrder = this.state.orders;
          let index = allOrder.findIndex(
            item => item.order_id === this.state.selectedOrder.order_id,
          );
          if (index !== -1) {
            let selectedOrder = null;
            allOrder[index].order_status = response.data.order_status;
            selectedOrder = {
              ...this.state.selectedOrder,
              order_status: response.data.order_status,
            };
            this.setState({
              selectedOrder: selectedOrder,
              isOpenOrderConfirmPopup: false,
              isOpenOrderHandoverPopup: false,
              orders: allOrder,
              userOrderOTP: '',
            });
          }
        } else if (response.data.message) {
          // showToast(response.data.message);
          this.state.confirmTextValue = response.data.message;
          console.log(this.state.confirmTextValue);
        } else {
          this.state.confirmTextValue = 'Unable to process your request!';
          console.log(this.state.confirmTextValue);
          // showToast('Unable to process your request!');
        }
        this.changeLoadingStateFillScreen(false);
      })
      .catch(err => {
        this.changeLoadingStateFillScreen(false);
        if (err.response && err.response.data && err.response.data.message) {
          // showToast(err.response.data.message);/
          this.state.confirmTextValue = err.response.data.message;
          console.log(this.state.confirmTextValue);
        } else {
          // showToast('Unable to process your request!');
          this.state.confirmTextValue =
            err.response.data ?? 'Unable to process your request!';
          console.log(this.state.confirmTextValue);
          console.log(err.response.data);
          console.log(err.response.data.message);
        }
      });
  }

  confirmOrder() {
    let reqBody = {
      order_id: this.state.selectedOrder.order_id,
      order_status: 'confirm_order',
      time: this.state.minTimeToPrepare,
    };
    this.makeUpdateOrderApi(reqBody);
  }

  markOrderAsPrepared() {
    let reqBody = {
      order_id: this.state.selectedOrder.order_id,
      order_status: 'prepared',
    };
    this.makeUpdateOrderApi(reqBody);
  }

  handoverOrder() {
    let reqBody = {
      order_id: this.state.selectedOrder.order_id,
      order_status: 'picked_up',
      otp: this.state.userOrderOTP,
      no_otp: this.state.no_otp,
    };
    this.makeUpdateOrderApi(reqBody);
  }

  cancelOrder() {
    let errorMessage = '';
    if (this.state.cancellationReason == '') {
      errorMessage = 'Please select the cancellation reson';
    } else if (
      this.state.cancellationReason == 'Other' &&
      this.state.cancellationReasonOther == ''
    ) {
      errorMessage = 'Please enter the cancellation reson';
    }
    if (errorMessage == '') {
      this.setState({ isDeletePopupOpened: false });
      this.changeLoadingStateFillScreen(true);
      let url = constants.APIS.CANCEL_ORDER;
      let reqBody = {
        store_id: getStoreId(),
        order_id: this.state.selectedOrder.order_id,
        reason:
          this.state.cancellationReasonOther == ''
            ? this.state.cancellationReason
            : this.state.cancellationReasonOther,
      };
      callPutApi(url, reqBody)
        .then(response => {
          if (response.data && response.data) {
            let allOrder = this.state.orders;
            let index = allOrder.findIndex(
              item => item.order_id === this.state.selectedOrder.order_id,
            );
            if (index !== -1) {
              let selectedOrder = null;
              allOrder[index].order_status = response.data.order_status;
              selectedOrder = {
                ...this.state.selectedOrder,
                order_status: response.data.order_status,
              };
              this.setState({
                selectedOrder: selectedOrder,
                isOpenOrderConfirmPopup: false,
                isOpenOrderHandoverPopup: false,
                orders: allOrder,
              });
            }
          } else if (response.data.message) {
            showToast(response.data.message);
          } else {
            showToast('Unable to process your request!');
          }
          this.changeLoadingStateFillScreen(false);
        })
        .catch(err => {
          this.changeLoadingStateFillScreen(false);
          if (err.response && err.response.data && err.response.data.message) {
            showToast(err.response.data.message);
          } else {
            showToast(err.response.data ?? 'Unable to process your request!');
          }
        });
    } else {
      showToast(errorMessage);
    }
  }

  renderButtons(status) {
    let returnObj = null;
    switch (status) {
      case 'Order Placed':
        returnObj = (
          <Button
            style={[styles.btn, { borderRadius: 10 }]}
            onPress={() => {
              this.state.confirmTextValue = '';
              this.setState({ isOpenOrderConfirmPopup: true });
            }}>
            <Text style={styles.btnText}>Confirm Order</Text>
          </Button>
        );
        break;

      case 'Preparing':
        returnObj = (
          <Button
            style={[styles.btn, { borderRadius: 10 }]}
            onPress={() => {
              this.markOrderAsPrepared();
            }}>
            <Text style={styles.btnText}>Order Prepared</Text>
          </Button>
        );
        break;

      case 'Ready to Pickup':
        returnObj = (
          <Button
            style={[styles.btn, { borderRadius: 10 }]}
            onPress={() => {
              this.setState({ isOpenOrderHandoverPopup: true });
            }}>
            <Text style={styles.btnText}>Handover to Customer</Text>
          </Button>
        );
        break;

      default:
        break;
    }
    return returnObj;
  }

  updateStoreActiveStatus(isStoreActive) {
    let url = constants.APIS.UPDATE_STORE_STATUS;
    let reqBody = {
      status: isStoreActive,
      store_id: getStoreId(),
    };
    callPutApi(url, reqBody)
      .then(response => {
        if (response.data && response.data) {
          this.setState({
            isStoreActive: isStoreActive,
          });
          showToast('Store status has been updated!');
        } else if (response.data.message) {
          showToast(response.data.message);
        } else {
          showToast('Unable to process your request!');
        }
        this.changeLoadingState(false);
      })
      .catch(err => {
        this.changeLoadingState(false);
        if (err.response && err.response.data && err.response.data.message) {
          showToast(err.response.data.message);
        } else {
          showToast(err.response.data ?? 'Unable to process your request!');
        }
      });
  }

  updateOrderItemAvailableStatus(isAvailabe, item_id, option_id) {
    this.changeLoadingStateFillScreen(true);
    let url = constants.APIS.UPDATE_ORDER_ITEM_AVAILABE_STATUS;
    let reqBody = {
      store_id: getStoreId(),
      order_id: this.state.selectedOrder.order_id,
      item_id: item_id,
      option_id: option_id,
      type: 'item',
      available: isAvailabe,
    };
    callPutApi(url, reqBody)
      .then(response => {
        if (response.data && response.data) {
          let allOrder = this.state.orders;
          let index = allOrder.findIndex(
            item => item.order_id === this.state.selectedOrder.order_id,
          );
          if (index !== -1) {
            let itemIndex = allOrder[index].items.findIndex(
              item => item.item_id === item_id,
            );
            if (itemIndex != -1) {
              allOrder[index].items[itemIndex].item_available = isAvailabe;
              allOrder[index].sub_total = response.data.sub_total;
              allOrder[index].total_amount = response.data.total_amount;
              allOrder[index].tax_amount = response.data.tax_amount;
              this.setState({
                selectedOrder: allOrder[index],
                orders: allOrder,
              });
            }
          }
          showToast('Item status has been updated!');
          this.changeLoadingStateFillScreen(false);
        } else if (response.data.message) {
          showToast(response.data.message);
        } else {
          showToast('Unable to process your request!');
        }
        this.changeLoadingStateFillScreen(false);
      })
      .catch(err => {
        this.changeLoadingStateFillScreen(false);
        if (err.response && err.response.data && err.response.data.message) {
          showToast(err.response.data.message);
        } else {
          showToast(err.response.data ?? 'Unable to process your request!');
        }
      });
  }

  getItemSize() {
    let size = 0;
    this.state.selectedOrder.items.forEach(item => {
      size = size + item.item_qty;
    });
    return size;
  }

  logoutAPICall() {
    this.changeLoadingState(true);
    let reqBody = {
      store_id: getStoreId(),
      firebaseToken: getFirebaseToken(),
    };
    let url = constants.APIS.LOGOUT;
    callPutApi(url, reqBody)
      .then(response => {
        this.changeLoadingState(false);
        this.logout();
      })
      .catch(err => {
        this.changeLoadingState(false);
        if (err.response && err.response.data && err.response.data.message) {
          this.logout();
        } else {
          this.logout();
        }
      });
  }

  render() {
    return (
      // style={styles.timer}
      //               textStyle={styles.timerText}
      // <SafeAreaView>
      <SafeAreaView style={styles.f1bcg}>
        <AppStatusBar />
        <View style={{ width: 0, height: 0 }}>
          <Countdown
            ref={this.timerRef}
            initialSeconds={3600}
            onTimes={e => { }}
            onPause={e => { }}
            onEnd={(e) => { this.getTodaysOrders() }}
          />

        </View>

        <ScrollView scrollEnabled={false}>
          {this.state.isLoadingFullScreen && (
            <FullScreenLoader
              showLoader={this.state.isLoadingFullScreen}
              text="Please wait..."
            />
          )}

          {/* Top Header View */}
          <View
            style={[
              styles.dfjcsbaic,
              styles.headerShadow,
              {
                backgroundColor: colors.white,
                paddingHorizontal: 20,
                paddingVertical: 20,
                height: 'auto',
                overflow: 'hidden',
              },
            ]}>
            <Button
              style={[
                styles.btn,
                {
                  width: this.state.isDeviceIsPhone ? 60 : 100,
                  borderRadius: 10,
                },
              ]}
              onPress={() => {
                this.state.isTodayNeedUpdate = true;
                this.gotToScreen('MenuScreen');
              }}>
              <Text
                style={[
                  styles.btnText,
                  { fontSize: this.state.isDeviceIsPhone ? 13 : 20 },
                ]}>
                Menu
              </Text>
            </Button>

            <View
              style={{
                width: this.state.isDeviceIsPhone ? 'auto' : null,
                alignItems: 'center',
              }}>
              <View
                style={[
                  styles.dfjcsbaicLabels,
                  {
                    backgroundColor: '#e7f4e0',
                    // backgroundColor: 'yellow',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: this.state.isDeviceIsPhone ? 5 : 10,
                    borderRadius: 30,
                  },
                ]}>
                <TouchableOpacity
                  onPressIn={() => {
                    this.updateStoreActiveStatus(true);
                  }}>

                  <Text
                    style={[
                      this.state.isDeviceIsPhone
                        ? styles.headerTextLabels
                        : styles.headerText,
                      this.state.isStoreActive
                        ? this.state.isDeviceIsPhone
                          ? styles.storeOpenActivePhone
                          : styles.storeOpenActive
                        : styles.storeOpenInActive,
                      {},
                    ]}>
                    STORE OPEN
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPressIn={() => {
                    this.updateStoreActiveStatus(false);
                  }}
                  style={{ marginLeft: this.state.isDeviceIsPhone ? 10 : 20 }}>
                  <Text
                    style={[
                      this.state.isDeviceIsPhone
                        ? styles.headerTextLabels
                        : styles.headerText,
                      !this.state.isStoreActive
                        ? this.state.isDeviceIsPhone
                          ? styles.storeClosedActivePhone
                          : styles.storeClosedActive
                        : styles.storeClosedInActive,
                    ]}>
                    STORE CLOSED
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  color: this.state.isStoreActive ? '#5cb931' : '#ed1616',
                }}>
                You're {this.state.isStoreActive ? '' : 'not'} receiving order{' '}
              </Text>
            </View>

            <View style={[styles.dfjcsbaic]}>
              <View>
                <Text>&nbsp;</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isLogoutPopupOpened: true });
                }}>
                <LogoutIcon
                  color={colors.primary}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Start From Here Bottom View */}

          <View
            style={[
              styles.dfjcsbaic,
              this.state.isDeviceIsPhone
                ? {
                  height: this.state.screen.height - 70,
                  alignItems: 'flex-start',
                }
                : {
                  height: this.state.screen.height - 130,
                  alignItems: 'flex-start',
                },
            ]}>
            <View
              style={{
                width: this.state.isDeviceIsPhone
                  ? this.state.isSideOptionOpen
                    ? '0%'
                    : '100%'
                  : '40%',
                paddingTop: this.state.isDeviceIsPhone ? 10 : 20,
                height: 'auto',
              }}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: this.state.isDeviceIsPhone ? 10 : 20,
                }}>
                <Text style={styles.headerText}>Today’s Orders</Text>
              </View>
              <ScrollView refreshControl={
                <RefreshControl
                  colors={['#9Bd35A', '#689F38']}
                  refreshing={false}
                  onRefresh={() => {
                    this.getTodaysOrders();
                  }}
                />
              }>
                <FlatList

                  data={this.state.orders}
                  style={{
                    marginTop: this.state.isDeviceIsPhone ? 10 : 10,
                    marginBottom: this.state.isDeviceIsPhone
                      ? 120
                      : this.state.isDeviceLandscape
                        ? 40
                        : 40,
                  }}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.state.isSideOptionOpen = true;
                        this.setState({
                          activeOrderId: item.order_id,
                          selectedOrder: item,
                        });
                      }}
                      style={[
                        styles.dfjcsbaic,
                        styles.orderListItem,
                        this.state.activeOrderId === item.order_id
                          ? styles.orderListItemActive
                          : null,
                      ]}>
                      <Text style={styles.listTitle} numberOfLines={1}>
                        {item.customer_name}
                      </Text>
                      <View>
                        <Text
                          style={
                            styles[
                            this.getOrderStatusClass(item.order_status).class
                            ]
                          }>
                          {this.getOrderStatusClass(item.order_status).text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
                {this.state.isLoading && <ActivityIndicator />}
              </ScrollView>
            </View>

            {/* Detail View Of Orders */}
            {(!this.state.isDeviceIsPhone ||
              this.state.isSideOptionOpen == true) && (
                <View
                  style={{
                    backgroundColor: colors.lightWhite,
                    flex: 1,
                    width: this.state.isDeviceIsPhone ? '100%' : '60%',
                    paddingTop: this.state.isDeviceIsPhone ? 5 : 20,
                    height: '100%',
                    position: this.state.isDeviceIsPhone
                      ? 'absolute'
                      : 'relative',
                  }}>
                  {this.state.selectedOrder && (
                    <>

                      {/* top view with information */}
                      <View
                        style={[
                          styles.dfjcsbaic,
                          {
                            borderBottomColor: colors.borderColor,
                            borderBottomWidth: 1,
                            paddingHorizontal: 20,
                            position: "relative",
                            height: 'auto',
                            paddingBottom: 10,
                          },
                        ]}>
                        <View>
                          {this.state.isDeviceIsPhone && (
                            <TouchableOpacity
                              style={{ marginBottom: 20 }}
                              onPress={() => {
                                this.state.isSideOptionOpen = false;
                                this.setState({
                                  activeOrderId: null,
                                  selectedOrder: null,
                                });
                                // alert("come")
                              }}>
                              <BackIcon color={colors.darkBackground} />
                            </TouchableOpacity>
                          )}
                          <Text
                            style={
                              this.state.isDeviceIsPhone
                                ? styles.orderIdTitlePhone
                                : styles.orderIdTitle
                            }>
                            Order ID : &nbsp;
                            <Text
                              style={[
                                this.state.isDeviceIsPhone
                                  ? styles.orderIdTitleActivePhone
                                  : styles.orderIdTitleActive,
                                styles.dfjcac,
                              ]}>
                              {this.state.selectedOrder.order_id}
                              <Text
                                style={{
                                  color: colors.deepGrayText,
                                  fontWeight: '700',
                                  paddingLeft: 10,
                                }}>
                                &nbsp;-&nbsp;{this.getItemSize()} Item
                              </Text>
                            </Text>
                          </Text>
                          <Text
                            style={
                              this.state.isDeviceIsPhone
                                ? styles.orderIdTitlePhone
                                : styles.orderIdTitle
                            }>
                            Customer : &nbsp;
                            <Text
                              style={[
                                this.state.isDeviceIsPhone
                                  ? styles.orderIdTitleActivePhone
                                  : styles.orderIdTitleActive,
                                {
                                  fontSize: this.state.isDeviceIsPhone ? 13 : 16,
                                  color: colors.primaryLight,
                                },
                              ]}>
                              {this.state.selectedOrder.customer_name}
                            </Text>
                          </Text>
                          <Text
                            style={
                              this.state.isDeviceIsPhone
                                ? styles.orderIdTitlePhone
                                : styles.orderIdTitle
                            }>
                            Customer Phone : &nbsp;
                            <Text
                              style={[
                                this.state.isDeviceIsPhone
                                  ? styles.orderIdTitleActivePhone
                                  : styles.orderIdTitleActive,
                                {
                                  fontSize: this.state.isDeviceIsPhone ? 13 : 16,
                                  color: colors.primaryLight,
                                },
                              ]}>
                              {this.state.selectedOrder.phonenumber}
                            </Text>
                          </Text>
                        </View>

                        {this.state.selectedOrder.order_status ===
                          'Order Placed' && (
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ isDeletePopupOpened: true });
                              }}>
                              <Text style={styles.completedStatus}>DENY ORDER</Text>
                            </TouchableOpacity>
                          )}
                      </View>
                      <ScrollView style={{ position: "relative", height: this.state.isDeviceIsPhone ? '20%' : 'auto' }}>
                        {/* marginBottom:this.state.isDeviceIsPhone ? 210 : 210 */}
                        {/* flat list of items */}
                        <View>
                          <FlatList
                            data={this.state.selectedOrder.items}
                            style={[
                              ,
                              this.state.isDeviceIsPhone
                                ? {
                                  paddingTop: 20,
                                  paddingBottom: 20,
                                  height: 'auto',
                                  paddingHorizontal: 20
                                }
                                : {
                                  paddingTop: 20,
                                  paddingBottom: 20,
                                  height: 'auto',
                                  paddingHorizontal: 20
                                },
                            ]}
                            renderItem={({ item, index }) => (
                              <View
                                key={'orderItem' + index}
                                style={[
                                  !item.item_available ? { opacity: 0.5 } : null,
                                ]}>
                                <View style={[styles.dfjcsbaic]}>
                                  <View
                                    style={[
                                      styles.dfjcsbaic,
                                      { alignItems: 'flex-start' },
                                    ]}>
                                    <View style={{ padding: 5, flex: 0.8 }}>
                                      <Text
                                        style={
                                          this.state.isDeviceIsPhone
                                            ? styles.menuItemTitlePhone
                                            : styles.menuItemTitle
                                        }>
                                        <Text>{item.item_qty}x&nbsp; </Text>
                                        <Text>{item && item.item_name}</Text>
                                      </Text>
                                    </View>
                                    <Checkbox
                                      isDisabled={
                                        this.state.selectedOrder.order_status !=
                                        'Order Placed'
                                      }
                                      value="one"
                                      isChecked={item.item_available}
                                      onChange={() => {
                                        this.updateOrderItemAvailableStatus(
                                          !item.item_available,
                                          item.item_id,
                                          '',
                                        );
                                      }}
                                      my={2}
                                      style={{
                                        colors: 'gray',
                                        marginLeft: 20,
                                        flex: 0.2,
                                      }}>
                                      AVAILABLE
                                    </Checkbox>
                                  </View>
                                  <Text>${item && item.item_price}</Text>
                                </View>
                                <View style={{ paddingLeft: 20 }}>
                                  {item &&
                                    item.options &&
                                    item.options.map((option, optionIndex) => {
                                      return (
                                        <View
                                          style={[styles.dfjcsbaic]}
                                          key={'optionIndex_' + optionIndex}>
                                          <Text>{option.option_name}</Text>
                                          <Text>${option.option_price}</Text>
                                        </View>
                                      );
                                    })}
                                </View>
                              </View>
                            )}
                          />
                        </View>
                      </ScrollView>
                      {/* Button and price view */}
                      <View style={{ backgroundColor: "#fff", position: 'relative', bottom: this.state.isDeviceIsPhone ? 0 : 0, width: '100%', height: this.state.isDeviceIsPhone ? '40%' : (this.state.isPhoneAndroid ? 250 : 210) }}>
                        {/* this.state.isPhoneAndroid ? (this.state.isDeviceIsPhone ? 280 : 190) : (this.state.isDeviceIsPhone ? 210 : 170) */}
                        <View
                          style={[
                            styles.mb20,
                            styles.ph20,
                            {
                              borderTopColor: colors.borderColor,
                              borderTopWidth: 1,
                              marginTop: 5,
                              paddingTop: 5,
                            },
                          ]}>
                          <View style={styles.dfjcsbaic}>
                            <Text
                              style={{
                                flex: 0.8,
                                textAlign: 'right',
                                paddingRight: 10,
                              }}>
                              Subtotal (After Discount)&nbsp;:
                            </Text>
                            <Text style={{ flex: 0.2, textAlign: 'right' }}>
                              ${this.state.selectedOrder.sub_total.toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.dfjcsbaic}>
                            <Text
                              style={{
                                flex: 0.8,
                                textAlign: 'right',
                                paddingRight: 10,
                              }}>
                              TAX({this.state.selectedOrder.tax_percentage}%)
                              &nbsp;:
                            </Text>
                            <Text style={{ flex: 0.2, textAlign: 'right' }}>
                              ${this.state.selectedOrder.tax_amount.toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.dfjcsbaic}>
                            <Text
                              style={{
                                flex: 0.8,
                                textAlign: 'right',
                                paddingRight: 10,
                              }}>
                              Total &nbsp;:
                            </Text>
                            <Text style={{ flex: 0.2, textAlign: 'right' }}>
                              ${this.state.selectedOrder.total_amount.toFixed(2)}
                            </Text>
                          </View>
                        </View>


                        <TouchableOpacity
                          style={{ margin: 25, position: "absolute", height: 35, width: 35 }}
                          onPress={() => { this.setState({ isOpenPrinterConfirmPopup: true }) }}
                        >
                          <Image source={printerImage} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <Button
                          style={[styles.btn2, { borderRadius: 10, marginTop: -10, marginHorizontal: 20, marginBottom: 10 }]}


                          onPress={() => { 
                            if(getPrinterReference() != ""){
                              this.setState({ isOpenPrintRecepitConfirmPopup: true }); 
                            }else{
                              showToast('Please select printer type first');
                            }
                          }}
                        >
                          <Text style={styles.btnText}>Recepit</Text>
                        </Button>




                        <View
                          // marginTop: this.state.isDeviceIsPhone ? 0 : 0,
                          // bottom: this.state.isDeviceIsPhone ? 0 : 0,
                          style={{
                            bottom: 0,
                            width: '100%',
                            paddingHorizontal: 20,
                          }}>
                          {this.state.selectedOrder.total_amount > 0 &&
                            this.renderButtons(
                              this.state.selectedOrder.order_status,
                            )}
                        </View>


                      </View>
                    </>
                  )}

                  {!this.state.selectedOrder && (
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '100%',
                      }}>
                      <BrifcaseIcon
                        color={colors.primary}
                        style={{ width: 50, height: 50 }}
                      />
                      <Text>Please select order to view details!</Text>
                    </View>
                  )}
                </View>
              )}
          </View>

          {/* All Models And Alerts */}

          <Modal
            isOpen={this.state.isOpenOrderConfirmPopup}
            onClose={() => {
              this.setState({ isOpenOrderConfirmPopup: false });
            }}
            size="100%">
            <Modal.Content style={styles.modalPopup}>
              <Modal.CloseButton />
              <Modal.Header>
                When will this order be ready for pickup?
              </Modal.Header>
              <Modal.Body>
                <View style={styles.timeCardViewContainer}>
                  {this.state.timeArray.map((time, timeIndex) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            minTimeToPrepare: time,
                            isOtherTimeActive: false,
                          });
                        }}
                        style={[
                          this.state.isDeviceIsPhone
                            ? styles.timeCardViewPhone
                            : styles.timeCardView,
                          this.state.minTimeToPrepare == time
                            ? styles.timeCardViewActive
                            : null,
                        ]}
                        key={'time_' + timeIndex}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                          {time}
                        </Text>
                        <Text>Minute</Text>
                      </TouchableOpacity>
                    );
                  })}

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isOtherTimeActive: true,
                        minTimeToPrepare: 30,
                        isOpenOtherTimePopup: true,
                      });
                    }}
                    style={[
                      this.state.isDeviceIsPhone
                        ? styles.timeCardViewPhone
                        : styles.timeCardView,
                      this.state.isOtherTimeActive
                        ? styles.timeCardViewActive
                        : null,
                    ]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                      Other
                    </Text>
                    <Text>
                      {this.state.isOtherTimeActive
                        ? this.state.minTimeToPrepare + 'Min'
                        : null}
                      &nbsp;
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.ph10, styles.pv20]}>
                  <Button
                    style={[styles.btn, { borderRadius: 10 }]}
                    onPress={() => {
                      this.confirmOrder();
                    }}>
                    <Text style={styles.btnText}>Confirm Time</Text>
                  </Button>
                  <Text
                    style={[
                      styles.btnText,
                      { color: 'red', alignSelf: 'center', paddingVertical: 10 },
                    ]}>
                    {this.state.confirmTextValue}
                  </Text>
                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <AlertDialog
            leastDestructiveRef={this.confirmRef}
            isOpen={this.state.isOpenOtherTimePopup}
            onClose={() => {
              this.setState({ isOpenOtherTimePopup: false });
            }}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Please Provide the time</AlertDialog.Header>
              <AlertDialog.Body>
                <TextInput
                  placeholder="Enter time in minute"
                  placeholderTextColor={'gray'}
                  style={styles.input}
                  keyboardType={'number-pad'}
                  value={this.state.minTimeToPrepare}
                  onChange={event => {
                    this.setState({ minTimeToPrepare: event.nativeEvent.text });
                  }}
                />
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      this.setState({ isOpenOtherTimePopup: false });
                    }}
                    ref={this.cancelRef}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      this.setState({ isOpenOtherTimePopup: false });
                    }}>
                    Confirm
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <AlertDialog
            leastDestructiveRef={this.cancelRef}
            isOpen={this.state.isDeletePopupOpened}
            onClose={() => {
              this.setState({ isDeletePopupOpened: false });
            }}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                Are you sure want to cancel this order?
              </AlertDialog.Header>
              <AlertDialog.Body>
                Please provide the reson of cancellation
                <Select
                  selectedValue={this.state.cancellationReason}
                  accessibilityLabel="Please Select"
                  placeholder="Please Select"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={itemValue => {
                    this.setState({
                      cancellationReason: itemValue,
                      cancellationReasonOther: '',
                    });
                  }}>
                  <Select.Item label="Out of Stock" value="Out of Stock" />
                  <Select.Item label="Store Closed" value="Store Closed" />
                  <Select.Item
                    label="Customer Wants To Cancel"
                    value="Customer Wants To Cancel"
                  />
                  <Select.Item label="Other" value="Other" />
                </Select>
                {this.state.cancellationReason == 'Other' && (
                  <TextInput
                    placeholder="Please enter the reson"
                    placeholderTextColor={'gray'}
                    style={[styles.input, { marginTop: 10 }]}
                    keyboardType={'default'}
                    value={this.state.cancellationReasonOther}
                    onChange={event => {
                      this.setState({
                        cancellationReasonOther: event.nativeEvent.text,
                      });
                    }}
                  />
                )}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      this.setState({ isDeletePopupOpened: false });
                    }}
                    ref={this.cancelRef}>
                    NO
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      this.cancelOrder();
                    }}>
                    YES
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <AlertDialog
            leastDestructiveRef={this.cancelRef}
            isOpen={this.state.isLogoutPopupOpened}
            onClose={() => {
              this.setState({ isLogoutPopupOpened: false });
            }}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Logout Confirmation</AlertDialog.Header>
              <AlertDialog.Body>Are you sure want to logout?</AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      this.setState({ isLogoutPopupOpened: false });
                    }}
                    ref={this.cancelRef}>
                    NO
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      this.logoutAPICall();
                    }}>
                    YES
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <AlertDialog
            leastDestructiveRef={this.confirmRef}
            isOpen={this.state.isOpenOrderHandoverPopup}
            onClose={() => {
              this.setState({ isOpenOrderHandoverPopup: false });
            }}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Confirm OTP</AlertDialog.Header>
              <AlertDialog.Body>
                <View>
                  <Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                    Please ask customer for the OTP
                  </Text>
                </View>
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor={'gray'}
                  style={styles.input}
                  keyboardType={'number-pad'}
                  value={this.state.userOrderOTP}
                  onChange={event => {
                    this.setState({ userOrderOTP: event.nativeEvent.text });
                  }}
                />

                {/* <Checkbox.Group
                  onChange={(val)=>{
                    this.setState({no_otp: val});
                  }}
                  value={this.state.no_otp}
                  accessibilityLabel="No OTP?"
                > */}
                <View style={{ paddingVertical: 20 }}>
                  <Checkbox
                    value="true"
                    onChange={isSelected => {
                      this.setState({ no_otp: isSelected });
                    }}>
                    No OTP?
                  </Checkbox>
                </View>
                {/* </Checkbox.Group> */}
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => {
                      this.setState({ isOpenOrderHandoverPopup: false });
                    }}
                    ref={this.cancelRef}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      if (this.state.userOrderOTP == '' && !this.state.no_otp) {
                        showToast('Please enter OTP!');
                      } else {
                        this.handoverOrder();
                      }
                    }}>
                    Confirm
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </ScrollView>
        <Modal
          animationPreset="slide"
          useNativeDriver={true}
          isOpen={this.state.isOpenOrderNotificationPopup}
          onClose={() => {
            this.setState({ isOpenOrderNotificationPopup: false });
          }}
          size={'full'}
          style={{ height: '100%' }}>
          <Modal.Content style={styles.modalPopupNotification}>
            <Modal.CloseButton style={[{ marginTop: 40, marginEnd: 40 }]} />
            <Modal.Body>
              <View>
                <View style={[styles.timeCardViewContainer, { paddingTop: 30 }]}>
                  <View
                    style={{
                      width: 250,
                      height: 250,
                      borderRadius: 200,
                      backgroundColor: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 50,
                        fontWeight: '900',
                        color: colors.primary,
                      }}>
                      {this.state.noOfNotification}
                    </Text>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: '900',
                        color: colors.primary,
                      }}>
                      Order
                    </Text>
                  </View>
                </View>

                <View style={{ paddingVertical: 20 }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: '700',
                      color: '#FFF',
                    }}>
                    Needs to be confirmed
                  </Text>
                </View>

                <View style={[styles.ph10, styles.pv20, styles.dfjcac]}>
                  <Button
                    style={[
                      styles.btn,
                      { borderRadius: 10, width: '50%', backgroundColor: '#FFF' },
                    ]}
                    onPress={() => {
                      this.viewNotificationOrderOrder();
                    }}>
                    <Text style={[styles.btnText, { color: colors.primary }]}>
                      View Order
                    </Text>
                  </Button>
                </View>

                <View style={{ paddingVertical: 20, position: "relative", bottom: 0, alignItems: "center" }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: '900',
                      color: '#FFF',
                    }}>
                    Please confirm order to receive payment
                  </Text>
                </View>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <>


          <Modal
            isOpen={this.state.isOpenPrinterConfirmPopup}
            onClose={() => {
              this.setState({ isOpenPrinterConfirmPopup: false });
            }}
            size="100%">
            <Modal.Content style={styles.modalPopupNew}>
              <Modal.CloseButton />
              <Modal.Header>
                Select your Desire Printer
              </Modal.Header>
              <Modal.Body


              >
                <View style={{ justifyContent: 'space-between', marginHorizontal: 10, flexDirection: 'row', marginVertical: 10, alignItems: 'center', alignContent: 'center' }}>




                  <TouchableOpacity style={{ justifyContent: 'center', marginVertical: 10, alignItems: 'center', alignContent: 'center' }}
                  onPress={() => {
                    savePrinterReference('usb')
                    this.setState({ printerSelected: 'usb' });
                    
                    
                  }}>
                    <Image source={usbprinter} style={{ height: 35, width: 35 }} />
                    {/* usbprinter */}
                    <Text
                      style={[
                        styles.btnText,
                        { color: this.state.printerSelected == 'usb' ? 'blue' : '#000', alignSelf: 'center', paddingVertical: 10 },
                      ]}>
                      USB Printer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ justifyContent: 'center', marginVertical: 10, alignItems: 'center', alignContent: 'center', }}
                  onPress={() => {
                    savePrinterReference('ble')
                    this.setState({ printerSelected: 'ble' });
                    
                  }}>
                    <Image source={bleprinter} style={{ height: 35, width: 35 }} />
                    {/* bleprinter */}
                    <Text
                      style={[
                        styles.btnText,
                        { color: this.state.printerSelected == 'ble' ? 'blue' : '#000', alignSelf: 'center', paddingVertical: 10 },
                      ]}>
                      Bluetooth Printer
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity



                      onPress={() => {
                        savePrinterReference('net')
                        this.setState({ printerSelected: 'net' });
                        
                      }}
                    style={{ justifyContent: 'center', marginVertical: 10, alignItems: 'center', alignContent: 'center', }}>

                    <Image source={netprinter} style={{ height: 35, width: 35 }} />
                    {/* netprinter */}
                    <Text
                      style={[
                        styles.btnText,
                        { color: this.state.printerSelected == 'net' ? 'blue' : '#000', alignSelf: 'center', paddingVertical: 10 },
                      ]}>
                      Net Printer
                    </Text>
                  </TouchableOpacity>

                </View>

                <View style={{ justifyContent: 'space-between', marginHorizontal: 10, flexDirection: 'row', marginVertical: 20, alignItems: 'center', alignContent: 'center' }}>
                  <Button
                    style={[styles.btn1, { borderRadius: 10 }]}
                    onPress={() => {
                      
                      this.setState({ isOpenPrinterConfirmPopup: false });
                    }}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </Button>
                  <Button
                    style={[styles.btn1, { borderRadius: 10 }]}
                    onPress={() => {
                      
                      this.setState({ isOpenPrinterConfirmPopup: false });
                    }}>
                    <Text style={styles.btnText}>Select</Text>
                  </Button>

                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>

        </>
        <>


          <Modal
            isOpen={this.state.isOpenPrintRecepitConfirmPopup}
            onClose={() => {
              this.setState({ isOpenPrintRecepitConfirmPopup: false });
            }}
            size="100%">
            <Modal.Content style={styles.modalPopupNew}>
              <Modal.CloseButton />
              <Modal.Header>
                Please Confirm to Print
              </Modal.Header>
              <Modal.Body>

                {(!this.state.isDeviceIsPhone ||
                  this.state.isSideOptionOpen == true) && (
                    <View
                    ref = {(ref) => { this.refScreen = ref }}
                      >
                        {/* ref= {(itemRef) => { { this.setState({refScreen:itemRef}) } }} */}
                      {this.state.selectedOrder && (
                        <>
                          {/* top view with information */}
                          <View
                            style={[
                              styles.dfjcsbaic,
                              {
                                borderBottomColor: colors.borderColor,
                                borderBottomWidth: 1,
                                paddingHorizontal: 20,
                                position: "relative",
                                height: 'auto',
                                paddingBottom: 10,
                              },
                            ]}>
                            <View>
                              <Text
                                style={
                                  this.state.isDeviceIsPhone
                                    ? styles.orderIdTitlePhone
                                    : styles.orderIdTitle
                                }>
                                Customer Name : &nbsp;
                                <Text
                                  style={[
                                    this.state.isDeviceIsPhone
                                      ? styles.orderIdTitleActivePhone
                                      : styles.orderIdTitleActive,
                                    {
                                      fontSize: this.state.isDeviceIsPhone ? 13 : 16,
                                      color: colors.primaryLight,
                                    },
                                  ]}
                                >
                                  {this.state.selectedOrder.customer_name}
                                </Text>
                              </Text>
                              <Text
                                style={
                                  this.state.isDeviceIsPhone
                                    ? styles.orderIdTitlePhone
                                    : styles.orderIdTitle
                                }>
                                Order ID : &nbsp;
                                <Text
                                  style={[
                                    this.state.isDeviceIsPhone
                                      ? styles.orderIdTitleActivePhone
                                      : styles.orderIdTitleActive,
                                    styles.dfjcac,
                                  ]}

                                >
                                  {this.state.selectedOrder.order_id}
                                </Text>
                              </Text>
                              <Text
                                style={
                                  this.state.isDeviceIsPhone
                                    ? styles.orderIdTitlePhone
                                    : styles.orderIdTitle
                                }>
                                Customer Phone : &nbsp;
                                <Text
                                  style={[
                                    this.state.isDeviceIsPhone
                                      ? styles.orderIdTitleActivePhone
                                      : styles.orderIdTitleActive,
                                    {
                                      fontSize: this.state.isDeviceIsPhone ? 13 : 16,
                                      color: colors.primaryLight,
                                    },
                                  ]}>
                                  {this.state.selectedOrder.phonenumber}
                                </Text>
                              </Text>
                              <Text
                                style={
                                  this.state.isDeviceIsPhone
                                    ? styles.orderIdTitlePhone
                                    : styles.orderIdTitle
                                }>
                                Items : &nbsp;
                                <Text
                                  style={[
                                    this.state.isDeviceIsPhone
                                      ? styles.orderIdTitleActivePhone
                                      : styles.orderIdTitleActive,
                                    styles.dfjcac,
                                  ]}

                                >
                                  {this.getItemSize()} Item
                                </Text>
                              </Text>

                            </View>
                          </View>
                          <View>
                            {/* marginBottom:this.state.isDeviceIsPhone ? 210 : 210 */}
                            {/* flat list of items */}
                            <View>
                              <FlatList
                                data={this.state.selectedOrder.items}
                                style={[
                                  ,
                                  this.state.isDeviceIsPhone
                                    ? {
                                      paddingTop: 20,
                                      paddingBottom: 20,
                                      height: 'auto',
                                      paddingHorizontal: 20
                                    }
                                    : {
                                      paddingTop: 20,
                                      paddingBottom: 20,
                                      height: 'auto',
                                      paddingHorizontal: 20
                                    },
                                ]}
                                renderItem={({ item, index }) => (
                                  <View
                                    key={'orderItem' + index}
                                    style={[
                                      !item.item_available ? { opacity: 0.5 } : null,
                                    ]}>
                                    <View style={[styles.dfjcsbaic]}>
                                      <View
                                        style={[
                                          styles.dfjcsbaic,
                                          { alignItems: 'flex-start' },
                                        ]}>
                                        <View style={{ padding: 5, flex: 0.8 }}>
                                          <Text
                                            style={
                                              this.state.isDeviceIsPhone
                                                ? styles.menuItemTitlePhone
                                                : styles.menuItemTitle
                                            }>
                                            <Text>{item.item_qty}x&nbsp; </Text>
                                            <Text>{item && item.item_name}</Text>
                                          </Text>
                                        </View>

                                      </View>
                                      <Text>${item && item.item_price}</Text>
                                      <Text style={{ color: 'black' }}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>

                                    </View>
                                    <View style={{ paddingLeft: 20 }}>
                                      {item &&
                                        item.options &&
                                        item.options.map((option, optionIndex) => {
                                          return (
                                            <View
                                              style={[styles.dfjcsbaic]}
                                              key={'optionIndex_' + optionIndex}>
                                              <Text>{option.option_name}</Text>
                                              <Text>${option.option_price}</Text>
                                            </View>
                                          );
                                        })}
                                    </View>
                                  </View>
                                )}
                              />
                            </View>
                          </View>
                          {/* Button and price view */}
                          <View style={{ backgroundColor: "#fff", position: 'relative', bottom: this.state.isDeviceIsPhone ? 0 : 0, width: '100%', height: this.state.isDeviceIsPhone ? '40%' : 150 }}>
                            {/* this.state.isPhoneAndroid ? (this.state.isDeviceIsPhone ? 280 : 190) : (this.state.isDeviceIsPhone ? 210 : 170) */}
                            <View
                              style={[
                                styles.mb20,
                                styles.ph20,
                                {
                                  borderTopColor: colors.borderColor,
                                  borderTopWidth: 1,
                                  marginTop: 5,
                                  paddingTop: 5,
                                  marginBottom: 5
                                },
                              ]}>
                              <View style={styles.dfjcsbaic}>
                                <Text
                                  style={{
                                    flex: 0.8,
                                    textAlign: 'right',
                                    paddingRight: 10,
                                  }}>
                                  Subtotal (After Discount)&nbsp;:
                                </Text>
                                <Text style={{ flex: 0.2, textAlign: 'right' }}>
                                  ${this.state.selectedOrder.sub_total.toFixed(2)}
                                </Text>
                              </View>
                              <View style={styles.dfjcsbaic}>
                                <Text
                                  style={{
                                    flex: 0.8,
                                    textAlign: 'right',
                                    paddingRight: 10,
                                  }}>
                                  TAX({this.state.selectedOrder.tax_percentage}%)
                                  &nbsp;:
                                </Text>
                                <Text style={{ flex: 0.2, textAlign: 'right' }}>
                                  ${this.state.selectedOrder.tax_amount.toFixed(2)}
                                </Text>
                              </View>
                              <View style={styles.dfjcsbaic}>
                                <Text
                                  style={{
                                    flex: 0.8,
                                    textAlign: 'right',
                                    paddingRight: 10,
                                  }}>
                                  Total &nbsp;:
                                </Text>
                                <Text style={{ flex: 0.2, textAlign: 'right' }}>
                                  ${this.state.selectedOrder.total_amount.toFixed(2)}
                                </Text>
                              </View>
                            </View>
                            <View
                              // marginTop: this.state.isDeviceIsPhone ? 0 : 0,
                              // bottom: this.state.isDeviceIsPhone ? 0 : 0,
                              style={{
                                // bottom: 0,
                                width: '100%',
                                paddingHorizontal: 20,
                                marginTop:20

                              }}>
                              <Button
                                style={[styles.btn3, { borderRadius: 10, marginHorizontal: 20 }]}

                                onPress={() => { { this.printScreen() } }}
                              >
                                <Text style={styles.btnText}>Print</Text>
                              </Button>
                            </View>
                          </View>
                        </>
                      )}
                    </View>

                  )}
              </Modal.Body>
            </Modal.Content>
          </Modal>

        </>

        {/* position={"center"} */}
        {/* <FloatingAction
        actions={[]}
        style={{marginEnd:200}}
        color="white"
        animated={true}
        distanceToEdge={{vertical:20,horizontal:20}}
        showBackground={false}
        visible={(!this.state.isDeviceIsPhone || this.state.isSideOptionOpen == true) && this.state.selectedOrder}
        floatingIcon={require("../assets/ic_printer.png")}
        onPressMain={item => {
          console.log(`selected button:`);
          this.printScreen()
        }}
        /> */}

      </SafeAreaView>
      // </SafeAreaView>
    );
  }
}

export default HomeScreen;
