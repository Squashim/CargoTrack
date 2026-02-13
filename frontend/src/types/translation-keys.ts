import en from '@/locales/en.json';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends Record<string, unknown>
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & string];

export type TranslationKeys = NestedKeyOf<typeof en>;
