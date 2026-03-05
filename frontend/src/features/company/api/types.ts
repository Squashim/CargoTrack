import type { Point } from 'maplibre-gl';

export interface UserCompanyResponse {
  id: string;
  name: string;
  color: string;
  location: Point | null;
  balance: number;
  level: number;
  reputation: number;
  createdAt: string;
}

export interface CreateCompanyPayload {
  name: string;
  color: string;
  latitude: number;
  longitude: number;
}
