# Configuração de Ambiente

## Variáveis de Ambiente Necessárias

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk Configuration (existing)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Como obter as credenciais do Supabase:

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Vá para Settings > API
5. Copie a URL do projeto e a chave anônima (anon key)

## Schema do Banco de Dados

Execute os seguintes comandos SQL no editor SQL do Supabase:

```sql
-- Tabela de usuários
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de entradas de humor
CREATE TABLE mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de profissionais
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  experience TEXT,
  price TEXT,
  available BOOLEAN DEFAULT true,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de desafios
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  difficulty TEXT DEFAULT 'Fácil',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de desafios do usuário
CREATE TABLE user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Tabela de conquistas
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de conquistas do usuário
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Inserir dados iniciais de profissionais
INSERT INTO professionals (name, specialty, rating, experience, price, available) VALUES
('Dr. Ana Silva', 'Psicólogo Clínico', 4.8, '8 anos', 'R$ 120', true),
('Dr. Carlos Santos', 'Psiquiatra', 4.9, '12 anos', 'R$ 200', false),
('Dra. Maria Costa', 'Terapeuta', 4.7, '6 anos', 'R$ 100', true);

-- Inserir dados iniciais de desafios
INSERT INTO challenges (title, description, icon, xp, difficulty) VALUES
('Gratidão Matinal', 'Liste 3 coisas pelas quais você é grato hoje', 'sunny-outline', 50, 'Fácil'),
('Respiração Consciente', '5 minutos de respiração profunda e mindfulness', 'leaf-outline', 75, 'Fácil'),
('Ato de Bondade', 'Faça algo gentil por alguém hoje', 'heart-outline', 100, 'Médio'),
('Movimento Feliz', '30 minutos de atividade física que você goste', 'fitness-outline', 125, 'Médio'),
('Conexão Social', 'Converse com um amigo ou familiar querido', 'people-outline', 100, 'Fácil'),
('Criatividade', 'Dedique tempo a uma atividade criativa', 'color-palette-outline', 150, 'Médio'),
('Reflexão Semanal', 'Reflita sobre seus progressos e conquistas', 'journal-outline', 200, 'Difícil');

-- Inserir dados iniciais de conquistas
INSERT INTO achievements (title, description, icon) VALUES
('Primeiro Passo', 'Complete seu primeiro desafio', 'trophy-outline'),
('Sequência de 3', 'Complete 3 dias seguidos', 'flame-outline'),
('Uma Semana', 'Complete 7 dias de desafios', 'ribbon-outline');

-- Habilitar RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can view own mood entries" ON mood_entries FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own mood entries" ON mood_entries FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own challenges" ON user_challenges FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own challenges" ON user_challenges FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update own challenges" ON user_challenges FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Políticas públicas (todos podem ler)
CREATE POLICY "Anyone can view professionals" ON professionals FOR SELECT USING (true);
CREATE POLICY "Anyone can view challenges" ON challenges FOR SELECT USING (true);
CREATE POLICY "Anyone can view achievements" ON achievements FOR SELECT USING (true);
