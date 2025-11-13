"use client";

import { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const dailyChallenges = [
  {
    id: 1,
    day: 1,
    title: "Gratidão Matinal",
    description: "Liste 3 coisas pelas quais você é grato hoje",
    icon: "sunny-outline",
    completed: true,
    xp: 50,
    difficulty: "Fácil",
  },
  {
    id: 2,
    day: 2,
    title: "Respiração Consciente",
    description: "5 minutos de respiração profunda e mindfulness",
    icon: "leaf-outline",
    completed: true,
    xp: 75,
    difficulty: "Fácil",
  },
  {
    id: 3,
    day: 3,
    title: "Ato de Bondade",
    description: "Faça algo gentil por alguém hoje",
    icon: "heart-outline",
    completed: true,
    xp: 100,
    difficulty: "Médio",
  },
  {
    id: 4,
    day: 4,
    title: "Movimento Feliz",
    description: "30 minutos de atividade física que você goste",
    icon: "fitness-outline",
    completed: false,
    xp: 125,
    difficulty: "Médio",
    current: true,
  },
  {
    id: 5,
    day: 5,
    title: "Conexão Social",
    description: "Converse com um amigo ou familiar querido",
    icon: "people-outline",
    completed: false,
    xp: 100,
    difficulty: "Fácil",
  },
  {
    id: 6,
    day: 6,
    title: "Criatividade",
    description: "Dedique tempo a uma atividade criativa",
    icon: "color-palette-outline",
    completed: false,
    xp: 150,
    difficulty: "Médio",
  },
  {
    id: 7,
    day: 7,
    title: "Reflexão Semanal",
    description: "Reflita sobre seus progressos e conquistas",
    icon: "journal-outline",
    completed: false,
    xp: 200,
    difficulty: "Difícil",
  },
];

const achievements = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete seu primeiro desafio",
    icon: "trophy-outline",
    unlocked: true,
  },
  {
    id: 2,
    title: "Sequência de 3",
    description: "Complete 3 dias seguidos",
    icon: "flame-outline",
    unlocked: true,
  },
  {
    id: 3,
    title: "Uma Semana",
    description: "Complete 7 dias de desafios",
    icon: "ribbon-outline",
    unlocked: false,
  },
];

export default function IntensiveMoodScreen() {
  const [currentStreak, setCurrentStreak] = useState(3);
  const [totalXP, setTotalXP] = useState(225);
  const [selectedTab, setSelectedTab] = useState("challenges");
  const [onlyCurrent, setOnlyCurrent] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const completedChallenges = dailyChallenges.filter((c) => c.completed).length;
  const progressPercentage = (completedChallenges / dailyChallenges.length) * 100;

  const visibleChallenges = useMemo(() => {
    return dailyChallenges.filter((c) => {
      if (onlyCurrent && !c.current) return false;
      if (!showCompleted && c.completed) return false;
      return true;
    });
  }, [onlyCurrent, showCompleted]);

  const renderChallengeCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.challengeCard,
        item.completed && styles.completedCard,
        item.current && styles.currentCard,
      ]}
      activeOpacity={0.9}
      accessibilityLabel={`Desafio ${item.title}`}
    >
      <View style={styles.challengeHeader}>
        <View
          style={[
            styles.challengeIconContainer,
            item.completed && styles.completedIconContainer,
          ]}
        >
          <Ionicons
            name={item.completed ? "checkmark" : item.icon}
            size={26}
            color={item.completed ? "#FFFFFF" : "#A259F7"}
          />
        </View>

        <View style={styles.challengeInfo}>
          <View style={styles.challengeTitleRow}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <View style={styles.xpBadge}>
              <Ionicons name="sparkles" size={12} color="#92400E" />
              <Text style={styles.xpText}>{item.xp} XP</Text>
            </View>
          </View>

          <Text style={styles.challengeDescription}>{item.description}</Text>

          <View style={styles.cardMetaRow}>
            <View style={[styles.difficultyPill, item.difficulty === "Difícil" && styles.difficultyHard]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
            {item.completed && <Text style={styles.completedPill}>Concluído</Text>}
            {item.current && <Text style={styles.currentPill}>Atual</Text>}
          </View>
        </View>
      </View>

      <View style={styles.challengeFooter}>
        {/* botão removido para items concluídos */}
        {!item.completed && (
          <TouchableOpacity
            style={item.current ? styles.startButton : styles.startButton}
            accessibilityLabel={item.current ? "Começar desafio" : "Ver detalhes"}
            onPress={() => {
              // roteamento / ação aqui
            }}
          >
            <Ionicons
              name={item.current ? "play" : "information-circle-outline"}
              size={16}
              color={"#FFF"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.startButtonText}>
              {item.current ? "Começar" : "Detalhes"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderAchievement = ({ item }: { item: any }) => (
    <View
      key={item.id}
      style={[
        styles.achievementCard,
        !item.unlocked && styles.lockedAchievement,
      ]}
    >
      <LinearGradient
        colors={item.unlocked ? ["#FEF3C7", "#FBBF24"] : ["#F3F4F6", "#E5E7EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.achievementGradient}
      >
        <View style={styles.achievementContent}>
          <View
            style={[styles.achievementIcon, item.unlocked && styles.unlockedIcon]}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={item.unlocked ? "#92400E" : "#9CA3AF"}
            />
          </View>
          <View style={styles.achievementInfo}>
            <Text style={[styles.achievementTitle, !item.unlocked && styles.lockedText]}>
              {item.title}
            </Text>
            <Text style={[styles.achievementDescription, !item.unlocked && styles.lockedText]}>
              {item.description}
            </Text>
          </View>
          {item.unlocked && (
            <View style={styles.achievementBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#10B981" />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/images/icon.png")} style={styles.imageLogo} />
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.appTitle}>Intensivo Dias Felizes</Text>
            <Text style={styles.subtitle}>7 dias para transformar seu humor</Text>
          </View>
          {/* removed inline header actions to avoid shifting the title */}
        </View>

        {/* moved header action buttons to absolute/top so they don't push the title */}
        <View style={styles.headerActionsAbsolute}>
          <TouchableOpacity style={styles.iconButton} accessibilityLabel="Compartilhar">
            <Ionicons name="share-social-outline" size={18} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} accessibilityLabel="Ajuda">
            <Ionicons name="help-circle-outline" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color="#FFC107" />
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="star" size={20} color="#FFC107" />
            <Text style={styles.statNumber}>{totalXP}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.statNumber}>{completedChallenges}/7</Text>
            <Text style={styles.statLabel}>Completos</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#10B981", "#34D399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progressPercentage)}% completo</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "challenges" && styles.activeTab]}
              onPress={() => setSelectedTab("challenges")}
            >
              <Text style={styles.tabText}>Desafios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "achievements" && styles.activeTab]}
              onPress={() => setSelectedTab("achievements")}
            >
              <Text style={styles.tabText}>Conquistas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickControls}>
            <TouchableOpacity
              style={[styles.controlButton, onlyCurrent && styles.controlButtonActive]}
              onPress={() => setOnlyCurrent((v) => !v)}
            >
              <Ionicons name="time-outline" size={14} color={onlyCurrent ? "#FFF" : "#A259F7"} />
              <Text style={[styles.controlText, onlyCurrent && styles.controlTextActive]}>Só atual</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, !showCompleted && styles.controlButtonActive]}
              onPress={() => setShowCompleted((v) => !v)}
            >
              <Ionicons name="checkmark-done-outline" size={14} color={!showCompleted ? "#FFF" : "#A259F7"} />
              <Text style={[styles.controlText, !showCompleted && styles.controlTextActive]}>Ocultar completos</Text>
            </TouchableOpacity>
          </View>

          {/* calendário separado, centralizado e abaixo dos controles */}
          <View style={styles.calendarWrapper}>
            <TouchableOpacity
              style={styles.calendarCTA}
              onPress={() => router.push('/intensiveCalendarScreen')}
            >
              <Ionicons name="calendar-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
              <Text style={styles.calendarCTAtext}>Calendário</Text>
            </TouchableOpacity>
          </View>

          {selectedTab === "challenges"
            ? visibleChallenges.map((item) => renderChallengeCard({ item }))
            : achievements.map((item) => renderAchievement({ item }))}

          {selectedTab === "achievements" && (
            <View style={styles.achievementsContainer}>
              <Text style={styles.achievementsTitle}>Suas Conquistas</Text>
              <Text style={styles.achievementsSubtitle}>Continue completando desafios para desbloquear mais!</Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    paddingTop: 64, // aumentei para acomodar botões absolutos
    paddingHorizontal: 20,
    zIndex: 2,
    alignItems: "center",
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginTop: 12,
    marginBottom: 6,
  },
  headerTopRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center", // centraliza o título
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerActionsAbsolute: {
    position: "absolute",
    top: 46,
    right: 20,
    flexDirection: "row",
    gap: 8,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 8,
    borderRadius: 10,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center", // garante centralização do texto
  },
  subtitle: {
    fontSize: 13,
    color: "#F3E8FF",
    marginTop: 4,
    marginBottom: 10,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 6,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#F3E8FF",
  },
  progressContainer: {
    width: "100%",
    marginTop: 12,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    textAlign: "center",
    color: "#FFF",
    marginTop: 8,
    fontWeight: "600",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 3,
    marginTop: 14,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#FFF",
    shadowColor: "#A259F7",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
  },

  quickControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // centraliza os botões de controle
    marginBottom: 12,
    gap: 8,
    flexWrap: "wrap",
    width: "100%",
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEF2FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 8,
    marginHorizontal: 6,
    minWidth: 120,
    justifyContent: "center",
  },
  controlButtonActive: {
    backgroundColor: "#A259F7",
    borderColor: "#A259F7",
  },
  controlText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 13,
  },
  controlTextActive: {
    color: "#FFF",
  },
  calendarWrapper: {
    alignItems: "center",
    marginBottom: 14,
  },
  calendarCTA: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A259F7",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: "#A259F7",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarCTAtext: {
    color: "#FFF",
    fontWeight: "700",
  },

  challengeCard: {
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  currentCard: {
    borderColor: "#A259F7",
    borderWidth: 1.5,
    shadowColor: "#A259F7",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  completedCard: {
    backgroundColor: "#F0FFF4",
    borderColor: "#10B981",
  },

  challengeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  challengeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  completedIconContainer: {
    backgroundColor: "#10B981",
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  challengeTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  xpText: {
    fontSize: 12,
    color: "#92400E",
    fontWeight: "700",
    marginLeft: 6,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  difficultyPill: {
    backgroundColor: "rgba(162,89,247,0.08)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyHard: {
    backgroundColor: "rgba(244,63,94,0.08)",
  },
  difficultyText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  completedPill: {
    backgroundColor: "#E6FCE6",
    color: "#065F46",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
  },
  currentPill: {
    backgroundColor: "#EEF2FF",
    color: "#3730A3",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
  },

  challengeFooter: {
    marginTop: 12,
    alignItems: "center", // mantém centralização do botão no card
  },

  // botão principal (Começar) mantém destaque
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A259F7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#A259F7",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 120,
    justifyContent: "center",
  },

  // botão "Rever" menos protagonista: menor, sem sombra, borda sutil, texto menor
  startButtonGhost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",               // sem fundo para não competir
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(162,89,247,0.18)",        // borda roxa sutil
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    minWidth: 88,
    height: 36,
    justifyContent: "center",
  },

  startButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },

  startButtonTextGhost: {
    color: "#A259F7",
    fontWeight: "600",
    fontSize: 13,            // menor que o botão principal
  },

  achievementCard: {
    marginBottom: 14,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lockedAchievement: {
    opacity: 0.75,
  },
  achievementGradient: {
    borderRadius: 12,
  },
  achievementContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  achievementIcon: {
    width: 52,
    height: 52,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  unlockedIcon: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  lockedText: {
    color: "#9CA3AF",
  },
  achievementBadge: {
    marginLeft: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementsContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
    marginBottom: 8,
  },
  achievementsSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
});
