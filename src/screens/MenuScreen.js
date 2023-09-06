import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {colors, styles} from '../style/main';
import AppStatusBar from '../components/AppStatusBar';
import {BackIcon} from '../icons/main';
import {Switch, FlatList} from 'native-base';

import FullScreenLoader from '../components/FullScreenLoader';
import {showToast} from '../utils/utils';
import {callPutApi} from '../services/apiservice';
import {getStoreId} from '../services/userservice';
import * as constants from '../constants/apis';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventBus from 'react-native-event-bus';
import {position} from 'styled-system';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allListItems: [],
      isLoading: false,
      isLoadingFullScreen: false,
    };
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

  componentDidMount() {
    this.getAllMenuItem();
  }

  getAllMenuItem() {
    this.changeLoadingState(true);
    let reqBody = {
      store_id: getStoreId(),
    };
    let url = constants.APIS.GET_MENU_ITEMS;
    callPutApi(url, reqBody)
      .then(response => {
        if (response.data && response.data) {
          let list = [];
          response.data.categories.forEach(menu => {
            if (menu.items) {
              menu.items.forEach(menuItem => {
                list.push({...menuItem, category_name: menu.category});
              });
            }
          });
          this.setState({allListItems: list});
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
          showToast('Unable to process your request!');
        }
      });
  }

  updateItemAvailableStatus(isAvailabe, item_id) {
    this.changeLoadingStateFillScreen(true);
    // let allMenu = this.state.allListItems;
    // let index = allMenu.findIndex(item => item.item_id === item_id);
    // if (index !== -1) {
    //   allMenu[index].available = isAvailabe;
    //   this.setState({
    //     allListItems: allMenu,
    //   });
    // }
    let url = constants.APIS.UPDATE_MENU_ITEM_AVAILABE_STATUS;
    let reqBody = {
      store_id: getStoreId(),
      item_id: item_id,
      available: isAvailabe,
    };
    callPutApi(url, reqBody)
      .then(response => {
        this.changeLoadingStateFillScreen(false);
        if (response.data && response.data) {
          let allMenu = this.state.allListItems;
          let index = allMenu.findIndex(item => item.item_id === item_id);
          if (index !== -1) {
            allMenu[index].available = isAvailabe;
            this.setState({
              allListItems: allMenu,
            });
          }
          showToast('Item status has been updated!');
        } else if (response.data.message) {
          // let allMenu = this.state.allListItems;
          // let index = allMenu.findIndex(item => item.item_id === item_id);
          // if (index !== -1) {
          //   allMenu[index].available = !isAvailabe;
          //   this.setState({
          //     allListItems: allMenu,
          //   });
          // }
          showToast(response.data.message);
        } else {
          // let allMenu = this.state.allListItems;
          // let index = allMenu.findIndex(item => item.item_id === item_id);
          // if (index !== -1) {
          //   allMenu[index].available = !isAvailabe;
          //   this.setState({
          //     allListItems: allMenu,
          //   });
          // }
          showToast('Unable to process your request!');
        }
      })
      .catch(err => {
        let allMenu = this.state.allListItems;
        let index = allMenu.findIndex(item => item.item_id === item_id);
        if (index !== -1) {
          allMenu[index].available = !isAvailabe;
          this.setState({
            allListItems: allMenu,
          });
        }
        this.changeLoadingStateFillScreen(false);
        if (err.response && err.response.data && err.response.data.message) {
          showToast(err.response.data.message);
        } else {
          showToast('Unable to process your request!');
        }
      });
  }

  render() {
    return (
      <SafeAreaView
        style={[styles.f1bcd, {backgroundColor: colors.lightWhite}]}>
        <AppStatusBar backgroundColor={colors.primary} />

        {this.state.isLoadingFullScreen && (
          <FullScreenLoader
            showLoader={this.state.isLoadingFullScreen}
            text="Please wait..."
          />
        )}

        <View
          style={[
            styles.headerShadow,
            {
              backgroundColor: colors.white,
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'flex-start',
            },
          ]}>
          <TouchableOpacity
            style={styles.headerBackArrow}
            onPress={() => {
              EventBus.getInstance().fireEvent('CheckCameBack', {});

              this.props.navigation.goBack({updateValue: true});
            }}>
            <BackIcon color={colors.darkBackground} />
          </TouchableOpacity>
          <Text style={[{fontSize: 18, fontWeight: '700', paddingLeft: 30}]}>
            My Menu
          </Text>
        </View>

        <View>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={false}
                onRefresh={() => {
                  this.getAllMenuItem();
                }}
              />
            }
            data={this.state.allListItems}
            style={{marginTop: 10, marginBottom: 50}}
            contentContainerStyle={{paddingBottom: 30}}
            renderItem={({item}) => (
              <View
                style={[
                  styles.dfjcsbaic,
                  {
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                    paddingBottom: 20,
                  },
                ]}>
                <Text style={{flex: 0.4}}>{item.item_name}</Text>
                <Text style={{flex: 0.3}}>{item.category_name}</Text>
                <Text style={{flex: 0.1}}>${item.item_price}</Text>
                <View>
                  
                  <Switch
                    size="lg"
                    isChecked={item.available}
                    // onValueChange={event => {
                    //   this.updateItemAvailableStatus(event, item.item_id);
                    // }}
                    // onChange={event => {
                    //   // style={{flex:0.2}}
                    //   this.updateItemAvailableStatus(
                    //     event.nativeEvent.value,
                    //     item.item_id,
                    //   );
                    // }}
                  />
                  <TouchableOpacity
                    style={{position : 'absolute',zIndex:1002 , width:50,height:50}} onPress={() => {
                      this.updateItemAvailableStatus(!item.available, item.item_id);
                    }}></TouchableOpacity>
                </View>
              </View>
            )}
          />
          {this.state.isLoading && <ActivityIndicator />}
        </View>
      </SafeAreaView>
    );
  }
}

export default MenuScreen;
