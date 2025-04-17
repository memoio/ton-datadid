import { AlertBox, LoadScreen, PointsCard, ReferCards } from "@/components/accessories";
import { Footer } from "@/components/footer";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function Referral() {
    const router = useRouter()
    const [gamePoints, setGamePoints] = useState(0)
    const userFriendlyAddress = useTonAddress()
    const [isDid, setIsDid] = useState(false)
    const [act, setAct] = useState('hidden')
    const [username, setUsername] = useState('')
    
    const alertBoxRef = useRef(null)

    useEffect(() => {
        const fetchGroup = async () => {
            const checkDID = await fetch(`https://didapi.memolabs.org/did/info?address=${userFriendlyAddress}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const responseDID = await checkDID.json()
            if (responseDID.number) {
                setIsDid(true)
            }
        }
        
        if ( userFriendlyAddress ) {
            fetchGroup()
        } else {
            router.push('/connect-wallet')
        }

    }, [userFriendlyAddress, router])
    

    useEffect(() => {
        const getPoints = async () => {
            const checkGamePoints = await fetch(`https://data-be.metamemo.one/game/user/info?address=${userFriendlyAddress}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    
            const data = await checkGamePoints.json()
            if ( data.result == 1 ) {
                setGamePoints(data.data.points)
            }
        }

        getPoints()
    }, [userFriendlyAddress])

    const copyText = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
              .then(() => setAct('flex'))
              .catch(() => copyToClipboardFallback());
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setAct('flex');
        }
    }

    return (
        <>
            <AlertBox ref={ alertBoxRef } act={ act } funcMethod={ () => setAct('hidden') } />

            { isDid?
            <div className="flex flex-col gap-4 text-center justify-center p-8 nunito pb-32 relative w-full">
                <div className="relative w-full h-full mx-auto mt-6">
                    <Image src={"/Ellipse 213.png"} className="aspect-[98/158] w-60 absolute -top-28 inset-x-0 mx-auto" width={98} height={158} alt="" />
                    <Image src={"/Group 34636.png"} className="aspect-[180/162] w-60 absolute -top-12 inset-x-0 mx-auto" width={180} height={162} alt="" />
                    <Image src={"/Clip path group-hand.svg"} className="relative mx-auto" width={120.35} height={94.41} alt="" />
                </div>

                <h1 className="grobold text-white text-3xl mt-12 capitalize"><span className="text-dao-green grobold">Refer Friends </span>and Earn Rewards</h1>
                <p className="">Share your unique invitation link with friends and earn points for every successful referral!</p>

                <section className="grid grid-cols-2 w-full gap-4">
                    <PointsCard title={"points Earned"} text={ gamePoints } icon={"/coin (1) 1.png"} />
                    <PointsCard title={"active referrals"} text={ 0 } icon={"share_48dp_05F292_FILL1_wght400_GRAD0_opsz48.svg"} />
                </section>

                <section className="flex flex-col gap-4 w-full">
                    <ReferCards text={"Invite To Earn"} point={240} url={"#"} action={ () => copyText(`www.miniapp.com/ref/${username}`) } />
                </section>
                
 
                <h2 className="text-xl text-left text-dao-green mt-8">List of your friends</h2>
                <section className="bg-[#0B1712] rounded-xl p-8 w-full flex gap-4 flex-col">
                    <h2 className="nunito font-bold text-center text-lg px-8">You haven’t invited anyone yet</h2>
                    <section className="grid grid-cols-2 gap-4 w-fit mx-auto">
                        <button onClick={ () => copyText(`www.miniapp.com/ref/${username}`) } className="border-y-2 border-solid border-white w-full h-fit px-4 py-1.5 text-white rounded-full text-sm flex items-center justify-center gap-1 p-2">
                            <Image src={"ic_sharp-plus.svg"} className="-ml-1" width={18} height={18} alt="" />
                            Invite
                        </button>
                        <button onClick={ () => copyText(`www.miniapp.com/ref/${username}`) } className="border-y-2 border-solid border-dao-green w-fit h-fit px-4 py-1.5 text-white rounded-full text-sm flex items-center justify-center gap-1 p-2">
                            <Image src={"icon-park-outline_copy.svg"} width={14} height={14} alt="" />
                            Copy link
                        </button>
                    </section>
                </section>
                
            </div>: <LoadScreen /> }
            <Footer active={"friends"} />
        </>
    )
}