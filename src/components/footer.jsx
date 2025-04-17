import Image from "next/image";
import Link from "next/link";

export function Footer ( props ) {
    return (
        <footer className="grid grid-cols-5 px-4 py-2 bg-[#0B1913] rounded-[55px] fixed bottom-4 inset-x-4 z-40 gap-4 items-end">
            { props.active == 'home'? <FooterKey title={"Home"} image={"material-symbols_dashboard-outline-white.svg"} active={true} />: <FooterKey title={"Home"} image={"material-symbols_dashboard-outline.svg"} url={"/home"} active={false} /> } 
            
            { props.active == 'friends'? <FooterKey title={"Friends"} image={"formkit_people-white.svg"} active={true} />: <FooterKey title={"Friends"} image={"formkit_people.svg"} url={"/friends"} active={false} /> }
            { props.active == 'rankings'? <FooterKey title={"Rankings"} image={"Group 34646.svg"} active={true} />: <FooterKey title={"Rankings"} image={"Group 34646.svg"} url={"/rankings"} active={false} /> } 
            { props.active == 'earn'? <FooterKey title={"Earn"} image={"/Group money-bag-white.svg"} active={true} />: <FooterKey title={"Earn"} image={"Group money-bag.svg"} url={"/earn"} active={false} /> }
            { props.active == 'profile'? <FooterKey title={"Profile"} image={"pajamas_profile-white.svg"} active={true} />: <FooterKey title={"Profile"} image={"pajamas_profile.svg"} url={"/profile"} active={false} /> }
        </footer>
    )
}

export function FooterKey ( props ) {
    let width = 21;
    let height = 21;
    if ( props.title === "Daily Check In" ) {
        width = 33
        height = 34
    } if ( props.title === "Friends" ) {
        width = 29
        height = 30
    }

    return (
        <Link href={ props.url? props.url: '#' }>
            <div className="flex flex-col gap-1 items-center relative">
                { props.title == 'Rankings'?
                    <Image src={ props.image} className="absolute top-auto -translate-y-16 bottom-auto size-16 mx-auto inset-x-0" width={width} height={height} alt="" />:
                    <Image src={ props.image} className="h-6" width={width} height={height} alt="" />
                }

                { props.active?
                    <p className="text-white w-3/4 mx-auto text-[10px] text-center">{ props.title }</p>
                :
                    <p className="text-[#5e5e5e] w-3/4 mx-auto text-[10px] text-center">{ props.title }</p>
                }
            </div>
        </Link>
    )
}