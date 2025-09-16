import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeGradientButton = ({
  btnText,
  onPress,
  btnH,
  btnW,
  textStyle,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, btnW]}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={['#FF0000', '#CC0000', '#990000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, btnH]}
      >
        <Text style={[styles.label, textStyle]}>{btnText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: { width: '70%' },
  button: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    height: 62,
  },
  label: {
    fontWeight: '600',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default WelcomeGradientButton;
