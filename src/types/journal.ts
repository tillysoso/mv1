// Mirrors `journal_entries` (supabase/migrations/0002_subscription_and_journal.sql).
// Shape follows docs/03-experience-and-feature-specs/majestic-journal-spec.md
// section 04 — an entry is either linked to a saved reading or standalone.
import type { AvatarId } from './avatar';

export interface JournalEntry {
  id: string;
  userId: string;
  readingId: string | null; // null for a standalone entry
  avatarId: AvatarId | null;
  intention: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}
