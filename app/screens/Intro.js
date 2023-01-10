import { StatusBar, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Intro = ({ onFinish }) => {
    const [name, setName] = useState('')
    const handleOnChangeText = text => setName(text);

    const handleSubmit = async () => {
        const user = { name: name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onFinish) onFinish();
    }

    return (
        <>
            {/* Hide Statusbar on mobile devices */}
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter your Name to continue</Text>
                <TextInput value={name} onChangeText={handleOnChangeText} placeholder='Enter Name...' style={styles.textInput} />
                {/* <RoundIconBtn iconName='rocket' /> */}
                {name.trim().length >= 3 ? (
                    <RoundIconBtn iconName='arrow-forward' onPress={handleSubmit} />
                ) : null}
            </View>
        </>
    )
}

export default Intro

const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5

    }
})