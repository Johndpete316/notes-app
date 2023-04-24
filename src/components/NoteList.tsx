// src/components/NoteList.tsx
import React, { useState, useEffect, useCallback } from "react";
import { updateNote, getNotes, deleteNote, getNoteById, updateLastActiveNote } from "../firebase";
import { debounce } from 'lodash';

// models
import { Note } from "../models/Notes";

interface NoteListProps {
  setActiveNote: (note: Note | null) => void;
  updateActiveNoteTitle: (newTitle: string) => void;
  UserID: string;
}

const NoteList: React.FC<NoteListProps> = ({ setActiveNote, UserID, updateActiveNoteTitle }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  // Fetch the notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const userNotes = await getNotes(UserID);
      if (userNotes) {
        setNotes(userNotes);
      }
    };

    if (UserID) {
      fetchNotes();
    }
  }, [UserID]);

  // debeounce save data
  const saveDataDebounced = useCallback(
    debounce(async (UserID: string, note: Note, updatedTitle: string) => {
      updateNote(UserID, { ...note, title: updatedTitle });
    }, 3000), []
  );



  // Handle the click event on a note
  const handleNoteClick = async (note: Note) => {
    const fetchedNote = await getNoteById(note.id, UserID);
    if (fetchedNote) {
      setActiveNote(fetchedNote);
      await updateLastActiveNote(UserID, note.id);
    }
  };

  // Handle the change event on the note title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, note: Note) => {
    const updatedNotes = notes.map((n) =>
      n.id === note.id ? { ...n, title: e.target.value } : n
    );
    setNotes(updatedNotes);

    // Update the note in Firestore
    if (UserID) {
      updateActiveNoteTitle(e.target.value);
      saveDataDebounced(UserID, note, e.target.value);
    }
  };

  // Handle the click event on the "New Note" button
  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(), // Generate a unique ID based on the current timestamp
      title: "Untitled Note",
      content: "",
      date: new Date(),
    };

    setNotes([...notes, newNote]);
    setActiveNote(newNote);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  // handle delete confirmation
  const handleDeleteConfirmation = (noteId: string) => {
    setDeleteConfirmation(deleteConfirmation === noteId ? null : noteId);
  }

  const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>, noteId: string) => {
    e.stopPropagation();
    await deleteNote(noteId, UserID);
    setNotes(notes.filter((note) => note.id !== noteId));
    setDeleteConfirmation(null);
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-list-item"
          onDoubleClick={() => setEditMode(note.id)}
          onClick={() => handleNoteClick(note)}
        >
          <div className="note-title">
            {editMode === note.id ? (
              <input
                type="text"
                value={note.title}
                onChange={(e) => handleTitleChange(e, note)}
                onBlur={() => setEditMode(null)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
            ) : (
              note.title
            )}
          </div>
          {deleteConfirmation === note.id ? (
            <div className="delete-confirmation">
              <button
                className="confirm-delete"
                onClick={(e) => handleConfirmDelete(e, note.id)}
              >
                Yes
              </button>
              <button
                className="cancel-delete"
                onClick={() => handleDeleteConfirmation(note.id)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="delete-note"
              onClick={() => handleDeleteConfirmation(note.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
      ))}
      <div className="note-list-item">
        <button className="note-list-item-button" onClick={handleNewNote}>
          New Note
        </button>
      </div>
    </div>
  );
};

export default NoteList;
