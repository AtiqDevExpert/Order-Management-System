import React, { Component } from 'react';
import {StatusBar} from 'react-native';
import { colors } from '../style/main';

export default class AppStatusBar extends Component  {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            
            <StatusBar backgroundColor={this.props.backgroundColor?this.props.backgroundColor : colors.primary}></StatusBar>

        );
    }
}

