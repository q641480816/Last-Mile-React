import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from "react-native-material-ui";
import Ripple from "react-native-material-ripple";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Button} from 'react-native-material-ui';
import Polyline from '@mapbox/polyline';

import driving_icon from '../../common/driving.gif';
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
            stations: [],
            userStatus: 'unrequested',
            driver: {plateNum: 'SBS2663'},
            contact: null
        };

        this.openSearchLocation = this.openSearchLocation.bind(this);
        this.routeSelected = this.routeSelected.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.request = this.request.bind(this);
        this.onboard = this.onboard.bind(this);
        this.arrive = this.arrive.bind(this);
        this.initUserInfo = this.initUserInfo.bind(this);
        this.assign = this.assign.bind(this);
        this.dispatch = this.dispatch.bind(this);

    }

    componentWillMount() {
        this.setState({
            stations: this.props.stations,
            userLocation: this.props.userLocation,
            selectedStation: Util.getShortestDistance(this.props.stations, this.props.userLocation),
            contact: this.props.contact
        })
    }

    componentDidMount() {
        this.initUserInfo();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contact: nextProps.contact,
            stations: nextProps.stations,
            userLocation: nextProps.userLocation,
            selectedStation: this.state.userStatus === 'unrequested' ? Util.getShortestDistance(nextProps.stations, nextProps.userLocation) : this.state.selectedStation
        });
    }

    initUserInfo = () => {
        Util.get('drivers/passenger?contact=' + this.state.contact)
            .then((res) => {
                if (res.station != null && res.node != null) {
                    Util.getRoute(res.station, res.node)
                        .then(result => this.props.updateRoute(result))
                        .catch(e => console.log(e))
                }
                this.setState({
                    selectedStation: res.station == null ? Util.getShortestDistance(this.props.stations, this.props.userLocation) : res.station,
                    selectedNode: res.node,
                    driver: res.driver,
                    userStatus: res.status
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };

    request = () => {
        Util.post('drivers/request?stationId=' + this.state.selectedStation.id + '&nodeId=' + this.state.selectedNode.id + '&contact=' + this.state.contact)
            .then((res) => {
                if (res.status) this.setState({userStatus: 'requested'})
            }).catch(e => console.log(e));
    };

    assign = (driver) => {
        if (this.state.userStatus === 'requested') {
            this.setState({
                userStatus: 'assigned',
                driver: driver
            })
        }
        if (driver.status === 'driving' && this.state.userStatus === 'onboard') {
            this.setState({
                userStatus: 'driving',
                driver: driver
            })
        }
    };

    onboard = () => {
        Util.post('drivers/onboard?plateNum=' + this.state.driver.plateNum + '&contact=' + this.state.contact)
            .then((res) => {
                if (res.status) this.setState({userStatus: 'onboard'})
            }).catch(e => console.log(e));
    };

    dispatch = () => {
        console.log(this.state.userStatus);
        if (this.state.userStatus === 'assigned') {
            this.setState({
                userStatus: 'driving',
            })
        }
    };

    arrive = () => {
        this.setState({
            selectedStation: Util.getShortestDistance(this.state.stations, this.state.userLocation),
            selectedNode: null,
            userStatus: 'unrequested',
            driver: null
        });
        this.props.updateRoute([]);
    };

    routeSelected = (station, node) => {
        Util.getRoute(station, node)
            .then((result) => {
                    this.props.updateRoute(result);
                    this.setState({
                        selectedStation: station,
                        selectedNode: node
                    });
                }
            )
            .catch(e => console.log(e));
    };

    openSearchLocation = () => {
        if (this.state.userStatus === "unrequested") {
            this.props.navigation.navigate("SearchLocation", {
                userLocation: this.state.userLocation,
                routeSelected: this.routeSelected
            });
        }
    };

    renderContent = () => {
        switch (this.state.userStatus) {
            case 'unrequested':
            case 'requested':
                return (
                    <View style={[styles.inputContainer]}>
                        <View style={{height: Util.size.height * 0.18}}>
                            <Ripple style={styles.inputBox} onPress={this.openSearchLocation}>
                                <View style={styles.iconWrapper}>
                                    <FontAwesome5 name={"dot-circle"} size={25} color={"blue"}/>
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(2),
                                            color: 'black'
                                        }}>{this.state.selectedStation ? this.state.selectedStation.name : 'Select Station'}</Text>
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
                        <View style={{
                            width: Util.size.width * 0.95,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Util.size.height * 0.07
                        }}>
                            <Button raised
                                    text={this.state.userStatus === 'unrequested' ? "Request Booking" : 'Requesting ....'}
                                    style={{container: {width: Util.size.width * 0.75}}}
                                    disabled={this.state.selectedNode == null || this.state.selectedStation == null || this.state.userStatus === 'requested'}
                                    onPress={this.request}
                            />
                        </View>
                    </View>
                );
            case 'assigned':
            case 'onboard':
                return (
                    <View style={[styles.inputContainer]}>
                        <View style={{height: Util.size.height * 0.18}}>
                            <View style={styles.wrapper}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <MaterialCommunityIcons name={"bus-clock"} size={45} color={'black'}/>
                                    <Text style={{
                                        fontSize: responsiveFontSize(3),
                                    }}>{"     " + this.state.driver.plateNum}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: Util.size.width * 0.95,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Util.size.height * 0.07
                        }}>
                            <Button raised
                                    text={this.state.userStatus === 'assigned' ? 'I have on-boarded' : 'On-boarded, waiting dispatch'}
                                    style={{container: {width: Util.size.width * 0.75}}}
                                    disabled={this.state.userStatus === 'onboard'}
                                    onPress={this.onboard}
                            />
                        </View>
                    </View>
                );
            case 'driving':
                return (
                    <View style={[styles.inputContainer]}>
                        <View style={{height: Util.size.height * 0.18}}>
                            <View style={styles.wrapper}>
                                <Image source={driving_icon} style={{
                                    height: Util.size.height * 0.18,
                                    width: Util.size.height * 0.18 / 72 * 128
                                }}/>
                            </View>
                        </View>
                        <View style={{
                            width: Util.size.width * 0.95,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Util.size.height * 0.07
                        }}>
                            <Button raised
                                    text={'I have safely arrived'}
                                    style={{container: {width: Util.size.width * 0.75}}}
                                    onPress={this.arrive}
                            />
                        </View>
                    </View>
                )
        }
    };

    render() {
        return (
            <View style={styles.content}>
                <Card style={styles.card}>
                    <View style={[styles.inputContainer]}>
                        {this.renderContent()}
                    </View>
                </Card>
            </View>
        )
    }
}

SearchContent.propTypes = {
    navigation: PropTypes.object.isRequired,
    stations: PropTypes.array,
    userLocation: PropTypes.object,
    updateRoute: PropTypes.func.isRequired,
    contact: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: Util.size.height * 0.7,
        width: Util.size.width,
        zIndex: 100
    },
    inputContainer: {
        height: Util.size.height * 0.25,
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
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
