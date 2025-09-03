import { NavigationContainer } from '@react-navigation/native';
import WudbynnStackNavigation from './src/navigation/WudbynnStackNavigation';
import Loader from './src/components/Loader';
import { WudbynnContextProvider } from './src/store/context';
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
