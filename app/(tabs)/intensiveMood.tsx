"use client";

import { useState, useRef } from "react";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
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
  const scrollY = useRef(new Animated.Value(0)).current;

  const initialTop = height * 0.45;
  const completedChallenges = dailyChallenges.filter((c) => c.completed).length;
  const progressPercentage =
    (completedChallenges / dailyChallenges.length) * 100;

  const renderChallengeCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.challengeCard,
        item.completed && styles.completedCard,
        item.current && styles.currentCard,
      ]}
      activeOpacity={0.9}
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
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <Text style={styles.challengeDescription}>{item.description}</Text>
        </View>
      </View>

      {item.current && (
        <View style={styles.challengeFooter}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderAchievement = ({ item }) => (
    <View
      key={item.id}
      style={[
        styles.achievementCard,
        !item.unlocked && styles.lockedAchievement,
      ]}
    >
      <View
        style={[styles.achievementIcon, item.unlocked && styles.unlockedIcon]}
      >
        <Ionicons
          name={item.icon}
          size={26}
          color={item.unlocked ? "#FFC107" : "#9CA3AF"}
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
      </View>
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

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.imageLogo}
        />
        <Text style={styles.appTitle}>Intensivo Dias Felizes</Text>
        <Text style={styles.subtitle}>7 dias para transformar seu humor</Text>

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
          <Text style={styles.progressText}>
            {Math.round(progressPercentage)}% completo
          </Text>
        </View>
      </View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            top: scrollY.interpolate({
              inputRange: [0, 180],
              outputRange: [initialTop, height * 0.2],
              extrapolate: "clamp",
            }),
            height: scrollY.interpolate({
              inputRange: [0, 180],
              outputRange: [height - initialTop, height - height * 0.2],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "challenges" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("challenges")}
            >
              <Text style={styles.tabText}>Desafios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "achievements" && styles.activeTab,
              ]}
              onPress={() => setSelectedTab("achievements")}
            >
              <Text style={styles.tabText}>Conquistas</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => {
              router.push('/intensiveCalendarScreen');
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#FFF"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.calendarButtonText}>
              Ver Calendário do Intensivo
            </Text>
          </TouchableOpacity>

          {selectedTab === "challenges"
            ? dailyChallenges.map((item) => renderChallengeCard({ item }))
            : achievements.map((item) => renderAchievement({ item }))}

          {selectedTab === "achievements" && (
            <View style={{ height: height * 0.4 }} /> 
          )}
          <View style={{ height: 40 }} />
        </Animated.ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    paddingTop: 60,
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 2,
  },
  imageLogo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#EEE",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#EEE",
  },
  progressContainer: {
    width: "100%",
    marginTop: 20,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#DDD",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
    color: "#FFF",
    marginTop: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },

  contentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 20,
    paddingBottom: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 3,
    marginTop: 70,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#FFF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A259F7",
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
  },
  calendarButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  challengeCard: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  currentCard: {
    borderColor: "#A259F7",
    borderWidth: 2,
    shadowColor: "#A259F7",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  completedCard: {
    backgroundColor: "#E6FCE6",
    borderColor: "#10B981",
  },

  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  completedIconContainer: {
    backgroundColor: "#10B981",
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#6B7280",
  },

  challengeFooter: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  startButton: {
    backgroundColor: "#A259F7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  unlockedIcon: {
    backgroundColor: "#FEF3C7",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
});
