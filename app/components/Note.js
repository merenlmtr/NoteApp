import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../misc/colors';

const Note = ({ item, onPress }) => {
    const { title, desc } = item;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text numberOfLines={2} style={styles.title} >{title}</Text>
            <Text numberOfLines={3} >{desc}</Text>
        </TouchableOpacity>
    )
}

export default Note

const width = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 5,
        padding: 8,
        borderRadius: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT
    }
})