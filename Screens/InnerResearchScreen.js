import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const InnerResearchScreen = ({route}) => {
    const {item} = route.params;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.productText}>
                <Text>{item?.body}</Text>
            </View>
        </ScrollView>
    );
};

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

export default InnerResearchScreen;