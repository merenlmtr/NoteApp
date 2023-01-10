import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Intro from './app/screens/Intro'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteScreen from './app/screens/NoteScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import NoteDetail from './app/components/NoteDetail'
import NoteProvider from './app/contexts/NoteProvider'

const Stack = createNativeStackNavigator();

export default App = () => {

  const [user, setUser] = useState({});
  const [isAppFirstTime, setIsAppFirstTime] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTime(true);

    setUser(JSON.parse(result));
    setIsAppFirstTime(false);

  };

  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />

  useEffect(() => {
    findUser();
  }, []);

  if (isAppFirstTime) return <Intro onFinish={findUser} />;
  return <NavigationContainer>
    <NoteProvider>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }} >
        <Stack.Screen component={RenderNoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator>
    </NoteProvider>
  </NavigationContainer>
}


const styles = StyleSheet.create({})