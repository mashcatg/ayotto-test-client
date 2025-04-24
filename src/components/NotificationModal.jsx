/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { Headset, Info, MessageSquareText } from "lucide-react";
import { Fragment } from "react";
const NotificationModal = ({ isNotificationOpen, onClose }) => {
  if (!isNotificationOpen) return null;
  return (
    <Transition appear show={isNotificationOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
              <DialogPanel className="w-full max-w-5xl mx-auto transform overflow-hidden rounded-2xl bg-[#FAFAFC]  p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" className=" leading-6 ">
                </DialogTitle>
                <div className="m-6 space-y-4">
                  <div className=" bg-[#fff]  py-2 px-4 border border-gray-500 rounded-lg  w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                      <Headset size={20} />
                      <p className="text-lg ">Support</p>
                    </div>
                    <button
                      className={"text-xl  text-black"}
                    >
                      ❯
                    </button>
                  </div>
                  <div className=" bg-[#fff] py-2 px-4 rounded-lg border border-gray-500 w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                    <Info size={20}/>
                      <p className="text-lg ">About Us</p>
                    </div>
                    <button
                      className={"text-xl  text-black"}
                    >
                      ❯
                    </button>
                  </div>
                  <div className=" bg-[#fff] py-2 px-4 rounded-lg border border-gray-500 w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                    <MessageSquareText size={20}/>
                      <p className="text-lg ">Review</p>
                    </div>
                    <button
                      className={"text-xl  text-black"}
                    >
                      ❯
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationModal;
