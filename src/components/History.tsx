import React, { useEffect, useState } from "react";
import Appheader from "./subcomponents/Header";
type User = {
  _id: string;
  hospital: string;
  numvac: number;
  vac: string;
  daypoint: string;
  timepoint: string;
};
const History = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const id = sessionStorage.getItem("userId");
  
  useEffect(() => {
    fetch(`https://misty-puce-agouti.cyclic.app/historyvac/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <>
      <Appheader></Appheader>
      <div className="flex flex-col items-center justify-start bg-green-500 h-screen">
        <div className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-5 mt-10 w-[400px]">
          <h1 className="font-bold text-center text-2xl pb-10">
            ประวัติการเข้ารับวัคซีน
          </h1>
          {userData.length !== 0 ? (
            <ul className="list-none ml-1">
              {userData.map((user: User) => (
                <li key={user._id}>
                  <p className="text-gray-700 font-bold mb-2">
                    โรงพยาบาล:{" "}
                    <span className="font-normal">{user.hospital}</span>
                  </p>
                  <p className="text-gray-700 font-bold mb-2">
                    เข็มที่: <span className="font-normal">{user.numvac}</span>
                  </p>
                  <p className="text-gray-700 font-bold mb-2">
                    ชนิดวัคซีน: <span className="font-normal">{user.vac}</span>
                  </p>
                  <p className="text-gray-700 font-bold mb-2">
                    วันที่จอง:{" "}
                    <span className="font-normal">{user.daypoint}</span>
                  </p>
                  <p className="text-gray-700 font-bold mb-2">
                    เวลาที่จอง:{" "}
                    <span className="font-normal">{user.timepoint}</span>
                  </p>
                  <br />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-red-500 text-xl font-bold">-- คุณยังไม่เคยจองวัคซีน --</p>
          )}

          <br />
        </div>
      </div>
    </>
  );
};

export default History;
