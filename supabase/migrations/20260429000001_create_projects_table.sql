-- Migration: Create projects and project_contributors tables
-- Created: 2026-04-29

CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  num         TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  long_desc   TEXT NOT NULL,
  icon        TEXT NOT NULL CHECK (icon IN ('layout', 'layers', 'box')),
  features    TEXT[]      NOT NULL DEFAULT '{}',
  tech        TEXT[]      NOT NULL DEFAULT '{}',
  github      TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_contributors (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  github     TEXT NOT NULL
);
