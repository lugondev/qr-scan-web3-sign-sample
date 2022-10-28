import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";


const chains = () => {
    return [
        {
            id: 97,
            name: "Binance Smart Chain Testnet",
            network: "bsc-testnet",
            nativeCurrency: {
                name: "BNB Testnet",
                symbol: "tBNB",
                decimals: 18,
            },
            rpcUrls: {
                default: "https://data-seed-prebsc-1-s1.binance.org:8545",
                public: "https://data-seed-prebsc-1-s1.binance.org:8545",
            },
            blockExplorers: {
                etherscan: {
                    name: "BSCscan",
                    url: "https://testnet.bscscan.com",
                },
                default: {
                    name: "BSCscan",
                    url: "https://testnet.bscscan.com",
                },
            },
            multicall: {
                address: "0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C",
                blockCreated: 10299530,
            },
            testnet: true,
        },
    ]
}

const { provider, webSocketProvider } = configureChains(
    chains(),
    [ publicProvider() ],
);

const WagmiClient = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains: chains() }),
        new WalletConnectConnector({
            chains: chains(),
            options: {
                qrcode: true,
            },
        }),
        new InjectedConnector({
            chains: chains(),
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
});

export default WagmiClient;
