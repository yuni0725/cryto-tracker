import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;

  padding: 0px 20px;

  max-width: 480px;

  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 30px;

  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div<{ isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isDark ? "rgba(0, 0, 0, 0.5)" : props.theme.lightBgColor};
  padding: 10px 20px;
  border-radius: 10px;

  width: 100%;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;

  width: 100%;
`;
const Tab = styled.span<{ isActive: boolean; isDark: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isDark ? "rgba(0, 0, 0, 0.5)" : props.theme.lightBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IState {
  state: {
    name: string;
  };
}

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<{ coinId: string | undefined }>();
  const { state } = useLocation() as IState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: isInfoLoading, data: infoData } = useQuery<InfoData>({
    queryKey: ["coinInfo"],
    queryFn: () => fetchCoinInfo(coinId),
  });
  const { isLoading: isPriceLoading, data: priceData } = useQuery<PriceData>({
    queryKey: ["coinPrice"],
    queryFn: () => fetchCoinPrice(coinId),
  });
  const isLoading = isInfoLoading || isPriceLoading;
  return (
    <Wrapper>
      <Title>{state?.name || infoData?.name || "Loading"}</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Overview isDark={isDark}>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview isDark={isDark}>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isDark={isDark} isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isDark={isDark} isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId: coinId }}></Outlet>
        </>
      )}
    </Wrapper>
  );
}

export default Coin;
