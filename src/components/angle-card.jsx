import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { AlertBox, ErrorAlertBox } from "./accessories";

export default function AngleCard ({icon}) {
    return (
        <div className="min-w-20 size-20 relative rounded-xl overflow-clip">
            <Image src={icon} className="absolute top-1/2 -translate-y-1/2 z-10 left-5" width={20} height={20} alt="" />
            <div className="size-32 rounded-tr-2xl rotate-45 bg-dao-green absolute top-1/2 -translate-y-1/2 -translate-x-20"></div>
        </div>
    )
}


export function AngleCardEarn ({ icon, title, text, link, actionId, userFriendlyAddress }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [act, setAct] = useState('hidden')
    const [username, setUsername] = useState('')
    
    const alertBoxRef = useRef(null)

    const addPoints = async () => {
        setIsLoading(true)
        const addPoints_fetch = await fetch(`https://data-be.metamemo.one/game/points/add?address=${userFriendlyAddress}&actionid=${actionId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"address": userFriendlyAddress, "actionid": actionId})
        })
        
        const data = await addPoints_fetch.json()

        const now = new Date();
        const ttl = 24 * 60 * 60 * 1000 * 365

        const item = {
            value: title,
            addedAt: now.getTime(),
            expiry: now.getTime() + ttl,
            points: 50
        };
            
        if ( data.result == 1 ) {
            localStorage.setItem(actionId, JSON.stringify(item));
            window.open(link, '_blank')
            router.reload()
        } if ( data.error == "one-time action already done") {
            setAct('flex')
            setIsLoading(false)
            localStorage.setItem(actionId, JSON.stringify(item));
            window.open(link, '_blank')
            router.reload()
        }
    }


    const getWithExpiry = key => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
          return null;
        }
      
        const item = JSON.parse(itemStr);
        const now = new Date();
      
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
      
        return item.value;
    }

    const funcMethod = () => {
        setAct('hidden')
    }

    return (
        <>
            <ErrorAlertBox ref={ alertBoxRef } act={ act } funcMethod={ () => setAct('hidden') } />

            <div className="flex justify-between gap-2 items-center bg-white/5 rounded-xl pr-4">
                <div className="flex items-center w-3/5">
                    <div className="min-w-20 size-20 relative rounded-xl overflow-clip">
                        <Image src={icon} className="absolute top-1/2 -translate-y-1/2 z-10 left-5" width={24} height={24} alt="" />
                        <div className="size-32 rounded-tr-2xl rotate-45 bg-dao-green absolute top-1/2 -translate-y-1/2 -translate-x-20"></div>
                    </div>
                    <div className="flex flex-col text-left w-1/2">
                        <p className="text-white text-sm capitalize">{ title }</p>
                        <p className="text-[#FFC300] text-sm">{ text } Points</p>
                    </div>
                </div>

                { isLoading?
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-dao-green animate-spin"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>:
                <>
                { getWithExpiry(actionId)?
                    <button className="border-y-2 border-solid border-dao-green rounded-full min-w-24 py-1.5 text-sm">Redeemed</button>:
                    <button onClick={ addPoints } className="border-y-2 border-solid border-dao-green rounded-full min-w-24 py-1.5 text-sm">Redeem</button>
                }
                </> }
            </div>
        </>
    )
}