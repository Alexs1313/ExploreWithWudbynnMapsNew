import {
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import GradientBordersContainer from '../../components/GradientBordersContainer';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GradientBtnS from '../../components/GradientBtnS';
import { useStore } from '../../store/context';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';

const { height } = Dimensions.get('window');

const WudbynnPlaceDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { place, screen } = route.params;
  const [toggleIcon, setToggleIcon] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [coords, setCoords] = useState([]);
  const [showRoute, setShowRoute] = useState(false);

  const { savePlace, getPlaces, deletePlace } = useStore();

  useFocusEffect(
    useCallback(() => {
      getPlaces();
      renderSavedPlaces(place);
    }, []),
  );

  useEffect(() => {
    const getRoute = async () => {
      const response = await fetch(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyDU9BVwbP1PaxH77r2WhYIunL23CLo0_Mw',
            'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: 53.5461,
                  longitude: -113.4938,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: place.latitude,
                  longitude: place.longitude,
                },
              },
            },
            travelMode: 'DRIVE',
            routingPreference: 'TRAFFIC_AWARE',
            polylineEncoding: 'ENCODED_POLYLINE',
          }),
        },
      );

      const data = await response.json();
      const encodedPolyline = data.routes[0].polyline.encodedPolyline;
      const decodedPoints = polyline
        .decode(encodedPolyline)
        .map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
      setCoords(decodedPoints);
    };

    getRoute();
  }, []);

  const toggleSavedPlaces = () => {
    if (toggleIcon) deletePlace(place), setToggleIcon(false);
    else savePlace(place), setToggleIcon(true);
  };

  const shareWudbynnPlaceInfo = async () => {
    try {
      await Share.share({
        message: `${place.name}
${place.latitude}° N ${place.longitude}° W 
${place.description}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  const renderSavedPlaces = async item => {
    const jsonValue = await AsyncStorage.getItem('wudbynnPlaces');

    const saved = JSON.parse(jsonValue);

    if (saved != null) {
      let filtered = saved.find(fav => fav.id === item.id);

      return filtered == null ? setToggleIcon(false) : setToggleIcon(true);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              style={[styles.borders]}
              colors={['#FF0000', '#CC0000', '#990000']}
            >
              <View style={[styles.gradContainer]}>
                <Image source={require('../../assets/icons/back.png')} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            style={[styles.headBorders]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.headContainer]}>
              {screen === 'Map' && (
                <Text style={styles.headText}>Interactive map</Text>
              )}
              {screen === 'Saved' && (
                <Text style={styles.headText}>Saved places</Text>
              )}
              {screen === 'Rec' && (
                <Text style={styles.headText}>Recommended places</Text>
              )}
            </View>
          </LinearGradient>
        </View>

        <View>
          <GradientBordersContainer
            style={{
              paddingTop: 17,
              margin: 3,
              paddingBottom: 31,
              paddingHorizontal: 19,
            }}
            border={{}}
          >
            <Image source={place.image} style={styles.cardImage} />
            <Text style={styles.placeName}>{place.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 28,
              }}
            >
              <Image source={require('../../assets/icons/coordinates.png')} />
              <Text style={styles.placeCoordinates}>
                {place.latitude}° N {place.longitude}° W
              </Text>
            </View>
            {isVisibleMap ? (
              <View
                style={{
                  borderRadius: 22,
                  overflow: 'hidden',
                  width: '100%',
                  height: 230,
                }}
              >
                <MapView
                  userInterfaceStyle="dark"
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                    }}
                  >
                    {Platform.OS === 'ios' ? (
                      <Image
                        source={require('../../assets/icons/marker.png')}
                      />
                    ) : null}
                  </Marker>
                </MapView>
              </View>
            ) : (
              <>
                {screen === 'Map' ? (
                  <View
                    style={{
                      borderRadius: 22,
                      overflow: 'hidden',
                      width: '100%',
                      height: 230,
                      marginBottom: 23,
                    }}
                  >
                    <MapView
                      userInterfaceStyle="dark"
                      style={{ flex: 1 }}
                      initialRegion={{
                        latitude: place.latitude,
                        longitude: place.longitude,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                      }}
                    >
                      {showRoute && (
                        <Marker
                          coordinate={{
                            latitude: 53.5461,
                            longitude: -113.4938,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                          }}
                        >
                          {Platform.OS === 'ios' ? (
                            <Image
                              source={require('../../assets/icons/marker.png')}
                            />
                          ) : null}
                        </Marker>
                      )}
                      <Marker
                        coordinate={{
                          latitude: place.latitude,
                          longitude: place.longitude,
                          latitudeDelta: 0.04,
                          longitudeDelta: 0.04,
                        }}
                      >
                        {Platform.OS === 'ios' ? (
                          <Image
                            source={require('../../assets/icons/marker.png')}
                          />
                        ) : null}
                      </Marker>

                      {showRoute && (
                        <>
                          {coords.length > 0 && (
                            <Polyline
                              coordinates={coords}
                              strokeWidth={6}
                              strokeColor="#990000"
                            />
                          )}
                        </>
                      )}
                    </MapView>
                  </View>
                ) : (
                  <Text style={styles.placeDescription}>
                    {place.description}
                  </Text>
                )}

                <View style={styles.cardBtnsWrap}>
                  <GradientBtnS
                    btnH={{ height: 37 }}
                    btnW={'L'}
                    btnText={screen === 'Map' ? 'Set route' : 'Go map'}
                    onPress={() => {
                      if (screen === 'Map') setShowRoute(true);
                      else setIsVisibleMap(true);
                    }}
                  />
                  <View style={{ gap: 20, flexDirection: 'row' }}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={shareWudbynnPlaceInfo}
                    >
                      <Image source={require('../../assets/icons/share.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={toggleSavedPlaces}
                    >
                      {toggleIcon ? (
                        <Image
                          source={require('../../assets/icons/liked.png')}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/icons/save.png')}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </GradientBordersContainer>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.066,
    padding: 17,
    paddingBottom: 20,
  },
  startContainerTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginBottom: 26,
    textAlign: 'center',
    marginBottom: 68,
    paddingHorizontal: 35,
  },
  quizContainerTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#fff',
    marginBottom: 19,
    textAlign: 'center',
  },
  borders: {
    marginBottom: 13,
    borderRadius: 14,
    width: 76,
  },
  gradContainer: {
    height: 87,
    backgroundColor: '#080809',
    margin: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 15,
  },
  headText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#fff',
  },
  categoryContainer: {
    height: 56,
    backgroundColor: '#080809',
    margin: 2,
    padding: 2,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 17,
  },
  category: {
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
  categoryBorders: {
    marginBottom: 30,
    borderRadius: 22,
    width: 153,
    marginTop: 15,
  },
  cardImage: {
    width: '100%',
    height: 108,
    borderRadius: 25,
    marginBottom: 13,
  },
  placeName: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginBottom: 19,
    marginTop: 14,
  },
  placeCoordinates: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
  },
  placeDescription: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
    marginBottom: 59,
    lineHeight: 22,
  },

  button: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: 31,
    flexDirection: 'row',
    gap: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 11,
    color: '#fff',
  },
  cardBtnsWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WudbynnPlaceDetailsScreen;
