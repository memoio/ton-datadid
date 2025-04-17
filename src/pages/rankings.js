import { LoadScreen, PointsCard } from "@/components/accessories";
import { Footer } from "@/components/footer";
import { LeaderboardCard } from "@/components/leaderboard-card";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Leaderboard () {
    const weekly = useRef(null)
    const monthly = useRef(null)
    const all_time = useRef(null)
    const userFriendlyAddress = useTonAddress();
    
    const [gamePoints, setGamePoints] = useState(0)
    const [isDid, setIsDid] = useState(false)
    const [rank, setRank] = useState(1)
    const [total, setTotal] = useState(1)

    const [topThree, setTopThree] = useState([])
    const [others, setOthers] = useState([])

    const [you, setYou] = useState('border-4 border-solid border-dao-green')

    const shortenerFunc = (name) => {
        let a = ''
        let b = ''

        if (name) {
            a = name.slice(0, 4)
            b = name.slice(-4, name.length)
        }

        return `${a}...${b}`
    }

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
                setIsDid(true)
                setRank(data.data.rank)
            }
        }

        getPoints()
    }, [userFriendlyAddress])

    useEffect(() => {
        const getUsersData = async() => {
            const getUserData_fetch = await fetch('https://data-be.metamemo.one/game/rank/list', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            let data = await getUserData_fetch.json()
            if ( data.result == 1 ) {
                data = data.data
                setTopThree(() => [...data.slice(0,3)])
                setOthers(() => [...data.slice(3,50)])
            }
        }

        getUsersData()
    }, [rank])

    const leaderboard_click = filter => {
        weekly.current.classList.add('border-y-0')
        weekly.current.classList.remove('border-y-2')
        monthly.current.classList.add('border-y-0')
        monthly.current.classList.remove('border-y-2')
        all_time.current.classList.add('border-y-0')
        all_time.current.classList.remove('border-y-2')

        if (filter == 'weekly') { weekly.current.classList.add('border-y-2') }
        if (filter == 'monthly') { monthly.current.classList.add('border-y-2') }
        if (filter == 'all_time') { all_time.current.classList.add('border-y-2') }
    }
    return (
        <>
            { isDid?
            <div className="flex flex-col gap-4 text-center justify-center p-8 nunito pb-32 relative w-full">
                <div className="relative w-full h-full mx-auto mt-6">
                    <Image src={"/Ellipse 213.png"} className="aspect-[98/158] w-60 absolute -top-28 inset-x-0 mx-auto" width={98} height={158} alt="" />
                    <Image src={"/Group 34636.png"} className="aspect-[180/162] w-60 absolute -top-12 inset-x-0 mx-auto" width={180} height={162} alt="" />
                </div>

                <div className="grid grid-cols-3 gap-4 relative">
                    <Image src={"Group 2.svg"} className="absolute -top-10 mx-auto inset-x-0" width={46.44} height={36.63} alt="" />
                    <div className="text-center">
                        <div className="bg-gradient-to-b from-[#3E4ECA] to-[#231450] rounded-full p-0.25 scale-75"><Image src={"/Ellipse 2.png"} className="rounded-full w-full" width={68.34} height={68.34} alt="" /></div>
                        <p className="">{ shortenerFunc(topThree[1].address) }</p>
                        <p className="flex gap-2 text-[#FFCB00] text-xs justify-center"><Image src={"coin (1) 1h.svg"} className="min-w-fit" width={12} height={12} alt="" /> { topThree[1].points }</p>
                    </div>
                    <div>
                        <div className="bg-gradient-to-b from-[#FEC63C] to-[#C85929] rounded-full p-0.25"><Image src={"/Ellipse 1.png"} className="rounded-full" width={105.59} height={105.59} alt="" /></div>
                        <p className="">{ shortenerFunc(topThree[0].address) }</p>
                        <p className="flex gap-2 text-[#FFCB00] text-xs justify-center"><Image src={"coin (1) 1h.svg"} className="min-w-fit" width={12} height={12} alt="" /> { topThree[0].points }</p>
                    </div>
                    <div>
                        <div className="bg-gradient-to-b from-[#3E4ECA] to-[#231450] rounded-full p-0.25 scale-75"><Image src={"/Ellipse 3.png"} className="rounded-full w-full" width={68.34} height={68.34} alt="" /></div>
                        <p className="">{ shortenerFunc(topThree[2].address) }</p>
                        <p className="flex gap-2 text-[#FFCB00] text-xs justify-center"><Image src={"coin (1) 1h.svg"} className="min-w-fit" width={12} height={12} alt="" /> { topThree[2].points }</p>
                    </div>
                </div>

                <section className="w-full flex flex-col gap-4 mt-12">
                    <h2 className="grobold text-dao-green text-2xl">Leaderboard</h2>
                    
                    <section className="grid grid-cols-2 w-full gap-4">
                        <PointsCard title={"points Earned"} text={1002} icon={"/coin (1) 1.png"} />
                        <PointsCard title={"active referrals"} text={5} icon={"share_48dp_05F292_FILL1_wght400_GRAD0_opsz48.svg"} />
                    </section>
                </section>
                <section className="grid grid-cols-3 p-2 rounded-lg bg-[#0B1611]">
                    <button onClick={ () => leaderboard_click('weekly') } ref={weekly} className="border-y-0 border-solid border-dao-green rounded-full py-1.5 text-sm">Weekly</button>
                    <button onClick={ () => leaderboard_click('monthly') } ref={monthly} className="border-y-2 border-solid border-dao-green rounded-full py-1.5 text-sm">Monthly</button>
                    <button onClick={ () => leaderboard_click('all_time') } ref={all_time} className="border-y-0 border-solid border-dao-green rounded-full py-1.5 text-sm">All Time</button>
                </section>
                
                <section className="flex flex-col gap-4">
                    
                    { others.map((entry, key) => {
                        return (
                            <>
                            { entry.address == userFriendlyAddress?
                                <LeaderboardCard name={"You"} image={"/Ellipse 2-a.png"} amount={ entry.points } count={rank} you={"border-2 bg-dao-green/20"} />:
                                <LeaderboardCard key={key} name={entry.address} image={"/Ellipse 56.png"} amount={ entry.points } count={key+4} status={"active"} />
                            }
                            </>
                        )
                    })}
                </section>
            </div>:<LoadScreen /> }

            <Footer active={"rankings"} />
        </>
    )
}