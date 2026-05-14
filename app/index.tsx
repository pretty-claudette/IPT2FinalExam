import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductCard } from "@/components/ProductCard";
import { useCart, type Product } from "@/components/CartContext";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Matte Black Phone Case",
    price: 12.99,
    image: require("../assets/images/product1.jpg"),
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    price: 49.99,
    image: require("../assets/images/product2.jpg"),
  },
  {
    id: "3",
    name: "Aluminum Phone Stand",
    price: 19.99,
    image: require("../assets/images/product3.jpg"),
  },
  {
    id: "4",
    name: "Braided USB-C Cable",
    price: 9.99,
    image: require("../assets/images/product4.jpg"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { totalItems } = useCart();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ flex: 1 }}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Shop</Text>
          <Text style={styles.headerSub}>Find what you love</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.cartBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.push("/cart")}
        >
          <Feather name="shopping-cart" size={22} color="#1A1A2E" />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 16 }]}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
  },
  headerTitle: { fontSize: 28, fontFamily: "Inter_700Bold", color: "#1A1A2E" },
  headerSub: { fontSize: 13, fontFamily: "Inter_400Regular", color: "#6B7280", marginTop: 2 },
  cartBtn: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: "#FFFFFF",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  badge: {
    position: "absolute", top: -4, right: -4, minWidth: 18, height: 18,
    borderRadius: 9, backgroundColor: "#6C63FF",
    alignItems: "center", justifyContent: "center", paddingHorizontal: 4,
  },
  badgeText: { color: "#FFFFFF", fontSize: 10, fontFamily: "Inter_700Bold" },
  list: { paddingHorizontal: 14, paddingTop: 4 },
  row: { justifyContent: "space-between" },
});