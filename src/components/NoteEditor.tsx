// src/components/NoteEditor.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { updateNote } from '../firebase';
import { debounce } from 'lodash';
import ReactQuill from 'react-quill';

// styles
import 'react-quill/dist/quill.snow.css';
import '../styles/quillOverrides.css'


// models
import { Note } from '../models/Notes';

interface NoteEditorProps {
  setActiveNote: (note: Note | null) => void;
  activeNote: Note;
  UserID: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ activeNote, setActiveNote, UserID }) => {
  const [noteContent, setNoteContent] = useState<string>(activeNote.content);
  const [saveState, setSaveState] = useState<string>('saved');
  const [isSaveStateVisible, setIsSaveStateVisible] = useState<boolean>(false);

  // track saved state
  useEffect(() => {
    if (saveState === 'saved' || saveState === 'unsaved') {
      setIsSaveStateVisible(true);

      const timeoutId = setTimeout(() => {
        setIsSaveStateVisible(false);
      }, 5000); // Hide the save-state div after 5 seconds

      return () => clearTimeout(timeoutId); // Clean up the timeout
    }
  }, [saveState]);



  // update note content state
  useEffect(() => {
    setNoteContent(activeNote.content);
  }, [activeNote]);


  // save data 3000ms after user stops typing
  const saveDataDebounced = useCallback(
    debounce(async (UserID: string, updatedNote: Note) => {
      setSaveState('saving...')
      updateNote(UserID, updatedNote);
      setSaveState('saved')
    }, 3000),
    []
  );

  // handle changes from the content
  const handleContentChange = (content: string) => {
    setSaveState('unsaved')
    setNoteContent(content);

    if (activeNote) {
      const updatedNote = { ...activeNote, content: content };
      setActiveNote(updatedNote);

      // Update the note in Firestore
      if (UserID) {
        saveDataDebounced(UserID, updatedNote);
      }
    }
  };

  return (
    <div className="note-editor">
      <ReactQuill
        theme="snow"
        value={noteContent}
        onChange={handleContentChange}
        className="note-editor-textarea"
      />
      <div className={`save-state${isSaveStateVisible ? "" : " hidden"}`}>
        {saveState}
      </div>


    </div>
  );
};

export default NoteEditor;
