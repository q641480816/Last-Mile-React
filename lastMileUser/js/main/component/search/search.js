import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    TouchableWithoutFeedback,
    Easing,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import EvilIcons from "react-native-vector-icons/EvilIcons";

import Utils from "../../../common/util";
import {responsiveFontSize} from '../../../common/responsive';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSearch: false,
            searchKey: '',
            placeholder: '',
            cancel: '',
            config: {
                barWidth: new Animated.Value(Utils.size.width),
                boxRightMargin: new Animated.Value(5)
            },
            content: {},
            options: {},
            dimension: {}
        };

        this.onFocus = this.onFocus.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            placeholder: this.props.placeholder,
            cancel: this.props.cancel,
            config: {
                barWidth: new Animated.Value(this.props.dimension.width),
                boxRightMargin: new Animated.Value(5)
            },
            dimension: this.props.dimension,
            options: this.props.options
        });
    }

    onFocus() {
        if (!this.state.options.static && !this.state.isSearch) {
            this.setState({isSearch: true});
            Animated.parallel([
                Animated.timing(this.state.config.barWidth, {
                    toValue: this.state.dimension.width - 70,
                    duration: 300,
                    easing: Easing.spring
                }),
                Animated.timing(this.state.config.boxRightMargin, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.spring
                })
            ]).start(() => console.log(""));
        }
    }

    onCancel() {
        this.setState({isSearch: false, searchKey: ''});
        Animated.parallel([
            Animated.timing(this.state.config.barWidth, {
                toValue: this.state.dimension.width,
                duration: 300,
                easing: Easing.spring
            }),
            Animated.timing(this.state.config.boxRightMargin, {
                toValue: 5,
                duration: 300,
                easing: Easing.spring
            })
        ]).start(() => console.log(""));
    }

    onTextChange(text) {

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onFocus}>
                    <Animated.View style={[styles.searchBox, {
                        width: this.state.config.barWidth,
                        height: this.state.dimension.height
                    }]}>
                        <Animated.View style={[styles.searchBody,
                            {
                                alignItems: this.state.isSearch || this.state.options.isClicked ? 'flex-start' : 'center',
                                marginRight: this.state.config.boxRightMargin,
                                height: this.state.dimension.height - 5
                            }]}>
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <EvilIcons name={this.state.options.iconName} size={33}/>
                                <TextInput style={{
                                    marginLeft: 1,
                                    fontSize: responsiveFontSize(2.2),
                                    display: !this.state.isSearch ? "none" : 'flex',
                                    width: this.state.dimension.width - 100
                                }}
                                           placeholder={this.state.placeholder}
                                           underlineColorAndroid={'transparent'}
                                           onChangeText={(text) => this.onTextChange(text)}
                                />
                                <Text style={{
                                    marginLeft: 1,
                                    fontSize: responsiveFontSize(2.2),
                                    display: !this.state.options.static ? "none" : 'flex',
                                    width: this.state.dimension.width - 100
                                }}>{this.state.placeholder}</Text>
                            </View>
                        </Animated.View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onCancel}>
                    <View style={{height: 35, width: 70, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            fontSize: responsiveFontSize(2),
                            color: Utils.colors.tertiaryColor
                        }}>{this.state.cancel}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    searchBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    searchBody: {
        flex: 1,
        marginLeft: 5,
        marginBottom: 3.5,
        marginTop: 3.5,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        justifyContent: 'center',
    }
});

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    dimension: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
};
