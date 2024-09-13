// models.ts

// Интерфейс для ответа "Unauthorized"
export interface UnauthorizedResponse {
    detail: string; // Пример: "Invalid token."
  }
  
  // Интерфейс для ответа "UserNotFound"
  export interface UserNotFoundResponse {
    detail: string; // Пример: "User not found."
  }
  
  // Интерфейс для ответа "TaskNotFound"
  export interface TaskNotFoundResponse {
    detail: string; // Пример: "Task not found."
  }
  
  // Интерфейс для данных пользователя
  export interface GetTgUserResponse {
    user_id: number;
    user_type: "musician" | "listener";
    level_id: number;
    balance_rub: number;
    balance_umt: number;
    approved_tasks: number;
    not_approved_tasks: number;
  }
  
  // Интерфейс для данных задания
  export interface GetTaskResponse {
    task_id: number;
    task_type: "track" | "custom_task" | "side_task";
    image_url: string;
    text: string;
  }
  
  // Интерфейс для запроса на загрузку отчета по заданию
  export interface TaskReportRequest {
    user_id: number;
    task_id: number;
    image_url?: string | null;
    text?: string | null;
    skip_task?: boolean;
  }
  
  // Интерфейс для ответа на успешное обновление задания
  export interface TaskReportResponse {
    detail: string; // Пример: "Task updated successfully."
  }
  
  // Интерфейс для данных об уровнях
  export interface LevelInfo {
    id: number;
    level: number;
    umt: number;
    sub_rub: number;
    sub_coins: number;
    rub: number;
    coins: number;
  }
  
  // Интерфейс для информации о правилах
  export interface RulesInfo {
    text: string;
  }
  
  // Интерфейс для информации о балансе
  export interface BalanceInfo {
    text: string;
  }
  
  // Интерфейс для информации о рефералах
  export interface ReferralsInfo {
    text: string;
    referrals: number;
    ref_link: string;
  }
  
  // Интерфейс для информации о выводе средств
  export interface WithdrawInfo {
    text: string;
    available_banks: string[];
  }
  
  // Интерфейс для запроса на вывод средств
  export interface WithdrawRequest {
    user_id: number;
    card_number: string;
    bank_name: string;
  }
  
  // Интерфейс для ответа на успешный вывод средств
  export interface WithdrawResponse {
    detail: string; // Пример: "Withdrawal successful."
  }
  
  // Интерфейс для ответа на ошибку при выводе средств
  export interface WithdrawErrorResponse {
    detail: string; // Пример: "Invalid bank name or card number."
  }
  
  // Интерфейс для информации о продвижении
  export interface PromotionInfo {
    text: string;
    current_status: string;
  }
  
  // Интерфейс для ошибки доступа
  export interface AccessDeniedResponse {
    detail: string; // Пример: "Access denied. User is not a musician."
  }
