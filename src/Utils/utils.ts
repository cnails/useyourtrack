import WebApp from "@twa-dev/sdk";
import { queryClient } from "../main";

const isMock = true;

export const getUserId = () => {
    if (isMock) {
        return 1;
    }
    return WebApp.initDataUnsafe.user?.id!
}

export const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries({ queryKey });
}
