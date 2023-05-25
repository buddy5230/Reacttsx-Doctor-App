import React, { useState, useEffect } from "react";
import Appheader from "./subcomponents/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Book = () => {
  const usenavigate = useNavigate();
  const [status, statusupdate] = useState<string>("");
  const [hospital, hospitalupdate] = useState<string>("");
  const [numvac, numvacupdate] = useState<string>("");
  const [vac, vacupdate] = useState<string>("");
  const [daypoint, daypointupdate] = useState<string>("");
  const [timepoint, timepointupdate] = useState<string>("");
  const id = sessionStorage.getItem("userId");

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "กรุณากรอกข้อมูลให้ครบ ";
    if (vac === null || vac === "") {
      isproceed = false;
    }
    if (hospital === null || hospital === "") {
      isproceed = false;
    }
    if (numvac === null || numvac === "") {
      isproceed = false;
    }
    if (daypoint === null || daypoint === "") {
      isproceed = false;
    }
    if (timepoint === null || timepoint === "") {
      isproceed = false;
    }
    if (!isproceed) {
      toast.error(errormessage, {
        position: toast.POSITION.TOP_CENTER, 
      });
     // alert(errormessage);
    } 
    
    return isproceed;
  };

  useEffect(() => {
    fetch(`https://aware-earmuffs-dog.cyclic.app/` + id)
      .then((response) => response.json())
      .then((data) => {
        const status = data.status;
        //console.log(status);
        statusupdate(status);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (IsValidate()) {
      if (status === "ยังไม่ได้รับวัคซีน") {
        fetch(`https://aware-earmuffs-dog.cyclic.app/` + id)
          .then((response) => response.json())
          .then((data) => {
            const updatedData = {
              ...data,
              status: "จองคิวฉีดวัคซีนเรียบร้อยเเล้ว",
              hospital: hospital,
              numvac: numvac,
              vac: vac,
              daypoint: daypoint,
              timepoint: timepoint,
            };
            fetch(`https://aware-earmuffs-dog.cyclic.app/update/` + id, {
              method: "PUT",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(updatedData),
            })
              .then(() => {
                statusupdate("จองคิวฉีดวัคซีนเรียบร้อยเเล้ว");
                hospitalupdate(hospital);
                numvacupdate(numvac);
                vacupdate(vac);
                daypointupdate(daypoint);
                timepointupdate(timepoint);
                toast.success("จองวัคซีนสำเร็จเเล้ว", {
                  position: toast.POSITION.TOP_CENTER, 
                });
                //alert("จองวัคซีนสำเร็จเเล้ว");
                usenavigate("/home");
              })
              .catch((err) => {
                toast.error("ล้มเหลว :" + err.message, {
                  position: toast.POSITION.TOP_CENTER, 
                });
                //alert("ล้มเหลว :" + err.message);
              });
          })
          .catch((error) => console.error(error));
      } else { 
        toast.error("คุณได้ทำการจองวัคซีนเเล้วเเต่ยังไม่ได้เข้ารับการฉีดวัคซีน", {
          position: toast.POSITION.TOP_CENTER, 
        });
       // alert("คุณได้ทำการจองวัคซีนเเล้วเเต่ยังไม่ได้เข้ารับการฉีดวัคซีน");
        usenavigate("/home");
      }
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
          <h1 className="text-center font-bold text-2xl mb-5">จองวัคซีน</h1>
          
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="hospital"
          >
            โรงพยาบาล :
          </label>
          <select
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={hospital}
            onChange={(e) => hospitalupdate(e.target.value)}
          >
            <option selected>---เลือกโรงพยาบาล---</option>
            <option value="โรงพยาบาลนครพิงค์">โรงพยาบาลนครพิงค์</option>
            <option value="โรงพยาบาลมหาราชนคร">โรงพยาบาลมหาราชนคร</option>
            <option value="โรงพยาบาลช้างเผือก">โรงพยาบาลช้างเผือก</option>
          </select>
          
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="numvac"
          >
            เข็มที่ :{" "}
          </label>
          <select
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={numvac}
            onChange={(e) => numvacupdate(e.target.value)}
          >
            <option selected>---เข็มที่---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="vaccine"
          >
            วัคซีน :{" "}
          </label>
          <select
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={vac}
            onChange={(e) => vacupdate(e.target.value)}
          >
            <option selected>---เลือกวัคซีน---</option>
            <option value="sinovac">sinovac</option>
            <option value="sinopham">sinopham</option>
            <option value="astrazeneca">astrazeneca</option>
            <option value="pfizer">pfizer</option>
            <option value="moderna">moderna</option>
          </select>
          
          <label htmlFor="date" className="block text-gray-700 font-bold mb-1">
            วันที่จอง:
          </label>
          <input
            type="date"
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={daypoint}
            onChange={(e) => daypointupdate(e.target.value)}
          />
          
          <label htmlFor="time" className="block text-gray-700 font-bold mb-1">
            เวลาที่จอง:
          </label>
          <select
            className="shadow appearance-none border rounded w-full mb-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={timepoint}
            onChange={(e) => timepointupdate(e.target.value)}
          >
            <option selected>---เลือกเวลา---</option>
            <option value="09:00">09:00</option>
            <option value="12:00">12:00</option>
            <option value="15:00">15:00</option>
          </select>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
          >
            ยืนยัน
          </button>
          | {" "} {" "} 
          <Link
            to={"/home"}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
          >
            ยกเลิก
          </Link>
        </form>
      </div>
    </>
  );
};

export default Book;
