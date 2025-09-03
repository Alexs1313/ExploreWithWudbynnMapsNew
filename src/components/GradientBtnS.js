import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBtnS = ({ btnText, onPress, icon, btnW, btnH }) => {
  return (
    <TouchableOpacity
      style={[styles.container, btnW === 'L' && { width: '40%' }]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <LinearGradient
        colors={['#FF0000', '#CC0000', '#990000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, btnH]}
      >
        {icon && <Image source={require('../assets/icons/stars.png')} />}
        <Text style={styles.label}>{btnText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  container: { width: '30%' },
});

export default GradientBtnS;
