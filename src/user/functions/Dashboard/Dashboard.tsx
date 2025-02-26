import React, { useEffect, useState } from "react";
import { Troubleshoot } from "@mui/icons-material";
import { FunctionInterface } from "../../components/GuildSettingsGrid";
import CpuGraph from "./CpuRamGraph";
import CpuGraphChart from "./ThreadMemoryChart";
import { DataPoint } from "./DataPoint";
import KamibotCount from "./OnlineCount";
import VoiceCount from "./VoiceCount";

const intervalTime = 500;
const dataWindowSize = 60;

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [totalMemory, setTotalMemory] = useState<number>(2048);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/kamibotStatus?json=true");
        const responseData = await response.json();
        setTotalMemory(responseData.totalMemory);
        const currentData: DataPoint = { ...responseData };
        const currentDate = new Date(currentData.currentTime);

        setData((prevData) => {
          if (prevData.length === 0) {
            const virtualData: DataPoint[] = [];
            for (let i = 0; i < dataWindowSize; i++) {
              const pastTime = new Date(
                currentDate.getTime() - ((dataWindowSize - 1) - i) * intervalTime
              ).toISOString();
              virtualData.push({ ...currentData, currentTime: pastTime });
            }
            return virtualData;
          } else {
            const updatedData = [...prevData, currentData];
            return updatedData.length >= 1000 ? updatedData.slice(-100) : updatedData;
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const timer = setInterval(fetchData, intervalTime);
    return () => clearInterval(timer);
  }, []);

  // 가장 최근 업데이트된 데이터를 전달합니다.
  const latestData = data[data.length - 1];

  return (
    <>
      <KamibotCount data={latestData} />
      <VoiceCount data={latestData} />
      <CpuGraph data={latestData} />
      <CpuGraphChart data={data} totalMemory={totalMemory} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
};

const body = <Dashboard />;

const functionInfo: FunctionInterface = {
  icon: <Troubleshoot />,
  title: '대시보드 보기',
  description: '카미봇 상태 보기. 설정이 아니에요',
  url: 'dashboard',
  data: body,
  disabled: false
};

export default functionInfo;