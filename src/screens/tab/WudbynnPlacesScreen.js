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
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeGradientButton from '../../components/WelcomeGradientButton';

const { height } = Dimensions.get('window');

const Places = () => {
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState('');
  const navigation = useNavigation();

  const showRecommendedPlaces = selectedCategory => {
    navigation.navigate('WudbynnRecommendedPlaces', selectedCategory);
    setSelectedPlaceCategory('');
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Where do you want to go today?</Text>

        <View>
          <GradientBordersContainer
            shadow
            style={{ paddingTop: 12, paddingBottom: 0 }}
          >
            <Image
              source={require('../../assets/images/placesScreen.png')}
              style={{ left: -4, borderBottomLeftRadius: 22 }}
            />
          </GradientBordersContainer>
          <View style={{ position: 'absolute', right: 24, top: 40 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedPlaceCategory('Mountains')}
            >
              <LinearGradient
                style={[styles.categoryBorders]}
                colors={['#FF0000', '#CC0000', '#990000']}
              >
                <LinearGradient
                  colors={
                    selectedPlaceCategory === 'Mountains'
                      ? ['#FF0000', '#CC0000', '#990000']
                      : ['#000000', '#000000']
                  }
                  style={[styles.categoryContainer]}
                >
                  <Image
                    source={require('../../assets/icons/mount.png')}
                    style={{ top: -5 }}
                  />
                  <Text style={styles.category}>Mountains</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedPlaceCategory('Lakes')}
            >
              <LinearGradient
                style={[styles.categoryBorders]}
                colors={['#FF0000', '#CC0000', '#990000']}
              >
                <LinearGradient
                  colors={
                    selectedPlaceCategory === 'Lakes'
                      ? ['#FF0000', '#CC0000', '#990000']
                      : ['#000000', '#000000']
                  }
                  style={[styles.categoryContainer]}
                >
                  <Image source={require('../../assets/icons/lakes.png')} />
                  <Text style={styles.category}>Lakes</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedPlaceCategory('Parks')}
            >
              <LinearGradient
                style={[styles.categoryBorders]}
                colors={['#FF0000', '#CC0000', '#990000']}
              >
                <LinearGradient
                  colors={
                    selectedPlaceCategory === 'Parks'
                      ? ['#FF0000', '#CC0000', '#990000']
                      : ['#000000', '#000000']
                  }
                  style={[styles.categoryContainer]}
                >
                  <Image source={require('../../assets/icons/parks.png')} />
                  <Text style={styles.category}>Parks</Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <WelcomeGradientButton
              btnText={'Choose'}
              isDisabled={!selectedPlaceCategory}
              onPress={() => showRecommendedPlaces(selectedPlaceCategory)}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.12,
    padding: 2,
    paddingBottom: 140,
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 69,
  },
  infoText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#fff',
    lineHeight: 22,
  },
  infoWrapper: {},
  generateFactContainerTitle: {
    fontWeight: '600',
    fontSize: 17,
    color: '#fff',
    marginBottom: 26,
    textAlign: 'center',
  },
  quizContainerTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#fff',
    marginBottom: 19,
    textAlign: 'center',
  },
  generateFactText: {
    fontWeight: '400',
    fontSize: 13,
    color: '#fff',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  categoryContainer: {
    height: 56,
    backgroundColor: '#080809',
    padding: 2,
    margin: Platform.OS === 'android' && 2,
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
    marginBottom: 60,
    borderRadius: 22,
    width: 153,
  },
});

export default Places;
