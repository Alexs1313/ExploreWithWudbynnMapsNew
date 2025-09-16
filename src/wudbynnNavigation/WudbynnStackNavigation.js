import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigation from './BottomTabsNavigation';
import WelcomeScreen from '../wudbynnScreens/wudbynnStackScreens/WelcomeScreen';
import StartWudbynnQuizScreen from '../wudbynnScreens/wudbynnStackScreens/StartWudbynnQuizScreen';
import WudbynnGameplayScreen from '../wudbynnScreens/wudbynnStackScreens/WudbynnGameplayScreen';
import WudbynnRecommendedPlaces from '../wudbynnScreens/wudbynnStackScreens/WudbynnRecommendedPlaces';
import WudbynnPlaceDetailsScreen from '../wudbynnScreens/wudbynnStackScreens/WudbynnPlaceDetailsScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="BottomTabsNavigation"
        component={BottomTabsNavigation}
      />
      <Stack.Screen
        name="StartWudbynnQuizScreen"
        component={StartWudbynnQuizScreen}
      />
      <Stack.Screen
        name="WudbynnGameplayScreen"
        component={WudbynnGameplayScreen}
      />
      <Stack.Screen
        name="WudbynnRecommendedPlaces"
        component={WudbynnRecommendedPlaces}
      />
      <Stack.Screen
        name="WudbynnPlaceDetailsScreen"
        component={WudbynnPlaceDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
