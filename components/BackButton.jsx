import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

const BackButton = ({ url, dir = "ltr" }) => {
  return (
    <Link href={url} className="btn btn-reverse btn-back" dir={dir}>
      <FaArrowCircleLeft className="mr-2 ml-0" /> بازگشت
    </Link>
  );
};

export default BackButton;
