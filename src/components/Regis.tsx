import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
const Register = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("ยังไม่ได้รับวัคซีน");
  const [hospital, setHospital] = useState<string>("");
  const [numvac, setNumvac] = useState<string>("");
  const [vac, setVac] = useState<string>("");
  const [daypoint, setDaypoint] = useState<string>("");
  const [timepoint, setTimepoint] = useState<string>("");
  const [symtomps, setSymtomps] = useState<string>("");
  const usenavigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "กรุณาเติมข้อมูลลงในช่องให้ครบ";
  
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " ยูสเซอร์เนม";
    }else if (!/^[a-zA-Z]+$/.test(id)) {
      isproceed = false;
      errormessage = "กรุณากรอกยูสเซอร์เนมให้ถูกต้อง";
    }
  
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " ชื่อ-นามสกุล";
    }
  
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " รหัสผ่าน";
    }
  
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " อีเมล์";
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isproceed = false;
      errormessage = "กรุณากรอกอีเมล์ให้ถูกต้อง";
    }
  
    if (address === null || address === "") {
      isproceed = false;
      errormessage += " ที่อยู่";
    }
  
    if (gender === null || gender === "") {
      isproceed = false;
      errormessage += " เพศ";
    }  
  
    if (phone === null || phone === "") {
      isproceed = false;
      errormessage += " เบอร์โทรศัพท์";
    } else if (phone.length !== 10) {
      isproceed = false;
      errormessage += "เบอร์โทรศัพท์ให้ครบ 10 ตัว";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      isproceed = false;
      errormessage = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
      
    }
  
    if (!isproceed) {
      isproceed = false;
      toast.error(errormessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  
    return isproceed;
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regobj = {
      id,
      name,
      password,
      email,
      phone,
      address,
      gender,
      status,
      hospital,
      numvac,
      vac,
      daypoint,
      timepoint,
      symtomps,
    };
    if (IsValidate()) {
      //console.log(regobj);
      fetch("https://aware-earmuffs-dog.cyclic.app/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("สมัครสมาชิคเรียบร้อยเเล้ว", {
              position: toast.POSITION.TOP_CENTER,
            });
            // alert("สมัครสมาชิคเรียบร้อยเเล้ว.");
            usenavigate("/");
          } else {
            res.json().then((data) => {
              toast.error("ล้มเหลว: " + data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
              //alert("ล้มเหลว: " + data.message);
            });
          }
        })
        .catch((err) => {
          toast.error("ล้มเหลว: " + err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          //alert("ล้มเหลว: " + err.message);
        });
    }
  };
  return (
    <div className="flex flex-row items-center justify-center h-screen w-screen bg-green-500 max-[800px]:flex-col">
      <img
        src={logo}
        className="rounded-full w-40 h-40 mx-10 mt-0 max-[500px]: mt-4 mb-3"
        width="200"
        height="200"
      />
      <form
        className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 w-full md:w-auto md:mx-10 "
        onSubmit={handlesubmit}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold">สมัครสมาชิค</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              ยูสเซอร์เนม <span className="errmsg">*</span>
            </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ยูสเซอร์เนม"
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              รหัสผ่าน <span className="errmsg">*</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="รหัสผ่าน"
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fullname"
            >
              ชื่อ-นามสกุล <span className="errmsg">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ชื่อ-นามสกุล"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              อีเมล์ <span className="errmsg">*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="อีเมล์"
            ></input>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              เบอร์โทรศัพท์ <span className="errmsg">*</span>
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="เบอร์โทรศัพท์"
              type="tel"
            ></input>
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 font-bold mb-4"
              htmlFor="Gender"
            >
              เพศ <span className="errmsg">*</span>
            </label>
            <input
              type="radio"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="male"
              className="max_button:mr-5"
            ></input>
            <label className="mr-5">ชาย</label>
            <input
              type="radio"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="female"
              className="max_button:mr-5"
            ></input>
            <label >หญิง</label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="Address"
          >
            ที่อยู่ <span className="errmsg">*</span>
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded phone:mb-2"
        >
          สมัครสมาชิค
        </button>
        |
        <Link
          to={"/"}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
        >
          ยกเลิก
        </Link>
      </form>
    </div>
  );
};

export default Register;
