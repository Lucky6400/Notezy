import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

import { Entypo } from '@expo/vector-icons';
import NoteCard from '../components/Home/NoteCard';
import { bgColor, textColor } from '../utils/theme';

const FavouriteNotes = ({ navigation }) => {
    const favorites = useSelector(s => s.noteReducer.favorites);
    const mode = useSelector(s => s.settings.mode);
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: bgColor[mode], paddingBottom: 300, flex: 1 }}>

            {favorites && favorites.length > 0 ?
                favorites.map((item, index) => (<NoteCard onFavScreen={true} item={item} navigation={navigation} key={item?.id} />))

                : <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                    <Entypo name="emoji-sad" size={100} color={textColor[mode]} />
                    <Text style={{ fontSize: 24, paddingHorizontal: 10, fontWeight: '500', color: textColor[mode] }}>
                        No Notes found!
                    </Text>
                    <Text style={{ color: textColor[mode] }}>
                        Click '+' icon on home screen to add a note.
                    </Text>
                </View>}

        </ScrollView>
    )
}

export default FavouriteNotes