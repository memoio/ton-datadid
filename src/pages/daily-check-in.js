import { Footer } from "@/components/footer";
import Link from "next/link";

export default function DailyCheckIn () {
    return (
        <>
            <div className="flex flex-col gap-4 text-center justify-center items-center p-8 nunito">
                <h1 className="paytone text-white text-3xl mt-4">Daily <span className="text-dao-green">Check-In</span></h1>
                <p className="">Complete today&apos;s task to collect your daily points and keep your streak alive.</p>

                <section className="w-full flex flex-col gap-4 my-4">
                    <h2 className="paytone text-2xl font-bold text-left">Today&apos;s Task</h2>
                    <div className="bg-[#025533] border-b-4 border-solid border-dao-green p-4 flex items-center justify-between rounded-xl">
                        <p className="font-medium text-sm">Visit MEMO&apos;s Twitter page </p>
                        <Link href={"#"} className="bg-dao-green rounded-full text-black py-1 px-6 text-sm">Visit</Link>
                    </div>

                    <section className="grid grid-cols-2 gap-4 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 w-8 mx-auto flex flex-col gap-2.5">
                            <hr className="rounded-full border-2 border-solid border-dao-green" />
                            <hr className="rounded-full border-2 border-solid border-dao-green" />
                        </div>

                        <div className="border border-solid border-dao-green rounded-xl p-2">
                            <div className="bg-[#025533]/70 p-2 flex flex-col gap-0 rounded-[6px] nunito font-semibold text-sm text-left">
                                <h3 className="">Total Points</h3>
                                <p className="text-dao-green">350 Points</p>
                            </div>
                        </div>
                        <div className="border border-solid border-dao-green rounded-xl p-2">
                            <div className="bg-[#025533]/70 p-2 flex flex-col gap-0 rounded-[6px] nunito font-semibold text-sm text-right">
                                <h3 className="">Task Status</h3>
                                <p className="text-dao-green">Pending</p>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="w-full flex flex-col gap-4">
                    <h2 className="paytone text-2xl text-left">Your Streak</h2>
                    <div className="relative rounded-sm px-2 pt-4 pb-0 w-full text-left">
                        <div className="absolute inset-0 border border-solid border-dao-green rounded-lg bottom-4"></div>
                        <div className="relative -top-6 nunito bg-[#024027] rounded-xl p-2">
                            <p className="font-bold nunito text-dao-green">3 days Streaks</p>
                            <p className="font-light text-sm">Check-in tomorrow for a bonus reward.(+10 Points)</p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer active={"daily-check-in"} />
        </>
    )
}