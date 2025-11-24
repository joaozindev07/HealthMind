import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { getUserData, saveUserData } from "../utils/storage";
import { useUser } from "@clerk/clerk-expo";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React from "react";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight ?? 24 : 0;

export default function HomePage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dailyNote, setDailyNote] = useState("");
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const moods = [
    { emoji: "😊", label: "Feliz", color: "#10B981" },
    { emoji: "😌", label: "Calmo", color: "#3B82F6" },
    { emoji: "😔", label: "Triste", color: "#6B7280" },
    { emoji: "😰", label: "Ansioso", color: "#F59E0B" },
    { emoji: "😡", label: "Irritado", color: "#EF4444" },
  ];

  const professionals = [
    {
      name: "Dra. Ana Silva",
      specialty: "Ansiedade e Depressão",
      rating: "4.9",
      available: true,
    },
    {
      name: "Dr. Carlos Lima",
      specialty: "Terapia Cognitiva",
      rating: "4.8",
      available: true,
    },
    {
      name: "Dra. Maria Santos",
      specialty: "Relacionamentos",
      rating: "4.9",
      available: false,
    },
  ];

  const resources = [
    {
      title: "Meditação Guiada",
      type: "Áudio",
      duration: "10 min",
      category: "meditation",
    },
    {
      title: "Técnicas de Respiração",
      type: "Artigo",
      duration: "5 min",
      category: "breathing",
    },
    {
      title: "Podcast: Mindfulness",
      type: "Podcast",
      duration: "25 min",
      category: "podcast",
    },
    {
      title: "Exercícios de Gratidão",
      type: "Vídeo",
      duration: "8 min",
      category: "gratitude",
    },
  ];

  useEffect(() => {
    const loadProfileImage = async () => {
      const savedImage = await AsyncStorage.getItem("profile_image");
      setProfileImage(savedImage);
    };

    loadProfileImage();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (!user) return;
      const savedImage = await getUserData(user.id, "image");
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };
    fetchImage();
  }, [user]);

  const handleSaveReflection = async () => {
    if (!selectedMood && dailyNote.trim().length === 0) {
      Alert.alert("Atenção", "Adicione uma reflexão ou selecione um humor.");
      return;
    }

    const newReflection = {
      id: Date.now().toString(),
      mood: selectedMood,
      note: dailyNote,
      createdAt: new Date().toISOString(),
    };

    try {
      if (user && user.id) {
        // salvar ligado ao usuário (usa seu util saveUserData)
        const existing = await getUserData(user.id, "reflections");
        const arr = existing ? JSON.parse(existing) : [];
        arr.unshift(newReflection); // mais recente primeiro
        await saveUserData(user.id, "reflections", JSON.stringify(arr));
      } else {
        // salvar local para usuário não logado
        const local = await AsyncStorage.getItem("reflections_local");
        const arr = local ? JSON.parse(local) : [];
        arr.unshift(newReflection);
        await AsyncStorage.setItem("reflections_local", JSON.stringify(arr));
      }

      // limpar — NÃO redirecionar mais automaticamente
      setDailyNote("");
      setSelectedMood(null);
      // router.push removido — navegação para reflexões agora é feita somente pelo botão dedicado
    } catch (e) {
      console.error("Erro ao salvar reflexão:", e);
      Alert.alert("Erro", "Não foi possível salvar a reflexão.");
    }
  };

  // Navega para a tela de reflexões (botão dedicado)
  const navigateToReflections = () => {
    router.push("/(auth)/reflections");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
      >
        {/* Hero Section */}
        <View
          style={[
            styles.heroSection,
            { paddingTop: STATUSBAR_HEIGHT + height * 0.04 },
          ]}
        >
          <View style={styles.headerContainer}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                Bem-vindo ao seu{"\n"}espaço de bem-estar
              </Text>
              <Text style={styles.heroSubtitle}>
                Conecte-se com profissionais e recursos para cuidar da sua saúde
                mental
              </Text>

            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push("/(auth)/profile")}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileIcon}
                />
              ) : (
                <View style={styles.profileIcon}>
                  <Text style={styles.profileIconText}>👤</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Abstract Illustration Placeholder */}
          <View style={styles.heroIllustration}>
            <View style={styles.illustrationCircle1} />
            <View style={styles.illustrationCircle2} />
            <View style={styles.illustrationCircle3} />
          </View>
        </View>

        {/* Daily Mood Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Como você está se sentindo hoje?
          </Text>
          <TouchableOpacity
                style={styles.reflectionsButton}
                onPress={navigateToReflections}
              >
                <Text style={styles.reflectionsButtonText}>Minhas Reflexões</Text>
              </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
            style={{ marginBottom: height * 0.03 }}
          >
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === mood.label && {
                    ...styles.moodButtonSelected,
                    borderColor: mood.color,
                  },
                  {
                    width: 100,
                    padding: width * 0.03,
                    marginRight: width * 0.03,
                  },
                ]}
                onPress={() => setSelectedMood(prev => (prev === mood.label ? null : mood.label))}
              >
                <Text style={[styles.moodEmoji, { fontSize: width * 0.07 }]}>
                  {mood.emoji}
                </Text>
                <Text
                  style={[
                    styles.moodLabel,
                    selectedMood === mood.label && { color: mood.color },
                    { fontSize: width * 0.035 },
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedMood && (
            <View style={styles.noteContainer}>
              <TextInput
                style={[
                  styles.noteInput,
                  { fontSize: width * 0.045, minHeight: height * 0.13 },
                ]}
                placeholder={`Conte mais sobre como você está se sentindo ${selectedMood.toLowerCase()}...`}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                value={dailyNote}
                onChangeText={setDailyNote}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.saveNoteButton} onPress={handleSaveReflection}>
                <Text
                  style={[styles.saveNoteText, { fontSize: width * 0.045 }]}
                >
                  Salvar reflexão
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Connection to Professionals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conecte-se com profissionais</Text>
          <Text style={styles.sectionSubtitle}>
            Psicólogos e terapeutas especializados
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.professionalsScroll}
          >
            {professionals.map((prof, index) => (
              <View
                key={index}
                style={[
                  styles.professionalCard,
                  { width: width * 0.5, padding: width * 0.05 },
                ]}
              >
                <View style={styles.professionalHeader}>
                  <View
                    style={[
                      styles.professionalAvatar,
                      {
                        width: width * 0.13,
                        height: width * 0.13,
                        borderRadius: width * 0.065,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.professionalInitial,
                        { fontSize: width * 0.06 },
                      ]}
                    >
                      {prof.name.charAt(0)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusIndicator,
                      {
                        width: width * 0.03,
                        height: width * 0.03,
                        borderRadius: width * 0.015,
                      },
                      {
                        backgroundColor: prof.available ? "#10B981" : "#6B7280",
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.professionalName, { fontSize: width * 0.045 }]}
                >
                  {prof.name}
                </Text>
                <Text
                  style={[
                    styles.professionalSpecialty,
                    { fontSize: width * 0.035 },
                  ]}
                >
                  {prof.specialty}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text
                    style={[styles.ratingText, { fontSize: width * 0.035 }]}
                  >
                    ⭐ {prof.rating}
                  </Text>
                  <Text
                    style={[
                      styles.availabilityText,
                      {
                        fontSize: width * 0.03,
                        color: prof.available ? "#10B981" : "#6B7280",
                      },
                    ]}
                  >
                    {prof.available ? "Disponível agora" : "Ocupado"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.connectButton,
                    !prof.available && styles.connectButtonDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.connectButtonText,
                      !prof.available && styles.connectButtonTextDisabled,
                      { fontSize: width * 0.04 },
                    ]}
                  >
                    {prof.available ? "Conectar" : "Agendar"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Resource Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos para você</Text>
          <Text style={styles.sectionSubtitle}>
            Conteúdos selecionados para seu bem-estar
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.resourcesScroll}
          >
            {resources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.resourceCard,
                  { width: width * 0.42, padding: width * 0.045 },
                ]}
              >
                <View style={styles.resourceHeader}>
                  <View
                    style={[
                      styles.resourceIcon,
                      {
                        backgroundColor: getResourceColor(resource.category),
                        width: width * 0.11,
                        height: width * 0.11,
                        borderRadius: width * 0.055,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.resourceIconText,
                        { fontSize: width * 0.05 },
                      ]}
                    >
                      {getResourceIcon(resource.category)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.resourceDuration,
                      { fontSize: width * 0.03 },
                    ]}
                  >
                    {resource.duration}
                  </Text>
                </View>
                <Text
                  style={[styles.resourceTitle, { fontSize: width * 0.04 }]}
                >
                  {resource.title}
                </Text>
                <Text
                  style={[styles.resourceType, { fontSize: width * 0.035 }]}
                >
                  {resource.type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Footer */}
        <View
          style={[
            styles.footer,
            { paddingHorizontal: width * 0.06, paddingVertical: height * 0.05 },
          ]}
        >
          <Text style={[styles.footerText, { fontSize: width * 0.04 }]}>
            Precisa de ajuda imediata?
          </Text>
          <TouchableOpacity
            style={[
              styles.emergencyButton,
              {
                paddingVertical: height * 0.018,
                paddingHorizontal: width * 0.13,
              },
            ]}
          >
            <Text
              style={[styles.emergencyButtonText, { fontSize: width * 0.04 }]}
            >
              Suporte 24h
            </Text>
          </TouchableOpacity>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { fontSize: width * 0.035 }]}>
                Privacidade
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { fontSize: width * 0.035 }]}>
                Termos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.footerLink, { fontSize: width * 0.035 }]}>
                Contato
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getResourceColor(category: string) {
  const colors: { [key: string]: string } = {
    meditation: "#A259F7",
    breathing: "#3B82F6",
    podcast: "#10B981",
    gratitude: "#F59E0B",
  };
  return colors[category] || "#6B7280";
}

function getResourceIcon(category: string) {
  const icons: { [key: string]: string } = {
    meditation: "🧘",
    breathing: "🌬️",
    podcast: "🎧",
    gratitude: "🙏",
  };
  return icons[category] || "📱";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: width * 0.06,
    // paddingTop será sobrescrito no componente
    paddingBottom: height * 0.05,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 2,
  },
  heroContent: {
    flex: 1,
    // paddingRight será sobrescrito no componente
  },
  profileButton: {
    marginTop: height * 0.001,
  },
  profileIcon: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: width * 0.16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  profileIconText: {
    fontSize: width * 0.055,
    color: "#6B7280",
  },
  heroTitle: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: width * 0.1,
    marginBottom: height * 0.015,
  },
  heroSubtitle: {
    fontSize: width * 0.045,
    color: "#6B7280",
    lineHeight: width * 0.06,
    marginBottom: height * 0.01,
    marginRight: -55,
  },
  heroIllustration: {
    position: "absolute",
    right: -width * 0.05,
    top: height * 0.05,
    width: width * 0.32,
    height: width * 0.32,
  },
  illustrationCircle1: {
    position: "absolute",
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: "#A259F7",
    opacity: 0.1,
    top: 0,
    right: 0,
  },
  illustrationCircle2: {
    position: "absolute",
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,
    backgroundColor: "#A259F7",
    opacity: 0.2,
    top: width * 0.08,
    right: width * 0.11,
  },
  illustrationCircle3: {
    position: "absolute",
    width: width * 0.21,
    height: width * 0.21,
    borderRadius: width * 0.105,
    backgroundColor: "#A259F7",
    opacity: 0.05,
    top: width * 0.05,
    right: width * 0.05,
  },

  // Sections
  section: {
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.05,
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: height * 0.01,
  },
  sectionSubtitle: {
    fontSize: width * 0.045,
    color: "#6B7280",
    marginBottom: height * 0.03,
  },

  // Mood Tracker
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
    // gap não é suportado em RN, usamos marginHorizontal nos filhos
  },
  moodButton: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "transparent",
  },
  moodButtonSelected: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moodEmoji: {
    marginBottom: height * 0.01,
  },
  moodLabel: {
    color: "#6B7280",
    fontWeight: "500",
  },
  noteContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: width * 0.05,
  },
  noteInput: {
    color: "#1F2937",
    textAlignVertical: "top",
    marginBottom: height * 0.02,
  },
  saveNoteButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: height * 0.018,
    alignItems: "center",
  },
  saveNoteText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  // Botão Reflexões (novo)
  reflectionsButton: {
    marginVertical: height * 0.02,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#E6E0FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  reflectionsButtonText: {
    color: "#6B46C1",
    fontWeight: "700",
  },

  // Professionals
  professionalsScroll: {
    marginHorizontal: -width * 0.06,
    paddingHorizontal: width * 0.06,
  },
  professionalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  professionalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    position: "relative",
  },
  professionalAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A259F7",
  },
  professionalInitial: {
    color: "#ffffff",
    fontWeight: "700",
  },
  statusIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  professionalName: {
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: height * 0.005,
  },
  professionalSpecialty: {
    color: "#6B7280",
    marginBottom: height * 0.015,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  ratingText: {
    color: "#1F2937",
    fontWeight: "600",
  },
  availabilityText: {
    fontWeight: "500",
  },
  connectButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: height * 0.018,
  },
  connectButtonDisabled: {
    backgroundColor: "#F1F5F9",
  },
  connectButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  connectButtonTextDisabled: {
    color: "#6B7280",
  },

  // Resources
  resourcesScroll: {
    marginHorizontal: -width * 0.06,
    paddingHorizontal: width * 0.06,
  },
  resourceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  resourceIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  resourceIconText: {},
  resourceDuration: {
    color: "#6B7280",
    fontWeight: "500",
  },
  resourceTitle: {
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: height * 0.005,
  },
  resourceType: {
    color: "#6B7280",
  },

  // Footer
  footer: {
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  footerText: {
    color: "#1F2937",
    marginBottom: height * 0.02,
    fontWeight: "500",
  },
  emergencyButton: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    marginBottom: height * 0.03,
    alignItems: "center",
  },
  emergencyButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  footerLinks: {
    flexDirection: "row",
    gap: width * 0.06,
  },
  footerLink: {
    color: "#6B7280",
    textDecorationLine: "underline",
  },
});
