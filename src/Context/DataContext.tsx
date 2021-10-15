import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../services/api';

export interface ConfigProps {
  memoryProvisioned: number;
  cpuProvisioned: number;
  totalDiskGB: number;
}

export interface DataJsonProps {
  id_vm: number;
  ip: number;
  configuracao: ConfigProps;
  selected: boolean;
  hostname: string;
}



interface SummaryProps {
  data: {
    memory: number;
    vcpus: number;
    disk: number;
    quantity: number;
  }
}

type DataProviderProps = {
  children: ReactNode;
}

interface DataContextProps {
  dataJson: DataJsonProps[] | undefined;
  CalcSummary: (itemId: number) => Promise<void>;
  summaryData: SummaryProps;
  OrderColumnService: (type: string) => void;
}



export const DataContext = createContext({} as DataContextProps);

const DataProvider = ({ children }: DataProviderProps) => {
  const [dataJson, setDataJson] = useState<DataJsonProps[]>();

  const [summaryData, setSummaryData] = useState<SummaryProps>({
    data: {
      memory: 0,
      vcpus: 0,
      disk: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    function SummaryResumeFilter() {
      if (dataJson) {
        const separatedItems = dataJson.filter(
          (item: DataJsonProps) => item.selected === true
        );

        const reduceMemory = separatedItems?.reduce((sum: number, item: DataJsonProps) => {
          const sumMemory = item.configuracao.memoryProvisioned + sum;
          return sumMemory;
        }, 0);
        const reduceDisk = separatedItems?.reduce((sum: number, item: DataJsonProps) => {
          const sumDisk = item.configuracao.totalDiskGB + sum;
          return sumDisk;
        }, 0);
        const reduceCpus = separatedItems?.reduce((sum: number, item: DataJsonProps) => {
          const sumCpus = item.configuracao.cpuProvisioned + sum;
          return sumCpus;
        }, 0);
        const quantityServer = separatedItems.length;
        setSummaryData({
          data: {
            quantity: quantityServer,
            memory: reduceMemory,
            vcpus: reduceCpus,
            disk: reduceDisk,
          },
        });
      }
    }

    SummaryResumeFilter();
  }, [dataJson]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('servers');
        setDataJson(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  function OrderColumnService(type: string) {
    if (type === 'memoryProvisioned') {
      const orderList = dataJson
        .sort(
          (a, b) =>
            a.configuracao.memoryProvisioned - b.configuracao.memoryProvisioned
        )
        .map((item) => {
          return item;
        });
      setDataJson(orderList);
    }
    if (type === 'cpuProvisioned') {
      const orderList = dataJson
        .sort(
          (a, b) =>
            a.configuracao.cpuProvisioned - b.configuracao.cpuProvisioned
        )
        .map((item) => {
          return item;
        });
      setDataJson(orderList);
    }
    if (type === 'totalDiskGB') {
      const orderList = dataJson
        .sort((a, b) => a.configuracao.totalDiskGB - b.configuracao.totalDiskGB)
        .map((item) => {
          return item;
        });
      setDataJson(orderList);
    }
    if (type === 'hostname') {
      const orderName = dataJson
        .sort(function (a, b) {
          return +(a.hostname > b.hostname) || +(a.hostname === b.hostname) - 1;
        })
        .map((item) => {
          return item;
        });

      setDataJson(orderName);
    }
  }


  const CalcSummary = async (itemId: number) => {
    const selectItem = dataJson.map((item: DataJsonProps) =>
      item.id_vm === itemId
        ? {
          ...item,
          selected: !item.selected,
        }
        : item
    );

    setDataJson(selectItem);
  };

  return (
    <DataContext.Provider
      value={{
        dataJson,
        CalcSummary,
        summaryData,
        OrderColumnService,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

function useData() {
  const context = useContext(DataContext);
  return context;
}

export { DataProvider, useData };
