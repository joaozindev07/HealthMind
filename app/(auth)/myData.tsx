import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MyDataPage() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#A259F7", "#c85efd", "#be41fd"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      <View style={[styles.header, { paddingTop: 24 + height * 0.02 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Dados</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.95)"]}
          style={styles.mainContainer}
        >
          <View style={styles.section}>
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <View style={styles.statIconCircle}>
                  <Ionicons name="calendar" size={20} color="#A259F7" />
                </View>
                <Text style={styles.statTitle}>Dias de Intensivo</Text>
                <Text style={styles.statValue}>12 dias</Text>
                <Text style={styles.statHint}>Exemplo: últimos 30 dias</Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statIconCircle}>
                  <Ionicons name="trophy" size={20} color="#A259F7" />
                </View>
                <Text style={styles.statTitle}>Conquistas</Text>
                <Text style={styles.statValue}>5 badges</Text>
                <Text style={styles.statHint}>Exemplo: metas alcançadas</Text>
              </View>

              <View style={styles.statCard}>
                <View style={styles.statIconCircle}>
                  <Ionicons name="flash" size={20} color="#A259F7" />
                </View>
                <Text style={styles.statTitle}>XP Intensivos</Text>
                <Text style={styles.statValue}>1.240 XP</Text>
                <Text style={styles.statHint}>Exemplo: acumulado</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivos do Usuário</Text>
            <View style={styles.card}>
              {[
                { title: "Praticar meditação diária", progress: 0.7 },
                { title: "Registrar humor 5x por semana", progress: 0.5 },
                { title: "Sessão com profissional 2x/mês", progress: 0.3 },
              ].map((g, idx) => (
                <View key={idx} style={styles.goalItem}>
                  <Text style={styles.goalTitle}>{g.title}</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${Math.round(g.progress * 100)}%` }]} />
                  </View>
                  <Text style={styles.goalPercent}>{Math.round(g.progress * 100)}%</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <View style={styles.cardRow}>
              {[
                { icon: "medal", label: "Primeiro Intensivo" },
                { icon: "star", label: "Semana Consistente" },
                { icon: "ribbon", label: "Meta Alcançada" },
              ].map((a, idx) => (
                <View key={idx} style={styles.badge}>
                  <Ionicons name={a.icon as any} size={18} color="#A259F7" />
                  <Text style={styles.badgeText}>{a.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profissional Mais Visitado</Text>
            <View style={styles.cardProfessional}>
              <View style={styles.professionalHeader}>
                <View style={styles.professionalAvatarCircle}>
                  <Ionicons name="person" size={24} color="#A259F7" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.professionalName}>Dra. Ana Silva</Text>
                  <Text style={styles.professionalRole}>Psicóloga · TCC</Text>
                </View>
              </View>

              <View style={styles.professionalInfoRow}>
                <View style={styles.infoChip}>
                  <Ionicons name="time-outline" size={16} color="#7C3AED" />
                  <Text style={styles.infoChipText}>12 sessões</Text>
                </View>
                <View style={styles.infoChip}>
                  <Ionicons name="star" size={16} color="#7C3AED" />
                  <Text style={styles.infoChipText}>4.8 avaliação</Text>
                </View>
                <View style={styles.infoChip}>
                  <Ionicons name="calendar" size={16} color="#7C3AED" />
                  <Text style={styles.infoChipText}>Próxima: 20/12</Text>
                </View>
              </View>

              <View style={styles.divider} />
              <Text style={styles.professionalBio}>
                Exemplo: abordagem terapêutica, experiência e foco em saúde mental preventiva.
              </Text>

              <TouchableOpacity style={styles.professionalButton}>
                <Ionicons name="information-circle-outline" size={18} color="#7C3AED" />
                <Text style={styles.professionalButtonText}>Ver perfil</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.section, { paddingBottom: 32 }]}>
            <Text style={styles.sectionTitle}>XP Adquirido dos Intensivos</Text>
            <View style={styles.card}>
              <View style={styles.xpRow}>
                <Ionicons name="flash" size={18} color="#A259F7" />
                <Text style={styles.xpLabel}>XP total</Text>
                <Text style={styles.xpValue}>1.240</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "62%" }]} />
              </View>
              <Text style={styles.xpHint}>Exemplo: nível 6 rumo ao nível 7</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1
    },
  scrollView: {
     flex: 1
    },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff" 
    },
  mainContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937", marginBottom: 12 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: {
    width: (width - width * 0.12 - 12) / 2,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  statIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statTitle: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  statValue: { fontSize: 20, fontWeight: "700", color: "#1F2937", marginTop: 4 },
  statHint: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F4FF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: { color: "#6B7280", marginLeft: 8, fontWeight: "600" },

  goalItem: { marginBottom: 14 },
  goalTitle: { fontSize: 14, color: "#1F2937", fontWeight: "600", marginBottom: 6 },
  progressBarBg: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
  },
  progressBarFill: { height: 10, borderRadius: 6, backgroundColor: "#A259F7" },
  goalPercent: { fontSize: 12, color: "#6B7280", marginTop: 6 },

  cardProfessional: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  professionalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  professionalAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5F3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  professionalName: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  professionalRole: { fontSize: 13, color: "#6B7280" },
  professionalInfoRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginBottom: 12 },
  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  infoChipText: { color: "#4C1D95", fontWeight: "600", marginLeft: 6 },
  divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 10 },
  professionalBio: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
  professionalButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  professionalButtonText: { marginLeft: 8, color: "#7C3AED", fontWeight: "700" },

  xpRow: { flexDirection: "row", alignItems: "center" },
  xpLabel: { marginLeft: 8, color: "#6B7280" },
  xpValue: { marginLeft: "auto", fontWeight: "700", color: "#1F2937" },
  xpHint: { fontSize: 12, color: "#6B7280", marginTop: 8 },
});