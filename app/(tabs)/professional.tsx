"use client";

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

const { width, height } = Dimensions.get("window");

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

export default function ProfessionalSearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filtro e busca combinados
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

  const renderProfessionalCard = ({ item }) => (
    <View style={styles.professionalCard}>
      <View style={styles.professionalHeader}>
        <View style={styles.professionalAvatar}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>{item.name}</Text>
          <Text style={styles.professionalSpecialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.experienceText}>• {item.experience}</Text>
          </View>
        </View>
        <View style={styles.professionalActions}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View
            style={[
              styles.statusBadge,
              item.available ? styles.availableBadge : styles.unavailableBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.available ? styles.availableText : styles.unavailableText,
              ]}
            >
              {item.available ? "Disponível" : "Ocupado"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.contactButtonWrapper,
          !item.available && { opacity: 0.5 },
        ]}
        activeOpacity={item.available ? 0.8 : 1}
        disabled={!item.available}
        accessibilityLabel={
          item.available ? "Agendar Consulta" : "Profissional Ocupado"
        }
      >
        <LinearGradient
          colors={["#A259F7", "#c85efd", "#be41fd"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.contactButton}
        >
          <Ionicons name="chatbubble-outline" size={18} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>
            {item.available ? "Agendar Consulta" : "Indisponível"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderFilterChip = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedFilter === item.id && styles.activeFilterChip,
      ]}
      onPress={() => setSelectedFilter(item.id)}
      activeOpacity={0.7}
      accessibilityLabel={`Filtrar por ${item.name}`}
    >
      <Ionicons
        name={item.icon}
        size={16}
        color={selectedFilter === item.id ? "#FFFFFF" : "#A259F7"}
        style={styles.filterIcon}
      />
      <Text
        style={[
          styles.filterText,
          selectedFilter === item.id && styles.activeFilterText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      {/* header (roxo) permanece no topo DO LAYOUT) */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.imageLogo}
        />
        <Text style={styles.appTitle}>Encontrar Profissionais</Text>
        <Text style={styles.subtitle}>Conecte-se com especialistas qualificados</Text>
      </View>

      {/* whiteContainer: container branco arredondado que segura toda a lista */}
      <View style={styles.whiteContainer}>
        <FlatList
          data={filteredProfessionals}
          renderItem={renderProfessionalCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.professionalsList}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#A259F7", marginTop: 32 }}>
              Nenhum profissional encontrado.
            </Text>
          }
          // cabeçalho da lista: busca / filtros / títulos (ficam DENTRO do branco)
          ListHeaderComponent={
            <>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                  <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    placeholderTextColor="#9CA3AF"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessibilityLabel="Buscar profissional"
                    returnKeyType="search"
                  />
                  <TouchableOpacity style={styles.filterToggle} onPress={() => setShowFilters(!showFilters)}>
                    <Ionicons name="options-outline" size={20} color="#A259F7" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Filter Chips */}
              {showFilters && (
                <View style={styles.filtersContainer}>
                  <FlatList
                    data={professionalTypes}
                    renderItem={renderFilterChip}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersList}
                  />
                </View>
              )}

              {/* Results Header */}
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Profissionais Disponíveis</Text>
                <Text style={styles.resultsCount}>{filteredProfessionals.length} encontrados</Text>
              </View>
            </>
          }
          ListFooterComponent={<View style={styles.androidBottomSpacing} />}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* topo roxo */
  headerContainer: {
    // mantive paddings parecidos com o seu original
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 32,
  },
  imageLogo: {
    width: 100,
    height: 100,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 8,
  },

  /* container branco que segura a lista inteira */
  whiteContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // esse marginTop negativo faz a borda arredondada "sobrepor" o gradiente
    marginTop: -10,
    overflow: "hidden",
    paddingTop: 16,
  },

  /* Conteúdo interno dentro do branco */
  contentContainer: {
    /* não usado diretamente, mantive caso queira reaplicar */
  },

  /* FlatList content */
  professionalsList: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  /* Search & filters */
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    paddingVertical: 0,
  },
  filterToggle: {
    padding: 8,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersList: {
    paddingHorizontal: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#A259F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeFilterChip: {
    backgroundColor: "#A259F7",
    borderColor: "#A259F7",
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#A259F7",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },

  /* results header */
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  resultsCount: {
    fontSize: 14,
    color: "#6B7280",
  },

  /* cards */
  professionalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  professionalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  professionalAvatar: {
    width: 56,
    height: 56,
    backgroundColor: "#A259F7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 4,
  },
  experienceText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  professionalActions: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A259F7",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: "#D1FAE5",
  },
  unavailableBadge: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  availableText: {
    color: "#065F46",
  },
  unavailableText: {
    color: "#991B1B",
  },
  contactButtonWrapper: {
    borderRadius: 12,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 16,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  androidBottomSpacing: {
    height: 24,
  },
});
