import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { filterbook } from '../../redux/Slices/BookSlice';

const HomeScreenHeader = () => {
    const [selectedGenre, setSelectedGenre] = useState('All');
    const dispatch = useDispatch();
    return (
        <>
            <View style={{ width: '95%', marginVertical: 5 }}>
                <Text style={{ fontSize: 25, fontWeight: '600', color: '#5a51ae' }}>Filter By:</Text>
            </View>
            <View style={styles.filterbtnView}>
                <TouchableOpacity
                    onPress={() => (setSelectedGenre('All'), dispatch(filterbook('All')))}
                    style={[styles.filterbtn, selectedGenre==='All'?{borderColor:'green'}:null, { borderRightWidth: 2, borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => (setSelectedGenre('Adventure'), dispatch(filterbook('Adventure')))}
                    style={[styles.filterbtn, selectedGenre==='Adventure'?{borderColor:'green'}:null, { borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>Adventure</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => (setSelectedGenre('Fantasy'), dispatch(filterbook('Fantasy')))}
                    style={[styles.filterbtn, selectedGenre==='Fantasy'?{borderColor:'green'}:null, { borderLeftWidth: 2, borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>Fantasy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => (setSelectedGenre('Sci-Fi'), dispatch(filterbook('Sci-Fi')))}
                    style={[styles.filterbtn, selectedGenre==='Sci-Fi'?{borderColor:'green'}:null, { borderRightWidth: 2, borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>Sci-Fi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => (setSelectedGenre('Historical'), dispatch(filterbook('Historical')))}
                    style={[styles.filterbtn, selectedGenre==='Historical'?{borderColor:'green'}:null, { borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>Historical</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => (setSelectedGenre('Horror'), dispatch(filterbook('Horror')))}
                    style={[styles.filterbtn, selectedGenre==='Horror'?{borderColor:'green'}:null, { borderLeftWidth: 2, borderBottomWidth: 2 }]}
                >
                    <Text style={styles.txt}>Horror</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default HomeScreenHeader;
const styles = StyleSheet.create({
    filterbtnView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 30
    },
    filterbtn: {
        width: '30%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: 'red'
    },
    txt: {
        fontSize: 19,
        fontWeight: '500'
    }
})