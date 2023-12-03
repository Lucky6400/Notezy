import React, { useState } from 'react'
import { Alert, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '../styles/homeStyles'
import { useDispatch, useSelector } from 'react-redux';
import { settingAction } from '../redux/settingsReducer';
import { bgColor, textColor } from '../utils/theme';
import { noteAction } from '../redux/noteSlice';

const SettingsScreen = ({ navigation }) => {
    const mode = useSelector(s => s.settings.mode);
    const fullname = useSelector(s => s.settings.name);
    const [checked, setChecked] = useState(mode === "dark");
    const [name, setName] = useState(fullname || "");

    const dispatch = useDispatch();

    return (
        <View style={{
            flex: 1, padding: '5%',
            backgroundColor: bgColor[mode]
        }}>
            <TextInput value={name} onChangeText={e => setName(e)} placeholder="Enter your name" style={{ ...homeStyles.input, backgroundColor: '#eeeeee' }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <Text style={{ color: textColor[mode] }}>Dark Mode</Text>
                <Switch value={checked} onValueChange={e => {
                    setChecked(e)
                }} />
            </View>

            <TouchableOpacity
                onPress={() => {
                    dispatch(settingAction.saveSettings({
                        name, mode: checked
                    }));
                    navigation.navigate("Home")
                }}
                style={{ backgroundColor: '#0d78f2', padding: 10, alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: '#FFF' }}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    Alert.alert("Warning!", "This will delete all your notes! Are you sure you want to delete all notes?", [
                        {
                            onPress: () => {
                                dispatch(noteAction.resetAll())
                                Alert.alert("Success", "All your notes have been deleted!")
                            },
                            text: `Yes, I'm sure!`
                        }
                    ], {
                        cancelable: true
                    });
                }}
                style={{ backgroundColor: 'red', padding: 10, alignItems: 'center', borderRadius: 10, marginVertical: 10 }}>
                <Text style={{ color: '#FFF' }}>Reset Data</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen