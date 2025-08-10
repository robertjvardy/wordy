CREATE TABLE user_game (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wordy_user_id UUID NOT NULL,
    game_id UUID NOT NULL,
    is_complete BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (wordy_user_id) REFERENCES wordy_user(id),
    FOREIGN KEY (game_id) REFERENCES game(id)
)