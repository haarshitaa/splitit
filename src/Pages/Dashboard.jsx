import { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Layout } from '../Components/layout';
import { DashCom } from '../Components/DashCom';
import { useNavigate } from "react-router-dom";


export function Dashboard({name}) {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState({ name: "Guest" }); 
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (!token) {
            console.log("navigating to /signin");
            navigate("/signin");
            return;
        }



    }, [token, navigate]);

    return (
        // <Layout user={user}>
            <DashCom user={name} />
        //  </Layout> 
    );
}



// export function Dashboard() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({ name: "Guest" });
//     const [token, setToken] = useState(localStorage.getItem("token"));

//     useEffect(() => {
//         if (!token) {
//             console.log("Navigating to /signin");
//             navigate("/signin");
//             return;
//         }

//         async function fetchUserData() {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8787/getuser", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.data && response.data.name) {
//                     setUser({ name: response.data.name });
//                 }
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             }
//         }

//         fetchUserData();
//     }, [token, navigate]);

//     // ✅ Use useMemo to prevent unnecessary re-renders of <Layout>
//     const memoizedLayout = useMemo(() => <Layout user={user}><DashCom user={user} /></Layout>, [user]);

//     return memoizedLayout;
// }
