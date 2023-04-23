// src/components/Sidebar.tsx
import React from 'react';
import NoteList from './NoteList';

// models
import { Note } from '../models/Notes';

interface SidebarProps {
    setActiveNote: (note: Note | null ) => void;
    updateActiveNoteTitle: (newTitle: string) => void;
    UserID: string;
    
}


const Sidebar: React.FC<SidebarProps> = ( {setActiveNote, UserID, updateActiveNoteTitle }) => {
  return (
    <div className="sidebar">
      <NoteList setActiveNote={setActiveNote} UserID={UserID} updateActiveNoteTitle={updateActiveNoteTitle} />
    </div>
  );
};

export default Sidebar;
