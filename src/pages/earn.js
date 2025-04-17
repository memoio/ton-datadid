import { LoadScreen, PointsCard, PointsCardReverse, TodaysTask } from "@/components/accessories";
import AngleCard, { AngleCardEarn } from "@/components/angle-card";
import { Footer } from "@/components/footer";
import { LeaderboardCard } from "@/components/leaderboard-card";
import { useTonAddress } from "@tonconnect/ui-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Earn () {
    const TON_DID_WEB = "https://t.me/tondid_bot/datadid"
    const [gamePoints, setGamePoints] = useState(0)
    const [isDid, setIsDid] = useState(false)

    const userInfo = 'a'
    const inviteCode = 'a'
    
    const userFriendlyAddress = useTonAddress()
    const currentUrl = encodeURIComponent(`${TON_DID_WEB}?startapp=${userInfo?.inviteCode}`);

    function setWithExpiry(key, value, ttl) {
        const now = new Date();
      
        const item = {
            value: value,
            addedAt: now.getTime(),
            expiry: now.getTime() + ttl
        };
      
        localStorage.setItem(key, JSON.stringify(item));
    }

    function getWithExpiry(key) {
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

    const tweetText = encodeURIComponent(`📈I found a platform that can own, manage and monetize your data @MemoLabsOrg!

        🚀Currently all users can participate, and you can easily get points rewards by completing tasks, and you can also redeem more value!
        
        ➡️Experience now ${currentUrl}
    `);
        
    const tgText = encodeURIComponent(`🎉 Welcome to the MEMO data ecosystem, a platform where you can own, manage and monetize your data! 💰
        
        🌟 You can easily earn points by completing tasks within the platform, and you can also unlock exclusive tasks with multiple partners to get points!
        ·Create DID 📝
        ·Link Social Media Accounts🔗
        ·Daily Check-in📅
        ·Joint Activities🤝
        ·Invite friends👫
        
        🚀 Click ${currentUrl} to start your data value-added journey!
    `);
        
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
            }
        }

        getPoints()
    }, [userFriendlyAddress])

    return (
        <> 
            { isDid?
            <div className="flex flex-col gap-4 text-center justify-center p-8 nunito pb-32 relative w-full">
                <Image src={"/money (1) 1.svg"} className="relative mx-auto mt-6" width={89} height={89} alt="" />

                <h1 className="grobold text-white text-3xl mt-12 capitalize"><span className="text-dao-green grobold">Earn More </span>Points</h1>
                <p className="">Complete today&apos;s task to collect your daily points and keep your streak alive.</p>
                
                <section className="flex flex-col gap-4 mt-6">
                    <h2 className="grobold text-left text-xl">Today&apos;s Task</h2>
                    <section className="flex flex-col gap-4">
                        <TodaysTask title={"Visit MEMO's Twitter page"} text={"20"} link={"https://x.com/MemoLabsOrg"} userFriendlyAddress={ userFriendlyAddress } actionId={10} visited={ getWithExpiry(10) } />
                        <TodaysTask title={"Share To TG"} text={"20"} link={`https://t.me/share/url?url=${currentUrl}&text=&${tgText}`} userFriendlyAddress={ userFriendlyAddress } actionId={11} visited={ getWithExpiry(11) } />
                        <TodaysTask title={"Share To discord"} text={"20"} link={"https://discord.com/invite/YG4Ydv2E7X"} userFriendlyAddress={ userFriendlyAddress } actionId={12} visited={ getWithExpiry(12) } />
                        <TodaysTask title={"Share To Twitter"} text={"20"} link={`https://twitter.com/intent/tweet?text=&${tweetText}`} userFriendlyAddress={ userFriendlyAddress } actionId={13} visited={ getWithExpiry(13) } />
                    </section>
                </section>

                <section className="grid grid-cols-2 w-full gap-4">
                    <PointsCard title={"Total Points"} text={`${ gamePoints } Points`} icon={"Clip path group-money-bag.svg"} />
                    { getWithExpiry(10) && getWithExpiry(11) && getWithExpiry(12) && getWithExpiry(13)? <PointsCardReverse title={"Task Status"} text={"Completed"} icon={"Vector-clipboard.svg"} />:
                    <PointsCardReverse title={"Task Status"} text={"Pending"} icon={"Vector-clipboard.svg"} /> }
                </section>


                <section className="flex flex-col gap-4 mt-6">
                    <h2 className="grobold text-left text-xl">Task Lists</h2>
                    <section className="flex flex-col gap-4">
                        <AngleCardEarn icon={"mdi_twitter.svg"} title={"Follow On Twitter"} text={50} link={"https://x.com/MemoLabsOrg"} actionId={20} userFriendlyAddress={userFriendlyAddress} />
                        <AngleCardEarn icon={"ic_baseline-discord.svg"} title={"Join TG channel"} text={50} link={`https://t.me/share/url?url=${currentUrl}&text=&${tgText}`} actionId={21} userFriendlyAddress={userFriendlyAddress} />
                        <AngleCardEarn icon={"ic_baseline-discord.svg"} title={"Join Discord"} text={50} link={"https://discord.com/invite/YG4Ydv2E7X"} actionId={22} userFriendlyAddress={userFriendlyAddress} />
                    </section>
                </section>

            </div>:<LoadScreen /> }

            <Footer active={"earn"} />
        </>
    )
}