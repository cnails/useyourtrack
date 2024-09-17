import axios from 'axios';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { getUserId } from './Utils/utils';

const isMock = false;

// Создаем экземпляр axios с базовым URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Замените на ваш базовый URL API
});

// Интерфейс для обработки ошибок
interface ErrorResponse {
  detail: string;
}

// Интерфейс для параметров авторизации (если необходимо)
interface AuthParams {
  token: string;
}

// ==================== /get_tg_user ====================

export interface GetTgUserParams {
  user_id: number;
}

export interface GetTgUserResponse {
  user_id: number;
  user_type: 'musician' | 'listener';
  level_id: number;
  balance_rub: number;
  balance_umt: number;
  approved_tasks: number;
  not_approved_tasks: number;
}

export const useGetTgUser = (
  options?: UseQueryOptions<GetTgUserResponse, ErrorResponse>
) => {
  const user_id = getUserId();
  return useQuery<GetTgUserResponse, ErrorResponse>(
    ['getTgUser'],
    async () => {
      if (isMock) {
        return {user_id: 1, user_type: 'musician', level_id: 5, balance_rub: '75', balance_umt: '140', approved_tasks: '5'}
      }
      const response = await apiClient.get<GetTgUserResponse>('/get_tg_user', {
        params: {
          user_id,
        },
      });
      return response.data;
    },
    options
  );
};

// ==================== /get_task ====================

export interface GetTaskParams {
  user_id: number;
}

export interface GetTaskResponse {
  task_id: number;
  task_type: 'track' | 'custom_task' | 'side_task';
  image_url: string;
  text: string;
}

export const useGetTask = (
  params: GetTaskParams,
  options?: UseQueryOptions<GetTaskResponse, ErrorResponse>
) => {
  return useQuery<GetTaskResponse, ErrorResponse>(
    ['getTask', params],
    async () => {
      if (isMock) {
        return {task_id: 13, task_type: 'track', image_url: 'https://via.placeholder.com/400x200', text: 'Ваша задача прослушать трек полностью без перематываний (иначе он не будет отображаться как прослушанный) и поставить лайк в 2-х местах: на трек и на альбом‼ После чего перейдите на главную (там, где "Моя волна"), прокрутите немного вниз и перейдите раздел История, сделайте скриншот, как показано на образцах выше☝, и отправьте его в этот чат.'}
      }
      const response = await apiClient.get<GetTaskResponse>('/get_task', {
        params,
      });
      return response.data;
    },
    options
  );
};

// ==================== /task (POST) ====================

export interface PostTaskRequest {
  user_id: number;
  task_id: number;
  image_url?: string | null;
  text?: string | null;
  skip_task?: boolean;
}

export interface PostTaskResponse {
  detail: string;
}

export const usePostTask = (
  options?: UseMutationOptions<PostTaskResponse, ErrorResponse, PostTaskRequest>
) => {
  return useMutation<PostTaskResponse, ErrorResponse, PostTaskRequest>(
    async (data) => {
      const response = await apiClient.post<PostTaskResponse>('/task', data);
      return response.data;
    },
    options
  );
};

// ==================== /info/levels ====================

export interface LevelInfo {
  id: number;
  level: number;
  umt: number;
  sub_rub: number;
  sub_coins: number;
  rub: number;
  coins: number;
}

export const useGetLevels = (
  options?: UseQueryOptions<LevelInfo[], ErrorResponse>
) => {
  return useQuery<LevelInfo[], ErrorResponse>(
    'getLevels',
    async () => {
      const response = await apiClient.get<LevelInfo[]>('/info/levels');
      return response.data;
    },
    options
  );
};

// ==================== /info/rules ====================

export interface RulesInfo {
  text: string;
}

export const useGetRules = (
  options?: UseQueryOptions<RulesInfo, ErrorResponse>
) => {
  return useQuery<RulesInfo, ErrorResponse>(
    'getRules',
    async () => {
      const response = await apiClient.get<RulesInfo>('/info/rules');
      return response.data;
    },
    options
  );
};

// ==================== /info/balance ====================

export interface BalanceInfo {
  text: string;
}

export const useGetBalanceInfo = (
  options?: UseQueryOptions<BalanceInfo, ErrorResponse>
) => {
  return useQuery<BalanceInfo, ErrorResponse>(
    'getBalanceInfo',
    async () => {
      const response = await apiClient.get<BalanceInfo>('/info/balance');
      return response.data;
    },
    options
  );
};

// ==================== /info/referrals ====================

export interface ReferralsInfo {
  text: string;
  referrals: number;
  ref_link: string;
}

export const useGetReferralsInfo = (
  options?: UseQueryOptions<ReferralsInfo, ErrorResponse>
) => {
  return useQuery<ReferralsInfo, ErrorResponse>(
    'getReferralsInfo',
    async () => {
      const response = await apiClient.get<ReferralsInfo>('/info/referrals');
      return response.data;
    },
    options
  );
};

// ==================== /info/withdraw ====================

export interface WithdrawInfo {
  text: string;
  available_banks: string[];
}

export const useGetWithdrawInfo = (
  options?: UseQueryOptions<WithdrawInfo, ErrorResponse>
) => {
  return useQuery<WithdrawInfo, ErrorResponse>(
    'getWithdrawInfo',
    async () => {
      const response = await apiClient.get<WithdrawInfo>('/info/withdraw');
      return response.data;
    },
    options
  );
};

// ==================== /withdraw (POST) ====================

export interface WithdrawRequest {
  user_id: number;
  card_number: string;
  bank_name: string;
}

export interface WithdrawResponse {
  detail: string;
}

export const useWithdraw = (
  options?: UseMutationOptions<WithdrawResponse, ErrorResponse, WithdrawRequest>
) => {
  return useMutation<WithdrawResponse, ErrorResponse, WithdrawRequest>(
    async (data) => {
      const response = await apiClient.post<WithdrawResponse>('/withdraw', data);
      return response.data;
    },
    options
  );
};

// ==================== /info/promotion ====================

export interface PromotionParams {
  user_id: number;
}

export interface PromotionInfo {
  text: string;
  current_status: string;
}

export const useGetPromotionInfo = (
  params: PromotionParams,
  options?: UseQueryOptions<PromotionInfo, ErrorResponse>
) => {
  return useQuery<PromotionInfo, ErrorResponse>(
    ['getPromotionInfo', params],
    async () => {
      const response = await apiClient.get<PromotionInfo>('/info/promotion', {
        params,
      });
      return response.data;
    },
    options
  );
};
