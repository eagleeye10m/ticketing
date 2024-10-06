"use client";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/Spinner";
import TicketItem from "@/components/TicketItem";
import { ticketActions, viewAllTickets } from "@/redux/ticket/ticketSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViewAllTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const { reset } = ticketActions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewAllTickets());
    }
  }, [tickets, dispatch, reset]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/supportDesk" />
      <h1 className="text-2xl font-bold mb-2 text-right">تیکت ها</h1>
      <div className="tickets" dir="rtl">
        <div className="ticket-headings">
          <div>تاریخ</div>
          <div>محصول</div>
          <div>وضعیت</div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}
