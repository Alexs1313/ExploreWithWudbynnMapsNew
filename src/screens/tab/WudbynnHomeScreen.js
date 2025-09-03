import {
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import GradientBordersContainer from '../../components/GradientBordersContainer';
import GradientBtnS from '../../components/GradientBtnS';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const interestingFacts = [
  'Canada is home to the second highest mountain in North America, Mount Logan (5,959 m) in the Yukon.',
  'The Rocky Mountains stretch for over 4,800 km and span two countries, Canada and the United States.',
  'Nahanni Canyon in the Northwest Territories is deeper than the famous Grand Canyon in the United States.',
  'More than 17 species of orchids can be found in the mountains of British Columbia.',
  'Jasper National Park has glaciers that are over 10,000 years old.',
  'Canada’s most famous waterfall, Niagara Falls, is only 51 m high, but its flow is one of the most powerful in the world.',
  'The St. Lawrence River is so large that an ocean liner could pass through it.',
  'Canada has over 200,000 km of river routes, more than any other country.',
  'Virginia Falls in Nahanni National Park is twice as high as Niagara Falls.',
  `British Columbia's rivers host one of the world's largest salmon spawning migrations.`,
  'Canada has the largest number of lakes in the world, with over 31,000 lakes covering an area of over 3 km²',
  'Great Bear Lake is the largest lake located entirely within Canada.',
  'Great Slave Lake is one of the deepest in North America, at 614 m.',
  'Lake Louise in Alberta is a bright turquoise color due to minerals that come from glaciers.',
  'Canada has the longest coastline in the world, at over 202,000 km.',
  'Canada is the third country in the world in terms of forest area, which covers almost half of its territory.',
  'Canada is home to over 180 species of trees.',
  'The forests of British Columbia are home to the rare polar bear, the Kermode, or “spirit bear.”',
  'The Canadian Arctic is home to over 60% of the world’s polar bear population.',
  'Canada’s forests absorb about 20% of the planet’s carbon dioxide.',
  'Canada is home to over 70,000 species of animals, birds, fish, and plants.',
  'The beaver, the world’s largest rodent, is the country’s official national animal.',
  'Ellesmere Island is home to the musk ox, a relict of the Ice Age.',
  'The Bay of Fundy is home to rare humpback and fin whales.',
  'Canada is home to over 450 species of birds.',
  'The Bay of Fundy has the highest tides in the world, reaching up to 16 meters.',
  'In the northern regions of Canada, the northern lights can be seen over 200 nights a year.',
  'The Athabasca Glacier in Alberta is shrinking by several meters every year due to climate change.',
  'Vancouver Island has a mild climate and blooms here begin as early as February.',
  'In Manitoba, there is a town called Churchill, which is called the "polar bear capital of the world."',
];

const Home = () => {
  const [generatedFact, setGeneratedTask] = useState('');
  const navigation = useNavigation();

  const generateFact = () => {
    const randomFact =
      interestingFacts[Math.floor(Math.random() * interestingFacts.length)];

    setGeneratedTask(randomFact);
  };

  const shareAboutAppInfo = async () => {
    try {
      await Share.share({
        message: `Explore With Wudbynn Maps is your personal guide to discovering
the natural wonders and hidden gems of Canada. From breathtaking
mountain trails to serene lakeshores, the app helps you navigate
and explore with ease, bringing adventure right to your
fingertips.`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <GradientBordersContainer style={{ margin: 2 }}>
          <View style={styles.infoWrapper}>
            {Platform.OS === 'ios' ? (
              <Image source={require('../../assets/images/homeIcon.png')} />
            ) : (
              <Image
                source={require('../../assets/images/crownIcon.png')}
                style={{ width: 157, height: 157 }}
              />
            )}
            <Text style={styles.infoText}>
              Explore With {Platform.OS === 'android' && 'Crown'} Wudbynn Maps
              is your personal guide to discovering the natural wonders and
              hidden gems of Canada. From breathtaking mountain trails to serene
              lakeshores, the app helps you navigate and explore with ease,
              bringing adventure right to your fingertips.
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <GradientBtnS btnText={'Share'} onPress={shareAboutAppInfo} />
          </View>
        </GradientBordersContainer>

        <GradientBordersContainer
          style={{ paddingTop: 8, margin: 2, paddingBottom: 35 }}
        >
          <Text
            style={[
              styles.generateFactContainerTitle,
              generatedFact && { marginBottom: 10 },
            ]}
          >
            Interesting fact:
          </Text>

          {generatedFact && (
            <Text style={styles.generateFactText}>{generatedFact}</Text>
          )}

          <View style={{ alignItems: 'center' }}>
            <GradientBtnS
              btnText={'Generate fact'}
              icon
              btnH={{ height: 37 }}
              btnW={'L'}
              onPress={generateFact}
            />
          </View>
        </GradientBordersContainer>

        <GradientBordersContainer style={{ paddingTop: 48, margin: 2 }}>
          <View>
            <Image
              source={require('../../assets/images/quizHomeMan.png')}
              style={{ position: 'absolute', bottom: -16, left: 6 }}
            />

            <View style={{ alignItems: 'center', left: 30, top: -30 }}>
              <Text style={styles.quizContainerTitle}>
                {`Test your knowledge in the 
quiz:`}
              </Text>
              <GradientBtnS
                btnText={'Start'}
                btnH={{ height: 37 }}
                btnW={'L'}
                onPress={() => navigation.navigate('StartWudbynnQuizScreen')}
              />
            </View>
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
    paddingBottom: 140,
  },
  infoText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#fff',
    lineHeight: 22,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 165,
    marginBottom: 14,
  },
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
});

export default Home;
