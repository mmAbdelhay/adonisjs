export const commonResponse = (message: string, data: any, status: number) => {
  return {
    message: message,
    data: data,
    status: status,
  };
};
