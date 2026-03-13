import { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from 'react-native-reanimated';
import AnimatedBottomSheet from "../components/AnimatedBottomSheet";
import { Styles } from "../(tabs)/styles/professionalsCss";
import colors from "../theme/colors";

const professionalTypes = [
  { id: 1, name: "Todos", icon: "people-outline" },
  { id: 2, name: "Psicólogo Clínico", icon: "medical-outline" },
  { id: 3, name: "Psiquiatra", icon: "fitness-outline" },
  { id: 4, name: "Terapeuta", icon: "heart-outline" },
  { id: 5, name: "Psicanalista", icon: "library-outline" },
  { id: 6, name: "Neuropsicólogo", icon: "brain-outline" },
];

const mockProfessionals = [
  {
    id: 1,
    name: "Dr. Ana Silva",
    specialty: "Psicólogo Clínico",
    rating: 4.8,
    experience: "8 anos",
    price: "R$ 120",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Carlos Santos",
    specialty: "Psiquiatra",
    rating: 4.9,
    experience: "12 anos",
    price: "R$ 200",
    available: false,
  },
  {
    id: 3,
    name: "Dra. Maria Costa",
    specialty: "Terapeuta",
    rating: 4.7,
    experience: "6 anos",
    price: "R$ 100",
    available: true,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const { width, height } = Dimensions.get("window");

export default function ProfessionalSearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(1);

  const filteredProfessionals = useMemo(() => {
    return mockProfessionals.filter((prof) => {
      const matchesType =
        selectedFilter === 1 ||
        prof.specialty ===
          professionalTypes.find((t) => t.id === selectedFilter)?.name;
      const matchesSearch =
        prof.name.toLowerCase().includes(searchText.toLowerCase()) ||
        prof.specialty.toLowerCase().includes(searchText.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [searchText, selectedFilter]);

const renderProfessionalCard = ({ item }: { item: any }) => (
    <View style={Styles.professionalCard}>
      <View style={Styles.professionalHeader}>
        <View style={Styles.professionalAvatar}>
          <Text style={Styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={Styles.professionalInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={Styles.professionalName}>{item.name}</Text>
              <View style={Styles.verifiedRow}>
                <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                <Text style={Styles.verifiedText}>Verificado • {item.specialty}</Text>
              </View>
            </View>
            <TouchableOpacity style={Styles.favoriteButton} accessibilityLabel="Favoritar profissional">
              <Ionicons name="heart-outline" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={Styles.metaRow}>
            <View style={Styles.ratingBadge}>
              <Ionicons name="star" size={12} color={colors.warning} />
              <Text style={Styles.ratingTextSmall}>{item.rating}</Text>
            </View>
            <Text style={Styles.experienceText}>• {item.experience}</Text>
            <View style={Styles.priceBadge}>
              <Text style={Styles.priceBadgeText}>{item.price}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Card footer: perfil + agendar */}
      <View style={Styles.cardFooter}>
        <TouchableOpacity
          style={Styles.profileButton}
          accessibilityLabel="Ver perfil"
          onPress={() => {}}
        >
          <Ionicons name="person-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
          <Text style={Styles.profileButtonText}>Ver Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Styles.scheduleButtonWrapper, !item.available && { opacity: 0.6 }]}
          activeOpacity={item.available ? 0.85 : 1}
          disabled={!item.available}
          accessibilityLabel={item.available ? "Agendar consulta" : "Indisponível"}
          onPress={() => {}}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryLight, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={Styles.scheduleButton}
          >
            <Ionicons name="calendar" size={16} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={Styles.scheduleButtonText}>{item.available ? "Agendar" : "Indisponível"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilterChip = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        Styles.filterChip,
        selectedFilter === item.id && Styles.activeFilterChip,
      ]}
      onPress={() => setSelectedFilter(item.id)}
      activeOpacity={0.7}
      accessibilityLabel={`Filtrar por ${item.name}`}
    >
      <Ionicons
        name={item.icon}
        size={16}
        color={selectedFilter === item.id ? colors.white : colors.primary}
        style={Styles.filterIcon}
      />
      <Text
        style={[
          Styles.filterText,
          selectedFilter === item.id && Styles.activeFilterText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
