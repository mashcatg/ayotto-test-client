/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { CgClose } from "react-icons/cg";

const DashUserModal = ({ isOpen, close }) => {
  const role = "user";
//   const role = "admin";
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white opacity-50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#FFFFFF] p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className=" leading-6 ">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl mt-2 font-bold text-center leading-6 text-[#516FFB]">
                      Add Student
                    </h2>
                    <button onClick={close}>
                      <CgClose size={25}></CgClose>
                    </button>
                  </div>
                </DialogTitle>
                {/* Form */}
                <div className="mt-8">
                  <form className="space-y-5">
                    <div className=" bg-[#E9E4E4] py-3 px-6 rounded-lg  w-full ">
                      <input
                        type="text"
                        name="name"
                        className="grow outline-0 placeholder-[#6A6B6C]"
                        placeholder="Student Name"
                      />
                    </div>
                    <div className=" bg-[#E9E4E4] py-3 px-6 rounded-lg  w-full ">
                      <input
                        type="text"
                        name="batch"
                        className="grow outline-0 placeholder-[#6A6B6C]"
                        placeholder="Batch"
                      />
                    </div>
                    <div className=" bg-[#E9E4E4] py-3 px-6 rounded-lg  w-full ">
                      <input
                        type="text"
                        name="group"
                        className="grow outline-0 placeholder-[#6A6B6C]"
                        placeholder="Group"
                      />
                    </div>
                    <div className=" bg-[#E9E4E4] py-3 px-6 rounded-lg  w-full ">
                      <input
                        type="text"
                        name="phone"
                        className="grow outline-0 placeholder-[#6A6B6C]"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-5 my-10">
                      <p>Role</p>
                      <div className="flex justify-between items-center gap-x-2 relative">
                        <p>Admin</p>
                      
                      <div className="flex items-center absolute -bottom-1 -right-28">
                        <button
                          className={`${
                            role === "admin" ? "bg-[#516FFB]" : "bg-[#E9E4E4]"
                          } w-10 h-8 rounded-sm flex justify-end`}
                        ></button>
                        <button
                          className={`${
                            role === "user" ? "bg-[#516FFB]" : "bg-[#E9E4E4]"
                          } w-8 h-8 rounded-sm flex justify-normal`}
                        ></button>
                      </div>
                      </div>
                      <div className="flex justify-between items-center gap-x-2">
                        <p>User</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <input
                        className="text-lg font-semibold text-center  bg-[#516FFB] text-white py-3 px-6 rounded-lg "
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DashUserModal;
