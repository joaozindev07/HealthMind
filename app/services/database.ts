import { supabase, User, MoodEntry, Professional, Challenge, UserChallenge, Achievement, UserAchievement } from '../lib/supabase'

// Serviços de usuário
export const userService = {
  // Criar ou atualizar perfil do usuário
  async upsertUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .upsert(userData, { onConflict: 'id' })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Buscar usuário por ID
  async getUserById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Atualizar perfil do usuário
  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Serviços de humor
export const moodService = {
  // Salvar entrada de humor
  async saveMoodEntry(userId: string, mood: string, note?: string) {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: userId,
        mood,
        note
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Buscar entradas de humor do usuário
  async getUserMoodEntries(userId: string, limit = 30) {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  // Buscar humor de hoje
  async getTodayMood(userId: string) {
    const today = new Date().toISOString().split('T')[0]
    
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }
}

// Serviços de profissionais
export const professionalService = {
  // Buscar todos os profissionais
  async getAllProfessionals() {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar profissionais por especialidade
  async getProfessionalsBySpecialty(specialty: string) {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('specialty', specialty)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Buscar profissionais disponíveis
  async getAvailableProfessionals() {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('available', true)
      .order('rating', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Serviços de desafios
export const challengeService = {
  // Buscar todos os desafios
  async getAllChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Buscar desafios do usuário
  async getUserChallenges(userId: string) {
    const { data, error } = await supabase
      .from('user_challenges')
      .select(`
        *,
        challenges (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Completar desafio
  async completeChallenge(userId: string, challengeId: string) {
    const { data, error } = await supabase
      .from('user_challenges')
      .upsert({
        user_id: userId,
        challenge_id: challengeId,
        completed: true,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,challenge_id' })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Verificar se desafio foi completado
  async isChallengeCompleted(userId: string, challengeId: string) {
    const { data, error } = await supabase
      .from('user_challenges')
      .select('completed')
      .eq('user_id', userId)
      .eq('challenge_id', challengeId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data?.completed || false
  }
}

// Serviços de conquistas
export const achievementService = {
  // Buscar todas as conquistas
  async getAllAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Buscar conquistas do usuário
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievements (*)
      `)
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Desbloquear conquista
  async unlockAchievement(userId: string, achievementId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Verificar se conquista foi desbloqueada
  async isAchievementUnlocked(userId: string, achievementId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('id')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return !!data
  }
}
