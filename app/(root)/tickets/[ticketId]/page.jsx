"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getTicket,
  closeTicket,
  ticketActions,
  viewAllTickets,
} from "@/redux/ticket/ticketSlice";
import { getNotes, createNote } from "@/redux/notes/noteSlice";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/Spinner";
import NoteItem from "@/components/NoteItem";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

function ViewTicket({ params }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [Modal, setModal] = useState(null); // State to store dynamically imported Modal component

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { user } = useSelector((state) => state.auth);
  console.log(ticket);
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const { reset } = ticketActions;
  const router = useRouter();
  const dispatch = useDispatch();
  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  // Close ticket
  const onTicketClose = async () => {
    await dispatch(closeTicket(ticketId));
    dispatch(viewAllTickets());
    toast.success("Ticket Closed");

    //dispatch(viewAllTickets());

    user.isAdmin || user.isStaff
      ? router.push("/tickets/allTickets")
      : router.push("/tickets");
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));

    closeModal();
  };

  // Open/close modal
  const openModal = async () => {
    if (!Modal) {
      const LoadedModal = (await import("react-modal")).default; // Dynamically import Modal
      setModal(() => LoadedModal);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div>
      {isSuccess && (
        <div className="ticket-page">
          <header className="ticket-header ">
            <BackButton
              url={
                user.isAdmin || user.isStaff
                  ? "/tickets/allTickets"
                  : "/tickets"
              }
            />
            <h2 dir="rtl">
              شناسه تیکت: {ticket._id}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h3 dir="rtl" className="text-right">
              تاریخ ثبت: {new Date(ticket.createdAt).toLocaleString("fa-IR")}
            </h3>
            <h3 className="text-right" dir="rtl">
              محصول: {ticket.product}
            </h3>
            <hr />
            <div className="ticket-desc">
              <h3 className="font-semibold mb-[10px]">شرح موضوع</h3>
              <p>{ticket.description}</p>
            </div>
            <h2 className="!justify-end">یادداشت ها</h2>
          </header>

          {ticket.status !== "closed" && (
            <div className="flex justify-end">
              <button onClick={openModal} className="btn ">
                افزودن یادداشت <FaPlus />
              </button>
            </div>
          )}

          {Modal && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Add Note"
            >
              <h2>Add Note</h2>
              <button className="btn-close" onClick={closeModal}>
                X
              </button>
              <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                  <textarea
                    name="noteText"
                    id="noteText"
                    className="form-control"
                    placeholder="Note text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
          )}

          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}

          {ticket.status !== "closed" && (
            <button
              onClick={onTicketClose}
              className={user.isStaff ? "hidden" : " btn btn-block btn-danger"}
            >
              بستن تیکت
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewTicket;
