"use client";
import Link from "next/link";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home ">
      <section className="heading">
        <h1>برای چه چیزی به کمک نیاز دارید؟</h1>
        <p>لطفا از یکی از گزینه های زیر انتخاب کنید</p>
      </section>
      <div
        className={`header-items ${
          (user?.isAdmin || user?.isStaff) && "hidden"
        }`}
      >
        <Link href="/createTicket" className="btn btn-reverse btn-block">
          <FaQuestionCircle /> ایجاد تیکت جدید
        </Link>

        <Link href="/tickets" className="btn btn-block">
          <FaTicketAlt /> تیکت های من
        </Link>
      </div>

      {(user?.isAdmin || user?.isStaff) && (
        <div>
          <Link href="/tickets/allTickets" className="btn btn-block gap-2">
            <FaTicketAlt /> همه تیکت ها
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
