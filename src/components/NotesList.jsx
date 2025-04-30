import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import '../App.css'

const getRandomLightColor = () => {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}, 100%, 90%)`;
};

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState([]);

  const loadNotes = () => {
    try {
      const stored = getNotes();
      setNotes(stored);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = (index) => {
    try {
      deleteNote(index);
      loadNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      {error && <p className="text-red-600">{error}</p>}
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: getRandomLightColor() }}
            className="mb-4 p-3 rounded shadow-sm flex justify-between items-start"
          >
            <div className="h-full max-h-20 overflow-y-auto overflow-x-hidden noteListScrollbar">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-800 text-ellipsis">{note.content}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(idx)}
              className="cursor-pointer text-red-500 shadow-red-500 hover:text-red-600"
            >
              <Trash2/>
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
