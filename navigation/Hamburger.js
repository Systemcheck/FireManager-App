import {
 createAppContainer,
 createDrawerNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/Home/HomeScreen';
import TestScreen from '../screens/Test';
const HamburgerNavigation = createDrawerNavigator(
    {
        BlueScreen: TestScreen,
        DefaultScreen: {
            screen: HomeScreen,
        }
    },
    {
        initialRouteName: 'DefaultScreen',
        
        
    }
 );
export default createAppContainer(HamburgerNavigation);