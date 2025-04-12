import { BarTop } from '../Components/BarTop';
import { BarSide } from '../Components/BarSide';
import { Body } from '../Components/Body';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { memo } from "react";
import { Tombot } from './Tombot';

export const Layout = memo(({ user, children }) => {
    const [friends, setFriends] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isloading, setLoading] = useState(false);
    const [name, setName]  = useState("");
    const [isloading1, setLoading1] = useState(false);
    const [loadfriend, setLoadfriend] = useState(false);
    const [userinfo,setUserinfo] = useState("");

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
                // console.log(response.data);
                
                if (response.data) {
                    setUserinfo(response.data);
                    setName(response.data.name);
                    // console.log(response.data.name);
                }
                console.log(userinfo);
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
        <div className="bg-gradient-to-r from-customBg to-customBgLight h-screen w-full relative " >



            <BarTop friends={friends} />
            <BarSide user={name} isloading1={isloading1}  />
            <Body className="pl-[250px] pt-[60px] pb-[500px] ">
            <div >
               {React.cloneElement(children, { name, isloading1, friends, loadfriend ,userinfo})}
            </div>
            </Body>
            <Tombot/>
        </div>
    );
});



