import { useSelector, useDispatch } from "react-redux";
import { deleteStudent, editStudent, updateStatus } from "./slice";

export default function InfoDetail({
  student,
  listStudent,
  showData,
  setLocalStorage,
}) {
  const props = useSelector((state) => state.reactjsFormReducer);
  const { listStudents } = props;

  const dispatch = useDispatch();
  const renderListStudent = () => {
    return listStudent.map((item) => {
      return (
        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.id}
          </th>

          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.sdt}</td>
          <td className="px-6 py-4">{item.email}</td>
          <td className="px-6 py-4">
            <button
              type="button"
              onClick={() => {
                // showData({ ...student, values: item });
                showData((pre) => {
                  return {
                    ...pre,
                    values: item,
                  };
                });
                dispatch(updateStatus(true));
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(deleteStudent(item));
                const newData = listStudents.filter(
                  (student) => student.id !== item.id
                );
                setLocalStorage(newData);
              }}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="relative container mx-auto mt-4 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Mã SV
            </th>
            <th scope="col" className="px-6 py-3">
              Họ tên
            </th>
            <th scope="col" className="px-6 py-3">
              Số điện thoại
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{renderListStudent()}</tbody>
      </table>
    </div>
  );
}
