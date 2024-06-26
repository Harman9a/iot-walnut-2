import React from "react";
import { GoDotFill } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import axios from "axios";

export default function DeviceDetails({ device, state }) {
  const handleRevoke = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/revokeDevice`,
        {},
        {
          headers: {
            Authorization: state.jwt,
          },
        }
      )
      .then((res) => {
        console.log("ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex items-start justify-start flex-col my-6 border-b-2 pb-4">
        <div className="text-[22px] font-[700] landing-[35px]">
          {device.name}
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start mt-3">
            <div className="mr-2 text-[14px] font-500 landing-[35px] text-base-content/70">
              IMEI Number :
            </div>
            <div className="flex items-center justify-center text-[15px] font-500 landing-[35px]">
              <span className="mr-2">{device.imei}</span> <IoCopyOutline />
            </div>
          </div>

          <div className="flex items-center">
            <span className="flex items-center">
              <GoDotFill className="text-[#FF2002] mr-1 font-[500] text-[16px]" />
              Inactive
            </span>
            <div className="ml-4">
              <button
                className="btn bg-gray-200 text-gray-900 border rounded-[18px] border-gray-300 mr-3 mb-3 text-zinc-700 min-h-[36px] h-[40px] text-[16px] font-[500] landing-[35px]"
                onClick={() =>
                  document.getElementById("my_modal_revoke").showModal()
                }
              >
                Revoke <RiDeleteBinLine />
              </button>
              <dialog id="my_modal_revoke" className="modal">
                <div className="modal-box flex items-center justify-center flex-col max-h-96 h-full">
                  <form method="dialog">
                    <button className="btn text-[22px] btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <MdErrorOutline className="text-[7rem] text-gray-300" />
                  <h3 className="font-md text-[29px] font-[500] landing-[45px] mt-5 mb-2">
                    Delete
                  </h3>
                  <p className="font-md pt-1 text-[15px] text-[#6e6e6e]">
                    Do really wish to remove{" "}
                  </p>
                  <span className="font-md text-[15px]">Admin</span>
                  <div className="flex items-center justify-around w-80 mt-8">
                    <button
                      className="text-[17px] font-[500] btn btn-neutral w-2/4 mr-1 rounded"
                      onClick={handleRevoke}
                    >
                      Submit
                    </button>

                    <button className="text-[17px] font-[500] btn border-current w-2/4 ml-1 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
