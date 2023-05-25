import { useEffect, useState } from "react";
import Appheader from "./subcomponents/Header";

interface User {
  name: string;
  status: string;
  daypoint: string;
  hospital: string;
  numvac: string;
  vac: string;
  timepoint: string;
}

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    fetch(`https://aware-earmuffs-dog.cyclic.app/` + id)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [id]);
  return (
    <>
    <Appheader />
    <div className="flex flex-col items-center justify-center h-screen bg-green-500">
      <div className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-5 sm:w-2/3 lg:w-1/3">
        <h1 className="text-center font-bold text-2xl mb-5 ">ข้อมูลผู้ใช้</h1>
        <div className="w-full">
          <h1 className="text-gray-700 font-bold mb-2">
            คุณ : <span className="font-normal">{userData?.name}</span>
          </h1>
          <h1 className="text-gray-700 font-bold mb-2">
            สถานะการรับวัคซีน :{" "}
            <span className="font-normal">{userData?.status}</span>
          </h1>
          <h1 className="text-gray-700 font-bold mb-2">
            วันเเละเวลาที่จองฉีดวัคซีนล่าสุด :{" "}
            <span className="font-normal">
              {" "}
              {userData?.daypoint} {","} {userData?.timepoint}
            </span>
          </h1>
          <h1 className="text-gray-700 font-bold mb-2">
            สถานที่จอง :{" "}
            <span className="font-normal">{userData?.hospital}</span>
          </h1>
          <h1 className="text-gray-700 font-bold mb-2">
            เข็มที่ : <span className="font-normal">{userData?.numvac}</span>
          </h1>
          <h1 className="text-gray-700 font-bold mb-2">
            วัคซีนที่ได้รับ :{" "}
            <span className="font-normal">{userData?.vac}</span>
          </h1>
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
