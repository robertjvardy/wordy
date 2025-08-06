CREATE TABLE user_game (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_user_id UUID NOT NULL,
    game_id UUID NOT NULL,
    is_complete BOOLEAN NOT NULL DEFAULT false,
    first_guess text,
    second_guess text,
    third_guess text,
    fourth_guess text,
    fifth_guess text,
    sixth_guess text,
    FOREIGN KEY (game_user_id) REFERENCES wordy_user(id),
    FOREIGN KEY (game_id) REFERENCES game(id)
)