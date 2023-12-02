import React from 'react'
import { homeStyles } from '../../styles/homeStyles'
import { Text, TouchableOpacity, View } from 'react-native'
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { noteAction } from '../../redux/noteSlice';

const NoteCard = ({ item, navigation }) => {
    const dispatch = useDispatch();
    const source = {
        html: item.html
    };
    const { width } = useWindowDimensions();
    const [fontsLoaded, fontError] = useFonts({
        Poppins_600SemiBold, Poppins_400Regular
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    if (!item) return <></>

    return (
        <View style={{ ...homeStyles.noteCard, backgroundColor: item.color || '#dbdada', zIndex: 20 }}>
            <Text style={{ fontFamily: 'Poppins_400Regular' }}>{item.category || "No Category"}</Text>

            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 24 }}>{item.title}</Text>

            <RenderHtml
                contentWidth={width}
                source={source}
            />

            <View style={{ position: 'absolute', top: 5, right: 5, flexDirection: 'row', gap: 10 }}>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("SingleNote", {
                        item
                    })
                }} style={{ ...homeStyles.cardBtn }}>
                    <AntDesign name="eye" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (item.isFavourite) {
                            dispatch(noteAction.removeFromFavorite(item))
                        } else {
                            dispatch(noteAction.addToFavorite(item))
                        }
                    }}
                    style={{ ...homeStyles.cardBtn }}>
                    {item.isFavourite ? <AntDesign name="heart" size={24} color="black" /> : <AntDesign name="hearto" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(noteAction.deleteNote({ id: item.id }))
                }} style={{ ...homeStyles.cardBtn }}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>


            </View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("AddNote", {
                        item, isEditing: true
                    })
                }}
                style={{ ...homeStyles.cardBtn, position: 'absolute', right: -1, bottom: -1, height: 70, width: 70, borderRadius: 30, zIndex: 200 }}>
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default NoteCard