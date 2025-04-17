import Image from "next/image";
import Link from "next/link";

export default function PlayGame() {
    return (
        <>
            <div className="min-h-svh min-w-screen flex flex-col justify-center items-center p-8">
                <Image src={"/Group 34536.png"} className="fixed inset-0 w-screen h-screen aspect-auto object-cover opacity-10" width={307.24} height={463} alt="" />
                
                <div className="flex flex-col gap-4 bg-[#02402791] w-full p-8 rounded-xl text-center relative border-b-4 border-solid border-dao-green">
                    <Image src={"/money (1) 1.png"} className="absolute inset-x-0 mx-auto -top-1/4" width={122} height={122} alt="" />
                    <h1 className="grobold text-dao-green text-2xl mt-12">Play game</h1>
                    <p className="">Earn Points with Every Tap!</p>
                    <Link href={"/game"} className="border-y-2 border-solid border-dao-green rounded-full px-16 w-fit py-3 mx-auto">Play</Link>
                </div>
            </div>
        </>
    )
}