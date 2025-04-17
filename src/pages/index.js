import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()

    const pushPage = () => {
        router.push('/connect-wallet')
    }

    return (
        <>
            <div className="min-h-screen flex relative w-full justify-center items-center">
                <Image src={"Ellipse 19.svg"} className="absolute top-0 right-0" width={747} height={881} alt="" />
                <Image src={"Ellipse 20.svg"} className="absolute bottom-0 left-0" width={747} height={881} alt="" />

                <section className="p-8 w-full flex flex-col items-center gap-6 text-center nunito relative z-10 -top-12">
                    <p className="inter text-white flex gap-2 items-center">mini app <Image src={"Group 34472.svg"} width={11} height={11} alt=""/></p>
                    <Image src={"/矢量智能对象 1.svg"} className="scale-90" width={234.09} height={234.09} alt="" />
                    <h1 className="grobold text-3xl">MEMO <span className="text-dao-green">DATA</span></h1>
                    <button onClick={ pushPage } className="w-full mx-auto border-y-2 border-solid border-dao-green rounded-full text-white p-3 text-lg">Get started</button>

                </section>

            </div>
        </>
    )
}