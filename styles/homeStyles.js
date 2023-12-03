import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    addNoteHeading: {
        fontSize: 24,
        fontWeight: "500",
        padding: 10
    },
    sortBy: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomColor: '#efefef',
        borderBottomWidth: 1
    },
    catBtn: {
        padding: 15,
        borderRadius: 10,
        height: 50,
        marginRight: 10
    },
    noteCard: {
        width: '90%',
        marginLeft: '5%',
        borderRadius: 30,
        padding: 20,
        marginVertical: 20,
        maxHeight: 250,
        position: 'relative',
        overflow: 'hidden',
    },
    cardBtn: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: "center",
    },
    bottomBtnCont: { backgroundColor: '#000', width: 80, height: 80, borderRadius: 0, alignItems: 'center', justifyContent: 'center', zIndex: 20 },
    bottomCont: { position: 'absolute', bottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 0, paddingRight: 0 },
    bottomBtn: { backgroundColor: '#aaaaaa', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
    input: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15
    },
    submitBtn: {
        backgroundColor: '#000',
        textAlign: 'center',
        color: 'white',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 30
    },
    singlenoteCatbtn: { fontFamily: 'Poppins_400Regular', color: '#FFF', backgroundColor: '#000', padding: 10, borderRadius: 10 },
    catCont: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    titleCont: { fontFamily: 'Poppins_600SemiBold', fontSize: 24 }
})