import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchPriceChart } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ICoinId {
  coinId: string;
}

interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ICoinId>();
  const { isLoading, data } = useQuery<IData[]>({
    queryKey: ["ohlcv"],
    queryFn: () => fetchPriceChart(coinId),
  });
  return (
    <div>
      {isLoading ? (
        "Loading Charts..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map(
                (price) =>
                  new Date(Number(price.time_close) * 1000)
                    .toISOString()
                    .split("T")[0]
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#2ecc71"], stops: [0, 100] },
              colors: ["#3498db"],
            },
          }}
        ></ApexCharts>
      )}
    </div>
  );
}

export default Chart;
