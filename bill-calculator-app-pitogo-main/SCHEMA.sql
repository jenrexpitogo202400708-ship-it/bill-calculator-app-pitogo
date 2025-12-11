-- ============================================
-- ELECTRIC BILL CALCULATOR - SUPABASE SCHEMA
-- ============================================
-- Run this SQL in your Supabase Project → SQL Editor

-- ============================================
-- 1. PROFILES TABLE (User profile information)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    admin_id TEXT,
    address TEXT,
    contact TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);


-- ============================================
-- 2. BILLS TABLE (Electricity bill calculations)
-- ============================================
CREATE TABLE IF NOT EXISTS bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month TEXT NOT NULL,
    kwh DECIMAL(10, 2) NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_bills_user_id ON bills(user_id);
CREATE INDEX idx_bills_created_at ON bills(created_at DESC);

-- Enable Row Level Security
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only INSERT their own bills
CREATE POLICY "Users can insert own bills"
    ON bills FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only SELECT their own bills
CREATE POLICY "Users can view own bills"
    ON bills FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can UPDATE their own bills
CREATE POLICY "Users can update own bills"
    ON bills FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can DELETE their own bills
CREATE POLICY "Users can delete own bills"
    ON bills FOR DELETE
    USING (auth.uid() = user_id);
