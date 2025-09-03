import { ImageBackground, ScrollView } from 'react-native';

const Layout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </ImageBackground>
  );
};

export default Layout;
