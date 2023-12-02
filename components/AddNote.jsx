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
import { useDispatch } from 'react-redux'
import { noteAction } from "../redux/noteSlice";

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
    actions.checkboxList,
    actions.insertLink,
    actions.setSubscript,
    actions.setSuperscript,
    actions.setStrikethrough,
    actions.undo,
    actions.redo,
    actions.code,
    actions.table,
    actions.line,
    // actions.hiliteColor,
    // actions.keyboard,
    // actions.setTextColor,
    // actions.setBackgroundColor
];

const iconMap = {
    [actions.setBold]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Foundation name="bold" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.setItalic]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="format-italic" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.setUnderline]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="format-underline" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.heading1]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H1</Text>,
    [actions.heading2]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H2</Text>,
    [actions.heading3]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H3</Text>,
    [actions.heading4]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H4</Text>,
    [actions.heading5]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H5</Text>,
    [actions.heading6]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>H6</Text>,
    [actions.removeFormat]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="format-clear" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.alignLeft]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Feather name="align-left" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.alignCenter]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Feather name="align-center" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.alignRight]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Feather name="align-right" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.alignFull]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Feather name="align-justify" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.insertBulletsList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="format-list-bulleted" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.insertOrderedList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Octicons name="list-ordered" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.checkboxList]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Octicons name="checklist" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.insertLink]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Entypo name="link" size={16} color={isActive ? "black" : tintColor} />
    </Text>,

    [actions.insertImage]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="insert-photo" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.setSubscript]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="subscript" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.setSuperscript]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="superscript" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.setStrikethrough]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="format-strikethrough" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.undo]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}><MaterialIcons name="undo" size={16} color={isActive ? "black" : tintColor} /></Text>,
    [actions.redo]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialIcons name="redo" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.code]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Entypo name="code" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.table]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <MaterialCommunityIcons name="table" size={16} color={isActive ? "black" : tintColor} />
    </Text>,
    [actions.line]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
        <Octicons name="horizontal-rule" size={16} color={isActive ? "black" : tintColor} />
    </Text>,

    // [actions.hiliteColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
    //     <Ionicons name="color-fill" size={16} color={isActive ? "black" : tintColor} />
    // </Text>,

    // [actions.setTextColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
    //     <Foundation name="text-color" size={16} color={isActive ? "black" : tintColor} />
    // </Text>,
    // [actions.setBackgroundColor]: ({ tintColor, isActive }) => <Text style={{ color: isActive ? "black" : tintColor, paddingLeft: 10 }}>
    //     <Foundation name="background-color" size={16} color={isActive ? "black" : tintColor} />
    // </Text>
};

const AddNote = ({ navigation, params }) => {
    const richText = React.useRef();
    const [selColor, setSelColor] = React.useState(params?.item?.color || "");
    const [category, setCategory] = React.useState(params?.item?.category || "");
    const [title, setTitle] = React.useState(params?.item?.title || "");
    const [currHtml, setCurrHtml] = React.useState(params?.item?.html || ``);
    console.log(params)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        try {
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
            <ScrollView
                contentContainerStyle={{
                    width: '90%',
                    marginLeft: '5%'
                }}
            >
                <Text style={homeStyles.addNoteHeading}>Add Note:</Text>

                <TextInput value={title} onChangeText={(e) => setTitle(e)} placeholder="Title" style={homeStyles.input} />

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, borderColor: '#eeeeee', borderWidth: 1, borderRadius: 15, overflow: 'hidden' }}>
                    <RichToolbar
                        editor={richText}
                        actions={actionArray}
                        iconMap={iconMap}
                    />

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
                    data={categoriesData}
                    defaultButtonText={category || "Select Category"}

                    onSelect={(selectedItem) => {
                        setCategory(selectedItem)
                    }}
                    renderDropdownIcon={() => <AntDesign name="downcircle" size={16} color="black" />}
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
                            borderWidth: selColor === color ? 1 : 0, borderColor: 'black'
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