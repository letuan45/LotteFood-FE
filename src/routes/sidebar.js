/** Icons are imported separatly to reduce build time */
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import InboxStackIcon from "@heroicons/react/24/outline/InboxStackIcon";
import InboxIcon from "@heroicons/react/24/outline/InboxIcon";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";

const iconClasses = `h-6 w-6`;

const routes = [
  {
    path: "/app/order",
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: "Đặt món",
  },
  {
    path: "/app/bill", // url
    icon: <ClipboardDocumentIcon className={iconClasses} />, // icon component
    name: "Hóa đơn", // name that appear in Sidebar
  },
  {
    path: "/app/customer", // url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: "Khách hàng", // name that appear in Sidebar
  },
  {
    path: "/app/foods", // url
    icon: <InboxStackIcon className={iconClasses} />, // icon component
    name: "Món ăn", // name that appear in Sidebar
  },
  {
    path: "/app/ingre", // url
    icon: <InboxIcon className={iconClasses} />, // icon component
    name: "Nguyên liệu", // name that appear in Sidebar
  },
  {
    path: "/app/ingre-order", // url
    icon: <ClipboardIcon className={iconClasses} />, // icon component
    name: "Nhập NL", // name that appear in Sidebar
  },
  {
    path: "/app/calendar", // url
    icon: <CalendarDaysIcon className={iconClasses} />, // icon component
    name: "Calendar", // name that appear in Sidebar
  },
];

export default routes;
