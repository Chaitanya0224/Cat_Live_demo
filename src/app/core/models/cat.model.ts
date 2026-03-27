export interface Cat {
  id: string;
  name: string;
  age: string;
  description: string;
  imageUrl?: string; 
}

export interface RawCatItem {
  id: string;
  info: {
    name: string;
    age: string;
    description: string;
  };
}

export interface RawCatResponse {
  status_code: number;
  data: RawCatItem[];
}

export interface CreateCatRequest {
  name: string;
  age: string;
  description: string;
}

export interface UpdateCatRequest extends CreateCatRequest {}
