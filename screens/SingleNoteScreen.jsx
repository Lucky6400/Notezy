import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { homeStyles } from '../styles/homeStyles'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { noteAction } from '../redux/noteSlice';
import { bgColor, textColor } from '../utils/theme';

const SingleNoteScreen = (props) => {
    const dispatch = useDispatch();
    const mode = useSelector(s => s.settings.mode);
    const [item, setItem] = useState(props.route.params?.item);
    const source = {
        html: `
        <body style="background-color: ${bgColor[mode]}; color: ${textColor[mode]};">
        ${item.html}
        </body>
        `
    };
    const { width, height } = useWindowDimensions();

    if (!item) return <></>;

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: bgColor[mode], padding: 10 }}>

            <Text style={{ ...homeStyles.titleCont, color: textColor[mode] }}>{item.title}</Text>
            <View style={homeStyles.catCont}>
                <Text style={{
                    ...homeStyles.singlenoteCatbtn, backgroundColor: textColor[mode],
                    color: bgColor[mode]
                }}>{item.category || "No Category"}</Text>

                <View style={{ flexDirection: 'row', gap: 10 }}>

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

            </View>

            <View style={{ paddingVertical: 40, minHeight: height }}>
                <RenderHtml

                    contentWidth={width}
                    source={source}
                />
            </View>


        </ScrollView>
    )
}

export default SingleNoteScreen