"use client";
import { viewTickets, ticketActions } from "@/redux/ticket/ticketSlice";

import { useSelector, useDispatch } from "react-redux";

import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import TicketItem from "@/components/TicketItem";
import { useEffect } from "react";

function ViewTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const { reset } = ticketActions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewTickets());
    }
  }, [tickets, dispatch, reset]);

  if (isLoading) {
    return <Spinner />;
  }

  if (tickets.length === 0)
    return (
      <p className="h-full flex items-center justify-center text-2xl font-bold">
        تیکتی وجود ندارد
      </p>
    );
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

export default ViewTickets;
