import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const WudbynnContextProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  // wudbynn places

  const savePlace = async data => {
    try {
      const stored = await AsyncStorage.getItem('wudbynnPlaces');
      let places = stored !== null ? JSON.parse(stored) : [];

      const updatedPlaces = [...places, data];

      await AsyncStorage.setItem(
        'wudbynnPlaces',
        JSON.stringify(updatedPlaces),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getPlaces = async () => {
    try {
      const savedData = await AsyncStorage.getItem('wudbynnPlaces');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlace = async selectedPlaceId => {
    const jsonValue = await AsyncStorage.getItem('wudbynnPlaces');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlaceId.id);

    setSavedPlaces(filtered);
    await AsyncStorage.setItem('wudbynnPlaces', JSON.stringify(filtered));
  };

  const value = {
    savePlace,
    getPlaces,
    savedPlaces,
    deletePlace,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
