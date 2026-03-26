export interface Cat {
  id: string;
  name: string;
  age: string;
  description: string;
  imageUrl?: string; // Optional: we can generate a random image for each cat
}

export interface CreateCatRequest {
  name: string;
  age: string;
  description: string;
}

export interface UpdateCatRequest extends CreateCatRequest {}
