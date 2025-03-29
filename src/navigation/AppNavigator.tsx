// import React, {useState, useEffect} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import AppLoadingScreen from '../components/AppLoadingScreen';

// export type RootStackParamList = {
//   Welcome: undefined;
//   Name: undefined;
//   Age: undefined;
//   Gender: undefined;
//   Home: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const AppNavigator = () => {
//   const [screens, setScreens] = useState<any>(null);

//   useEffect(() => {
//     const loadScreens = async () => {
//       const WelcomeScreen = (await import('../screens/WelcomeScreen')).default;
//       const NameScreen = (await import('../screens/NameScreen')).default;
//       const AgeScreen = (await import('../screens/AgeScreen')).default;
//       const GenderScreen = (await import('../screens/GenderScreen')).default;
//       const HomeScreen = (await import('../screens/HomeScreen')).default;

//       setScreens({
//         WelcomeScreen,
//         NameScreen,
//         AgeScreen,
//         GenderScreen,
//         HomeScreen,
//       });
//     };

//     loadScreens();
//   }, []);

//   if (!screens) {
//     return <AppLoadingScreen />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Welcome" component={screens.WelcomeScreen} />
//         <Stack.Screen name="Name" component={screens.NameScreen} />
//         <Stack.Screen name="Age" component={screens.AgeScreen} />
//         <Stack.Screen name="Gender" component={screens.GenderScreen} />
//         <Stack.Screen name="Home" component={screens.HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import NameScreen from '../screens/NameScreen';
import AgeScreen from '../screens/AgeScreen';
import GenderScreen from '../screens/GenderScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Name: undefined;
  Age: undefined;
  Gender: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="Age" component={AgeScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
