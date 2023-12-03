import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Categories from '../components/Home/Categories';
import NoteCard from '../components/Home/NoteCard';
import Bottom from '../components/Home/Bottom';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getTimeOfDay } from '../utils/greeting';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const greetingIcon = {
    "morning": <Feather style={{ padding: 10 }} name="sunrise" size={32} color="#ffb300" />,
    "afternoon": <MaterialIcons style={{ padding: 10 }} name="wb-sunny" size={32} color="#f2d00d" />,
    "evening": <MaterialCommunityIcons style={{ padding: 10 }} name="weather-night" size={32} color="#267ad9" />
}

const HomeScreen = ({ navigation }) => {
    const notes = useSelector(s => s.noteReducer.notes)
    const [sel, setSel] = useState("");

    return (
        <View style={{ height: '100%', position: 'relative', backgroundColor: '#FFFFFF' }}>
            {greetingIcon[getTimeOfDay()]}
            <Text style={{ fontSize: 24, paddingHorizontal: 10, fontWeight: '500', marginBottom: 10 }}>
                Good {getTimeOfDay()}, Lucky!
            </Text>
            <View>
                <Categories sel={sel} setSel={setSel} />
            </View>
            <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF', paddingBottom: 300 }}>

                {notes && notes.filter(note => note.category.includes(sel)).length > 0 ?
                    notes.filter(note => note.category.includes(sel)).map((item, index) => (<NoteCard item={item} navigation={navigation} key={item?.id} />))

                    : <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                        <Entypo name="emoji-sad" size={100} color="black" />
                        <Text style={{ fontSize: 24, paddingHorizontal: 10, fontWeight: '500' }}>
                            No Notes found!
                        </Text>
                        <Text>
                            Click '+' icon below to add a note.
                        </Text>
                    </View>}

            </ScrollView>

            <Bottom navigation={navigation} />
        </View>
    )
}

export default HomeScreen