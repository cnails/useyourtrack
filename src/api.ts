// api.ts
import { useQuery, UseQueryResult } from 'react-query';
import {
  GetTgUserResponse,
  GetTaskResponse,
  LevelInfo,
  RulesInfo,
  BalanceInfo,
  ReferralsInfo,
  WithdrawInfo,
  PromotionInfo,
  UserNotFoundResponse,
  TaskNotFoundResponse,
  UnauthorizedResponse,
} from './models';

const API_BASE_URL = 'http://localhost:3001'; // Замените на реальный URL вашего API

// Функция для выполнения fetch-запросов
const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Используйте актуальный токен
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

// Хук для получения данных пользователя
export const useGetTgUser = (userId: number): UseQueryResult<GetTgUserResponse, Error> => {
  return useQuery<GetTgUserResponse, Error>(
    ['getTgUser', userId],
    () => fetcher<GetTgUserResponse>(`${API_BASE_URL}/get_tg_user?user_id=${userId}`),
    {
      enabled: !!userId,
    }
  );
};

// Хук для получения задания
export const useGetTask = (userId: number): UseQueryResult<GetTaskResponse, Error> => {
  return useQuery<GetTaskResponse, Error>(
    ['getTask', userId],
    () => fetcher<GetTaskResponse>(`${API_BASE_URL}/get_task?user_id=${userId}`),
    {
      enabled: !!userId,
    }
  );
};

// Хук для получения информации об уровнях
export const useGetLevelsInfo = (): UseQueryResult<LevelInfo[], Error> => {
  return useQuery<LevelInfo[], Error>(
    'getLevelsInfo',
    () => fetcher<LevelInfo[]>(`${API_BASE_URL}/info/levels`)
  );
};

// Хук для получения информации о правилах
export const useGetRulesInfo = (): UseQueryResult<RulesInfo, Error> => {
  return useQuery<RulesInfo, Error>(
    'getRulesInfo',
    () => fetcher<RulesInfo>(`${API_BASE_URL}/info/rules`)
  );
};

// Хук для получения информации о балансе
export const useGetBalanceInfo = (): UseQueryResult<BalanceInfo, Error> => {
  return useQuery<BalanceInfo, Error>(
    'getBalanceInfo',
    () => fetcher<BalanceInfo>(`${API_BASE_URL}/info/balance`)
  );
};

// Хук для получения информации о рефералах
export const useGetReferralsInfo = (): UseQueryResult<ReferralsInfo, Error> => {
  return useQuery<ReferralsInfo, Error>(
    'getReferralsInfo',
    () => fetcher<ReferralsInfo>(`${API_BASE_URL}/info/referrals`)
  );
};

// Хук для получения информации о выводе средств
export const useGetWithdrawInfo = (): UseQueryResult<WithdrawInfo, Error> => {
  return useQuery<WithdrawInfo, Error>(
    'getWithdrawInfo',
    () => fetcher<WithdrawInfo>(`${API_BASE_URL}/info/withdraw`)
  );
};

// Хук для получения информации о продвижении
export const useGetPromotionInfo = (userId: number): UseQueryResult<PromotionInfo, Error> => {
  return useQuery<PromotionInfo, Error>(
    ['getPromotionInfo', userId],
    () => fetcher<PromotionInfo>(`${API_BASE_URL}/info/promotion?user_id=${userId}`),
    {
      enabled: !!userId,
    }
  );
};
