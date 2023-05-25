import { useEffect, useState } from "react";
import Appheader from "./subcomponents/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  numvac: string;
  vac: string;
  symtomps: string;
}
const Assess = () => {
  const usenavigate = useNavigate();
  const [symtomps, symtompsupdate] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    fetch(`https://aware-earmuffs-dog.cyclic.app/` + id)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      userData?.numvac === null ||
      userData?.numvac === "" ||
      userData?.vac === null ||
      userData?.numvac === ""
    ) {
      //alert("คุณยังไม่ได้ทำการจองวัคซีน");
      toast.error("คุณยังไม่ได้ทำการจองวัคซีน", {
        position: toast.POSITION.TOP_CENTER,
      });
      usenavigate("/home");
      console.log("symtomps" + userData?.symtomps);
    } else if (userData?.symtomps === null || userData?.symtomps === "") {
      fetch(`https://aware-earmuffs-dog.cyclic.app/` + id)
        .then((response) => response.json())
        .then((data) => {
          const updatedData = {
            ...data,
            symtomps: symtomps,
          };
          console.log("ประเมิน : " + symtomps);

          fetch(`https://aware-earmuffs-dog.cyclic.app/update/` + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedData),
          })
            .then(() => {
              symtompsupdate(symtomps);
              toast.success("กรอกเเบบประเมินอาการเรียบร้อยเเล้ว", {
                position: toast.POSITION.TOP_CENTER,
              });
              //alert("กรอกเเบบประเมินอาการเรียบร้อยเเล้ว");
              usenavigate("/home");
            })
            .catch((err) => {
              alert("ล้มเหลว :" + err.message);
            });
        });
    } else {
      toast.error("คุณประเมินอาการของวัคซีนเข็มนี้เเล้ว", {
        position: toast.POSITION.TOP_CENTER,
      });
      // alert("คุณประเมินอาการของวัคซีนเข็มนี้เเล้ว");
      usenavigate("/home");
    }
  };

  return (
    <>
      <Appheader></Appheader>

      <div className="flex flex-col items-center justify-center bg-green-500 h-screen ">
        <form
          className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-5 w-full sm:w-2/3 lg:w-1/3 md:w-1/2"
          onSubmit={handlesubmit}
        >
          <h1 className="text-center font-bold text-2xl mb-3">
            ประเมินอาการหลังฉีดวัคซีน
          </h1>
          <h1 className="block text-gray-700 font-bold mb-2">
            เข็มที่ : <span className="font-normal">{userData?.numvac}</span>
          </h1>
          <h1 className="block text-gray-700 font-bold mb-2">
            วัคซีนที่ได้รับ :{" "}
            <span className="font-normal">{userData?.vac}</span>
          </h1>
          <div>
            <label
              htmlFor="assessd"
              className="block text-gray-700 font-bold mb-2"
            >
              <h3>กรอกอาการ : </h3>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
              value={symtomps}
              onChange={(e) => symtompsupdate(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
          >
            ยืนยัน
          </button>
          |{" "}
          <Link
            to={"/home"}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            ยกเลิก
          </Link>
        </form>
      </div>
    </>
  );
};

export default Assess;
