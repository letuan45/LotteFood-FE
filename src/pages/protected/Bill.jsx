import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Bill from "../../features/bill";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Đơn đặt/Hóa đơn" }));
  }, [dispatch]);

  return <Bill />;
}

export default InternalPage;
