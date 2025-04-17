import Image from "next/image";
import Link from "next/link";

export default function GameOver() {
    return (
        <>
            <div className="min-h-svh min-w-screen flex flex-col justify-center items-center p-8">
                <Image src={"/Group 34536.png"} className="fixed inset-0 w-screen h-screen aspect-auto object-cover opacity-10" width={307.24} height={463} alt="" />
                <div className="flex flex-col gap-4 bg-[#02402791] w-full p-8 rounded-xl text-center relative z-10 border-b-4 border-solid border-dao-green">
                    <Image src={"/image-removebg-preview (8).png"} className="mx-auto size-48" width={500} height={500} alt="" />
                    <h1 className="grobold text-dao-green text-2xl">Game Over</h1>
                    <p className="">Great job! You just earned 1000 points!</p>
                    <Link href={"/game"} className="border-y-2 border-solid border-dao-green rounded-full px-6 w-fit py-3 mx-auto flex gap-2 items-center"><Image src={"tabler_reload.svg"} width={24} height={24} alt="" />Play Again</Link>
                </div>
            </div>
        </>
    )
}