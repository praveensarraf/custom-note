// src/lib/storage.js
const STORAGE_KEY = "custom_notes";

export const getNotes = () => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (err) {
    throw new Error("Failed to load notes from storage.", err);
  }
};

export const saveNote = (note) => {
  try {
    const current = getNotes();
    const updated = [...current, note];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    throw new Error("Failed to save note.", err);
  }
};

export const deleteNote = (index) => {
  try {
    const notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    throw new Error("Failed to delete note.", err);
  }
};
