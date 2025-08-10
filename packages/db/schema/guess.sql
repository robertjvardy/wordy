CREATE TABLE guess (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wordy_user_id UUID NOT NULL,
    user_game_id UUID NOT NULL,
    guess TEXT NOT NULL,
    result TEXT NOT NULL,
    index INTEGER NOT NULL,
    FOREIGN KEY (wordy_user_id) REFERENCES wordy_user(id),
    FOREIGN KEY (user_game_id) REFERENCES user_game(id)
)