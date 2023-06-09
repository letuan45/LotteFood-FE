import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import IngreOrders from "../../features/ingre-orders";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Quản lý nhập nguyên liệu" }));
  }, [dispatch]);

  return <IngreOrders />;
}

export default InternalPage;
