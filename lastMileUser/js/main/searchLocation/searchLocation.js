import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Ripple from "react-native-material-ripple";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Util from '../../common/util';
import {responsiveFontSize} from '../../common/responsive';


export default class SearchLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'From',
            userLocation: {latitude: 0, longitude: 0},
            stationText: '',
            nodeText: '',
            isFrom: true,
            stations: [],
            selectedStation: null,
            selectedNode: null,
            nodes: []
        };

        this.onInputClick = this.onInputClick.bind(this);
        this.getStations = this.getStations.bind(this);
        this.renderStationItem = this.renderStationItem.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderNodeItem = this.renderNodeItem.bind(this);
        this.getNode = this.getNode.bind(this);
    }

    componentWillMount() {
        this.setState({
            userLocation: this.props.navigation.getParam('userLocation', {latitude: 0, longitude: 0})
        });
        this.getStations();
    }

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

    getNode = async (stationId) => {
        Util.get('nodes/all?stationId=' + stationId)
            .then((res) => {
                console.log(res);
                this.setState({
                    nodes: res
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };

    onInputClick = (isFrom) => {
        if (this.state.selectedStation != null) {
            this.setState({
                isFrom: isFrom,
                stationText: isFrom ? this.state.stationText : this.state.selectedStation ? this.state.selectedStation.name : ""
            });
        }
    };

    onItemSelect = (isFrom, item) => {
        if (isFrom) {
            this.setState({
                selectedStation: item,
                stationText: item.name,
                isFrom: false,
                nodes: this.state.selectedStation && this.state.selectedStation.id === item.id ? this.state.nodes : []
            });
            this.getNode(item.id);
        } else {
            this.setState({
                selectedNode: item,
                nodeText: item.name
            });
            this.props.navigation.state.params.routeSelected(this.state.selectedStation, item);
            this.props.navigation.goBack();
        }
    };

    renderStationItem = (station) => {
        return (
            <Ripple key={station.id} onPress={() => this.onItemSelect(true, station)}>
                <View style={styles.stationItem}>
                    <View style={styles.stationItemIcon}>
                        <Entypo name={"location-pin"} size={25} color={'grey'}/>
                        <Text style={{
                            fontSize: responsiveFontSize(1.2),
                            marginTop: 1.5
                        }}>{Util.getDistance(station, this.state.userLocation).toFixed(1) + " Km"}</Text>
                    </View>
                    <View style={styles.stationItemContent}>
                        <Text style={{
                            fontSize: responsiveFontSize(2.5),
                        }}>{station.name}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name={"bus-side"} size={25} color={"grey"}/>
                            <Text style={{
                                fontSize: responsiveFontSize(1.2),
                                marginTop: 1.5,
                                marginLeft: 5
                            }}>{station.fleetSize + " bus available"}</Text>
                        </View>
                    </View>
                </View>
            </Ripple>
        )
    };

    renderNodeItem = (node) => {
        return (
            <Ripple key={node.id} onPress={() => this.onItemSelect(false, node)}>
                <View style={styles.stationItem}>
                    <View style={styles.stationItemIcon}>
                        <Entypo name={"location-pin"} size={25} color={'grey'}/>
                    </View>
                    <View style={styles.stationItemContent}>
                        <Text style={{
                            fontSize: responsiveFontSize(2.5),
                        }}>{node.name}</Text>
                    </View>
                </View>
            </Ripple>
        )
    };

    renderList = () => {
        if ((this.state.isFrom && this.state.stations.length !== 0) || (!this.state.isFrom && this.state.nodes.length !== 0)) {
            return (
                <FlatList
                    style={{flex: 1}}
                    data={this.state.isFrom ? this.state.stations : this.state.nodes}
                    renderItem={(s) => {
                        if (s.item.name.toLowerCase().indexOf(this.state.isFrom ? this.state.stationText.toLowerCase() : this.state.nodeText.toLowerCase()) >= 0) {
                            return this.state.isFrom ? this.renderStationItem(s.item) : this.renderNodeItem(s.item);
                        }
                    }}
                    ItemSeparatorComponent={() => {
                        return (<View
                            style={{height: 1, width: "86%", backgroundColor: "#CED0CE", marginLeft: "7%"}}/>);
                    }}
                />
            )
        }else {
            return(
                <View style={{flex: 1, width: Util.size.width, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: responsiveFontSize(2.7)}}>Loading ...</Text>
                </View>
            )
        }
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
                            <TextInput style={{
                                fontSize: responsiveFontSize(this.state.isFrom ? 2.7 : 2),
                                color: !this.state.isFrom && this.state.stationText.length === 0 ? "gray" : "black"
                            }}
                                       placeholder={"From"}
                                       value={this.state.stationText}
                                       onFocus={() => this.onInputClick(true)}
                                       onChangeText={(text) => this.setState({stationText: text})}
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
                                ref={ref => this.nodeInput = ref}
                                style={{
                                    fontSize: responsiveFontSize(this.state.isFrom ? 2 : 2.7),
                                    color: this.state.isFrom && this.state.nodeText.length === 0 ? "gray" : "black"
                                }}
                                placeholder={"I'm Going To ..."}
                                onFocus={() => this.onInputClick(false)}
                                value={this.state.nodeText}
                                onChangeText={(text) => this.setState({nodeText: text})}
                                editable={this.state.selectedStation != null}
                            />
                        </View>
                    </View>
                </View>
                <View style={{height: Util.size.height * 0.01}}/>
                <View style={styles.searchContent}>
                    {this.renderList()}
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
    },
    stationItem: {
        height: 75,
        flexDirection: 'row'
    },
    stationItemIcon: {
        height: 75,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stationItemContent: {
        height: 75,
        flexDirection: 'column',
        flex: 5,
        justifyContent: 'center',
        marginLeft: 12
    }
});

