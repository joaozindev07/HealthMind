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
import ProfessionalSearchScreen from "../components/ProfessionalCard";
import { Styles } from "./styles/professionalsCss";
import colors from "../theme/colors";

const { width, height } = Dimensions.get("window");

export default function ProfessionalScreen() {
  const insets = useSafeAreaInsets();
  const HANDLE_HEIGHT = 32;
  const BOTTOM_BAR_OFFSET = Math.max(insets.bottom, 64); // estimativa da bottom navigation
  const COLLAPSED_HEIGHT = Math.round(height * 0.5); 
  const EXPANDED_HEIGHT = Math.round(height * 0.8); 
  
  return (
      <LinearGradient
      colors={[colors.primary, colors.primaryLight, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={Styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* header (roxo) permanece no topo DO LAYOUT) */}
      <View style={Styles.headerContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={Styles.imageLogo}
        />
        <Text style={Styles.appTitle}>Encontrar Profissionais</Text>
        <Text style={Styles.subtitle}>Conecte-se com especialistas qualificados</Text>
      </View>

      {/* whiteContainer: container branco arredondado que segura toda a lista */}
      <AnimatedBottomSheet collapsedHeight={COLLAPSED_HEIGHT} expandedHeight={EXPANDED_HEIGHT}>
        <FlatList
          data={filteredProfessionals}
          renderItem={renderProfessionalCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Styles.professionalsList}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: colors.primary, marginTop: 32 }}>
              Nenhum profissional encontrado.
            </Text>
          }
          // cabeçalho da lista: busca / filtros / títulos (ficam DENTRO do branco)
          ListHeaderComponent={
            <>
              {/* Search Bar */}
              <View style={Styles.searchContainer}>
                <View style={Styles.searchWrapper}>
                  <Ionicons name="search-outline" size={20} color={colors.muted} style={Styles.searchIcon} />
                  <TextInput
                    style={Styles.searchInput}
                    placeholder="Buscar..."
                    placeholderTextColor={colors.muted}
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessibilityLabel="Buscar profissional"
                    returnKeyType="search"
                  />        
                </View>
              </View>

              {/* Filter Chips */}
              <View style={Styles.filtersContainer}>
                <FlatList
                  data={professionalTypes}
                  renderItem={renderFilterChip}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={Styles.filtersList}
                />
              </View>

              {/* Results Header */}
              <View style={Styles.resultsHeader}>
                <Text style={Styles.resultsTitle}>Profissionais Disponíveis</Text>
              </View>
            </>
          }
          ListFooterComponent={<View style={{ height: BOTTOM_BAR_OFFSET + 24 }} />}
        />
      </AnimatedBottomSheet>
    </LinearGradient>
  );
}