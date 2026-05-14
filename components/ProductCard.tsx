import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart, type Product } from "./CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>₱{product.price.toFixed(2)}</Text>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden",
    marginBottom: 16, flex: 1, marginHorizontal: 6,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  image: { width: "100%", height: 160, backgroundColor: "#F3F4F6" },
  info: { padding: 12, gap: 6 },
  name: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#1A1A2E", lineHeight: 20 },
  price: { fontSize: 16, fontFamily: "Inter_700Bold", color: "#6C63FF" },
  button: { backgroundColor: "#6C63FF", borderRadius: 10, paddingVertical: 10, alignItems: "center", marginTop: 4 },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  buttonText: { color: "#FFFFFF", fontSize: 13, fontFamily: "Inter_600SemiBold" },
});