import {
    Dimensions,
} from 'react-native';
import Polyline from "@mapbox/polyline";

const ReactN = require('react-native');
const {Platform} = ReactN;

const Util = {
    googleDreactionApiKey: 'AIzaSyCyd1SXDqT5R1u1KT8t9PYc7xl7kHl-3t0',
    contact: 98674817,
    colors: {
        primaryColor: '#222B2F',
        secondaryColor: '#4A5357',
        tertiaryColor: '#B0C4DE'
    },
    //nav
    navigation: null,
    //global system config
    Platform: ReactN,
    OS: Platform.OS,
    size: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch('http://35.247.175.250:8080/last-mile-app/' + url)
                .then((res) => {
                    resolve(JSON.parse(res._bodyText));
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })

    },
    post: (url) => {
        return new Promise((resolve, reject) => {
            fetch('http://35.247.175.250:8080/last-mile-app/' + url,{method: 'POST'})
                .then((res) => {
                    resolve(JSON.parse(res._bodyText));
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    },
    getDistance: (station, userLocation) => {
        let getRadian = (degree) => {
            return degree * Math.PI / 180.0;
        };
        let radLat1 = getRadian(station.latitude);
        let radLat2 = getRadian(userLocation.latitude);
        let a = radLat1 - radLat2;
        let b = getRadian(station.longitude) - getRadian(userLocation.longitude);
        let cal = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1)
            * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        return cal * 6378.1370;
    },
    getShortestDistance: (stations, userLocation) => {
        let shortest = Number.MAX_SAFE_INTEGER;
        let station = null;
        stations.forEach((s) => {
            let cal = Util.getDistance(s, userLocation);
            if (shortest > cal){
                shortest = cal;
                station = s;
            }
        });
        return station;
    },
    getRoute: (start, end) => {
        return new Promise((resolve, reject) => {
            fetch('https://maps.googleapis.com/maps/api/directions/json?origin=' + start.latitude + "," + start.longitude + '&destination=' + end.latitude + "," + end.longitude + "&key=" + Util.googleDreactionApiKey)
                .then((res) => {
                    let result = JSON.parse(res._bodyText);
                    let points = Polyline.decode(result.routes[0].overview_polyline.points);
                    let pointsRefine = [];
                    points.forEach((c) => {
                        pointsRefine.push({latitude: c[0], longitude: c[1]});
                    });
                    resolve(pointsRefine);
                })
                .catch(e => reject(e));
        })
    }
};

export default Util;
