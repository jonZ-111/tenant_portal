import { useEffect, useState } from "react";
import api from "../../api/axios";
import BackToDashboard from "../BackToDashboard";

export default function AnnouncementsAdmin() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;

    try {
      await api.post("/api/announcements", { title, message });
      setTitle("");
      setMessage("");
      fetchAnnouncements();
    } catch (err) {
      console.error("Failed to post announcement", err);
    }
  };

  return (
    <div className="container-fluid">
      <BackToDashboard />

      <h2 className="mb-4">Announcements</h2>

      {/* CREATE ANNOUNCEMENT */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3">Create New Announcement</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your announcement here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Post Announcement
            </button>
          </form>
        </div>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Previous Announcements</h5>

          {announcements.length === 0 ? (
            <p className="text-muted mb-0">
              No announcements have been posted yet.
            </p>
          ) : (
            announcements.map((a) => (
              <div key={a.id} className="border-bottom pb-3 mb-3">
                <strong>{a.title}</strong>
                <p className="mb-1">{a.message}</p>
                <small className="text-muted">
                  {new Date(a.createdAt).toLocaleDateString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

