import type { ParseKeys } from 'i18next';
import type { LucideIcon } from 'lucide-react';

export interface WithClassName {
  className?: string;
}

type AuthKeys = `auth:${ParseKeys<'auth'>}`;
type ValidationKeys = `validation:${ParseKeys<'validation'>}`;
type CommonKeys = `common:${ParseKeys<'common'>}`;

export type AllowedKeys = AuthKeys | ValidationKeys | CommonKeys;

type SubMenuItem = {
  title: ParseKeys<'nav'>;
  description: ParseKeys<'nav'>;
  url: string;
  icon: LucideIcon;
  allow?: AuthAccess;
};

export type NavMenuItem = {
  title: ParseKeys<'nav'>;
  url: string;
  icon?: LucideIcon;
  allow?: AuthAccess;
  items?: SubMenuItem[];
};

export type AuthAccess = 'authenticated' | 'unauthenticated' | 'public';
