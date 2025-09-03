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
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import WelcomeGradientButton from '../../components/WelcomeGradientButton';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const wudbynnQuiz = [
  {
    question: 'What is the highest mountain in Canada?',
    options: ['Victoria', 'Logan', 'Robson', 'Vancouver'],
    answer: 'Logan',
  },
  {
    question: 'What is the most famous waterfall in Canada?',
    options: ['Athabasca', 'Virginia Falls', 'Niagara', 'Montmorency'],
    answer: 'Niagara',
  },
  {
    question: 'What is the largest lake located entirely in Canada?',
    options: ['Great Slave Lake', 'Ontario', 'Great Bear Lake', 'Louise'],
    answer: 'Great Bear Lake',
  },

  {
    question: 'How many official symbols of nature does Canada have?',
    options: ['2', '4', '5', '6'],
    answer: '2',
  },
  {
    question: 'What animal is the official symbol of Canada?',
    options: ['Moose', 'Beaver', 'Polar bear', 'Eagle'],
    answer: 'Beaver',
  },
  {
    question: 'Where are the highest tides in the world?',
    options: ['Vancouver Island', 'Bay of Fundy', 'Lake Louise', 'Hudson Bay'],
    answer: 'Bay of Fundy',
  },
  {
    question:
      'Which lake is bright turquoise in color due to minerals from glaciers?',
    options: ['Louise', 'Moraine', 'Superior', 'Abraham'],
    answer: 'Louise',
  },
  {
    question: 'Which animal lives in the Arctic regions of Canada?',
    options: ['Wolf', 'Polar bear', 'Beaver', 'Lynx'],
    answer: 'Polar bear',
  },
  {
    question: 'Which national park is famous for the Athabasca Glacier?',
    options: ['Banff', 'Jasper', 'Yoho', 'Kootenay'],
    answer: 'Jasper',
  },
  {
    question: 'Which province has the most lakes?',
    options: ['Ontario', 'Alberta', 'Manitoba', 'British Columbia'],
    answer: 'Ontario',
  },

  {
    question: 'Which animal is known as the “spirit bear”?',
    options: ['Grizzly bear', 'Kermode', 'Black bear', 'Polar wolf'],
    answer: 'Kermode',
  },
  {
    question: `What percentage of the world's polar bear population lives in Canada?`,
    options: ['20%', ' 40%', '60% ', '80%'],
    answer: '60% ',
  },
  {
    question: 'Which river connects the Great Lakes to the Atlantic Ocean?',
    options: ['Mackenzie', 'St. Lawrence', 'Yukon', 'Fraser'],
    answer: 'St. Lawrence',
  },
  {
    question: 'Which city is called the "polar bear capital"?',
    options: ['Churchill', 'Iqaluit', 'Yellowknife', 'Whitehorse'],
    answer: 'Churchill',
  },
  {
    question: 'Where can you see humpback whales in Canada?',
    options: ['Lake Ontario', 'Bay of Fundy', 'Hudson Bay', 'Great Slave Lake'],
    answer: 'Bay of Fundy',
  },
  {
    question: 'Which lake is the deepest in North America?',
    options: ['Great Bear', 'Ontario', 'Great Slave', 'Superior'],
    answer: 'Great Slave',
  },
  {
    question: 'Which mountain is the highest in the Canadian Rockies?',
    options: ['Robson', 'Logan', 'Edith', 'Temple'],
    answer: 'Robson',
  },
  {
    question: 'Which bird is the symbol of Canada on coins?',
    options: ['Swan', 'Harrier', 'Eagle', 'Goose'],
    answer: 'Harrier',
  },
  {
    question: 'Which territory in Canada has the most glaciers?',
    options: ['Alberta', 'Nunavut', 'Yukon', 'British Columbia'],
    answer: 'Nunavut',
  },
  {
    question:
      'Where in Canada can you see the northern lights more than 200 nights a year?',
    options: ['Manitoba', 'Nunavut', 'Alberta', 'Ontario'],
    answer: 'Nunavut',
  },

  {
    question: 'How many provinces does Canada have?',
    options: ['10', '11', '12', '13'],
    answer: '10',
  },
  {
    question: 'Which ocean washes the east coast of Canada?',
    options: ['Pacific', 'Atlantic', 'Arctic', 'Indian'],
    answer: 'Atlantic',
  },
  {
    question: 'Which ocean washes the west coast of Canada?',
    options: ['Pacific', 'Atlantic', 'Arctic', 'Indian'],
    answer: 'Pacific',
  },
  {
    question: 'Which river is the longest in Canada?',
    options: ['St. Lawrence', 'Yukon', 'Mackenzie', 'Fraser'],
    answer: 'Mackenzie',
  },
  {
    question: 'Which national park is the oldest in Canada?',
    options: ['Jasper', 'Banff', 'Yoho', 'Prince Albert'],
    answer: 'Banff',
  },
  {
    question:
      'Which lake is part of the border between Canada and the United States?',
    options: ['Superior', 'Louise', 'Moraine', 'Abraham'],
    answer: 'Superior',
  },
  {
    question: 'Where is Ellesmere Island located?',
    options: ['Yukon', 'Nunavut', 'Manitoba', 'Alberta'],
    answer: 'Nunavut',
  },
  {
    question: 'Which province is famous for maple syrup?',
    options: ['Ontario', 'Quebec', 'Alberta', 'Manitoba'],
    answer: 'Quebec',
  },
  {
    question: 'Which territory borders Alaska?',
    options: ['Yukon', 'British Columbia', 'Alberta', 'Nunavut'],
    answer: 'Yukon',
  },
  {
    question: 'Which part of Canada has the mildest climate?',
    options: ['Vancouver Island', 'Yukon', 'Nunavut', 'Manitoba'],
    answer: 'Vancouver Island',
  },
];

const StartWudbynnQuizScreen = () => {
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [result, setResult] = useState(0);
  const [isVisibleResult, setIsVisibleResult] = useState(false);
  const [showRes, setShowRes] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timerId;

    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    if (timeLeft === 0) nextQuestion();

    return () => clearInterval(timerId);
  }, [isActive, timeLeft]);

  const restartTimer = () => {
    setTimeLeft(15);
    setIsActive(true);
  };

  const timerFormat = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const selectOption = selectedOption => {
    const isCorrectAnswer =
      wudbynnQuiz[currQuestionIndex].answer == selectedOption;

    setShowRes(true);
    setIsDisabled(true);

    if (isCorrectAnswer) {
      setResult(result + 1);
    }
    setIsActive(false);

    setIsCorrect(isCorrectAnswer);

    setSelectedOption(selectedOption);
  };

  const nextQuestion = () => {
    if (currQuestionIndex === wudbynnQuiz.length - 1) {
      setIsVisibleResult(true);
    } else {
      setCurrQuestionIndex(currQuestionIndex + 1);
      setIsCorrect(false);
      setSelectedOption(null);
      setShowRes(false);
      setIsDisabled(false);
      restartTimer();
    }
  };

  const shareWudbynnQuizResult = async () => {
    try {
      await Share.share({
        message: `Congratulations, you passed the test, your result is ${result}
                correct answers out of ${wudbynnQuiz.length}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <LinearGradient
            style={[styles.headBorders]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.headContainer]}>
              <Text style={styles.headText}>Quiz</Text>
            </View>
          </LinearGradient>
        </View>

        {!isVisibleResult ? (
          <>
            <LinearGradient
              style={[styles.timerBorders]}
              colors={['#FF0000', '#CC0000', '#990000']}
            >
              <View style={[styles.timerContainer]}>
                <Image source={require('../../assets/icons/time.png')} />
                <Text style={styles.time}>
                  {timeLeft > 0 ? timerFormat(timeLeft) : '00:00'}
                </Text>
              </View>
            </LinearGradient>

            <GradientBordersContainer
              style={{
                paddingTop: 75,
                margin: 3,
                height: 170,
              }}
            >
              <Text style={styles.currQuestion}>
                {currQuestionIndex + 1}/{wudbynnQuiz.length}
              </Text>

              <Text style={[styles.startContainerTitle]}>
                {wudbynnQuiz[currQuestionIndex].question}
              </Text>
            </GradientBordersContainer>
            <View style={styles.quizWrapper}>
              {wudbynnQuiz[currQuestionIndex].options.map(option => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={option}
                  style={{ width: '45%' }}
                  onPress={() => setSelectedOption(option)}
                  disabled={isDisabled}
                >
                  <LinearGradient
                    style={[styles.optionBorders]}
                    colors={
                      showRes && selectedOption === option
                        ? isCorrect
                          ? ['#2BFF00', '#2BFF00']
                          : ['#FF0000', '#FF0000']
                        : ['#FF0000', '#CC0000', '#990000']
                    }
                  >
                    {!showRes ? (
                      <LinearGradient
                        colors={
                          selectedOption === option
                            ? ['#FF0000', '#CC0000', '#990000']
                            : ['#080809', '#080809']
                        }
                        style={[styles.optionContainer]}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </LinearGradient>
                    ) : (
                      <LinearGradient
                        colors={
                          selectedOption === option
                            ? isCorrect
                              ? ['#2BFF00', '#2BFF00']
                              : ['#FF0000', '#FF0000']
                            : ['#080809', '#080809']
                        }
                        style={[styles.optionContainer]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedOption === option &&
                              isCorrect && { color: '#000' },
                          ]}
                        >
                          {option}
                        </Text>
                      </LinearGradient>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}

              <WelcomeGradientButton
                btnText={showRes ? 'Next question' : 'Choose'}
                isDisabled={!selectedOption}
                onPress={() => {
                  if (showRes) {
                    nextQuestion();
                  } else {
                    selectOption(selectedOption);
                  }
                }}
              />
            </View>
          </>
        ) : (
          <View style={{ alignItems: 'center' }}>
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
                Congratulations, you passed the test, your result is {result}{' '}
                correct answers out of {wudbynnQuiz.length}
              </Text>

              <View style={styles.resButtonsWrapp}>
                <WelcomeGradientButton
                  btnText={'Share'}
                  btnH={{ height: 46 }}
                  btnW={{ width: '40%' }}
                  textStyle={{ fontSize: 17 }}
                  onPress={shareWudbynnQuizResult}
                />
                <WelcomeGradientButton
                  btnText={'Back to home'}
                  btnH={{ height: 46 }}
                  btnW={{ width: '40%' }}
                  textStyle={{ fontSize: 17 }}
                  onPress={() => navigation.goBack('')}
                />
              </View>
            </GradientBordersContainer>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.066,
    padding: 17,
    paddingBottom: 120,
    alignItems: 'center',
  },
  startContainerTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    marginBottom: 26,
    textAlign: 'center',
    paddingHorizontal: 35,
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
  currQuestion: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    right: 24,
    top: 15,
  },
  optionBorders: {
    marginBottom: 13,
    borderRadius: 14,
  },
  optionContainer: {
    height: 116,
    padding: 3,
    margin: Platform.OS === 'android' && 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  quizWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  timerBorders: {
    marginBottom: 20,
    borderRadius: 22,
    width: 140,
  },
  timerContainer: {
    height: 53,
    backgroundColor: '#080809',
    margin: 3,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  time: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  resButtonsWrapp: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
});

export default StartWudbynnQuizScreen;
