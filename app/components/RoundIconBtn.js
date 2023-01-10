import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'





const RoundIconBtn = ({ iconName, size, color, style, onPress }) => {
    return (
        <Icon
            type="MaterialIcons"
            name={iconName}
            size={size || 24}
            color={colors.LIGHT || color}
            style={[styles.icon, { ...style }]}
            onPress={onPress} />
    )
}

export default RoundIconBtn

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5
    }
})