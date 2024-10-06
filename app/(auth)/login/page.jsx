"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userLoginThunk } from "@//redux/auth/authSlice";
import { authActions } from "@//redux/auth/authSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      router.push("/supportDesk");
    }

    dispatch(authActions.reset());
  }, [isError, isSuccess, user, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginThunk(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div dir="rtl">
      <section className="heading items-start px-0">
        <h1 className="flex items-center gap-2">
          <FaSignInAlt /> ورود
        </h1>
        <p>لطفا برای دریافت پشتیبانی وارد شوید</p>
      </section>

      <section className="form ml-0">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="گذرواژه را وارد کنید"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">ورود</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
