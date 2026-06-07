-- Evnto schema for Supabase (PostgreSQL)
-- Safe to run multiple times thanks to IF NOT EXISTS guards.

BEGIN;

CREATE TABLE IF NOT EXISTS roles (
    role_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    libelle varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    categorie_id integer PRIMARY KEY,
    nom varchar(255)
);

CREATE TABLE IF NOT EXISTS lieux (
    lieu_id integer PRIMARY KEY,
    nom varchar(255),
    adresse varchar(255),
    ville varchar(255),
    etat varchar(255),
    code_postal varchar(255),
    pays varchar(255)
);

CREATE TABLE IF NOT EXISTS utilisateurs (
    utilisateur_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom_utilisateur varchar(255),
    email varchar(255),
    mot_de_passe varchar(255),
    prenom varchar(255),
    nom varchar(255),
    cree_le timestamp with time zone,
    role_id integer,
    CONSTRAINT fk_utilisateurs_role
        FOREIGN KEY (role_id)
        REFERENCES roles (role_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS evenements (
    evenement_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titre varchar(255),
    description text,
    date_debut timestamp with time zone,
    date_fin timestamp with time zone,
    categorie_id integer,
    est_publie boolean DEFAULT false,
    lieu_id integer,
    organisateur_id integer,
    cree_le timestamp with time zone DEFAULT now(),
    CONSTRAINT fk_evenements_categorie
        FOREIGN KEY (categorie_id)
        REFERENCES categories (categorie_id),
    CONSTRAINT fk_evenements_lieu
        FOREIGN KEY (lieu_id)
        REFERENCES lieux (lieu_id),
    CONSTRAINT fk_evenements_organisateur
        FOREIGN KEY (organisateur_id)
        REFERENCES utilisateurs (utilisateur_id)
);

CREATE TABLE IF NOT EXISTS inscriptions (
    inscription_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    utilisateur_id integer,
    evenement_id integer,
    date_inscription timestamp with time zone,
    CONSTRAINT fk_inscriptions_utilisateur
        FOREIGN KEY (utilisateur_id)
        REFERENCES utilisateurs (utilisateur_id),
    CONSTRAINT fk_inscriptions_evenement
        FOREIGN KEY (evenement_id)
        REFERENCES evenements (evenement_id)
);

-- Recommended indexes for API queries.
CREATE INDEX IF NOT EXISTS idx_evenements_est_publie ON evenements (est_publie);
CREATE INDEX IF NOT EXISTS idx_evenements_date_debut ON evenements (date_debut);
CREATE INDEX IF NOT EXISTS idx_evenements_date_fin ON evenements (date_fin);
CREATE INDEX IF NOT EXISTS idx_evenements_organisateur_id ON evenements (organisateur_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_evenement_id ON inscriptions (evenement_id);
CREATE INDEX IF NOT EXISTS idx_inscriptions_utilisateur_id ON inscriptions (utilisateur_id);

-- Prevent duplicate registrations for the same user/event pair.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_inscriptions_user_event
    ON inscriptions (utilisateur_id, evenement_id);

-- Optional but strongly recommended for auth integrity.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_utilisateurs_email ON utilisateurs (email);

-- Minimum seed roles used by the backend (register defaults to role_id=2).
INSERT INTO roles (libelle)
SELECT seed.libelle
FROM (VALUES ('admin'), ('organisateur'), ('user')) AS seed(libelle)
WHERE NOT EXISTS (
    SELECT 1 FROM roles r WHERE r.libelle = seed.libelle
);

COMMIT;
