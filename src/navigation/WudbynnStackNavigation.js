import { createStackNavigator } from '@react-navigation/stack';
import BottomTabsNavigation from './BottomTabsNavigation';
import WelcomeScreen from '../screens/stack/WelcomeScreen';
import StartWudbynnQuizScreen from '../screens/stack/StartWudbynnQuizScreen';
import WudbynnGameplayScreen from '../screens/stack/WudbynnGameplayScreen';
import WudbynnRecommendedPlaces from '../screens/stack/WudbynnRecommendedPlaces';
import WudbynnPlaceDetailsScreen from '../screens/stack/WudbynnPlaceDetailsScreen';

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
