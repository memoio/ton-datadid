import Image from "next/image";
import Link from "next/link";

export function CreateDidCard(props) {
    return (
        <Link href={ props.url } className="border border-solid border-dao-green rounded-xl p-2">
            <div className="bg-dao-green/30 flex flex-col gap-2 rounded-[8px] p-2">
                <Image src={props.icon} width={20} height={20} alt="icon" />
                <p className="nunito capitalize text-xs font-semibold">{props.text}</p>
            </div>
        </Link>
    )
}