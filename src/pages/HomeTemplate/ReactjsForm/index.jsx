import { useEffect, useState } from "react";
import InfoDetail from "./InfoDetail";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudent,
  getLocalStorage,
  editStudent,
  updateStatus,
} from "./slice";
import Search from "./Search";

export default function ReactjsForm() {
  const props = useSelector((state) => state.reactjsFormReducer);
  const { listStudents, isEdit } = props;
  // const [isAdd, setIsAdd] = useState(isEdit);

  const dispatch = useDispatch();

  const [student, setStudent] = useState({
    values: { id: "", name: "", sdt: "", email: "" },
    errors: { id: "", name: "", sdt: "", email: "" },
  });

  const handleErrors = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...student.errors };
    if (!value.trim()) {
      newErrors[name] = "This field is required!";
    } else {
      newErrors[name] = "";
      // Kiểm tra
      const regexNumber = /^[0-9]+$/;
      switch (name) {
        case "id":
          if (!value.match(regexNumber)) {
            newErrors[name] = "Mã sinh viên bạn nhập phải là số!";
          }
          if (listStudents.find((item) => item.id === value)) {
            newErrors[name] = "Mã sinh viên đã tồn tại!";
          }
          break;

        case "name":
          const regexLetter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$";
          if (!value.match(regexLetter)) {
            newErrors[name] = "Tên không được chứa số và ký tự đặc biệt!";
          }
          break;

        case "sdt":
          if (!value.match(regexNumber)) {
            newErrors[name] = "Số điện thoại bạn nhập phải là số!";
          }
          break;

        case "email":
          const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value.match(regexEmail)) {
            newErrors[name] = "Email không hợp lệ!";
          }
          break;

        default:
          break;
      }
    }
    // Cập nhật state student
    // setStudent({
    //   ...student,
    //   errors: newErrors,
    // });

    setStudent((pre) => {
      return {
        ...pre,
        errors: newErrors,
      };
    });
  };

  const validationForm = () => {
    const studentId = student.values.id;
    const studentName = student.values.name;
    const studentSdt = student.values.sdt;
    const studentEmail = student.values.email;
    let hasError = false;
    if (!studentId || !studentName || !studentSdt || !studentEmail) {
      hasError = true;
    }
    // Check id
    const regexNumber = /^[0-9]+$/;
    if (
      !studentId.match(regexNumber) ||
      listStudents.find((item) => item.id === studentId)
    ) {
      hasError = true;
    }
    // Check name
    const regexLetter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s ]+$";
    if (!studentName.match(regexLetter)) {
      hasError = true;
    }
    // Check sdt
    if (!studentSdt.match(regexNumber)) {
      hasError = true;
    }
    // Check email
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!studentEmail.match(regexEmail)) {
      hasError = true;
    }
    return hasError;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setStudent({
      ...student,
      values: { ...student.values, [name]: value },
    });
  };

  const data = [
    {
      title: "Mã SV",
      name: "id",
      placeholder: "Nhập mã SV",
      disabled: isEdit,
    },
    {
      title: "Họ tên",
      name: "name",
      placeholder: "Nhập họ tên",
      disabled: false,
    },
    {
      title: "Số điện thoại",
      name: "sdt",
      placeholder: "Nhập số điện thoại",
      disabled: false,
    },
    {
      title: "Email",
      name: "email",
      placeholder: "Nhập email",
      disabled: false,
    },
  ];

  const renderDivInput = () => {
    return data.map((item) => {
      return (
        <div key={item.title} className="w-full">
          <p className="text-lg font-semibold ml-1">{item.title}</p>
          <input
            name={item.name}
            onChange={handleOnChange}
            onBlur={handleErrors}
            type="text"
            value={student.values[item.name]}
            disabled={item.disabled}
            placeholder={item.placeholder}
            className="w-full rounded-lg"
          />
          {student.errors[item.name] && (
            <div className="text-red-600 text-sm ml-1">
              {student.errors[item.name]}
            </div>
          )}
        </div>
      );
    });
  };

  const setLocalStorage = (data) => {
    const dataJson = data;
    const dataString = JSON.stringify(dataJson);
    localStorage.setItem("LIST_STUDENT", dataString);
  };

  useEffect(() => {
    const dataString = localStorage.getItem("LIST_STUDENT");
    if (!dataString) return;
    const dataJson = JSON.parse(dataString);
    dispatch(getLocalStorage(dataJson));
  }, []);

  const handleAddStudent = () => {
    const newListStudents = [...listStudents, student.values];
    const isHasError = validationForm();
    if (isHasError) return;
    dispatch(addStudent(student.values));
    setLocalStorage(newListStudents);
    handleResetForm();
  };

  const handleUpdateStudent = () => {
    const isHasError = validationForm();
    if (isHasError) return;
    dispatch(editStudent(student.values));
    handleResetForm();
  };

  const handleSubmit = (event) => {
    // Chặn sự kiện load lại trang web
    event.preventDefault();
  };

  console.log("error: ", student.errors);

  const handleResetForm = () => {
    setStudent({
      values: { id: "", name: "", sdt: "", email: "" },
      errors: { id: "", name: "", sdt: "", email: "" },
    });
    dispatch(updateStatus(false));
    setLocalStorage(listStudents);
  };

  return (
    <div className="py-[100px]">
      {isEdit ? (
        <h1 className="text-center text-3xl font-bold mb-5">
          Chỉnh sửa thông tin
        </h1>
      ) : (
        <h1 className="text-center text-3xl font-bold mb-5">Thêm sinh viên</h1>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 max-w-[960px] mx-auto place-items-start gap-5">
          {renderDivInput()}
          <div className="w-full place-items-start">
            {isEdit ? (
              <button
                onClick={handleUpdateStudent}
                type="button"
                className="rounded-full bg-green-500 py-2 px-4 hover:bg-green-800 text-white"
              >
                Cập nhật thông tin
              </button>
            ) : (
              <button
                onClick={handleAddStudent}
                type="button"
                className="rounded-full bg-green-500 py-2 px-4 hover:bg-green-800 text-white"
              >
                Thêm sinh viên
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mt-10">
          Thông tin sinh viên
        </h1>
        <Search listStudent={listStudents} />
        <InfoDetail
          student={student}
          listStudent={listStudents}
          showData={setStudent}
          setLocalStorage={setLocalStorage}
        />
      </div>
    </div>
  );
}
