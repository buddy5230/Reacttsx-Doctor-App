import { useEffect, useState } from "react";
import Appheader from "./subcomponents/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type User ={
  _id:string;
  numvac: string;
  vac: string;
  symtomps: string;
}
const Assess = () => {
  const usenavigate = useNavigate();
  const [symtomps, symtompsupdate] = useState<string>("");
  const [userData, setUserData] = useState<User | null>(null);
  const id = sessionStorage.getItem("userId");
  const idvac = localStorage.getItem("vacId");
  const jwt = sessionStorage.getItem("jwttoken");
  useEffect(() => {
    if(idvac!==null){
      fetch(`https://misty-puce-agouti.cyclic.app/historyvac/${id}/${idvac}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        //console.log(setUserData(data));
      })
      .catch((error) => console.error(error));
    }
    
  }, [id,idvac]);
  
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData?.numvac);
    console.log(userData?.vac);
    console.log(userData?.symtomps);
    if (
      userData?.numvac === null ||
      userData?.numvac === "" ||
      userData?.vac === null ||
      userData?.vac === ""
    ) {
      toast.error("คุณยังไม่ได้ทำการจองวัคซีน", {
        position: toast.POSITION.TOP_CENTER,
      });
      usenavigate("/home");
    } else if (userData?.symtomps === "ยังไม่ได้กรอกอาการ") {
     
          const updatedData = {
            symtomps: symtomps,
          };
          console.log("ประเมิน : " + symtomps);

          fetch(`https://misty-puce-agouti.cyclic.app/assess/${id}/${idvac}`, {           
            method: "PUT",
            headers: { "content-type": "application/json",Authorization: `${jwt}`, },
            body: JSON.stringify(updatedData),
          })
            .then(() => {
              symtompsupdate(symtomps);
              toast.success("กรอกเเบบประเมินอาการเรียบร้อยเเล้ว", {
                position: toast.POSITION.TOP_CENTER,
              });
              usenavigate("/home");
            })
            .catch((err) => {
              alert("ล้มเหลว :" + err.message);
            });
        
    } else {
      toast.error("คุณประเมินอาการของวัคซีนเข็มนี้เเล้ว", {
        position: toast.POSITION.TOP_CENTER,
      });
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
