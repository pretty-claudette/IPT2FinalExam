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
import { CartItemRow } from "@/components/CartItemRow";
import { useCart } from "@/components/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, totalItems, grandTotal } = useCart();

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#1A1A2E" />
        </Pressable>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.backBtn} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="shopping-cart" size={56} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add some products to get started</Text>
          <Pressable
            style={({ pressed }) => [styles.shopBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.shopBtnText}>Browse Products</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CartItemRow item={item} />}
            contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 200 }]}
            showsVerticalScrollIndicator={false}
          />
          <View style={[styles.summary, { paddingBottom: bottomPadding + 16 }]}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalPrice}>${grandTotal.toFixed(2)}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.checkoutBtn, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingBottom: 16, paddingTop: 12,
  },
  backBtn: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: "#FFFFFF",
    alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  headerTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: "#1A1A2E" },
  list: { paddingHorizontal: 20, paddingTop: 4 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: "#1A1A2E", marginTop: 8 },
  emptyText: { fontSize: 14, fontFamily: "Inter_400Regular", color: "#6B7280", textAlign: "center" },
  shopBtn: { marginTop: 16, backgroundColor: "#6C63FF", paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  shopBtnText: { color: "#FFFFFF", fontSize: 15, fontFamily: "Inter_600SemiBold" },
  summary: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "#FFFFFF", paddingHorizontal: 20, paddingTop: 20,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 10, gap: 10,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { fontSize: 14, fontFamily: "Inter_400Regular", color: "#6B7280" },
  summaryValue: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#1A1A2E" },
  totalRow: { marginTop: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F3F4F6" },
  totalLabel: { fontSize: 17, fontFamily: "Inter_700Bold", color: "#1A1A2E" },
  totalPrice: { fontSize: 22, fontFamily: "Inter_700Bold", color: "#6C63FF" },
  checkoutBtn: {
    backgroundColor: "#6C63FF", borderRadius: 14, paddingVertical: 16,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4,
  },
  checkoutText: { color: "#FFFFFF", fontSize: 16, fontFamily: "Inter_600SemiBold" },
});