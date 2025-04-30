import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddNote from "@/components/AddNote";
import NotesList from "@/components/NotesList";
import { Button } from "@/components/ui/button";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="max-w-xl mx-auto mt-10">
      <nav className="flex justify-center gap-4 mb-6">
        {/* Why this nav approach for simplicity: uses buttons to push routes */}
        <Button
          variant={location.pathname === "/add" ? "default" : "outline"}
          onClick={() => navigate("/add")}
          className='cursor-pointer'
        >
          Add Note
        </Button>
        <Button
          variant={location.pathname === "/" ? "default" : "outline"}
          onClick={() => navigate("/")}
          className='cursor-pointer'
        >
          View Notes
        </Button>
      </nav>

      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/add" element={<AddNote />} />
      </Routes>
    </div>
  );
}
