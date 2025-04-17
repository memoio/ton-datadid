import Image from "next/image"

export function ProfileCard ({ title, text, pcFunc}) {
    let a = ''
    let b = ''

    if (text) {
        a = text.slice(0, 4)
        b = text.slice(-4, text.length)
    }

    const copyToClipboard = (text) => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
              .then(() => pcFunc('flex'))
              .catch(() => copyToClipboardFallback());
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            pcFunc('flex');
        }
    };

    return (
        <section className="bg-white/5 rounded-xl w-full p-4 flex justify-between items-center">
            <div className="flex flex-col w-4/5">
                <p className="text-nowrap">{ title }</p>
                <p className="text-dao-green break-all">{ a }...{ b }</p>
            </div>
            <button onClick={ () => copyToClipboard(text) }><Image src={"copy-icon.svg"} className="min-w-4" width={11} height={12.22} alt="" /></button>
        </section>
    )
}