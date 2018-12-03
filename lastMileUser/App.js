/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StackNavigator,NavigationActions} from 'react-navigation';

import UserHome from "./js/main/userHome/userHome";
import SearchLocation from './js/main/searchLocation/searchLocation';

export default App = StackNavigator({
    UserHome: {
        screen: UserHome,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
    SearchLocation: {
        screen: SearchLocation,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
});

