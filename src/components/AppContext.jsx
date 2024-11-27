import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context for sharing state globally
export const AppContext = createContext({});

export function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    shouldRefresh: false,
    userName: '',
    userPhone: '',
    userAddress: '',
  });

  const updateField = (key, value) => {
    setAppState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const loadLocalData = useCallback(async () => {
    const storageKeys = ['userName', 'userPhone', 'userAddress'];
    const retrievedValues = await Promise.all(
        storageKeys.map(key => AsyncStorage.getItem(key))
    );

    setAppState(prevState => ({
      ...prevState,
      userName: retrievedValues[0] || prevState.userName,
      userPhone: retrievedValues[1] || prevState.userPhone,
      userAddress: retrievedValues[2] || prevState.userAddress,
    }));
  }, []);

  useEffect(() => {
    loadLocalData();
  }, [loadLocalData]);

  return (
      <AppContext.Provider
          value={{
            ...appState,
            toggleRefresh: value => updateField('shouldRefresh', value),
            updateName: value => updateField('userName', value),
            updatePhone: value => updateField('userPhone', value),
            updateAddress: value => updateField('userAddress', value),
          }}
      >
        {children}
      </AppContext.Provider>
  );
}
