import { useState, useEffect } from "react";

export function Body({ children }) { 
    const [user, setUser] = useState(null);



    return (
        // <div className="fixed top-16 left-28 right-3 bottom-5 z-50 bg-white rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[30px] p-10 overflow-hidden"
        // >
            <div className="fixed top-16 left-28 right-3 bottom-5 z-50 bg-white rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[30px] p-4 overflow-hidden "
        >
            {/* {children ? children : <p>Welcome, {user?.name || "Guest"}!</p>} */}
            {children }
         

        </div>
    );
}



