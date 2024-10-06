import Link from "next/link";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("fa-IR")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>
        {ticket.status === "new"
          ? "جدید"
          : ticket.status === "open"
          ? "باز"
          : "بسته"}
      </div>
      <Link href={`/tickets/${ticket._id}`} className="btn btn-reverse btn-sm">
        مشاهده
      </Link>
    </div>
  );
}

export default TicketItem;
