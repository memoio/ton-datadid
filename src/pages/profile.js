import { ProfileCardUniRow, ProfilePoints, ReferCards, ProfileConvert, LoadScreen, AlertBox } from "@/components/accessories";
import { Footer } from "@/components/footer";
import { ProfileCard } from "@/components/profile-convert";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Profile() {
    const router = useRouter()

    const [test, setTest] = useState(0)
    const userFriendlyAddress = useTonAddress();
    
    const [gameAmount, setGameAmount] = useState("100")
    const [didAmount, setDidAmount] = useState("700")

    const [did, setDID] = useState(null)
    const [isDid, setIsDid] = useState(null)

    const [didPoints, setDidPoints] = useState(0)
    const [gamePoints, setGamePoints] = useState(0)
    const [act, setAct] = useState('hidden')

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
                setDID(responseDID.did)
                setIsDid(true)
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
            } else {
                router.push('/create')
            }
        }

        if ( userFriendlyAddress ) {
            fetchGroup()
        }
    }, [userFriendlyAddress, router])

    return (
        <>
            <AlertBox act={act} funcMethod={ () =>  setAct('hidden')} />
                
            { isDid?
            <div className="flex flex-col gap-4 text-center justify-center items-center p-8 nunito pb-32 relative">
                <div className="relative">
                    <Image src={"/Ellipse 1.png"} width={105.59} height={105.59} alt="" />
                    <button type="button"><Image src={"material-symbols_edit.svg"} className="absolute bottom-8 right-0" width={28} height={28} alt="" /></button>
                </div>
                <h1 className="grobold text-dao-green text-3xl mt-4 capitalize">Profile</h1>
                <p className="px-4">View and update your information, track your progress, and access your referral link</p>
            
                <section className="text-left w-full flex flex-col gap-4">
                    <section className="flex flex-col gap-4">
                        <ProfilePoints title={"DID points"} text={0} icon={"Group 34656.svg"} />
                        <ProfilePoints title={"Game points"} text={ gamePoints } icon={"coin (1) 1.svg"} />
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                        <ProfileCard title={"Wallet Address"} text={userFriendlyAddress} pcFunc={ (e) => setAct(e) } />
                        <ProfileCard title={"DID"} text={did} pcFunc={ (e) => setAct(e) } />
                    </section>
                    
                    <section className="">
                        <h2 className="nunito mt-4 text-xl">Swap Points</h2>
                        <div className="bg-[#0B1712] p-4 relative rounded-xl">
                            <h3 className="nunito mt-6 text-xl text-[#EAEAEA] mb-4">Convert { act}</h3>

                            <div className="relative">
                                <div className="absolute bg-dao-green/80 size-12 flex justify-center items-center rounded-full top-1/2 -translate-y-1/2 mt-2 right-4">
                                    <Image src={"/arrow_downward_48dp_FFF_FILL1_wght400_GRAD0_opsz48.svg"} className="size-8" width={48} height={48} alt="" />
                                </div>

                                <ProfileConvert title={"Games points"} icon={"coin (1) 1.svg"} amount={gameAmount} func={ (e) => {
                                    setGameAmount(e)
                                    setDidAmount(e*7)
                                 }} />
                                <ProfileConvert title={"DID points"} icon={"coin (1) 1.svg"} amount={didAmount} disabled={true} func={ (e) => setDidAmount(e) } />
                            </div>
                            <button className="w-full bg-dao-green/80 rounded p-2 text-lg font-semibold mt-4">Redeem</button>


                        </div>
                    </section>
                </section>
            </div>:<LoadScreen /> }

            <Footer active={"profile"} />
        </>
    )
}