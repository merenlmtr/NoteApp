import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import colors from '../misc/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'

const SearchBar = ({ value, onChangeText, onClear }) => {
    return (
        <View style={styles.container}>
            <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Search Notes...' />
            {value ? <Icon type="MaterialIcons" name='close' size={20} color={colors.PRIMARY}
                onPress={onClear} style={styles.clearIcon} /> : null}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        marginVertical: 10
    },
    container: {
        justifyContent: 'center'
    },
    clearIcon: {
        position: 'absolute',
        right: 10
    }
})