import { Box, Flex, IconButton } from '@chakra-ui/react';
import { PoolListTabs } from '~/modules/pools/components/PoolListTabs';
import { PoolListSearch } from '~/modules/pools/components/PoolListSearch';
import { Filter } from 'react-feather';
import { PoolListTokenMultiSelect } from '~/modules/pools/components/PoolListTokenMultiSelect';
import { PoolListCategoryMultiSelect } from '~/modules/pools/components/PoolListCategoryMultiSelect';
import { PoolListAttributeMultiSelect } from '~/modules/pools/components/PoolListAttributeMultiSelect';
import { useBoolean } from '@chakra-ui/hooks';

export function PoolListTop() {
    const [filtersVisible, { toggle }] = useBoolean(false);

    return (
        <Box>
            <Flex pb={4}>
                <Flex flex={1}>
                    <PoolListTabs />
                    <IconButton
                        aria-label="filter-button"
                        icon={<Filter />}
                        ml={4}
                        onClick={toggle}
                        bgColor={filtersVisible ? 'beets.gray.100' : undefined}
                        _hover={{
                            bgColor: filtersVisible ? 'beets.gray.100' : undefined,
                        }}
                    />
                </Flex>
                <Box>
                    <PoolListSearch />
                </Box>
            </Flex>
            {filtersVisible ? (
                <Flex pt={2} pb={4} alignItems="center">
                    <Box flex={1} mr={2}>
                        <PoolListTokenMultiSelect />
                    </Box>
                    <Box flex={1} mx={2}>
                        <PoolListCategoryMultiSelect />
                    </Box>
                    <Box flex={1} ml={2}>
                        <PoolListAttributeMultiSelect />
                    </Box>
                </Flex>
            ) : null}
        </Box>
    );
}
