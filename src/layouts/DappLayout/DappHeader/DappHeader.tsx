import GetUsd from 'components/GetUsd';
import Logo from 'components/Logo';
import Search from 'components/Search';
import WalletInfo from 'components/WalletInfo';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import useLocalStorage from 'hooks/useLocalStorage';
import React from 'react';
import { useSelector } from 'react-redux';
import { getNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivRowCentered } from 'styles/common';
import { NetworkIdByName } from 'utils/network';

type DappHeaderProps = {
    showSearch?: boolean;
};

const DappHeader: React.FC<DappHeaderProps> = ({ showSearch }) => {
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [marketSearch, setMarketSearch] = useLocalStorage(LOCAL_STORAGE_KEYS.FILTER_MARKET_SEARCH, '');

    return (
        <Container>
            <Logo />
            <RightContainer>
                {showSearch && <Search text={marketSearch} handleChange={setMarketSearch} />}
                {networkId === NetworkIdByName.OptimsimKovan && <GetUsd />}
                <WalletInfo />
            </RightContainer>
        </Container>
    );
};

const Container = styled(FlexDivRowCentered)`
    width: 100%;
    @media (max-width: 767px) {
        flex-direction: column;
    }
`;

const RightContainer = styled(FlexDivRowCentered)`
    @media (max-width: 767px) {
        flex-direction: column;
    }
    > div {
        :not(:last-child) {
            margin-right: 20px;
            @media (max-width: 767px) {
                margin-right: 0px;
                margin-bottom: 10px;
            }
        }
    }
`;

export default DappHeader;
