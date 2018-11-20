import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {Card} from 'react-native-material-ui';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Ripple from 'react-native-material-ripple';

import Util from '../../common/util';
import {responsiveFontSize} from '../../common/responsive';

class UserHome extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.openSearchLocation = this.openSearchLocation.bind(this);
    };

    openSearchLocation = () => {
        this.props.navigation.navigate("SearchLocation",{});
    };

    render() {
        return (
            <View style={[styles.container]}>
                <MapView
                    showsUserLocation={true}
                    followsUserLocation={true}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsMyLocationButton={true}
                    style={styles.map}
                >
                </MapView>
                <View style={styles.content}>
                    <Card style={styles.card}>
                        <View style={[styles.inputContainer]}>
                            <Ripple style={styles.inputBox} onPress={this.openSearchLocation}>
                                <View style={styles.iconWrapper}>
                                    <FontAwesome5 name={"dot-circle"} size={25} color={"blue"}/>
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Text style={{fontSize: responsiveFontSize(2)}}>test location</Text>
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
                                    <Text style={{fontSize: responsiveFontSize(2.5), color: "gray"}}>I'm Going To ...</Text>
                                </View>
                            </Ripple>
                        </View>
                    </Card>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
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

export default UserHome;

/*
this.setState({
            lat: this.props.latitude!=null? this.props.latitude: 37.78825,
            lng: this.props.longitude!=null ? this.props.longitude: -122.4324,
            latitudeDelta: 0.015*5,
            longitudeDelta: 0.0121*5,
        });
 */
