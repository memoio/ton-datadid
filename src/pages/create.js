import { CreateCards, LeftRight, LoadScreen } from "@/components/accessories";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useRouter } from "next/router";

export default function Create() {
    const router = useRouter()
    const userFriendlyAddress = useTonAddress();
    const [sig, setSig] = useState(null)
    const [isDid, setIsDid] = useState(false)
    const [id, setId] = useState(123456)


    //Redirect if no TON
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
                setId(responseDID.number)
                setIsDid(true)
            }
        }
            
        if ( userFriendlyAddress ) {
            fetchGroup()
        } else {
            //router.push('/connect-wallet')
        }

    }, [userFriendlyAddress, did])


    //Create SIG Message
    useEffect(() => {
        const createSigMessage = async () => {
            const createSig = await fetch(`https://didapi.memolabs.org/did/createsigmsg?address=${userFriendlyAddress}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await createSig.json()
            setSig(data.msg)
        }

        createSigMessage()
    }, [userFriendlyAddress,])
    

    /* Create DID
    useEffect(() => {
        const createSigMessage = async () => {
            const createDID = await fetch('https://didapi.memolabs.org/did/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {"sig": sig, "address": userFriendlyAddress},
            })

            const data = await checkDID.json()
            //setSig(data.msg)
        }

        createSigMessage()
    }, [sig,])
    */

    const createDid = async () => {
        const createAccount = await fetch('https://didapi.memolabs.org/did/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"sig": sig, "address": userFriendlyAddress}),
        })

        const data = await createAccount.json()
        setDid(data.did)
    }



    const didMemo = useRef(null)
    const startDiv = useRef(null)
    const screenOverlay = useRef(null)

    const startButtonAction = () => {
        createDid()
        //Toggle off after did created and display next block
        //screenOverlay.current.classList.toggle('hidden')
        //screenOverlay.current.classList.toggle('flex')

        didMemo.current.classList.toggle('hidden')
        didMemo.current.classList.toggle('flex')

        startDiv.current.classList.toggle('hidden')
        startDiv.current.classList.toggle('block')
    }

    return (
        <>  
            { isDid?
            <>
                <div ref={ screenOverlay } className="fixed z-50 inset-0 hidden justify-center items-center bg-black/50 p-8">
                    <div className="border border-solid border-dao-green p-2 rounded-xl w-full">
                        <div className="rounded-xl p-8 bg-[#025533] flex flex-col items-center justify-center gap-4">
                            <Image src={"icon-park_loading-one.svg"} className="animate-spin spee" width={24} height={24} alt="" />
                            <p className="nunito">DID is being created...</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 flex flex-col gap-6 mb-24">
                    <h1 className="text-white grobold text-3xl text-center mt-6">Data <span className="grobold text-dao-green">DID</span></h1>
                    <div className=" bg-[#0B1611] flex gap-4 p-4 rounded-[20px] relative">                    
                        <section className="flex flex-col gap-2">
                            <h2 className="capitalize text-2xl font-bold">data DID</h2>
                            <p className="text-sm">SELF-MANAGE DIGITAL IDENTITY AND PROTECT PRIVACY. OWN, MANAGE, AND MONETIZE YOUR DATA.</p>
                        </section>

                        <section className="flex flex-col gap-4">
                            <Image src={"Group 34517.svg"} className="min-w-[34px]" width={34} height={33} alt=""/>
                            <Image src={"Group 34518.svg"} className="min-w-[34px]" width={34} height={33} alt=""/>
                            <Image src={"Group 34519.svg"} className="min-w-[34px]" width={34} height={33} alt=""/>
                            <Image src={"Group 34520.svg"} className="min-w-[34px]" width={34} height={33} alt=""/>
                            <Image src={"Group 34521.svg"} className="min-w-[34px]" width={34} height={33} alt=""/>
                        </section>
                    </div>

                    <div ref={ startDiv } className="flex flex-col gap-8">
                        <div className="grid grid-cols-2 gap-4">
                            <CreateCards title={"Network"} text={"Polygon"} />
                            <CreateCards title={"Mint To"} text={"0x123...789"} />
                            <CreateCards title={"Pay With"} text={"0.00 MEMO"} />    
                            <CreateCards title={"Total"} text={"0.00 MEMO + GAS FEE"} />    
                        </div>

                        { sig &&
                        <div className="flex flex-col gap-8 text-center">
                            <button onClick={ startButtonAction } className="border-y-2 border-solid border-dao-green px-24 py-2 rounded-full w-fit mx-auto">Create</button>
                            <p className="">At this stage, the cost of creating DID is borne by MEMO.</p>
                        </div> }
                    </div>

                    <section ref={ didMemo } className="hidden flex-col gap-4">
                        <div className="nunito bg-[#0B1611] rounded-xl p-4">
                            <p className="font-bold text-dao-green">NO. { id }</p>
                            <p className="font-light break-all">{ did }</p>
                        </div>
                        <button onClick={ () => router.push('/home') } className="border-y-2 border-solid border-dao-green px-24 py-2 rounded-full w-full mx-auto">Ok</button>
                    </section>
                    
                </div>
            </>: <LoadScreen /> }
            <Footer active={"home"} />
        </>
    )
}