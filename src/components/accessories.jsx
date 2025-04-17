"use client";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";


export function LeftRight ( prop ) {
    return (
        <div className="flex justify-between border-b border-solid border-dao-green py-2">
            <p className="nunito">{ prop.left }</p>
            <p className="nunito">{ prop.right }</p>
        </div>
    )
}


export function ReferCards (props) {
    return (
        <div className="relative flex justify-between items-center rounded-xl bg-[#0B1712] px-2 py-2 w-full text-left gap-2">
            <Image src={"token 2.svg"} width={30} height={30} alt="" />
            <section className="flex flex-col text-sm w-full">
                <p className="text-dao-green capitalize">{ props.text }</p>
                <p className="">{ props.point } Points</p>
            </section>
            <button onClick={ props.action } className="border-y-2 border-solid border-dao-green h-fit px-6 py-1.5 text-white rounded-full inter text-sm">Invite</button>
        </div>
    )
}

export function ProfilePoints ( props ) {
    return (
        <section className="bg-white/5 rounded-xl w-full p-4 flex justify-between items-center">
            <p className="nunito capitalize">{ props.title }</p>
            <div className="pl-3 rounded-full flex gap-2 items-center text-dao-green">
                <p className="w-3/4 text-sm inter font-bold">{ props.text } Points</p>
                <Image src={ props.icon } width={24} height={24} alt="" />
            </div>
        </section>
    )
}

export function CreateCards ({title, text}) {
    return (
        <div className="bg-white/5 flex flex-col gap-1 rounded-lg px-4 py-2">
            <p className="text-white">{ title }</p>
            <p className="text-dao-green w-3/4 break-all">{ text }</p>
        </div>
    )
}

export function PointsCard({ title, text, icon}) {
    return (
        <div className="flex justify-between bg-white/5 w-full p-3 gap-2 rounded-xl">
            <div className="flex flex-col text-left gap-1">
                <p className="capitalize text-sm text-nowrap w-4/5">{ title }</p>
                <p className="text-dao-green text-sm">{ text }</p>
            </div>
            <Image src={icon} className="aspect-square object-contain" width={30} height={30} alt="" />
        </div>
    )
}


export function PointsCardReverse({ title, text, icon}) {
    return (
        <div className="flex justify-between flex-row-reverse bg-white/5 w-full p-3 gap-2 rounded-xl">
            <div className="flex flex-col text-right gap-1">
                <p className="capitalize text-sm text-nowrap w-4/5">{ title }</p>
                <p className="text-dao-green text-sm">{ text }</p>
            </div>
            <Image src={icon} className="aspect-square object-contain" width={20} height={24} alt="" />
        </div>
    )
}

export function TodaysTask({ title, text, link, userFriendlyAddress, actionId, visited }) {
    const router = useRouter()
    
    const [isLoading, setIsLoading] = useState(false)

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
        if ( data.result == 1 ) {
            const now = new Date();
            const ttl = 24 * 60 * 60 * 1000
      
            const item = {
                value: title,
                addedAt: now.getTime(),
                expiry: now.getTime() + ttl,
                points: 20
            };
        
            localStorage.setItem(actionId, JSON.stringify(item));
            window.open(link, '_blank')
            router.reload()
        }
    }

    return (
        <div className="flex justify-between gap-2 items-center bg-white/5 rounded-xl p-4">
            <div className="flex flex-col text-left w-3/5 gap-1">
                <p className="text-white text-sm capitalize">{ title }</p>
                <p className="text-[#FFC300] text-sm">{ text } Points</p>
            </div>

            { isLoading?
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-dao-green animate-spin"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>:
            <>
            { visited? <button className="border-y-2 border-solid border-dao-green rounded-full min-w-24 py-1.5 text-sm">Visited</button>: <button onClick={ addPoints } className="border-y-2 border-solid border-dao-green rounded-full min-w-24 py-1.5 text-sm">Visit{ visited }</button> }
            </>
            }
        </div>
    )
}


export function ProfileConvert({ title, icon, amount, disabled, func }) {
    return (
        <section className="">
            <h3 className="text-[#EAEAEA] text-sm mt-2 capitalize">{ title }</h3>
            <div className="bg-[#010A05] rounded-xl flex gap-4 p-4">
                <Image src={icon} width={24} height={24} alt="" />
                { disabled? <input onChange={ (e) => func(e.target.value) } type="number" className="text-dao-green font-black" value={ amount } disabled={true} />: 
                    <input onChange={ (e) => func(e.target.value) } type="number" className="text-dao-green font-black" value={ amount } />
                }
            </div>
        </section>
    )
}


export function LoadScreen() {
    return (
        <div className="min-h-svh min-w-svw flex justify-center items-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="animate-spin fill-dao-green"><path d="M220-477q0 63 23.5 109.5T307-287l30 21v-94q0-13 8.5-21.5T367-390q13 0 21.5 8.5T397-360v170q0 13-8.5 21.5T367-160H197q-13 0-21.5-8.5T167-190q0-13 8.5-21.5T197-220h100l-15-12q-64-51-93-111t-29-134q0-94 49.5-171.5T342-766q11-5 21 0t14 16q5 11 0 22.5T361-710q-64 34-102.5 96.5T220-477Zm520-6q0-48-23.5-97.5T655-668l-29-26v94q0 13-8.5 21.5T596-570q-13 0-21.5-8.5T566-600v-170q0-13 8.5-21.5T596-800h170q13 0 21.5 8.5T796-770q0 13-8.5 21.5T766-740H665l15 14q60 56 90 120t30 123q0 93-48 169.5T623-195q-11 6-22.5 1.5T584-210q-5-11 0-22.5t16-17.5q65-33 102.5-96T740-483Z"/></svg>
        </div>
    )
}


export function AlertBox({ text, act, funcMethod }) {
    const cardLocalContainer = useRef(null);
    const timeBar = useRef(null)

    useEffect(() => {
        if ( act == 'flex' ) {
            timeBar.current.classList.remove('w-full')
            timeBar.current.classList.add('w-0')

            setTimeout(() => {
                timeBar.current.classList.add('w-full')
                timeBar.current.classList.remove('w-0')
            }, 100)

            setTimeout(() => {
                funcMethod()
                timeBar.current.classList.remove('w-full')
                timeBar.current.classList.add('w-0')
            }, 1000)
        } else {
            timeBar.current.classList.remove('w-full')
            timeBar.current.classList.add('w-0')
        }
    }, [act])

    return (
        <div ref={ cardLocalContainer } className={`fixed inset-0 bg-gradient-to-l from-[#00040250] to-[#00110A50] backdrop-blur-xs z-10 ${ act } justify-center items-center p-8 transition`}>
            <div onClick={ () => funcMethod() } className="fixed inset-0"></div>

            <div className="bg-dao-green/50 p-4 rounded-lg flex flex-col gap-4 text-black text-left max-w-fit items-center shadow-dao-green shadow">
                <div className="flex gap-4 items-center">
                    <div className="bg-dao-green/50 shadow-xl rounded-md border-2 border-solid border-white h-fit"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="fill-white p-1 size-8"><path d="M378-240.26 148.26-470l48.98-48.98L378-338.22l383.76-383.76L810.74-673 378-240.26Z"/></svg></div>
                    <section className="flex flex-col w-full text-white">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="font-bold w-full">Copied to Clipboard</h2>
                        </div>
                        <p className="leading-4 text-sm">Successfully copied to clipboard</p>
                    </section>
                </div>
                <div className="w-full h-1.5 bg-gray-10 rounded-full">
                    <div ref={ timeBar } className="h-1.5 rounded-full bg-white transition-slow"></div>
                </div>
            </div>
        </div>
    )
}


export function ErrorAlertBox({ text, act, funcMethod }) {
    const cardLocalContainer = useRef(null);

    return (
        <div ref={ cardLocalContainer } className={`fixed inset-0 bg-gradient-to-l from-[#00040250] to-[#00110A50] backdrop-blur-xs z-10 ${ act } justify-center items-center p-8`}>
            <div className="bg-white p-4 rounded-lg flex gap-4 text-black text-left max-w-fit items-center shadow-amber-500/50 shadow">
                <div className="bg-white shadow-xl rounded-md p-2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-amber-500 size-8"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg></div>
                <section className="flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="font-bold w-full">Error</h2>
                        <button onClick={ funcMethod } className="p-0.5 shadow-2xl shadow-amber-800 bg-amber-500/50 font-semibold mx-auto text-dao-green rounded"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="fill-white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                    </div>
                    <p className="leading-4 text-sm">One-time action already done</p>
                </section>
            </div>
        </div>
    )
}