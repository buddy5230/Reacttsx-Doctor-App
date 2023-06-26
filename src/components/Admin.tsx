import React, { useEffect, useState } from "react";
import Navadmin from "./subcomponents/Navadmin";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type User = {
  _id: string;
  name: string;
  gender: string;
  status: string;
  role: string;
};
type Vac = {
  _id:string;
  iduser: string;
  hospital: string;
  numvac: number;
  vac: string;
  daypoint: string;
  timepoint: string;
  symtomps: string;
  status: string
};
type Test = {
  _id:string;
  vacData: User[] | null;
    iduser: string;
    hospital: string;
    numvac: number;
    vac: string;
    daypoint: string;
    timepoint: string;
    symtomps: string;
    status: string
};
const Admin = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [vacData, setVacData] = useState<Vac[]>([]);
  const [combineData, setCombineData] = useState<Test[]>([]);
  const [formData, setFormData] = useState("");
  const [updateId, setUpdateId] = useState("");
  const usenavigate = useNavigate();
  useEffect(() => {
    fetch(`https://misty-puce-agouti.cyclic.app/`)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((user: User) => user.role !== "Admin");
        setUserData(filteredData);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`https://misty-puce-agouti.cyclic.app/admin/his`)
      .then((response) => response.json())
      .then((data) => {     
        setVacData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (userData.length > 0 && vacData.length > 0) {
      const combinedData = vacData.map((user) => {
        const matchingVacData = userData.filter(
          (vac) => user.iduser === vac._id
        );
        return {
          ...user,
          vacData: matchingVacData.length > 0 ? matchingVacData : null,
        };
      });
      setCombineData(combinedData);
    }
  }, [userData, vacData]);

  const handleupdate = (itemId: string) => {
    setUpdateId(itemId);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setFormData(selectedValue);
  };

  const closeUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    setUpdateId("");
  };
  const handlesubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(updateId)
    const updatedData = {
          
      status: formData,
    }; 
    fetch(`https://misty-puce-agouti.cyclic.app/admin/update/` + updateId, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedData),
        })
         
        .then(() => {
            setFormData(formData);
            localStorage.setItem("showToastUpdate", "true"); 

            window.location.reload();
          })
          .catch((err) => {
            alert("ล้มเหลว :" + err.message);
          });

  };

  const handleDelete = (vacId: string, userId:string) => {
    console.log("userId",userId)
    console.log("vacId",vacId)
    fetch(`https://misty-puce-agouti.cyclic.app/admin/delete/${userId}/${vacId}`  , {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("เกิดข้อผิดพลาดในการลบข้อมูล");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("showToastDelete", "true"); 
        usenavigate("/admin");
        window.location.reload();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาด:", error);
      });
  };

  useEffect(() => {
    const showToastUpdate = localStorage.getItem("showToastUpdate");
    const showToastDelete = localStorage.getItem("showToastDelete");
    if (showToastUpdate === "true") {
      toast.success("เเก้ไขสถานะสำเร็จ", {
        position: toast.POSITION.TOP_CENTER,
      });
      localStorage.removeItem("showToastUpdate"); 
    } else if (showToastDelete === "true") {
      toast.success("ลบข้อมูลสำเร็จ", {
        position: toast.POSITION.TOP_CENTER,
      });
      localStorage.removeItem("showToastDelete");
    }
  }, []);

  return (
    <>
      <Navadmin />
      <div className="flex justify-center items-center mt-10 ">
        <table className="table-auto border border-black ">
          <thead className="table-auto border border-black bg-slate-500">
            <tr>
              <th className="table-auto border border-black text-white p-5">
                ชื่อ-นามสกุล
              </th>
              <th className="table-auto border border-black text-white p-5">
                เพศ
              </th>
              <th className="table-auto border border-black text-white p-5">
                สถานะการจอง
              </th>
              <th className="table-auto border border-black text-white p-5">
                โรงพยาบาลที่จอง
              </th>
              <th className="table-auto border border-black text-white p-5">
                รายละเอียดการจอง
              </th>
              <th className="table-auto border border-black text-white p-5">
                ประเมินอาการ
              </th>
              <th className="table-auto border border-black text-white p-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {combineData.map((item) => (
              <tr key={item._id}>
                
                
                <td className="pl-5 table-auto border border-black">
                  {item.vacData?.map((user)=>(<div key={user._id}>{user.name}</div>))}
                  </td>
                  <td className="pl-4 table-auto border border-black">
                  {item.vacData?.map((user)=>(<div key={user._id}>{user.gender}</div>))}
                  </td>
                
                {updateId === item._id ? (
                  <td className="w-36 table-auto border border-black">
                    <form onSubmit={handlesubmit}>
                      <label
                        htmlFor="time"
                        className="table-auto block text-gray-700 font-bold mb-1 ml-2"
                      >
                        อัพเดตสถานะ :
                      </label>
                      <select
                        className="ml-2 table-auto border border-black rounded mr-2"
                        value={formData}
                        onChange={handleInputChange}
                      >
                        <option value=""></option>
                        <option value="ยังไม่ได้รับวัคซีน">
                          ยังไม่ได้รับวัคซีน
                        </option>
                        <option value="จองคิวฉีดวัคซีนเรียบร้อยเเล้ว">
                          จองคิวฉีดวัคซีนเรียบร้อยเเล้ว
                        </option>
                        <option value="ได้รับวัคซีนเรียบร้อยเเล้ว">
                          ได้รับวัคซีนเรียบร้อยเเล้ว
                        </option>
                      </select>
                      <button
                        type="submit"
                        className="ml-2 mt-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1 "
                      >
                        ยืนยัน
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-1 "
                        onClick={closeUpdate}
                      >
                        ยกเลิก
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="w-36 pl-6 border border-black">
                    {item.status}
                  </td>
                )}
                <td className="pl-5 table-auto border border-black">
                 {item.hospital}
                </td>
                <td className="pl-5 table-auto border border-black">
                  <p>
                  เข็มที่: {item.numvac}
                  </p>
                  <p>
                  ชนิดวัคซีน: {item.vac}
                  </p>
                
                </td>
                <td className="pl-3 table-auto border border-black">
                {item.symtomps}
                </td>
                <td className="table-auto border border-black w-48">
                  <button
                    className="table-auto border border-black ml-2 bg-blue-500 hover:bg-blue-700 text-white font-[Poppins] duration-500 px-6 py-2 rounded"
                    onClick={()=>handleupdate(item._id)}
                  >
                    เเก้ไข
                  </button>{" "}
                  |
                  <button
                    className="table-auto border border-black ml-1 bg-red-500 hover:bg-red-700 text-white font-[Poppins] duration-500 px-6 py-2 rounded"
                    onClick={()=>handleDelete(item._id,item.iduser)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
/**{data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>ลบ</button>
              </td>
            </tr>
          ))} */
