import { BarTop } from '../Components/BarTop';
import { BarSide } from '../Components/BarSide';
import { Body } from '../Components/Body';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { memo } from "react";

export const Layout = memo(({ user, children }) => {
    const [friends, setFriends] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isloading, setLoading] = useState(false);
    const [name, setName]  = useState("");
    const [isloading1, setLoading1] = useState(false);
    const [loadfriend, setLoadfriend] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            
            if (!token) {
                setLoading1(false);
                return;
            }

            try {
                // console.log("before")
                setLoading1(true);
                const response = await axios.get("https://splititb.harshitacodes.workers.dev/getuser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data?.name) {
                    setName(response.data.name);
                    console.log(response.data.name);
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

        async function fetchFriends(){
            if(!token){
                setLoadfriend(false);
                return;
            }
            try{
                setLoadfriend(true);
                const response = await axios.get("https://splititb.harshitacodes.workers.dev/getallfriends",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(response.data?.friends){
                    setFriends(response.data.friends);
                    console.log(response.data.friends);
                }
            }catch(err){
                console.log("Error in fetching friends",err)
            }
            finally{
                setLoadfriend(false);
            }
        }
        fetchFriends();

   
    }, [token]);
    

    if (isloading) {
        return (
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center'>
                    Loading ...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-customBg h-screen w-full relative">
            <BarTop friends={friends} />
            <BarSide user={name} isloading1={isloading1} />
            <Body className="pl-[250px] pt-[60px]">
                {React.cloneElement(children, { name, isloading1,friends, loadfriend })}
            </Body>
        </div>
    );
});

