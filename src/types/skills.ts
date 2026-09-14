/**
 * Skills data types — aligned with docs/ARCHITECTURE.md §4 (Frontend, Backend, Tools, Practices).
 */

export interface Skill {
  id: string;
  name: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  /** Empty until verified skills are supplied for this category */
  skills: Skill[];
}
