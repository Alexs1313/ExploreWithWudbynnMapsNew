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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GradientBtnS from '../../components/GradientBtnS';
import { useCallback, useState } from 'react';
import { useStore } from '../../store/context';

const { height } = Dimensions.get('window');

const categories = ['Mountains', 'Parks', 'Lakes'];

const Saved = () => {
  const navigation = useNavigation();

  const { getPlaces, savedPlaces } = useStore();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredPlacesByCategory =
    selectedCategories.length === 0
      ? savedPlaces
      : savedPlaces.filter(item => selectedCategories.includes(item.category));

  useFocusEffect(
    useCallback(() => {
      getPlaces();
    }, [getPlaces]),
  );

  return (
    <Layout>
      <View
        style={[styles.container, savedPlaces.length === 0 && { padding: 0 }]}
      >
        <View
          style={[
            styles.headWrap,
            savedPlaces.length === 0 && { paddingHorizontal: 17 },
          ]}
        >
          <LinearGradient
            style={[styles.headBorders]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.headContainer]}>
              <Text style={styles.headText}>Saved places</Text>
            </View>
          </LinearGradient>
        </View>
        {savedPlaces.length !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {categories.map(cat => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleCategory(cat)}
                key={cat}
              >
                <LinearGradient
                  style={[styles.categoryBorders]}
                  colors={['#FF0000', '#CC0000', '#990000']}
                >
                  <LinearGradient
                    colors={
                      selectedCategories.includes(cat)
                        ? ['#FF0000', '#CC0000', '#990000']
                        : ['#000000', '#000000']
                    }
                    style={[styles.categoryContainer]}
                  >
                    {cat === 'Mountains' && (
                      <Image
                        source={require('../../assets/icons/mountS.png')}
                        style={{ top: -5 }}
                      />
                    )}
                    {cat === 'Parks' && (
                      <Image
                        source={require('../../assets/icons/parksS.png')}
                      />
                    )}
                    {cat === 'Lakes' && (
                      <Image
                        source={require('../../assets/icons/lakesS.png')}
                      />
                    )}
                    <Text style={styles.category}>{cat}</Text>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {savedPlaces.length === 0 && (
          <LinearGradient
            style={[styles.emptyScreenBorders]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.emptyScreenContainer]}>
              <Text style={styles.headText}>You have no saved locations.</Text>
              <GradientBtnS
                btnH={{ height: 37, marginTop: 40 }}
                btnW={'L'}
                btnText={'Save'}
                onPress={() =>
                  navigation.navigate('WudbynnRecommendedPlaces', 'Mountains')
                }
              />
            </View>
          </LinearGradient>
        )}

        <View>
          {filteredPlacesByCategory.map(place => (
            <View key={place.id}>
              <GradientBordersContainer
                style={{
                  paddingTop: 17,
                  margin: 3,
                  paddingBottom: 17,
                  paddingHorizontal: 25,
                }}
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
                        screen: 'Saved',
                      })
                    }
                  />
                </View>
              </GradientBordersContainer>
            </View>
          ))}
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
  emptyScreenBorders: {
    marginBottom: 13,
    marginTop: height * 0.2,
    width: '100%',
  },
  emptyScreenContainer: {
    height: 132,
    backgroundColor: '#080809',
    marginTop: 2,
    marginBottom: 2,
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
    height: 43,
    backgroundColor: '#080809',
    padding: 1,
    margin: Platform.OS === 'android' && 1,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  category: {
    fontWeight: '700',
    fontSize: 10,
    color: '#fff',
  },
  categoryBorders: {
    marginBottom: 30,
    borderRadius: 17,
    width: 115,
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

export default Saved;
