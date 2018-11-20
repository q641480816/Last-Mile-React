import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';

import Util from '../../common/util';
import {responsiveFontSize} from '../../common/responsive';
import Search from "../component/search/search";
import Ripple from "react-native-material-ripple";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

export default class SearchLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'From',
            isFrom: true
        };

        this.onInputClick = this.onInputClick.bind(this);
    }

    onInputClick = (isFrom) => {
        this.setState({
            isFrom: isFrom
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: Util.size.height * 0.025, backgroundColor: 'white'}}/>
                <View style={[styles.inputContainer]}>
                    <View style={styles.inputBox} onPress={this.openSearchLocation}>
                        <View style={styles.iconWrapper}>
                            <FontAwesome5 name={"dot-circle"} size={25} color={"blue"}/>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput style={{fontSize: responsiveFontSize(this.state.isFrom ? 2.7 : 2), color: !this.state.isFrom? "gray" : "black"}}
                                       placeholder={"From"}
                                       onFocus={() => this.onInputClick(true)}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={{flex: 1}}/>
                        <View style={{flex: 6, borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginRight: 30}}/>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.iconWrapper}>
                            <Entypo name={"location-pin"} size={27.5} color={'red'}/>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={{fontSize: responsiveFontSize(this.state.isFrom ? 2 : 2.7), color: this.state.isFrom? "gray" : "black"}}
                                placeholder={"I'm Going To ..."}
                                onFocus={() => this.onInputClick(false)}
                            />
                        </View>
                    </View>
                </View>
                <View style={{height: Util.size.height * 0.01}}/>
                <View style={styles.searchContent}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    content: {
        flex: 9
    },
    inputContainer: {
        height: Util.size.height * 0.18,
        width: Util.size.width,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    inputBox: {
        flex: 1,
        flexDirection: 'row'
    },
    iconWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 6,
        justifyContent: 'center',
    },
    searchContent: {
        height: Util.size.height * 0.785,
        width: Util.size.width,
        flexDirection: 'column',
        backgroundColor: 'white'
    }
});

