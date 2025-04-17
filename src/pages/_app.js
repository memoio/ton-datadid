import "@/styles/globals.css";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function App({ Component, pageProps }) {
    return (
        <TonConnectUIProvider manifestUrl="https://datadid-project.vercel.app/api/tonconnect-manifest">
            <Component {...pageProps} />
        </TonConnectUIProvider>
    )
}