"use client";
import { getTgChatId } from "@/core/utils";
import { TgReturnType } from "@/core/utils/getTgChatId";
import { Loading } from "@/layouts/loading";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";

interface TgContextProps {
  tg: TgReturnType | undefined;
  isLoading: boolean;
}

const TgContext = createContext<TgContextProps>({
  tg: undefined,
  isLoading: true,
});

export const TgProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [tg, setTg] = useState<TgReturnType | undefined>(undefined);

  const [tgIdSession, setTgIdSession] = useSessionStorage<string | undefined>(
    "mini-app-tg-id",
    undefined
  );

  useEffect(() => {
    setIsLoading(true);

    getTgChatId()
      .then((res) => {
        setTgIdSession(res?.id ? String(res?.id) : undefined);
        setTg(res);
      })
      .catch(() => {
        setTgIdSession(undefined);
        setTg(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <TgContext.Provider
      value={{
        isLoading: isLoading,
        tg: tg,
      }}
    >
      {isLoading ? <Loading /> : children}
    </TgContext.Provider>
  );
};

export const useTgProvider = () => {
  return useContext(TgContext);
};
