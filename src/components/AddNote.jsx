import { useState } from "react";
import { saveNote } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      saveNote({ title, content });
      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      setError("Failed to save note.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-sm text-blue-500">// Why show spinner here</p>}
      <Button type="submit" disabled={loading} className='cursor-pointer'>
        {loading ? "Saving..." : "Add Note"}
      </Button>
    </form>
  );
}
