import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useCart, type CartItem } from "./CartContext";

export function CartItemRow({ item }: { item: CartItem }) {
  const { addToCart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.row}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyBtn} onPress={() => decreaseQuantity(item.id)}>
            <Feather name="minus" size={14} color="#6C63FF" />
          </Pressable>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => addToCart(item)}>
            <Feather name="plus" size={14} color="#6C63FF" />
          </Pressable>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.6 }]}
        onPress={() => removeFromCart(item.id)}
      >
        <Feather name="trash-2" size={18} color="#FF6B6B" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF",
    borderRadius: 16, padding: 12, marginBottom: 12,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2, gap: 12,
  },
  image: { width: 72, height: 72, borderRadius: 10, backgroundColor: "#F3F4F6" },
  details: { flex: 1, gap: 4 },
  name: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#1A1A2E", lineHeight: 18 },
  subtotal: { fontSize: 15, fontFamily: "Inter_700Bold", color: "#6C63FF" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 2 },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#F0EEFF", alignItems: "center", justifyContent: "center" },
  qty: { fontSize: 15, fontFamily: "Inter_600SemiBold", color: "#1A1A2E", minWidth: 20, textAlign: "center" },
  removeBtn: { padding: 8 },
});