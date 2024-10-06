"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { createTicket, ticketActions } from "@/redux/ticket/ticketSlice";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const { reset } = ticketActions;
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [product, setProduct] = useState("iPhone");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    } else if (isSuccess) {
      dispatch(reset());
      router.push("/tickets");
    }
  }, [ticket, isError]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", product);
    formData.append("description", description);
    formData.append("file", file);

    dispatch(createTicket(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div dir="rtl">
      <div dir="ltr">
        <BackButton url="/supportDesk" dir="ltr" />
      </div>
      <section className="heading">
        <h1>ساخت تیکت جدید</h1>
        <p>لطفا فرم زیر را پر کنید</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">نام مشتری</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">ایمیل مشتری</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">محصول</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">شرح مشکل</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="buttons flex gap-4 items-center justify-between">
            <div className="form-group contents">
              <button className="btn btn-block">ثبت</button>
            </div>
            <div className="form-group grid grid-flow-col w-[35%]">
              <label className="self-center" htmlFor="file">
                بارگزاری فایل
              </label>
              <input
                dir="ltr"
                type="file"
                id="file"
                className="!border-none !pl-0"
                onChange={(e) => setFile(e.target.files[0])} // This will update file state
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewTicket;
