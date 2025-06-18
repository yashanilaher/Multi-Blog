import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";

const Creator = () => {
  //here want all admins and have use just in this component so not using or stroing it on context api
  const [admins, setAdmins] = useState();
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/users/admins`,
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        setAdmins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmins();
  }, []);
  return (
    <div className=" container mx-auto p-4 px-10">
      <h1 className="text-2xl font-semibold mb-6">New Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admins && admins?.length > 0 ? (
          [...admins].reverse().slice(0, 4).map((element) => {
            return (
              <div key={element?._id} className="flex flex-col items-center">
                <img
                  src={element?.photo?.url}
                  alt="blog"
                  className="md:w-56 md:h-56 object-cover rounded-full border border-black"
                />
                <div className="text-center mt-2">
                  <p className="text-base font-medium">{element?.name}</p>
                  <p className="text-gray-600 text-xs">{element?.role}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Creator;
