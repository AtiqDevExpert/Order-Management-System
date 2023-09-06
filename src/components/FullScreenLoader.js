import { View } from 'native-base';
import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

class FullScreenLoader extends Component {

    render() {
        return (
            <View>
                <Spinner
                    visible={this.props.showLoader}
                    textContent={this.props.text}
                    textStyle={{color: '#FFF', textAlign:'center'}}
                    />
            </View>
        )
    }
}
export default FullScreenLoader;
