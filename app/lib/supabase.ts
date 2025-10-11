import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface MoodEntry {
  id: string
  user_id: string
  mood: string
  note?: string
  created_at: string
}

export interface Professional {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  price: string
  available: boolean
  avatar_url?: string
  created_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  icon: string
  xp: number
  difficulty: string
  created_at: string
}

export interface UserChallenge {
  id: string
  user_id: string
  challenge_id: string
  completed: boolean
  completed_at?: string
  created_at: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
  created_at: string
}
