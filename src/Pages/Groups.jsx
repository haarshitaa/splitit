// export function Groups() {
//     const navigate = useNavigate();

//     return (
//         <div className="relative h-screen w-full">
//             <div className="absolute bottom-48 right-10 border border-black rounded-full h-14 w-14 flex items-center justify-center">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     className="size-8"
//                 >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateGroupModal } from "../Components/CreateGroupModal";

export function Groups() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative h-screen w-full ">
            {/* Create Group Button */}
            <button
                onClick={() => setShowModal(true)}
                className="absolute bottom-48 right-10 border border-black bg-blue-500 text-white rounded-full h-14 w-14 flex items-center justify-center hover:bg-blue-600 transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>

            {/* Create Group Modal */}
            {showModal && <CreateGroupModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
