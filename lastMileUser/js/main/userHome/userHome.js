import React, {Component} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
    StyleSheet,
    View,
    AsyncStorage,
    TextInput,
    Text
} from 'react-native';
import SockJs from 'sockjs-client';
import {Stomp} from 'stompjs/lib/stomp';

import Util from '../../common/util';
import carIcon from '../../common/1.png';
import SearchContent from "./searchContent";
import {responsiveFontSize} from "../../common/responsive";
import {Button, Dialog, DialogDefaultActions, Toolbar} from "react-native-material-ui";

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
            coords: [],
            contact: null,
            isEditingContact: true
        };

        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.getStations = this.getStations.bind(this);
        this.renderBox = this.renderBox.bind(this);
        this.buildCarSocket = this.buildCarSocket.bind(this);
        this.initCars = this.initCars.bind(this);
        this.updateCars = this.updateCars.bind(this);
        this.updateRoutes = this.updateRoutes.bind(this);
        this.renderRoutes = this.renderRoutes.bind(this);
        this.renderNumber = this.renderNumber.bind(this);
    };

    componentWillMount() {
        this.getStations();
        this.buildCarSocket();
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
                        // latitude: location.coords.latitude,
                        // longitude: location.coords.longitude,
                        latitude: 1.299044,
                        longitude: 103.845699,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.10,
                    }
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    componentWillUnmount() {
        this.stompClient.disconnect((e) => {
            console.log("disconnect....")
        });
        this.socket.close();
    }

    buildCarSocket = () => {
        this.socket = new SockJs(`http://35.247.175.250:8080/last-mile-app/gs-guide-websocket`);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect({}, (frame) => {
            this.stompClient.subscribe('/topic/location', (list) => {
                if (this.state.cars.length === 0) {
                    this.initCars(JSON.parse(list.body))
                } else {
                    this.updateCars(JSON.parse(list.body));
                }
            });
            this.stompClient.subscribe('/topic/passenger', (list) => {
                if (!this.state.isEditingContact){
                    let result = JSON.parse(list.body);
                    if (result[this.state.contact] != null) {
                        this.control.assign(result[this.state.contact]);
                    }
                }
            });
        }, (error) => {
            alert(error);
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

    initCars = (carsRaw) => {
        let cars = [];
        carsRaw.forEach((c) => {
            cars.push(<Marker ref={ref => {
                this["car" + c.plateNum] = ref;
            }} coordinate={{latitude: c.latitude, longitude: c.longitude}} key={c.plateNum}
                              image={carIcon}/>)
        });
        this.setState({
            cars: cars
        });
    };

    updateCars = (cars) => {
        cars.forEach((c) => {
            this["car" + c.plateNum].animateMarkerToCoordinate({latitude: c.latitude, longitude: c.longitude}, 200)
        })
    };


    getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(location => resolve(location), e => reject(e));
        });
    };

    renderBox = () => {
        if (!this.state.isEditingContact){
            return <SearchContent ref={ref => {
                this.control = ref;
            }} navigation={this.props.navigation} userLocation={this.state.userLocation}
                                  stations={this.state.stations} updateRoute={this.updateRoutes} contact={this.state.contact}/>
        }
    };

    renderNumber = () => {
        if (this.state.isEditingContact){
            return(<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Dialog>
                    <Dialog.Title><Text>Enter Contact Number</Text></Dialog.Title>
                    <Dialog.Content>
                        <TextInput style={{
                            fontSize: responsiveFontSize(2),
                            color: "black"
                        }}
                                   placeholder={"Contact Number"}
                                   value={this.state.contact}
                                   onChangeText={(text) => this.setState({contact: text})}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <DialogDefaultActions
                            actions={['Confirm']}
                            onActionPress={() => {
                                this.setState({
                                    isEditingContact: false
                                })
                            }}
                        />
                    </Dialog.Actions>
                </Dialog>
            </View>)
        }
    };

    renderRoutes = () => {
        if (this.state.coords.length === 0) {
            return <View/>
        } else {
            return (
                <MapView.Polyline
                    coordinates={this.state.coords}
                    strokeWidth={5}
                    strokeColor="red"/>
            )
        }
    };

    updateRoutes = (coords) => {
        this.setState({
            coords: coords
        })
    };

    render() {
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
                        {this.state.cars}
                        {this.renderRoutes()}
                    </View>
                </MapView>
                {this.renderBox()}
                {this.renderNumber()}
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
