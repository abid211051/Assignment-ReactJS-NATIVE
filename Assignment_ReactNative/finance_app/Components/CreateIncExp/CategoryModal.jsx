import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux'
import React from 'react'

const CategoryModal = ({toggIncExp, toggCate, changeCateTogg, changeCategory }) => {
    const { categories } = useSelector(state => state.category);
    return (
        <>
            <Modal
                animationType='slide'
                visible={toggCate}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={styles.modalinfo}>
                        <Text style={styles.headertext}>Create</Text>
                        <FlatList
                            numColumns={3}
                            contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                            data={toggIncExp?categories[0].data:categories[1].data}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.itemBtn}
                                    onPress={() => (changeCategory(item.category), changeCateTogg())}
                                >
                                    <Text style={styles.txt}>{item.category}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={styles.modalbtn}>
                            <Text style={styles.modalbtntext} onPress={() => changeCateTogg()}>Close</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default CategoryModal;

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalinfo: {
        width: 360,
        height: 400,
        padding: 5,
        paddingBottom: 20,
        backgroundColor: 'white',
        flexDirection: 'column',
        gap: 20
    },
    headertext: {
        fontSize: 20,
        fontWeight: '700',
    },
    modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10
    },
    modalbtntext: {
        width: '45%',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    itemView: {
        width: '100%',
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemBtn: {
        width: 90,
        height: 60,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7
    },
    txt: {
        fontSize: 16,
        fontWeight: '600'
    }
})