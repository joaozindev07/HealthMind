import React from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function AudioResourcePreview() {
  const router = useRouter();
  return (
    <LinearGradient colors={["#A259F7", "#c85efd", "#be41fd"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      <View style={[styles.header, { paddingTop: 24 + height * 0.02 }] }>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prévia do Áudio</Text>
        <View style={{ width: 44 }} />
      </View>

      <LinearGradient
        colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.95)"]}
        style={styles.main}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.coverCircle, { width: width * 0.22, height: width * 0.22, borderRadius: width * 0.11 }]}>
              <Ionicons name="play" size={28} color="#ffffff" />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={[styles.title, { fontSize: width * 0.05 }]}>Respiração Guiada</Text>
              <Text style={[styles.meta, { fontSize: width * 0.035 }]}>Áudio • 8 min</Text>
            </View>
          </View>

          <View style={styles.wavePlaceholder}>
            {/* Placeholder visual das ondas do áudio */}
            <View style={styles.waveBar} />
            <View style={[styles.waveBar, { height: 22 }]} />
            <View style={[styles.waveBar, { height: 16 }]} />
            <View style={[styles.waveBar, { height: 26 }]} />
            <View style={[styles.waveBar, { height: 14 }]} />
            <View style={[styles.waveBar, { height: 20 }]} />
            <View style={[styles.waveBar, { height: 12 }]} />
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.primaryButton} disabled>
              <LinearGradient colors={["#A259F7", "#c856f7"]} style={styles.primaryButtonGradient}>
                <Ionicons name="play-circle" size={22} color="#ffffff" />
                <Text style={styles.primaryButtonText}>Reproduzir</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Ionicons name="bookmark-outline" size={20} color="#A259F7" />
              <Text style={styles.secondaryButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#ffffff" },

  main: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  coverCircle: { alignItems: "center", justifyContent: "center", backgroundColor: "#A259F7" },
  title: { fontWeight: "700", color: "#1F2937" },
  meta: { color: "#6B7280", marginTop: 4 },

  wavePlaceholder: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    marginVertical: 20,
  },
  waveBar: { width: 8, height: 18, borderRadius: 4, backgroundColor: "#E5E7EB" },

  actionsRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  primaryButton: { flex: 1, borderRadius: 12, overflow: "hidden" },
  primaryButtonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, gap: 8 },
  primaryButtonText: { color: "#ffffff", fontWeight: "700" },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  secondaryButtonText: { color: "#1F2937", fontWeight: "600" },
});

