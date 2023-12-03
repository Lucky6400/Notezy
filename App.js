import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import SingleNoteScreen from './screens/SingleNoteScreen';
import FavouriteNotes from './screens/FavouriteNotes';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>

      <PersistGate loading={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={"#505050"} />
        </View>
      } persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="default" />
          <Stack.Navigator>
            <Stack.Screen options={{
              headerTitle: () => <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 24 }}>Notezy</Text>,

            }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerTitle: "" }} name="AddNote" component={AddNoteScreen} />
            <Stack.Screen name="Favourites" component={FavouriteNotes} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen options={{
              headerTitle: () => <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 18 }}>View Note</Text>,
            }} name="SingleNote" component={SingleNoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>


  );
}