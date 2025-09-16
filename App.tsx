import { NavigationContainer } from '@react-navigation/native';
import WudbynnStackNavigation from './src/wudbynnNavigation/WudbynnStackNavigation';
import Loader from './src/wudbynnComponents/Loader';
import { WudbynnContextProvider } from './src/wudbynnStore/wudbynnContext';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <WudbynnContextProvider>
        {isLoading ? <WudbynnStackNavigation /> : <Loader />}
      </WudbynnContextProvider>
    </NavigationContainer>
  );
};

export default App;
