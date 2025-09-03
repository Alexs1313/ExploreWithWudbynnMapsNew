import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import GradientBordersContainer from '../../components/GradientBordersContainer';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeGradientButton from '../../components/WelcomeGradientButton';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const StartWudbynnQuizScreen = () => {
  const navigation = useNavigation();

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
              <Text style={styles.headText}>Quiz</Text>
            </View>
          </LinearGradient>
        </View>

        <Image source={require('../../assets/images/quizImg.png')} />

        <GradientBordersContainer
          style={{
            paddingTop: 85,
            margin: 3,
            paddingBottom: 17,
          }}
          border={{ top: -60 }}
        >
          <Text style={[styles.startContainerTitle]}>
            You will have 30 questions, 15 seconds each. You need to choose one
            correct answer from 4. Good luck!
          </Text>

          <View style={{ alignItems: 'center' }}>
            <WelcomeGradientButton
              btnText={'Start'}
              onPress={() => navigation.navigate('WudbynnGameplayScreen')}
            />
          </View>
        </GradientBordersContainer>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.066,
    padding: 17,
    paddingBottom: 20,
    alignItems: 'center',
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
  },
  headText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#fff',
  },
});

export default StartWudbynnQuizScreen;
