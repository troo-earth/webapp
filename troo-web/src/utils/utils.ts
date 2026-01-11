import axios from "axios";

export const handleError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return error instanceof Error ? error.message : fallback;
};