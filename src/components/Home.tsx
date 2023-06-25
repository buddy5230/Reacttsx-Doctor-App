import { useEffect, useState } from "react";
import Appheader from "./subcomponents/Header";
import { type } from "os";

type User ={
  name: string;
}
type Vac = {
  daypoint: string;
  hospital: string;
  numvac: string;
  vac: string;
  timepoint: string;
  status: string;
};
const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [vacData, setvacData] = useState<Vac | null>(null);
  const id = sessionStorage.getItem("userId");
  const idvac = localStorage.getItem("vacId");

  useEffect(() => {
    fetch(`https://misty-puce-agouti.cyclic.app/${id}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, [id]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://misty-puce-agouti.cyclic.app/historyvac/${id}`
        );
        const data = await response.json();
        if (data.length !== 0) {
          fetch(
            `https://misty-puce-agouti.cyclic.app/historyvac/${id}/${idvac}`
          )
            .then((response) => response.json())
            .then((data) => {
              setvacData(data);
            })
            .catch((error) => console.error(error));
        }
      } catch (error) {}
    }

    fetchData();
  }, [id]);

  return (
    <>
      <Appheader />
      <div className="flex flex-col items-center justify-center h-screen bg-green-500">
        <div className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-5 sm:w-2/3 lg:w-1/3">
          <h1 className="text-center font-bold text-2xl mb-5 ">
            ข้อมูลการจองวัคซีนล่าสุด
          </h1>
          <div className="w-full">
            <h1 className="text-gray-700 font-bold mb-2">
              คุณ : <span className="font-normal">{userData?.name}</span>
            </h1>
            {vacData === null ? (
              <h1 className="text-gray-700 font-bold mb-2">
                สถานะการรับวัคซีน :{" "}
                <span className="font-normal">ยังไม่ได้จองวัคซีน</span>
              </h1>
            ) : (
              <h1 className="text-gray-700 font-bold mb-2">
                สถานะการรับวัคซีน :{" "}
                <span className="font-normal">{vacData?.status}</span>
              </h1>
            )}

            <h1 className="text-gray-700 font-bold mb-2">
              วันเเละเวลาที่จองฉีดวัคซีนล่าสุด :{" "}
              <span className="font-normal">
                {" "}
                {vacData?.daypoint} {","} {vacData?.timepoint}
              </span>
            </h1>
            <h1 className="text-gray-700 font-bold mb-2">
              สถานที่จอง :{" "}
              <span className="font-normal">{vacData?.hospital}</span>
            </h1>
            <h1 className="text-gray-700 font-bold mb-2">
              เข็มที่ : <span className="font-normal">{vacData?.numvac}</span>
            </h1>
            <h1 className="text-gray-700 font-bold mb-2">
              วัคซีนที่ได้รับ :{" "}
              <span className="font-normal">{vacData?.vac}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
