import React from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { homeStyles } from "../styles/homeStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { categoriesData } from "../data/categories";
import { noteColors } from "../data/noteColors";
import { useDispatch, useSelector } from 'react-redux'
import { noteAction } from "../redux/noteSlice";
import { textColor } from "../utils/theme";

const actionArray = [
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,
    actions.heading1,
    actions.heading2,
    actions.heading3,
    actions.heading4,
    actions.heading5,
    actions.heading6,
    actions.removeFormat,
    actions.alignLeft,
    actions.alignCenter,
    actions.alignRight,
    actions.alignFull,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertLink,
    actions.setSubscript,
    actions.setSuperscript,
    actions.setStrikethrough,
    actions.undo,
    actions.redo,
    actions.code,
    actions.line,
    // actions.hiliteColor,
    // actions.keyboard,
    actions.setTextColor,
    // actions.setBackgroundColor
];

const iconMap = {
    [actions.setBold]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Foundation name="bold" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.setItalic]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="format-italic" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.setUnderline]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="format-underline" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.heading1]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H1</Text>,
    [actions.heading2]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H2</Text>,
    [actions.heading3]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H3</Text>,
    [actions.heading4]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H4</Text>,
    [actions.heading5]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H5</Text>,
    [actions.heading6]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor, fontSize: 24 }}>H6</Text>,
    [actions.removeFormat]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="format-clear" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.alignLeft]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Feather name="align-left" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.alignCenter]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Feather name="align-center" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.alignRight]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Feather name="align-right" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.alignFull]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Feather name="align-justify" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.insertBulletsList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="format-list-bulleted" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.insertOrderedList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Octicons name="list-ordered" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.checkboxList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Octicons name="checklist" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.insertLink]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Entypo name="link" size={24} color={isActive ? "white" : tintColor} />
    </Text>,

    [actions.insertImage]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="insert-photo" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.setSubscript]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="subscript" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.setSuperscript]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="superscript" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.setStrikethrough]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="format-strikethrough" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.undo]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}><MaterialIcons name="undo" size={24} color={isActive ? "white" : tintColor} /></Text>,
    [actions.redo]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialIcons name="redo" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.code]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Entypo name="code" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.table]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <MaterialCommunityIcons name="table" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    [actions.line]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Octicons name="horizontal-rule" size={24} color={isActive ? "white" : tintColor} />
    </Text>,

    // [actions.hiliteColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
    //     <Ionicons name="color-fill" size={24} color={isActive ? "white" : tintColor} />
    // </Text>,

    [actions.setTextColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
        <Foundation name="text-color" size={24} color={isActive ? "white" : tintColor} />
    </Text>,
    // [actions.setBackgroundColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "white" : tintColor }}>
    //     <Foundation name="background-color" size={24} color={isActive ? "white" : tintColor} />
    // </Text>
};

const AddNote = ({ navigation, params }) => {
    const richText = React.useRef();
    const [selColor, setSelColor] = React.useState(params?.item?.color || "");
    const [category, setCategory] = React.useState(params?.item?.category || "");
    const [title, setTitle] = React.useState(params?.item?.title || "");
    const [currHtml, setCurrHtml] = React.useState(params?.item?.html || ``);
    // console.log(params)
    const mode = useSelector(s => s.settings.mode);
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try {
            if (!title || !currHtml) {
                Alert.alert("Please fill all details!");
                return null;
            }
            const payload = {
                title, html: currHtml, category, color: selColor, isFavourite: false, id: params?.isEditing ? params.item.id : Date.now()
            }
            if (params?.isEditing) {
                dispatch(noteAction.editNote(payload));
            } else {
                dispatch(noteAction.addNote(payload));
            }
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Something went wrong! Please contact developer for support.")
        }
    }

    return (
        <SafeAreaView>
            <RichToolbar
                style={{
                    height: 60
                }}
                iconTint="#000"
                selectedIconTint="#FFF"
                unselectedButtonStyle={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#FFFFFF'
                }}
                selectedButtonStyle={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#000'
                }}
                editor={richText}
                actions={actionArray}
                iconMap={iconMap}
            />
            <ScrollView
                contentContainerStyle={{
                    width: '100%',
                    padding: '5%',
                    paddingBottom: 300,
                    backgroundColor: mode === "dark" ? "#000" : "transparent"
                }}
            >
                <Text style={{ ...homeStyles.addNoteHeading, color: textColor[mode] }}>{params?.isEditing ? "Update" : "Add"} Note:</Text>

                <TextInput value={title} onChangeText={(e) => setTitle(e)} placeholder="Title" style={homeStyles.input} />

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, borderColor: '#eeeeee', borderWidth: 1, borderRadius: 15, overflow: 'hidden' }}>


                    <RichEditor
                        placeholder="Write something here..."
                        initialHeight={300}
                        ref={richText}
                        initialContentHTML={currHtml}
                        onChange={descriptionText => {
                            setCurrHtml(descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>

                <SelectDropdown
                    data={categoriesData.slice(1)}
                    defaultButtonText={category || "Select Category"}

                    onSelect={(selectedItem) => {
                        setCategory(selectedItem)
                    }}
                    renderDropdownIcon={() => <AntDesign name="downcircle" size={24} color="black" />}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}

                    buttonStyle={{
                        backgroundColor: 'white',
                        width: '100%',
                        borderRadius: 10,
                        marginVertical: 15
                    }}
                />


                <Text>Note color:</Text>
                <ScrollView horizontal>
                    {noteColors.map((color, index) => (<TouchableOpacity
                        onPress={() => setSelColor(color)}
                        key={index + color} style={{
                            width: 40, height: 40, backgroundColor: color, margin: 10,
                            borderWidth: selColor === color ? 2 : 0, borderColor: textColor[mode]
                        }}></TouchableOpacity>))}

                </ScrollView>

                <TouchableOpacity onPress={handleSubmit} style={homeStyles.submitBtn}>
                    <Text style={{ color: 'white', fontSize: 18, textTransform: 'uppercase' }}>
                        {params?.isEditing ? "Update" : "Create"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>


        </SafeAreaView>
    );
};

export default AddNote;