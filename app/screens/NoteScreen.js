import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';

const reverseData = data => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if (aInt < bInt) return 1;
        if (aInt === bInt) return 0;
        if (aInt > bInt) return -1;
    });
};

const NoteScreen = ({ user, navigation }) => {

    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { notes, setNotes, findNotes } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    };

    useEffect(() => {
        findGreet();
    }, []);

    const reverseNotes = reverseData(notes);

    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now() };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const openNote = note => {
        navigation.navigate('NoteDetail', { note })
    }

    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes();

        }
        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase())) {
                return note;
            }
        })
        if (filteredNotes.length) {
            setNotes([...filteredNotes]);
        } else {
            setResultNotFound(true)
        }
    }

    const handleOnClear = async () => {
        try {
            setSearchQuery('');
            setResultNotFound(false);
            await findNotes();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View style={styles.container}>
                <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                {notes.length ? (
                    <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} onClear={handleOnClear} />
                ) : null}

                {resultNotFound ? <NotFound /> :
                    <FlatList
                        data={reverseNotes}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (<Note onPress={() => openNote(item)} item={item} />)}
                    />}

            </View>
            {!notes.length ? <View style={[styles.emptyHeaderContainer]}>
                <Text style={styles.emptyHeader}>Add Notes</Text>
            </View> : null}

            <RoundIconBtn onPress={() => setModalVisible(true)} iconName='add' style={styles.addBtn} />
            <NoteInputModal visible={modalVisible} onSubmit={handleOnSubmit} onClose={() => setModalVisible(false)} />
        </>
    )
}

export default NoteScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2
    },
    emptyHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1
    }
})