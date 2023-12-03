import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux';

import { Entypo } from '@expo/vector-icons';
import NoteCard from '../components/Home/NoteCard';

const FavouriteNotes = ({ navigation }) => {
    const favorites = useSelector(s => s.noteReducer.favorites);

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF', paddingBottom: 300, flex: 1 }}>

            {favorites && favorites.length > 0 ?
                favorites.map((item, index) => (<NoteCard item={item} navigation={navigation} key={item?.id} />))

                : <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                    <Entypo name="emoji-sad" size={100} color="black" />
                    <Text style={{ fontSize: 24, paddingHorizontal: 10, fontWeight: '500' }}>
                        No Notes found!
                    </Text>
                    <Text>
                        Click '+' icon on home screen to add a note.
                    </Text>
                </View>}

        </ScrollView>
    )
}

export default FavouriteNotes