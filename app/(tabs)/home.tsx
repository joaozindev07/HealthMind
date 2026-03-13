import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { getUserData, saveUserData } from "../utils/storage";
import { useUser } from "@clerk/clerk-expo";
import {  } from "./professional";
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
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Styles } from "./styles/homeCss";
import React from "react";
import colors from "../theme/colors";

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
    { emoji: "😊", label: "Feliz", color: colors.success },
    { emoji: "😌", label: "Calmo", color: colors.info },
    { emoji: "😔", label: "Triste", color: colors.gray },
    { emoji: "😰", label: "Ansioso", color: colors.warning },
    { emoji: "😡", label: "Irritado", color: colors.danger },
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
      id: 1,
    },
    {
      title: "Técnicas de Respiração",
      type: "Artigo",
      duration: "5 min",
      category: "breathing",
      id: 2,
    },
    {
      title: "Podcast: Mindfulness",
      type: "Podcast",
      duration: "25 min",
      category: "podcast",
      id: 3,    
    },
    {
      title: "Exercícios de Gratidão",
      type: "Vídeo",
      duration: "8 min",
      category: "gratitude",
      id: 4,
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

  const confirmCall = () => {
    Alert.alert(
      "Confirmação",
      "Deseja fazer uma chamada para o suporte 24h?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => callNumber("188"),
        },
      ]
    );
  };

  const callNumber = async (Number: any) => {
    const phoneNumber = `tel:${Number}`;
    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Erro ao fazer chamada:", error);
      Alert.alert("Erro", "Não foi possível fazer a chamada.");
    }
  }

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        style={Styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
      >
        {/* Hero Section */}
        <View
          style={[
            Styles.heroSection,
            { paddingTop: STATUSBAR_HEIGHT + height * 0.04 },
          ]}
        >
          <View style={Styles.headerContainer}>
            <View style={Styles.heroContent}>
              <Text style={Styles.heroTitle}>
                Bem-vindo ao seu{"\n"}espaço de bem-estar
              </Text>
              <Text style={Styles.heroSubtitle}>
                Conecte-se com profissionais e recursos para cuidar da sua saúde
                mental
              </Text>

            </View>
            <TouchableOpacity
              style={Styles.profileButton}
              onPress={() => router.push("/(auth)/profile")}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={Styles.profileIcon}
                />
              ) : (
                <View style={Styles.profileIcon}>
                  <Text style={Styles.profileIconText}>👤</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Abstract Illustration Placeholder */}
          <View style={Styles.heroIllustration}>
            <View style={Styles.illustrationCircle1} />
            <View style={Styles.illustrationCircle2} />
            <View style={Styles.illustrationCircle3} />
          </View>
        </View>

        {/* Daily Mood Tracker */}
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>
            Como você está se sentindo hoje?
          </Text>
          <TouchableOpacity
                style={Styles.reflectionsButton}
                onPress={navigateToReflections}
              >
                <Text style={Styles.reflectionsButtonText}>Minhas Reflexões</Text>
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
                  Styles.moodButton,
                  selectedMood === mood.label && {
                    ...Styles.moodButtonSelected,
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
                <Text style={[Styles.moodEmoji, { fontSize: width * 0.07 }]}>
                  {mood.emoji}
                </Text>
                <Text
                  style={[
                    Styles.moodLabel,
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
            <View style={Styles.noteContainer}>
                <TextInput
                style={[
                  Styles.noteInput,
                  { fontSize: width * 0.045, minHeight: height * 0.13 },
                ]}
                placeholder={`Conte mais sobre como você está se sentindo ${selectedMood.toLowerCase()}...`}
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={4}
                value={dailyNote}
                onChangeText={setDailyNote}
                textAlignVertical="top"
              />
              <TouchableOpacity style={Styles.saveNoteButton} onPress={handleSaveReflection}>
                <Text
                  style={[Styles.saveNoteText, { fontSize: width * 0.045 }]}
                >
                  Salvar reflexão
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Connection to Professionals */}
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Conecte-se com profissionais</Text>
          <Text style={Styles.sectionSubtitle}>
            Psicólogos e terapeutas especializados
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={Styles.professionalsScroll}
          >
            {professionals.map((prof, index) => (
              <View
                key={index}
                style={[
                  Styles.professionalCard,
                  { width: width * 0.5, padding: width * 0.05 },
                ]}
              >
                <View style={Styles.professionalHeader}>
                  <View
                    style={[
                      Styles.professionalAvatar,
                      {
                        width: width * 0.13,
                        height: width * 0.13,
                        borderRadius: width * 0.065,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        Styles.professionalInitial,
                        { fontSize: width * 0.06 },
                      ]}
                    >
                      {prof.name.charAt(0)}
                    </Text>
                  </View>
                  <View
                    style={[
                      Styles.statusIndicator,
                      {
                        width: width * 0.03,
                        height: width * 0.03,
                        borderRadius: width * 0.015,
                      },
                      {
                        backgroundColor: prof.available ? colors.success : colors.gray,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[Styles.professionalName, { fontSize: width * 0.045 }]}
                >
                  {prof.name}
                </Text>
                <Text
                  style={[
                    Styles.professionalSpecialty,
                    { fontSize: width * 0.035 },
                  ]}
                >
                  {prof.specialty}
                </Text>
                <View style={Styles.ratingContainer}>
                  <Text
                    style={[Styles.ratingText, { fontSize: width * 0.035 }]}
                  >
                    ⭐ {prof.rating}
                  </Text>
                  <Text
                    style={[
                      Styles.availabilityText,
                        {
                        fontSize: width * 0.03,
                        color: prof.available ? colors.success : colors.gray,
                      },
                    ]}
                  >
                    {prof.available ? "Disponível agora" : "Ocupado"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    Styles.connectButton,
                    !prof.available && Styles.connectButtonDisabled,
                  ]}
                >
                  <Text
                    style={[
                      Styles.connectButtonText,
                      !prof.available && Styles.connectButtonTextDisabled,
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
        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>Recursos para você</Text>
          <Text style={Styles.sectionSubtitle}>
            Conteúdos selecionados para seu bem-estar
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={Styles.resourcesScroll}
            contentContainerStyle={{ paddingRight: width * 0.12 }}
          >
            {resources.map((resource, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  Styles.resourceCard,
                  { width: width * 0.42, padding: width * 0.045 },
                ]}
                onPress={() => {
                  if (resource.type === "Áudio") {
                    router.push({
                      pathname: "../(auth)/resources/audioPreview",
                    })}
                }}
              >
                <View style={Styles.resourceHeader}>
                  <View
                    style={[
                      Styles.resourceIcon,
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
                        Styles.resourceIconText,
                        { fontSize: width * 0.05 },
                      ]}
                    >
                      {getResourceIcon(resource.category)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      Styles.resourceDuration,
                      { fontSize: width * 0.03 },
                    ]}
                  >
                    {resource.duration}
                  </Text>
                </View>
                <Text
                  style={[Styles.resourceTitle, { fontSize: width * 0.04 }]}
                >
                  {resource.title}
                </Text>
                <Text
                  style={[Styles.resourceType, { fontSize: width * 0.035 }]}
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
            Styles.footer,
            { paddingHorizontal: width * 0.06, paddingVertical: height * 0.05 },
          ]}
        >
          <Text style={[Styles.footerText, { fontSize: width * 0.04 }]}>
            Precisa de ajuda imediata?
          </Text>
          <TouchableOpacity
            style={[
              Styles.emergencyButton,
              {
                paddingVertical: height * 0.018,
                paddingHorizontal: width * 0.13,
              },
            ]}
            onPress={() => confirmCall()}
          >
            <Text
              style={[Styles.emergencyButtonText, { fontSize: width * 0.04 }]}
            >
              Suporte 24h
            </Text>
          </TouchableOpacity>
          <View style={Styles.footerLinks}>
            <TouchableOpacity>
              <Text style={[Styles.footerLink, { fontSize: width * 0.035 }]}>
                Privacidade
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[Styles.footerLink, { fontSize: width * 0.035 }]}>
                Termos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[Styles.footerLink, { fontSize: width * 0.035 }]}>
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
  const resourceColors: { [key: string]: string } = {
    meditation: colors.primary,
    breathing: colors.info,
    podcast: colors.success,
    gratitude: colors.warning,
  };
  return resourceColors[category] || colors.gray;
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
 
});
