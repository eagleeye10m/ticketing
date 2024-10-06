"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/redux/auth/authSlice";
import { userRegThunk } from "@/redux/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

function RegisterPage() {
  console.log("re render");

  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(userRegThunk(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div dir="rtl">
      <section className="heading items-start px-0 ">
        <h1 className="flex items-center gap-2">
          <FaUser /> ثبت نام
        </h1>
        <p>لطفا یک حساب کاربری ایجاد کنید</p>
      </section>

      <section className="form ml-0 ">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="تایید گذرواژه"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">ثبت</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default RegisterPage;
