import { useQuery, UseQueryOptions } from 'react-query';
import QUERY_KEYS from 'constants/queryKeys';
import { bigNumberFormatter } from 'utils/formatters/ethers';
import networkConnector from 'utils/networkConnector';
import { NetworkId } from 'types/network';
import { MarketsParameters } from 'types/markets';
import { MAXIMUM_INPUT_CHARACTERS, MAXIMUM_POSITIONS, MAXIMUM_TAGS, MINIMUM_TICKET_PRICE } from 'constants/markets';

// we need buffer because of contract handling of strings
const INPUT_LENGTH_MULTIPLIER = 1.1;
const POSITION_LENGTH_MULTIPLIER = 1.2;

const useMarketsParametersQuery = (networkId: NetworkId, options?: UseQueryOptions<MarketsParameters>) => {
    return useQuery<MarketsParameters>(
        QUERY_KEYS.MarketsParameters(networkId),
        async () => {
            const marketsParameters: MarketsParameters = {
                fixedBondAmount: 0,
                maximumPositionsAllowed: MAXIMUM_POSITIONS,
                minimumPositioningDuration: 0,
                creatorPercentage: 0,
                resolverPercentage: 0,
                safeBoxPercentage: 0,
                withdrawalPercentage: 0,
                disputePrice: 0,
                paymentToken: '',
                creationRestrictedToOwner: false,
                owner: '',
                maxNumberOfTags: MAXIMUM_TAGS,
                minFixedTicketPrice: MINIMUM_TICKET_PRICE,
                disputeStringLengthLimit: MAXIMUM_INPUT_CHARACTERS,
                marketQuestionStringLimit: MAXIMUM_INPUT_CHARACTERS,
                marketSourceStringLimit: MAXIMUM_INPUT_CHARACTERS,
                marketPositionStringLimit: MAXIMUM_INPUT_CHARACTERS,
            };
            const marketManagerContract = networkConnector.marketManagerContract;
            if (marketManagerContract) {
                const [
                    fixedBondAmount,
                    maximumPositionsAllowed,
                    minimumPositioningDuration,
                    creatorPercentage,
                    resolverPercentage,
                    safeBoxPercentage,
                    withdrawalPercentage,
                    disputePrice,
                    paymentToken,
                    creationRestrictedToOwner,
                    owner,
                    maxNumberOfTags,
                    minFixedTicketPrice,
                    disputeStringLengthLimit,
                    marketQuestionStringLimit,
                    marketSourceStringLimit,
                    marketPositionStringLimit,
                ] = await Promise.all([
                    marketManagerContract.fixedBondAmount(),
                    marketManagerContract.maximumPositionsAllowed(),
                    marketManagerContract.minimumPositioningDuration(),
                    marketManagerContract.creatorPercentage(),
                    marketManagerContract.resolverPercentage(),
                    marketManagerContract.safeBoxPercentage(),
                    marketManagerContract.withdrawalPercentage(),
                    marketManagerContract.disputePrice(),
                    marketManagerContract.paymentToken(),
                    marketManagerContract.creationRestrictedToOwner(),
                    marketManagerContract.owner(),
                    marketManagerContract.maxNumberOfTags(),
                    marketManagerContract.minFixedTicketPrice(),
                    marketManagerContract.disputeStringLengthLimit(),
                    marketManagerContract.marketQuestionStringLimit(),
                    marketManagerContract.marketSourceStringLimit(),
                    marketManagerContract.marketPositionStringLimit(),
                ]);

                marketsParameters.fixedBondAmount = bigNumberFormatter(fixedBondAmount);
                marketsParameters.maximumPositionsAllowed = Number(maximumPositionsAllowed);
                marketsParameters.minimumPositioningDuration = Number(minimumPositioningDuration);
                marketsParameters.creatorPercentage = Number(creatorPercentage);
                marketsParameters.resolverPercentage = Number(resolverPercentage);
                marketsParameters.safeBoxPercentage = Number(safeBoxPercentage);
                marketsParameters.withdrawalPercentage = Number(withdrawalPercentage);
                marketsParameters.disputePrice = bigNumberFormatter(disputePrice);
                marketsParameters.paymentToken = paymentToken;
                marketsParameters.creationRestrictedToOwner = creationRestrictedToOwner;
                marketsParameters.owner = owner;
                marketsParameters.maxNumberOfTags = Number(maxNumberOfTags);
                marketsParameters.minFixedTicketPrice = bigNumberFormatter(minFixedTicketPrice);
                marketsParameters.disputeStringLengthLimit = Math.round(
                    Number(disputeStringLengthLimit) / INPUT_LENGTH_MULTIPLIER
                );
                marketsParameters.marketQuestionStringLimit = Math.round(
                    Number(marketQuestionStringLimit) / INPUT_LENGTH_MULTIPLIER
                );
                marketsParameters.marketSourceStringLimit = Math.round(
                    Number(marketSourceStringLimit) / INPUT_LENGTH_MULTIPLIER
                );
                marketsParameters.marketPositionStringLimit = Math.round(
                    Number(marketPositionStringLimit) / POSITION_LENGTH_MULTIPLIER
                );
            }

            return marketsParameters;
        },
        {
            refetchInterval: 5000,
            ...options,
        }
    );
};

export default useMarketsParametersQuery;
