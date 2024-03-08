import { StyleSheet, Text, View, Image } from "react-native";

const ProductsScreen = ({ navigation, route }) => {
  return (
    <View>
      <View style={styles.productRow}>
        <Image
          style={styles.productImage}
          source={{
            uri: "https://fringeheals.com/wp-content/uploads/2023/12/Copy-of-Red-Light-Face-Mask-Instagram-Post-1.jpg",
          }}
        />
        <Text style={styles.productText}>
          <Text style={styles.productHeader}>red light face mask{"\n"}</Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          aut, repellat ipsum facere voluptate dicta
        </Text>
      </View>
    </View>
  );
};
export default ProductsScreen;

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
