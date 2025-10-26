import React, { createContext, useContext, useEffect, useState } from 'react'
import { ClerkProvider, useAuth as useClerkAuth, useUser } from "@clerk/clerk-expo"
import { tokenCache } from "@clerk/clerk-expo/token-cache"
import Constants from 'expo-constants'
import { useSupabaseAuth } from '../hooks/useSupabaseAuth'
import { userService } from '../services/database'

interface AuthContextType {
  isSignedIn: boolean
  user: any
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const AuthProviderContent = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn: clerkSignedIn } = useClerkAuth()
  const { user: clerkUser } = useUser()
  const { user: supabaseUser, signOut: supabaseSignOut } = useSupabaseAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const syncUsers = async () => {
      if (clerkSignedIn && clerkUser && supabaseUser) {
        try {
          // Sincronizar dados do usuário entre Clerk e Supabase
          await userService.upsertUser({
            id: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            full_name: clerkUser.fullName || clerkUser.firstName + ' ' + clerkUser.lastName,
            avatar_url: clerkUser.imageUrl,
          })
        } catch (error) {
          console.error('Erro ao sincronizar usuário:', error)
        }
      }
      setLoading(false)
    }

    syncUsers()
  }, [clerkSignedIn, clerkUser, supabaseUser])

  const signOut = async () => {
    try {
      await supabaseSignOut()
      // O Clerk será gerenciado pelo próprio Clerk
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const value: AuthContextType = {
    isSignedIn: clerkSignedIn || false,
    user: clerkUser,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Fallback chain for publishable key to support dev, expo start and EAS builds
  const publishKey =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    // expo config's extra (EAS/build-time)
    (Constants.expoConfig?.extra as any)?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  // legacy manifest extra (older expo versions / dev)
  ((Constants as any).manifest?.extra as any)?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    ''

  if (!publishKey) {
    console.warn('Clerk publishable key is missing. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in env or EAS secrets.')
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishKey}>
      <AuthProviderContent>
        {children}
      </AuthProviderContent>
    </ClerkProvider>
  )
}
