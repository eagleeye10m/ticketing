"use client";

import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    router.push("/supportDesk");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/supportDesk">میز پشتیبانی</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> خروج
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">
                <FaSignInAlt /> ورود
              </Link>
            </li>
            <li>
              <Link href="/register">
                <FaUser /> ثبت نام
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
