import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";

const ResearchScreen = ({navigation}) => {
    const db = firebase.firestore();
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore collection
        const fetchData = async () => {
            const data = await db.collection('research_blogs').get();
            setItems(data.docs.map(doc => ({id: doc.id, ...doc.data()})));
        };
        fetchData();
    }, []);

    return (
        <View>
            <Text style={styles.productText}>
                <FlatList
                    data={items}
                    renderItem={({item}) => (
                        <View style={styles.productRow}>
                            <TouchableOpacity onPress={() => navigation.navigate('Document', {item})}>
                                <Text style={styles.productHeader}>{item?.header}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </Text>
        </View>
    );
};
export default ResearchScreen;

const styles = StyleSheet.create({
    productRow: {
        margin: 5,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        flexDirection: "row",
        alignItems: "center",
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
        padding: 5,
        margin: 5,
    },
    productText: {
        fontFamily: "RegularRedHatMono",
        flex: 1,
        flexWrap: "wrap",
    },
    productHeader: {
        fontFamily: "BoldRedHatMono",
        flex: 1,
        flexWrap: "wrap",
    },
});
