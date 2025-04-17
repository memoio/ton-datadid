
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";


export function LeaderboardCard ({ name, status, count, amount, image, you }) {
    let a = ''
    let b = ''

    if (name) {
        a = name.slice(0, 4)
        b = name.slice(-4, name.length)
    }

    return (
        <div className={`flex justify-between items-center p-4 ${you} border-solid border-dao-green rounded-2xl`}>
            <div className="flex gap-2">
                <Image src={ image } className="aspect-square size-12 object-contain group" width={35} height={35} alt="" />
                <div className="flex flex-col text-left">
                    { status?
                        <p className="">{ a }...{ b }</p>:
                        <p className="font-bold">{ name }</p>
                    }
                    <p className="flex items-center w-fit gap-2 text-[#FFBB00]">Points { amount }<Image src={"/coin (1) 1.png"} className="size-4 object-contain" width={12} height={12} alt="" /></p>
                </div>
            </div>
            <p className="bg-dao-green size-6 rounded-full text-black">{ count }</p>
        </div>
    )
}