CREATE TABLE IF NOT EXISTS CARD (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL,
    front_content TEXT NOT NULL,
    back_content TEXT NOT NULL,
    -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES Deck(id)
);
