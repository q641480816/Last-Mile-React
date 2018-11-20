import {
    Dimensions,
} from 'react-native';

const ReactN = require('react-native');
const {Platform} = ReactN;

const Util ={
    colors:{
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
};

export default Util;
