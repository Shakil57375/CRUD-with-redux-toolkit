import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Transaction() {
  return (
    <li className="transaction income">
      <p>Earned this month</p>
      <div className="right">
        <p>৳ 100</p>
        <button className="link">
          <MdDelete className="text-2xl text-red-500" />
        </button>
        <button className="link">
          <FaEdit className="text-2xl text-blue-500" />
        </button>
      </div>
    </li>
  );
}
