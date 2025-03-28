import React, { useState } from "react";
import { CreateSplitBox } from "./CreateSplitBox";

export function DashCom({ user , isloading1}) {
  const [isCreateSplitOpen, setIsCreateSplitOpen] = useState(false);

  const handleCreateSplitClick = () => {
    setIsCreateSplitOpen(true);
  };

  const handleCloseCreateSplit = () => {
    setIsCreateSplitOpen(false);
  };

  return (
    <div>
      <div className="p-6 space-y-6 flex justify-between">
        <div className="h-72 border w-full p-6 flex justify-between rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
          <div className="pt-10">
            <p className="text-4xl font-bold text-black mb-5">
              Hi {isloading1?"...":user}
            </p>
            <p className="text-gray-600">Welcome back! Ready to manage your splits?</p>
          </div>
          <div>
            <img src="/assets/hellochar.png" className="h-60" alt="Hello" />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="h-16 w-44 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transform transition"
            onClick={handleCreateSplitClick}
          >
            CREATE SPLIT
          </button>
        </div>

        {/* Create Split Dialog */}
        <CreateSplitBox isOpen={isCreateSplitOpen} onClose={handleCloseCreateSplit} />
      </div>
    </div>
  );
}