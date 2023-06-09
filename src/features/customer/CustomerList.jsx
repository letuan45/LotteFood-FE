import CustomerItem from "./CustomerItem";

const CustomerList = ({ items }) => {
  if (!items && items.length > 0) {
    return (
      <h3 className="font-semibold text-lg text-center">
        Không có khách hàng nào!
      </h3>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>ngày sinh</th>
            <th>địa chỉ</th>
            <th>Sđt</th>
            <th>điểm tích lũy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => <CustomerItem item={item} key={item.id}/>)}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
