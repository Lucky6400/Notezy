import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '../styles/homeStyles'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { noteAction } from '../redux/noteSlice';

const SingleNoteScreen = (props) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(props.route.params?.item);
    const source = {
        html: item.html
    };
    const { width, height } = useWindowDimensions();

    if(!item) return <></>;

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#FFF', padding: 10 }}>

            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 24 }}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={homeStyles.singlenoteCatbtn}>{item.category || "No Category"}</Text>
            </View>

            <View style={{ paddingVertical: 40, minHeight: height }}>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                />
            </View>

            <View style={{ position: 'absolute', top: height - 120, right: 20, flexDirection: 'row', gap: 10 }}>

                <TouchableOpacity
                    onPress={() => {
                        if (item.isFavourite) {
                            dispatch(noteAction.removeFromFavorite(item))
                            setItem(p => ({ ...p, isFavourite: false }))
                        } else {
                            dispatch(noteAction.addToFavorite(item))
                            setItem(p => ({ ...p, isFavourite: true }))
                        }
                    }}
                    style={{ ...homeStyles.cardBtn, borderWidth: 1 }}>
                    {item.isFavourite ? <AntDesign name="heart" size={24} color="black" /> : <AntDesign name="hearto" size={24} color="black" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    dispatch(noteAction.deleteNote({ id: item.id }));
                    props.navigation.navigate("Home");
                }} style={{ ...homeStyles.cardBtn, borderWidth: 1 }}>
                    <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SingleNoteScreen