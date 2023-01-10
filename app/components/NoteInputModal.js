import { StyleSheet, Text, View, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        }
    }, [isEdit])

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();

        if (isEdit) {
            onSubmit(title, desc, Date.now());
        } else {
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    return (
        <>
            {/* <StatusBar hidden /> */}
            <Modal visible={visible} animationType='fade' >
                <View style={styles.container}>
                    <TextInput value={title} onChangeText={(text) => handleOnChangeText(text, 'title')} placeholder='Enter Title' style={[styles.input, styles.title]} />
                    <TextInput value={desc} onChangeText={(text) => handleOnChangeText(text, 'desc')} placeholder='Enter Description' multiline style={[styles.input, styles.desc]} />
                    <View style={styles.btnContainer}>
                        <RoundIconBtn iconName='check' size={15} onPress={handleSubmit} />
                        {title.trim() || desc.trim() ?
                            <RoundIconBtn iconName='close' size={15} style={{ marginLeft: 15 }} onPress={closeModal} /> : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose} >
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default NoteInputModal

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20
    },
    title: {
        marginBottom: 40,
        fontWeight: 'bold'
    },
    desc: {
        height: 100
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    }
})