export const api = (route: string) => {
  return import.meta.env.PROD
    ? `/api${route}`
    : `http://localhost:4000${route}`;
};
