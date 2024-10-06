export default function NoteItem({ note }) {
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        یادداشت از{" "}
        {note.isStaff ? <span>کارکنان</span> : <span>{note.user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("fa-IR")}
      </div>
    </div>
  );
}
