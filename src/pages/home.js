import { LoadScreen } from "@/components/accessories";
import AngleCard from "@/components/angle-card";
import { Footer } from "@/components/footer";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Main() {
    const router = useRouter(null)

    const userFriendlyAddress = useTonAddress();

    const [isDid, setDid] = useState(false)
    const [welcome, setWelcome] = useState("No DID Yet?")
    const [username, setUsername] = useState("Create One to Unlock Features")
    const [points, setPoints] = useState(0)

    const [recents, setRecents] = useState([])
    
    //Get Points
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
                setPoints(data.data.points)
            } else {
                //ABC...QWE
            }
        }

        getPoints()
    }, [userFriendlyAddress, ])

    //Check if address has did
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
                setDid(true)
                setWelcome('Welcome Back')
                setUsername(`DID${responseDID.number}!`)
            }
        }
        
        if ( userFriendlyAddress ) {
            fetchGroup()
        } else {
            router.push('/connect-wallet')
        }

    }, [userFriendlyAddress, router])

    useEffect(() => {
        const items = []

        for (let i = 0; i < 25; i++) {
            const key = localStorage.key(i);
            try {
                const value = JSON.parse(localStorage.getItem(i));
                if (value && value.addedAt) {
                    items.push({ key, ...value });
                }
            } catch (e) {
                // Ignore values that aren't valid JSON or don't have addedAt
            }
        }
        
        setRecents(items.slice(0, 3));
    }, [])

    return (
        <>
            { isDid?
            <>
                <section className="flex flex-col gap-6 mt-4 items-center p-8">
                    <h1 className="grobold text-2xl text-center mt-12">{ welcome }<br /><span className="text-xl text-dao-green grobold">{ username }</span></h1>

                    <div className="relative">
                        <Image src={"/coin (1) 1.png"} className="absolute top-5 right-1" width={66} height={66} alt="" />
                        <Image src={"/Ellipse 29.png"} width={187} height={187} alt="" />
                        <p className="flex flex-col gap-0 items-center text-2xl absolute top-1/2 -translate-y-1/2 mx-auto inset-x-0 text-[#FFD400]">{ points }<span className="text-white">Points</span></p>
                    </div>
                    { isDid? <Link href={"/play-game"} className="text-white nunito border-y-2 border-solid border-dao-green p-3 w-full rounded-full text-center">Play Game</Link>:
                        <Link href={"/create"} className="text-white nunito border-y-2 border-solid border-dao-green p-3 w-full rounded-full text-center">Create DID</Link>
                    }

                </section>

                <section className="p-8 flex flex-col gap-2 pb-32">
                    <div className="flex justify-between items-center">
                        <h1 className="capitalize nunito text-lg">Recent activity</h1>
                        <Image src={"hugeicons_activity-04.svg"} width={24} height={24} alt="" />
                    </div>

                    { isDid?
                        <section className="flex flex-col gap-4">
                        { recents.map((entry, key) => {
                            return (
                                <div key={key} className="flex gap-2 items-center bg-white/5 rounded-xl">
                                    <AngleCard icon={"/qlementine-icons_task-16.svg"} />
                                    <div className="flex flex-col min-w-fit">
                                        <p className="text-white text capitalize">Completed Task</p>
                                        <p className="text-[#c3c3c3] text-xs capitalize">{ entry.value }</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-center w-full pr-4">
                                        <p className="text-dao-green text-sm w-full text-right">+{ entry.points } Points</p>
                                    </div>
                                </div>
                            )
                        })}
                        </section>
                        :<section className="flex flex-col gap-4 blur-xs">
                            { [1,2,3].map((entry, key) => {
                                return (
                                    <div key={key} className="flex gap-2 items-center bg-white/5 rounded-xl">
                                        <AngleCard icon={"/qlementine-icons_task-16.svg"} />
                                        <div className="flex flex-col min-w-fit">
                                            <p className="text-white text">Completed Task</p>
                                            <p className="text-[#c3c3c3] text-xs">Follow MEMO on Twitter </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <Image src={"material-symbols-light_lock-sharp.svg"} width={24} height={24} alt="" />
                                            <p className="text-dao-green text-sm w-full text-right">+10 Points</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    }
                </section>
            </>: <LoadScreen /> }

            <Footer active={"home"} />
        </>
    )
}