import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZDVmNGUwNzIyMzQyYjYyYzdkMTkxIn0sImlhdCI6MTY4Mjc5NTE0Nn0.A8wsLO8YR1QX_-6WWJUCt3-S5VyZX60iABKPZh-Dsas',
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  };


  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZDVmNGUwNzIyMzQyYjYyYzdkMTkxIn0sImlhdCI6MTY4Mjc5NTE0Nn0.A8wsLO8YR1QX_-6WWJUCt3-S5VyZX60iABKPZh-Dsas',
      },
      body: JSON.stringify({title, description, tag}),
    });
    console.log('Adding a new note');
    const note = {
      _id: '644e176d11d1360542y8a187b',
      user: '644d5f4e0722342b62c7d191',
      title: title,
      description: description,
      tag: tag,
      date: '2023-04-30T07:23:25.104Z',
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log('Deleting the note with id' + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0ZDVmNGUwNzIyMzQyYjYyYzdkMTkxIn0sImlhdCI6MTY4Mjc5NTE0Nn0.A8wsLO8YR1QX_-6WWJUCt3-S5VyZX60iABKPZh-Dsas',
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
