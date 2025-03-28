import { useState, useEffect } from "react";

export function Body({ children }) { 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser.name) {
                    setUser(parsedUser);
                } else {
                    console.warn("Invalid user data in localStorage.");
                }
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, []);

    return (
        <div className="fixed top-16 left-28 right-3 bottom-5 z-50 bg-white rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[30px] p-10 overflow-hidden"
        >
            {children ? children : <p>Welcome, {user?.name || "Guest"}!</p>}
         

        </div>
    );
}



