// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// models
import { Note } from '../models/Notes';

import Sidebar from './Sidebar';
import NoteEditor from './NoteEditor';



const Dashboard: React.FC = () => {

    const [user, loading, error] = useAuthState(auth)
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return
        if (!user) navigate('/')
        if(error) navigate('/')
    }, [user, loading, error, navigate])

    
    const updateActiveNoteTitle = (newTitle: string ) => {
        if(activeNote) {
            setActiveNote({
                ...activeNote,
                title: newTitle
            })
        }
    }

    if(!user) return null;

    return (
        <div className="dashboard">
            <Sidebar UserID={user.uid} setActiveNote={setActiveNote} 
                updateActiveNoteTitle={updateActiveNoteTitle}
            />
            {activeNote && <NoteEditor key={activeNote.id} activeNote={activeNote} setActiveNote={setActiveNote} UserID={user.uid} />}
        </div>
    );
};

export default Dashboard;
