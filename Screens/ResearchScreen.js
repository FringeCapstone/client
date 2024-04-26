import {Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";

const ResearchScreen = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchDocuments = async () => {
            const querySnapshot = await firebase.firestore().collection('research_blogs').get();
            const documentsData = querySnapshot.docs.map(doc => doc.data());
            setDocuments(documentsData);
        };
        fetchDocuments();
    }, []);

    const handleDocumentPress = (document) => {
        setSelectedDocument(document);
        setModalVisible(true);
    };

    return (
        <ScrollView>
            <Text style={styles.blogText}>
                {documents.map((document, index) => (
                    <View key={index} style={styles.blogRow}>
                        <TouchableOpacity onPress={() => handleDocumentPress(document)}>
                            <Text style={styles.blogHeader}>{document?.header}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <Modal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    animationType="slide"
                >
                    {selectedDocument && (
                        <ScrollView>
                            <Text style={styles.blogHeader}>{selectedDocument?.header} </Text>
                            <Text>{'\n'}</Text>
                            <Text>{selectedDocument?.body}</Text>
                            <Button title="Close" onPress={() => {
                                setModalVisible(false)
                            }}/>
                        </ScrollView>
                    )}
                </Modal>
            </Text>
        </ScrollView>
    );
};

export default ResearchScreen;

const styles = StyleSheet.create({
    blogRow: {
        margin: 5,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        justifyContent: 'center',
    },
    blogText: {
        fontFamily: "RegularRedHatMono",
        flex: 1,
        flexWrap: "wrap",
    },
    blogHeader: {
        fontFamily: "BoldRedHatMono",
        flex: 1,
        flexWrap: "wrap",
        color: "blue",
        textAlign: "center",
    },
});
