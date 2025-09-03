import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import GradientBordersContainer from '../../components/GradientBordersContainer';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GradientBtnS from '../../components/GradientBtnS';
import { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { WUDBYNN_PLACES } from '../../data/wudbynnPlaces';

const { height } = Dimensions.get('window');

const WudbynnRecommendedPlaces = ({ route }) => {
  const navigation = useNavigation();
  const selectedCategory = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  const filteredPlaces = WUDBYNN_PLACES.filter(
    place => place.category === selectedCategory,
  );

  return (
    <Layout>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <LottieView
              source={require('../../assets/animations/Magma.json')}
              autoPlay
              style={{ width: 550, height: 470 }}
            />
            {Platform.OS === 'ios' ? (
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
            ) : (
              <Image
                source={require('../../assets/images/crownIcon.png')}
                style={[
                  styles.logo,
                  { width: 237, height: 237, borderRadius: 23.14 },
                ]}
              />
            )}

            <View style={{ alignItems: 'center' }}>
              <LottieView
                source={require('../../assets/animations/Spinner.json')}
                autoPlay
                style={styles.spinner}
              />
            </View>
          </View>
        ) : (
          <>
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
                  <Text style={styles.headText}>Recommended places</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={{ alignItems: 'center' }}>
              <LinearGradient
                style={[styles.categoryBorders]}
                colors={['#FF0000', '#CC0000', '#990000']}
              >
                <View style={[styles.categoryContainer]}>
                  {selectedCategory === 'Mountains' && (
                    <Image
                      source={require('../../assets/icons/mount.png')}
                      style={{ top: -5 }}
                    />
                  )}
                  {selectedCategory === 'Parks' && (
                    <Image source={require('../../assets/icons/parks.png')} />
                  )}
                  {selectedCategory === 'Lakes' && (
                    <Image source={require('../../assets/icons/lakes.png')} />
                  )}
                  <Text style={styles.category}>{selectedCategory}</Text>
                </View>
              </LinearGradient>
            </View>
            <View>
              {filteredPlaces.map((place, idx) => (
                <GradientBordersContainer
                  style={{
                    paddingTop: 17,
                    margin: 3,
                    paddingBottom: 17,
                    paddingHorizontal: 25,
                  }}
                  border={{}}
                  key={idx}
                >
                  <Image source={place.image} style={styles.cardImage} />
                  <Text style={styles.placeName}>{place.name}</Text>

                  <View style={styles.coordWrapper}>
                    <Image
                      source={require('../../assets/icons/coordinates.png')}
                    />
                    <Text style={styles.placeCoordinates}>
                      {place.latitude}° N {place.longitude}° W
                    </Text>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <GradientBtnS
                      btnH={{ height: 37 }}
                      btnW={'L'}
                      btnText={'Read more'}
                      onPress={() =>
                        navigation.navigate('WudbynnPlaceDetailsScreen', {
                          place,
                          screen: 'Rec',
                        })
                      }
                    />
                  </View>
                </GradientBordersContainer>
              ))}
            </View>
          </>
        )}
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
  loaderContainer: { alignItems: 'center' },
  startContainerTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
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
    textAlign: 'center',
    marginBottom: 14,
    marginTop: 14,
  },
  placeCoordinates: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
  },
  coordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 18,
  },
  logo: { position: 'absolute', top: 110 },
  spinner: {
    width: 380,
    height: 330,
    top: -60,
  },
});

export default WudbynnRecommendedPlaces;
