import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { alert } from "react-alertify";
import logo from "../images/logo.png";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLoginusingAPI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      let inputobj = { username: username, password: password };
      fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(Object.keys(resp).length);

          if (Object.keys(resp).length <= 1) {
            alert("กรอก username หรือ password ผิด");
          } else {
            alert("เข้าสู่ระบบสำเร็จ");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("userId", resp.userId);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            usenavigate("/home");
          }
        })
        .catch((err) => {
          alert("กรอก username หรือ password ผิด");
        });
    }
  };
  const validate = () => {
    let result = true;
    if (
      password === "" ||
      password === null ||
      username === "" ||
      username === null
    ) {
      result = false;
      alert("กรุณากรอก username หรือ password");
      return result;
    }
    
    return result;
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-green-500">
      <img src={logo} className="rounded-full w-40 h-40 mb-10 mt-0" />
      <form onSubmit={ProceedLoginusingAPI} className="w-full max-w-lg ">
        <div className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 border-back">
          <div className="mb-4">
            <h2 className="text-xl font-bold">เข้าสู่ระบบ</h2>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              ยูสเซอร์เนม <span className="errmsg">*</span>
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="ยูสเซอร์เนม"
            ></input>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              รหัสผ่าน <span className="errmsg">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="รหัสผ่าน"
            ></input>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              เข้าสู่ระบบ
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={"/register"}
            >
              สร้างบัญชีผู้ใช้ใหม่
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
