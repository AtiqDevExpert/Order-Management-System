import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {
    Button,
    Modal,
    VStack,
    HStack,
    Text,
    Radio,
    Center,
    NativeBaseProvider,
} from 'native-base';
import {colors, styles} from '../style/main'

export default class AppPopup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Modal isOpen={true} size="lg" style={{backgroundColor:'#191b28bf'}}>
        <Modal.Content maxWidth="350" style={{backgroundColor: colors.lightDarkBackground, borderRadius:30}}>
          {/* <Modal.CloseButton /> */}
          {/* <Modal.Header>Order</Modal.Header> */}
          <Modal.Body>
            <View style={[styles.ph30, styles.pv30]}>
              <View style={styles.jcacfr}>
                 <>
                {this.props.icon}
                </>
              </View>
                <View>
                    <Text style={[styles.popupTitle, styles.mt30]}>
                    {this.props.title}
                    </Text>
                    <Text style={[styles.popupDescription, styles.mt10]}>
                    {this.props.description}
                    </Text>
                </View>
                <View style={[styles.mt30]}>
                <Button
                    onPress={() => {
                        this.props.onBtnClick()
                    }}
                    style={[styles.btn]}
                >
                  <Text style={styles.btnText}>{this.props.btnText}</Text>
                    
                </Button>
                </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }
}
