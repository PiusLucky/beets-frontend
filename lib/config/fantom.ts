import { NetworkConfig } from '~/lib/config/network-config-type';
import { AddressZero } from '@ethersproject/constants';

export const fantomNetworkConfig: NetworkConfig = {
    appName: 'Beethoven X',
    chainId: '250',
    networkName: 'Fantom Opera',
    networkShortName: 'Fantom',
    etherscanName: 'FTM Scan',
    etherscanUrl: 'https://ftmscan.com',
    testnet: false,
    eth: {
        name: 'Fantom',
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        symbol: 'FTM',
        decimals: 18,
        iconUrl: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png',
    },
    wethAddress: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    wethAddressFormatted: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    coingecko: {
        nativeAssetId: 'fantom',
        platformId: 'fantom',
    },
    rpcUrl: 'https://rpc.ftm.tools',
    //rpcUrl: 'https://rpc.ankr.com/fantom',
    multicall: '0x66335d7ad8011f6aa3f48aadcb523b62b38ed961',
    beets: {
        address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
    },
    fbeets: {
        address: '0xfcef8a994209d6916eb2c86cdd2afd60aa6f54b1',
        farmId: '22',
        poolId: '0xcde5a11a4acb4ee4c805352cec57e236bdbc3837000200000000000000000019',
    },
    balancer: {
        vault: '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce',
        batchRelayer: '0xC852F984CA3310AFc596adeB17EfcB0542646920',
        composableStableFactory: '0xf145cafb67081895ee80eb7c04a30cf87f07b745',
        weightedPoolV2Factory: '0x8ea1c497c16726e097f62c8c9fbd944143f27090',
        linearFactories: {
            erc4626: [],
            reaper: ['0xd448c4156b8de31e56fdfc071c8d96459bb28119'],
        },
        linearRebalancers: {},
    },
    beetsPoolOwnerAddress: '0xcd983793adb846dce4830c22f30c7ef0c864a776',
    masterChefContractAddress: '0x8166994d9ebBe5829EC86Bd81258149B87faCfd3',
    defaultTokenIn: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
    defaultTokenOut: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
    farmTypeName: 'farm',
    additionalLinks: [
        {
            title: 'Vote',
            url: 'https://snapshot.org/#/beets.eth',
        },
        {
            title: 'Analytics',
            url: 'https://info.beets.fi',
        },
        {
            title: 'Docs & Help',
            url: 'https://docs.beets.fi',
        },
        {
            title: 'Github',
            url: 'https://github.com/beethovenxfi',
        },
        {
            title: 'Twitter',
            url: 'https://twitter.com/beethoven_x',
        },
        {
            title: 'Medium',
            url: 'https://beethovenxio.medium.com/',
        },
        {
            title: 'Discord',
            url: 'https://discord.gg/jedS4zGk28',
        },
        {
            title: 'Olympus Bonds',
            url: 'https://pro.olympusdao.finance/#/bond',
        },
        {
            title: 'Multichain Bridge',
            subTitle: 'ETH / AVAX / BSC / MATIC',
            url: 'https://app.multichain.org/#/router',
        },
        {
            title: 'AllBridge',
            subTitle: 'SOL / MATIC / CELO',
            url: 'https://app.allbridge.io/bridge?from=SOL&to=FTM&asset=SOL',
        },
    ],
    priceImpact: {
        invest: {
            noticeable: 0.005,
            high: 0.01,
        },
        trade: {
            noticeable: 0.01,
            high: 0.05,
        },
        withdraw: {
            noticeable: 0.005,
            high: 0.01,
        },
    },
    gauge: {
        rewardHelperAddress: AddressZero,
    },
    createPoolUrl: 'https://v1.beets.fi/#/pool-create',
    launchUrl: 'https://v1.beets.fi/#/launch',
    stakeUrl: 'https://v1.beets.fi/#/stake',
};
