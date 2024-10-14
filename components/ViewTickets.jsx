"use client";
import { viewTickets, ticketActions } from "@/redux/ticket/ticketSlice";

import { useSelector, useDispatch } from "react-redux";

import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import TicketItem from "@/components/TicketItem";
import { useEffect, useState } from "react";

function ViewTickets() {
  const { tickets, isLoading, isSuccess, isError } = useSelector(
    (state) => state.tickets
  );
  const { user } = useSelector((state) => state.auth);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const { reset } = ticketActions;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(reset());
  //   }
  //   if (!user) {
  //     setSelectedTicket([]);
  //   } else if (user) {
  //     console.log("dispatched");

  //     dispatch(viewTickets());
  //     setSelectedTicket(tickets);
  //   }
  // }, [selectedTicket]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewTickets());
    }
  }, [tickets]);

  if (isLoading) {
    return <Spinner />;
  }

  if (tickets.length === 0 || !user)
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
