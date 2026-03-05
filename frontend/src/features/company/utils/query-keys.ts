export const companyKeys = {
  all: ['company'] as const,
  user: () => [...companyKeys.all, 'user'] as const,
} as const;
