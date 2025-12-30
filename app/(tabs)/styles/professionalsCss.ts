import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export const Styles = StyleSheet.create({
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
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white8,
    textAlign: "center",
    marginBottom: 8,
  },

  /* container branco que segura a lista inteira */
  whiteContainer: {
    // ancorado ao bottom para que a expansão revele conteúdo para cima
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    // esse marginTop negativo faz a borda arredondada "sobrepor" o gradiente
    marginTop: -10,
    overflow: "hidden",
    paddingTop: 16,
    // altura será animada dinamicamente para revelar conteúdo ao puxar
  },

  /* Área de handle para arrastar o container */
  handleArea: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  handleBar: {
    width: 64,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },

  /* Overlay para bloquear toques enquanto não expandido */
  touchInterceptor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "transparent",
  },

  /* Filler inferior para remover espaço vazio ao subir o container */
  bottomFiller: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 0,
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
    marginBottom: 12,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: colors.black,
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
    color: colors.textSecondary,
    paddingVertical: 0,
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
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  activeFilterText: {
    color: colors.white,
  },

  /* results header */
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  /* cards */
  professionalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.mutedLight,
  },
  professionalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  professionalAvatar: {
    width: 56,
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginLeft: 4,
  },
  experienceText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 4,
  },
  professionalActions: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: colors.white98,
  },
  unavailableBadge: {
    backgroundColor: colors.white98,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  availableText: {
    color: colors.success,
  },
  unavailableText: {
    color: colors.danger,
  },
  contactButtonWrapper: {
    borderRadius: 12,
    shadowColor: colors.primary,
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
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  androidBottomSpacing: {
    height: 24,
  },

  /* Novos estilos para o cartão profissional */
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.mutedLight,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  ratingTextSmall: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceBadge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: "auto",
  },
  priceBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.mutedLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    flex: 1,
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  scheduleButtonWrapper: {
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  scheduleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 16,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8,
  },
});
