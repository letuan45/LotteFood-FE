import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Food from "../../features/food";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Quản lý món ăn" }));
  }, [dispatch]);

  return <Food />;
}

export default InternalPage;
