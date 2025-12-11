-- Create calculations table
CREATE TABLE IF NOT EXISTS calculations (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month TEXT NOT NULL,
    power_consumption NUMERIC(10, 2) NOT NULL,
    cost_per_kwh NUMERIC(10, 2) NOT NULL,
    result NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS calculations_user_id_idx ON calculations(user_id);
CREATE INDEX IF NOT EXISTS calculations_created_at_idx ON calculations(created_at);

-- Enable Row Level Security
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for INSERT
CREATE POLICY "Users can insert their own calculations"
    ON calculations FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Create RLS policy for SELECT
CREATE POLICY "Users can view their own calculations"
    ON calculations FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Create RLS policy for UPDATE
CREATE POLICY "Users can update their own calculations"
    ON calculations FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create RLS policy for DELETE
CREATE POLICY "Users can delete their own calculations"
    ON calculations FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
