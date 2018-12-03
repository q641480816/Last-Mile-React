import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from "react-native-material-ui";
import Ripple from "react-native-material-ripple";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

import Util from '../../common/util';
import {responsiveFontSize} from '../../common/responsive';

export default class SearchContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.10,
                longitudeDelta: 0.10,
            },
            selectedStation: null,
            selectedNode: null,
            stations: []
        };

        this.openSearchLocation = this.openSearchLocation.bind(this);
        this.routeSelected = this.routeSelected.bind(this);

    }

    componentWillMount() {
        this.setState({
            stations: this.props.stations,
            userLocation: this.props.userLocation,
            selectedStation: Util.getShortestDistance(this.props.stations, this.props.userLocation)
        })
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stations: nextProps.stations,
            userLocation: nextProps.userLocation,
            selectedStation: Util.getShortestDistance(nextProps.stations, nextProps.userLocation)
        });
    }

    routeSelected = (station, node) => {
        this.setState({
            selectedStation: station,
            selectedNode: node
        });
        console.log(station);
        console.log(node);
    };

    openSearchLocation = () => {
        this.props.navigation.navigate("SearchLocation", {
            userLocation: this.state.userLocation,
            routeSelected: this.routeSelected
        });
    };

    render() {
        return (
            <View style={styles.content}>
                <Card style={styles.card}>
                    <View style={[styles.inputContainer]}>
                        <Ripple style={styles.inputBox} onPress={this.openSearchLocation}>
                            <View style={styles.iconWrapper}>
                                <FontAwesome5 name={"dot-circle"} size={25} color={"blue"}/>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text
                                    style={{fontSize: responsiveFontSize(2), color: 'black'}}>{this.state.selectedStation ? this.state.selectedStation.name : 'Select Station'}</Text>
                            </View>
                        </Ripple>
                        <View style={{flexDirection: "row"}}>
                            <View style={{flex: 1}}/><View
                            style={{flex: 6, borderBottomColor: '#D3D3D3', borderBottomWidth: 1, marginRight: 30}}/>
                        </View>
                        <Ripple style={styles.inputBox} onPress={this.openSearchLocation}>
                            <View style={styles.iconWrapper}>
                                <Entypo name={"location-pin"} size={27.5} color={'red'}/>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={{
                                    fontSize: responsiveFontSize(this.state.selectedNode ? 2 : 2.5),
                                    color: this.state.selectedNode ? "black" : "gray"
                                }}>{this.state.selectedNode ? this.state.selectedNode.name : 'I\'m Going To ...'}</Text>
                            </View>
                        </Ripple>
                    </View>
                </Card>
            </View>
        )
    }
}

SearchContent.propTypes = {
    navigation: PropTypes.object.isRequired,
    stations: PropTypes.array,
    userLocation: PropTypes.object
};

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: Util.size.height * 0.77,
        width: Util.size.width,
        zIndex: 100
    },
    inputContainer: {
        height: Util.size.height * 0.18,
        width: Util.size.width * 0.95,
        flexDirection: 'column',
        flex: 1,
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
    }
});
