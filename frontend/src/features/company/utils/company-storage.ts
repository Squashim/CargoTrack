const NO_COMPANY_STORAGE_KEY = 'has_no_company';

export const companyStorage = {
  setNoCompanyFlag: () => localStorage.setItem(NO_COMPANY_STORAGE_KEY, 'true'),
  clearNoCompanyFlag: () => localStorage.removeItem(NO_COMPANY_STORAGE_KEY),
  hasNoCompanyFlag: () => localStorage.getItem(NO_COMPANY_STORAGE_KEY) === 'true',
};
