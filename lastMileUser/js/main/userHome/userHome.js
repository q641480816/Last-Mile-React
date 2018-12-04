import React, {Component} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
    StyleSheet,
    View,
} from 'react-native';

import Util from '../../common/util';
import carIcon from '../../common/1.png';
import SearchContent from "./searchContent";

class UserHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userLocation: {
                latitude: 0,
                longitude: 0,
            },
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.10,
                longitudeDelta: 0.10,
            },
            cars: [],
            stations: [],
            state: 1
        };

        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.getCars = this.getCars.bind(this);
        this.getStations = this.getStations.bind(this);
        this.renderBox = this.renderBox.bind(this);
    };

    componentWillMount() {
        this.getStations();
    }

    componentDidMount() {
        //zoom to user
        this.getCurrentLocation()
            .then((location) => {
                this.setState({
                    userLocation: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                    region: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.10,
                    }
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    getStations = () => {
        Util.get('stations/all')
            .then((res) => {
                this.setState({
                    stations: res
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };

    getCars = () => {
        let position = {latitude: this.state.region.latitude, longitude: this.state.region.longitude};
        let random = Math.floor((Math.random() * 10) + 1);
        let cars = [];
        for (let i = 0; i < random; i++) {
            let lat = Math.random() * 3 / 100;
            let long = Math.random() * 3 / 100;
            cars.push({
                latitude: Math.random() <= 0.5 ? position.latitude + lat : position.latitude - lat,
                longitude: Math.random() <= 0.5 ? position.longitude + long : position.longitude - long,
                id: i
            })
        }

        return cars.map((c) => <Marker coordinate={c} key={c.id} image={carIcon}/>)
    };

    getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(location => resolve(location), e => reject(e));
        });
    };

    renderBox = () => {
        if (this.state.state === 1) {
            return <SearchContent navigation={this.props.navigation} userLocation={this.state.userLocation}
                                  stations={this.state.stations}/>
        }
    };

    render() {
        let marker = this.getCars();
        return (
            <View style={[styles.container]}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.region}
                    region={this.state.region}
                >
                    <View>
                        {marker}
                    </View>
                </MapView>
                {this.renderBox()}
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
    }
});

export default UserHome;
