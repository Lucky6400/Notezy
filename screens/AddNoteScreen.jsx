import React from 'react'
import AddNote from '../components/AddNote'

const AddNoteScreen = ({ navigation, route }) => {
    return (
        <AddNote params={route.params} navigation={navigation} />
    )
}

export default AddNoteScreen