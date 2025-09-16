import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Layout from '../../wudbynnComponents/Layout';

import GradientBordersContainer from '../../wudbynnComponents/GradientBordersContainer';

import { useState } from 'react';
import WelcomeGradientButton from '../../wudbynnComponents/WelcomeGradientButton';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const { height } = Dimensions.get('window');

const WELCOME_SCREEN_INFO = [
  {
    title: `Hello! I'm your personal guide to
Canada's most beautiful natural 
landscapes. `,
    subtitle: `Together we'll hike mountain trails, visit crystal-clear lakes, and immerse yourself in the grandeur of national parks.`,
    image: require('../../assets/images/welcome/1.png'),
    buttonText: 'Next',
  },

  {
    title: `Want to experience the grandeur of mountains and canyons? Or explore tranquil lakes and beaches? Or perhaps immerse yourself in the wilderness of national parks? `,
    subtitle: `I've prepared a selection of the best places in each category for you.`,
    image: require('../../assets/images/welcome/2.png'),
    buttonText: 'Go',
  },

  {
    title: `Get recommendations, save your favorite locations, and explore Canada with an interactive map. `,
    subtitle: `I'll help you find your way to even the most remote places.`,
    image: require('../../assets/images/welcome/3.png'),
    buttonText: 'Continue',
  },

  {
    title: `See Canada from a new perspective — try the quiz about its natural wonders!`,
    subtitle: ` Learn interesting facts, test your knowledge and discover locations that even the locals don't know about.`,
    image: require('../../assets/images/welcome/4.png'),
    buttonText: 'Start',
  },
];

const WelcomeScreen = () => {
  const [dotIndex, setDotIndex] = useState(0);
  const [currInfoIdx, setCurrInfoIdx] = useState(0);
  const navigation = useNavigation();

  const nextSlide = () => {
    if (currInfoIdx < WELCOME_SCREEN_INFO.length - 1) {
      setCurrInfoIdx(currInfoIdx + 1);
      setDotIndex(dotIndex + 1);
    } else {
      navigation.replace('BottomTabsNavigation');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/welcome/1.png')}
          style={{ width: 440 }}
        />

        <View style={{ top: -130, alignItems: 'center' }}>
          <Shadow
            distance={40}
            startColor={'rgba(255, 0, 0, 0.16)'}
            endColor={'rgba(255, 0, 0, 0.02)'}
            offset={[0, 0]}
            radius={12}
          >
            <GradientBordersContainer
              border={{ width: '90%' }}
              style={{ alignItems: 'center' }}
            >
              <Text style={styles.welcomeTitle}>
                {WELCOME_SCREEN_INFO[currInfoIdx].title}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {WELCOME_SCREEN_INFO[currInfoIdx].subtitle}
              </Text>

              <WelcomeGradientButton
                btnText={WELCOME_SCREEN_INFO[currInfoIdx].buttonText}
                onPress={nextSlide}
              />
            </GradientBordersContainer>
          </Shadow>
        </View>

        <View style={{ paddingHorizontal: 18, top: -100 }}>
          <View style={styles.pagination}>
            {[1, 2, 3, 4].map((dot, idx) => (
              <View
                style={[
                  styles.dot,
                  dotIndex === idx && { backgroundColor: '#FF0000' },
                ]}
                key={dot}
              />
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.054,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: '600',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 25,
    height: 25,
    borderRadius: 500,
    backgroundColor: '#323232',
  },
  pagination: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 23,
  },
});

export default WelcomeScreen;
