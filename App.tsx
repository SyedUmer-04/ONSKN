/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/screens/Start';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPasswordStep1 from './src/screens/ForgotPasswordStep1';
import ForgotPasswordStep2 from './src/screens/ForgotPasswordStep2';
import ForgotPasswordStep3 from './src/screens/ForgotPasswordStep3';
import Verification from './src/screens/Verification';
import NewPassword from './src/screens/NewPassword';
import GetStarted from './src/screens/GetStarted';
import Home from './src/screens/Home';
import { requestUserPermission } from './src/utils/notificationService';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import Filter from './src/screens/filter';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    // requestUserPermission()
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <Stack.Navigator
            initialRouteName={'Start'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="ForgotPasswordStep1"
              component={ForgotPasswordStep1}
            />
            <Stack.Screen
              name="ForgotPasswordStep2"
              component={ForgotPasswordStep2}
            />
            <Stack.Screen
              name="ForgotPasswordStep3"
              component={ForgotPasswordStep3}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
            />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
          </Stack.Navigator>
          <Toast  position='top' />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
