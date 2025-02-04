import { Alert, Box, Button, Flex, Grid, GridItem, HStack, Skeleton, Text, AlertIcon } from '@chakra-ui/react';
import { BeetsBox } from '~/components/box/BeetsBox';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount, tokenGetAmountForAddress } from '~/lib/services/token/token-util';
import TokenAvatar from '~/components/token/TokenAvatar';
import { useGetTokens } from '~/lib/global/useToken';
import { usePoolUserTokenBalancesInWallet } from '~/modules/pool/lib/usePoolUserTokenBalancesInWallet';
import { useInvest } from '~/modules/pool/invest/lib/useInvest';
import { usePoolGetMaxProportionalInvestmentAmount } from '~/modules/pool/invest/lib/usePoolGetMaxProportionalInvestmentAmount';
import { CardRow } from '~/components/card/CardRow';
import { PoolInvestStablePoolDescription } from '~/modules/pool/invest/components/PoolInvestStablePoolDescription';
import { PoolInvestWeightedPoolDescription } from '~/modules/pool/invest/components/PoolInvestWeightedPoolDescription';
import { usePool } from '~/modules/pool/lib/usePool';

interface Props {
    onShowProportional(): void;
    onShowCustom(): void;
}

export function PoolInvestTypeChoice({ onShowProportional, onShowCustom }: Props) {
    const { pool, poolService, isStablePool } = usePool();
    const { priceForAmount } = useGetTokens();
    const { userPoolTokenBalances, investableAmount } = usePoolUserTokenBalancesInWallet();
    const { canInvestProportionally } = useInvest();
    const { data, isLoading } = usePoolGetMaxProportionalInvestmentAmount();
    const proportionalSupported =
        poolService.joinGetProportionalSuggestionForFixedAmount && pool.investConfig.proportionalEnabled;

    return (
        <Box>
            <Grid mt="4" mb="6" gap="8" templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 1fr' }}>
                <GridItem>
                    <BeetsBox p="2" mb="6">
                        <Flex fontSize="lg" fontWeight="semibold" mb="1">
                            <Text flex="1">You can invest</Text>
                            <Text>{numberFormatUSDValue(investableAmount)}</Text>
                        </Flex>

                        {proportionalSupported && (
                            <CardRow alignItems="center" mt="4" mb="0">
                                <Text flex="1">Max proportional</Text>
                                {typeof data?.maxAmount === 'number' && !isLoading ? (
                                    <Text>{numberFormatUSDValue(data.maxAmount)}</Text>
                                ) : (
                                    <Skeleton height="20px" width="80px" />
                                )}
                            </CardRow>
                        )}
                    </BeetsBox>
                    <BeetsBox p="2">
                        <Text fontSize="lg" fontWeight="semibold" mb="4">
                            Pool tokens in my wallet
                        </Text>
                        {pool.investConfig.options.map((option, index) => {
                            const lastOption = pool.investConfig.options.length - 1 === index;

                            return (
                                <Box key={index}>
                                    {option.tokenOptions.map((tokenOption, tokenIndex) => {
                                        const lastTokenOption = option.tokenOptions.length - 1 === tokenIndex;
                                        const userBalance = tokenGetAmountForAddress(
                                            tokenOption.address,
                                            userPoolTokenBalances,
                                        );

                                        return (
                                            <CardRow
                                                key={tokenOption.address}
                                                mb={lastOption && lastTokenOption ? '0' : '1'}
                                                alignItems="center"
                                            >
                                                <HStack spacing="none" flex="1">
                                                    <TokenAvatar size="xs" address={tokenOption.address} />
                                                    <Text paddingLeft="1.5" fontSize="lg">
                                                        {tokenOption.symbol}
                                                    </Text>
                                                </HStack>
                                                <Box>
                                                    <Box textAlign="right" fontSize="lg">
                                                        {tokenFormatAmount(userBalance)}
                                                    </Box>
                                                    <Box textAlign="right" fontSize="sm" color="gray.200">
                                                        {numberFormatUSDValue(
                                                            priceForAmount({
                                                                address: tokenOption.address,
                                                                amount: userBalance,
                                                            }),
                                                        )}
                                                    </Box>
                                                </Box>
                                            </CardRow>
                                        );
                                    })}
                                </Box>
                            );
                        })}
                    </BeetsBox>
                </GridItem>
                <GridItem>
                    <BeetsBox px="4" py="2">
                        {isStablePool ? <PoolInvestStablePoolDescription /> : <PoolInvestWeightedPoolDescription />}
                    </BeetsBox>
                    {!isStablePool && !canInvestProportionally && (
                        <Alert status="warning" mt="4">
                            <AlertIcon />
                            Investing proportionally is only possible when you have all pool tokens in your wallet.
                        </Alert>
                    )}
                </GridItem>
            </Grid>

            {isStablePool ? (
                <>
                    <Button
                        width="full"
                        variant="primary"
                        isDisabled={investableAmount === 0}
                        onClick={onShowCustom}
                        mb={proportionalSupported ? '3' : '0'}
                    >
                        {proportionalSupported ? 'Customize my investment' : 'Invest'}
                    </Button>
                    {pool.investConfig.proportionalEnabled && (
                        <Button
                            variant="secondary"
                            width="full"
                            isDisabled={!canInvestProportionally}
                            onClick={onShowProportional}
                        >
                            Invest proportionally
                        </Button>
                    )}
                </>
            ) : (
                <>
                    {proportionalSupported && (
                        <Button
                            variant="primary"
                            width="full"
                            mb="3"
                            isDisabled={!canInvestProportionally}
                            onClick={onShowProportional}
                        >
                            Invest proportionally
                        </Button>
                    )}
                    <Button
                        width="full"
                        variant={canInvestProportionally ? 'secondary' : 'primary'}
                        isDisabled={investableAmount === 0}
                        onClick={onShowCustom}
                    >
                        {proportionalSupported ? 'Customize my investment' : 'Invest'}
                    </Button>
                </>
            )}
        </Box>
    );
}
