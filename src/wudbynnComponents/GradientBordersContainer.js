import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

const GradientBordersContainer = ({ children, style, border, shadow }) => {
  return (
    <>
      {shadow ? (
        <Shadow
          distance={25}
          startColor={'rgba(255, 0, 0, 0.15)'}
          endColor={'rgba(255, 0, 0, 0)'}
          offset={[0, 0]}
          radius={22}
          stretch
        >
          <LinearGradient
            style={[styles.borders, border]}
            colors={['#FF0000', '#CC0000', '#990000']}
          >
            <View style={[styles.container, style]}>{children}</View>
          </LinearGradient>
        </Shadow>
      ) : (
        <LinearGradient
          style={[styles.borders, border]}
          colors={['#FF0000', '#CC0000', '#990000']}
        >
          <View style={[styles.container, style]}>{children}</View>
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  borders: {
    marginBottom: 13,
    borderRadius: 22,
    width: '100%',
  },
  container: {
    paddingTop: 45,
    paddingHorizontal: 5,
    paddingBottom: 17,
    backgroundColor: '#080809',
    margin: 3,
    borderRadius: 22,
  },
});

export default GradientBordersContainer;
