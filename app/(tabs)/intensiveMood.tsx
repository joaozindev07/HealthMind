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
import { Styles } from "./styles/intensiveMoodCss";
import colors from "../theme/colors";

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
        Styles.challengeCard,
        item.completed && Styles.completedCard,
        item.current && Styles.currentCard,
      ]}
      activeOpacity={0.9}
      accessibilityLabel={`Desafio ${item.title}`}
    >
      <View style={Styles.challengeHeader}>
        <View
          style={[
            Styles.challengeIconContainer,
            item.completed && Styles.completedIconContainer,
          ]}
        >
            <Ionicons
            name={item.completed ? "checkmark" : item.icon}
            size={26}
            color={item.completed ? colors.white : colors.primary}
          />
        </View>

        <View style={Styles.challengeInfo}>
          <View style={Styles.challengeTitleRow}>
            <Text style={Styles.challengeTitle}>{item.title}</Text>
            <View style={Styles.xpBadge}>
              <Ionicons name="sparkles" size={12} color={colors.warning} />
              <Text style={Styles.xpText}>{item.xp} XP</Text>
            </View>
          </View>

          <Text style={Styles.challengeDescription}>{item.description}</Text>

          <View style={Styles.cardMetaRow}>
            <View style={[Styles.difficultyPill, item.difficulty === "Difícil" && Styles.difficultyHard]}>
              <Text style={Styles.difficultyText}>{item.difficulty}</Text>
            </View>
            {item.completed && <Text style={Styles.completedPill}>Concluído</Text>}
            {item.current && <Text style={Styles.currentPill}>Atual</Text>}
          </View>
        </View>
      </View>

      <View style={Styles.challengeFooter}>
        {/* botão removido para items concluídos */}
        {!item.completed && (
          <TouchableOpacity
            style={item.current ? Styles.startButton : Styles.startButton}
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
            <Text style={Styles.startButtonText}>
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
        Styles.achievementCard,
        !item.unlocked && Styles.lockedAchievement,
      ]}
    >
      <LinearGradient
        colors={item.unlocked ? ["#FEF3C7", "#FBBF24"] : ["#F3F4F6", "#E5E7EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={Styles.achievementGradient}
      >
        <View style={Styles.achievementContent}>
          <View
            style={[Styles.achievementIcon, item.unlocked && Styles.unlockedIcon]}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={item.unlocked ? colors.warning : colors.muted}
            />
          </View>
          <View style={Styles.achievementInfo}>
            <Text style={[Styles.achievementTitle, !item.unlocked && Styles.lockedText]}>
              {item.title}
            </Text>
            <Text style={[Styles.achievementDescription, !item.unlocked && Styles.lockedText]}>
              {item.description}
            </Text>
          </View>
            {item.unlocked && (
            <View style={Styles.achievementBadge}>
              <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={Styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={Styles.headerContainer}>
        <Image source={require("../../assets/images/icon.png")} style={Styles.imageLogo} />
        <View style={Styles.headerTopRow}>
          <View>
            <Text style={Styles.appTitle}>Intensivo Dias Felizes</Text>
            <Text style={Styles.subtitle}>7 dias para transformar seu humor</Text>
          </View>
          {/* removed inline header actions to avoid shifting the title */}
        </View>

        {/* moved header action buttons to absolute/top so they don't push the title */}
        <View style={Styles.headerActionsAbsolute}>
            <TouchableOpacity style={Styles.iconButton} accessibilityLabel="Compartilhar">
            <Ionicons name="share-social-outline" size={18} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.iconButton} accessibilityLabel="Ajuda">
            <Ionicons name="help-circle-outline" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={Styles.statsContainer}>
          <View style={Styles.statItem}>
            <Ionicons name="flame" size={20} color={colors.warning} />
            <Text style={Styles.statNumber}>{currentStreak}</Text>
            <Text style={Styles.statLabel}>Sequência</Text>
          </View>

          <View style={Styles.statItem}>
            <Ionicons name="star" size={20} color={colors.warning} />
            <Text style={Styles.statNumber}>{totalXP}</Text>
            <Text style={Styles.statLabel}>XP Total</Text>
          </View>

          <View style={Styles.statItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={Styles.statNumber}>{completedChallenges}/7</Text>
            <Text style={Styles.statLabel}>Completos</Text>
          </View>
        </View>

        <View style={Styles.progressContainer}>
          <View style={Styles.progressBar}>
            <LinearGradient
              colors={[colors.success, colors.success]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[Styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={Styles.progressText}>{Math.round(progressPercentage)}% completo</Text>
        </View>
      </View>

      {/* Content */}
      <View style={Styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.tabContainer}>
            <TouchableOpacity
              style={[Styles.tab, selectedTab === "challenges" && Styles.activeTab]}
              onPress={() => setSelectedTab("challenges")}
            >
              <Text style={Styles.tabText}>Desafios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.tab, selectedTab === "achievements" && Styles.activeTab]}
              onPress={() => setSelectedTab("achievements")}
            >
              <Text style={Styles.tabText}>Conquistas</Text>
            </TouchableOpacity>
          </View>

          <View style={Styles.quickControls}>
            <TouchableOpacity
              style={[Styles.controlButton, onlyCurrent && Styles.controlButtonActive]}
              onPress={() => setOnlyCurrent((v) => !v)}
            >
              <Ionicons name="time-outline" size={14} color={onlyCurrent ? colors.white : colors.primary} />
              <Text style={[Styles.controlText, onlyCurrent && Styles.controlTextActive]}>Só atual</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[Styles.controlButton, !showCompleted && Styles.controlButtonActive]}
              onPress={() => setShowCompleted((v) => !v)}
            >
              <Ionicons name="checkmark-done-outline" size={14} color={!showCompleted ? colors.white : colors.primary} />
              <Text style={[Styles.controlText, !showCompleted && Styles.controlTextActive]}>Ocultar completos</Text>
            </TouchableOpacity>
          </View>

          {/* calendário separado, centralizado e abaixo dos controles */}
          <View style={Styles.calendarWrapper}>
            <TouchableOpacity
              style={Styles.calendarCTA}
              onPress={() => router.push('/intensiveCalendarScreen')}
            >
              <Ionicons name="calendar-outline" size={16} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={Styles.calendarCTAtext}>Calendário</Text>
            </TouchableOpacity>
          </View>

          {selectedTab === "challenges"
            ? visibleChallenges.map((item) => renderChallengeCard({ item }))
            : achievements.map((item) => renderAchievement({ item }))}

          {selectedTab === "achievements" && (
            <View style={Styles.achievementsContainer}>
              <Text style={Styles.achievementsTitle}>Suas Conquistas</Text>
              <Text style={Styles.achievementsSubtitle}>Continue completando desafios para desbloquear mais!</Text>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

