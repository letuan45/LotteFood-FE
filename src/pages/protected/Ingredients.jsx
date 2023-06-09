import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Ingredient from "../../features/ingredients";
import { setPageTitle } from "../../features/common/headerSlice";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Quản lý nguyên liệu" }));
  }, [dispatch]);

  return <Ingredient />;
}

export default InternalPage;
