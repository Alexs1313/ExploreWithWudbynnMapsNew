import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, View } from 'react-native';
import WudbynnHomeScreen from '../screens/tab/WudbynnHomeScreen';
import WudbynnPlacesScreen from '../screens/tab/WudbynnPlacesScreen';
import WudbynnSavedScreen from '../screens/tab/WudbynnSavedScreen';
import WudbynnMapScreen from '../screens/tab/WudbynnMapScreen';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#FF0000', '#CC0000', '#990000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabBarBg}
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tabBarBorder}
              ></LinearGradient>
            </LinearGradient>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="WudbynnHomeScreen"
        component={WudbynnHomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../assets/icons/home.png')} />
            ) : (
              <Image source={require('../assets/icons/homeActive.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="WudbynnPlacesScreen"
        component={WudbynnPlacesScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../assets/icons/places.png')} />
            ) : (
              <Image source={require('../assets/icons/placesActive.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="WudbynnSavedScreen"
        component={WudbynnSavedScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../assets/icons/saved.png')} />
            ) : (
              <Image source={require('../assets/icons/savedActive.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="WudbynnMapScreen"
        component={WudbynnMapScreen}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ focused }) =>
            !focused ? (
              <Image source={require('../assets/icons/map.png')} />
            ) : (
              <Image source={require('../assets/icons/mapActive.png')} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarBg: { height: 105, borderRadius: 24 },
  tabBarBorder: {
    height: Platform.OS === 'ios' ? 105 : 100,
    padding: 3,
    margin: Platform.OS === 'android' && 3,
    borderRadius: 22,
  },
  tabBar: {
    paddingTop: 30,
    elevation: 0,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    borderTopWidth: 0,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'ios' ? 2 : 22,
  },
  gradientBorder: {
    width: 52,
    height: 52,
    borderRadius: 20,
  },
  gradientInner: {
    borderRadius: 20,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
  },
});

export default BottomTabsNavigation;
