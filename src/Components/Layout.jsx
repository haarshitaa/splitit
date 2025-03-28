import { BarTop } from '../Components/BarTop';
import { BarSide } from '../Components/BarSide';
import { Body } from '../Components/Body';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { memo, useRef } from "react";

export const Layout = memo(({ user, children }) => {
    const [friends, setFriends] = useState([]);
    const hasFetched = useRef(false);
    const [token, settoken] = useState(localStorage.getItem("token"));
    const [isloading, setLoading] = useState(false);
    const [name, setName]  = useState("");
    const [isloading1, setLoading1] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading1(false);
                return;
            }

            try {
                setLoading1(true);
                const response = await axios.get("http://127.0.0.1:8787/getuser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data?.name) {
                    setName(response.data.name);
                    console.log(response.data.name)
                    setLoading1(false);
                    //setUser({ name: response.data.name });
                    //localStorage.setItem({userdata: response.data.name});
                    //localStorage.setItem("userdata", response.data.name);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading1(false);
                
            }
        }

        fetchUserData();
    }, [token]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        async function fetchFriends() {
            try {
                const response = await axios.get("http://127.0.0.1:8787/getallfriends", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                console.log("Friends API Response:", response.data);
                setFriends(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching friends:", error);
                toast.error("Error fetching friends!");
            }
        }
        fetchFriends();
    }, []);

    if(isloading){
        return <div className='flex justify-center'>
            <div className='flex flex-col justify-center'>
                Loading ...
            </div>
        </div>
    }

    return (
        <div className="bg-customBg h-screen w-full relative">
            <BarTop friends={friends} />
            <BarSide user={name} isloading1={isloading1}/>
            <Body className="pl-[250px] pt-[60px]">
                {React.cloneElement(children,{name},{isloading1})}
            </Body>
        </div>
    );
});
