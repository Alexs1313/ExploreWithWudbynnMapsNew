import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { WUDBYNN_PLACES } from '../../data/wudbynnPlaces';
import MapView, { Marker } from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';
import { useCallback } from 'react';
const { height } = Dimensions.get('window');

const Map = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <Layout>
      <View style={[styles.container]}>
        <View style={[styles.headWrap]}>
          <LinearGradient
            style={[styles.headBorders]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.headContainer]}>
              <Text style={styles.headText}>Interactive map</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            userInterfaceStyle="dark"
            style={styles.map}
            initialRegion={{
              latitude: 51.4968,
              longitude: -115.9281,
              latitudeDelta: 3.34,
              longitudeDelta: 3.34,
            }}
          >
            {WUDBYNN_PLACES.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() =>
                  navigation.navigate('WudbynnPlaceDetailsScreen', {
                    place: marker,
                    screen: 'Map',
                  })
                }
              >
                {Platform.OS === 'ios' ? (
                  <Image source={require('../../assets/icons/marker.png')} />
                ) : null}
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.066,
    padding: 17,
    paddingBottom: 140,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: height * 0.55,
    borderRadius: 22,
    overflow: 'hidden',
  },
  headBorders: {
    marginBottom: 13,
    borderRadius: 14,
    width: '70%',
  },
  headContainer: {
    height: 87,
    backgroundColor: '#080809',
    margin: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  headText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#fff',
  },
});

export default Map;
