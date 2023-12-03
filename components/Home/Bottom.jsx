import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '../../styles/homeStyles'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Bottom = ({ navigation }) => {
    // console.log(navigation)
    return (
        <View style={homeStyles.bottomCont}>
            <View style={{ ...homeStyles.bottomBtnCont, borderTopLeftRadius: 50, borderBottomLeftRadius: 10, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Favourites")
                    }}
                    style={homeStyles.bottomBtn}>
                    <AntDesign name="heart" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={homeStyles.bottomBtnCont}>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Settings")
                }}
                style={homeStyles.bottomBtn}>
                    <Ionicons name="ios-settings-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ ...homeStyles.bottomBtnCont, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 50, borderBottomRightRadius: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AddNote")
                    }}
                    style={{ ...homeStyles.bottomBtn, backgroundColor: 'rgb(64,191,169)' }}>
                    <Ionicons name="md-add" size={24} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Bottom