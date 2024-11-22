import { FaEdit } from "react-icons/fa";

export default function Transaction() {
    return (
        <li className="transaction income">
            <p>Earned this month</p>
            <div className="right">
                <p>৳ 100</p>
                <button className="link">
                    delete
                </button>
                <button className="link">
                   <FaEdit className="text-2xl"/>
                </button>
            </div>
        </li>
    );
}
