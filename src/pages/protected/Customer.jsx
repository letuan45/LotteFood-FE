import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Customer from "../../features/customer";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Quản lý khách hàng" }));
  }, [dispatch]);

  return <Customer />;
}

export default InternalPage;