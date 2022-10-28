import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import WagmiClient from "../common/wagmiConfig";
import { WagmiConfig } from "wagmi";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <WagmiConfig client={WagmiClient}>
                <Component {...pageProps} />
            </WagmiConfig>
        </ChakraProvider>
    );
}

export default MyApp;
