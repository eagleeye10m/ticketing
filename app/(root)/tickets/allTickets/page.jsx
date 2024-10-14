"use client";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/Spinner";
import TicketItem from "@/components/TicketItem";
import { ticketActions, viewAllTickets } from "@/redux/ticket/ticketSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViewAllTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  console.log(tickets);

  const [selectedTicket, setSelectedTicket] = useState(tickets);
  const { reset } = ticketActions;
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedTicket(tickets);

    if (isSuccess) {
      dispatch(reset());
    } else {
      dispatch(viewAllTickets());
    }
  }, [dispatch, tickets]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSelect = (e) => {
    console.log(e.target.value); // This logs the selected value
    const selectedTicket = tickets.filter((ticket) =>
      e.target.value !== "all" ? ticket.status === e.target.value : tickets
    );
    setSelectedTicket(selectedTicket);
  };

  return (
    <>
      <div dir="rtl">
        <label htmlFor="filter" className="font-bold text-xl block mb-2">
          فیلتر بر اساس
        </label>
        <select
          name="filter"
          id="filter"
          className="w-1/2 border-[1px] border-solid border-black border-spacing-2"
          onChange={(e) => {
            handleSelect(e);
          }}
        >
          <option value="all">همه</option>
          <option value="new">جدید</option>
          <option value="open">باز</option>
          <option value="closed">بسته</option>
        </select>
      </div>

      <BackButton url="/supportDesk" />
      <h1 className="text-2xl font-bold mb-2 text-right">تیکت ها</h1>
      <div className="tickets" dir="rtl">
        <div className="ticket-headings">
          <div>تاریخ</div>
          <div>محصول</div>
          <div>وضعیت</div>
        </div>
        {selectedTicket.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}
