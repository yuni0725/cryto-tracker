import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;

  height: 86vh;
`;

const Title = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 400;

  margin-bottom: 30px;
`;

const CoinCard = styled.div`
  background-color: ${(props) => props.theme.lightBgColor};
  color: ${(props) => props.theme.textColor};
  width: 300px;
  height: 100px;

  border-radius: 20px;

  display: flex;
  align-items: center;

  margin: 10px 0px;

  padding: 10px;

  &:hover {
    opacity: 0.8;
    color: ${(props) => props.theme.lightAccentColor};
  }

  transition: 0.1s;
`;

const Coins = styled.ul`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Home() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });
  const coins = data?.slice(0, 100);

  return (
    <Wrapper>
      <Title>Coin Lists</Title>
      <Coins>
        {isLoading && data
          ? "Loading..."
          : coins?.map((coin) => (
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <CoinCard key={coin.id}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  ></Img>
                  <span>{`${coin.name}   →`}</span>
                </CoinCard>
              </Link>
            ))}
      </Coins>
    </Wrapper>
  );
}

export default Home;
