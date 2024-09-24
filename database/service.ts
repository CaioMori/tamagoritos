import tamagoritosStore from './store';

export interface TamagoritoInterface {
  id: string;
  life: number;
  hunger: number;
  sleep: number;
  name: string;
  image: number;
  updatedAt: Date;
}

export interface CreateTamagoritoInterface {
  name: string;
  image: number;
}

export interface UpdateTamagoritoInterface {
  id: string;
  life?: number;
  hunger?: number;
  sleep?: number;
  updatedAt?: Date;
}

export const createTamagorito = (request: CreateTamagoritoInterface) => {
  const id = Math.random().toString(36).substring(7);
  const life = 100;
  const hunger = 100;
  const sleep = 100;
  const updatedAt = new Date();
  const rawTamagorito = { id, life, hunger, sleep, updatedAt, ...request };
  const tamagoritosToSave = JSON.stringify(rawTamagorito);
  tamagoritosStore.set(id, tamagoritosToSave);
};

export const getTamagoritos = (): Array<TamagoritoInterface> => {
  const tamagoritos: Array<TamagoritoInterface> = tamagoritosStore
    .getAllKeys()
    .map((key) => {
      const tamagorito = tamagoritosStore.getString(key);
      if (!tamagorito) return;
      return JSON.parse(tamagorito);
    });

  return tamagoritos;
};

export const deleteTamagorito = (id: string) => {
  tamagoritosStore.delete(id);
};

export const updateTamagorito = (request: UpdateTamagoritoInterface) => {
  const tamagorito = tamagoritosStore.getString(request.id);
  if (!tamagorito) return;

  const updatedAt = new Date();

  const tamagoritoToParseWithUpatedAt = {
    ...JSON.parse(tamagorito),
    updatedAt,
  };

  const tamagoritoToUpdate = tamagoritoToParseWithUpatedAt;
  const updatedTamagorito = JSON.stringify({
    ...tamagoritoToUpdate,
    ...request,
  });

  tamagoritosStore.set(request.id, updatedTamagorito);
};

export const getOneTamagorito = (
  id: string,
): TamagoritoInterface | undefined => {
  const tamagorito = tamagoritosStore.getString(id);
  if (!tamagorito) return;
  return JSON.parse(tamagorito);
};

export const deleteAllTamagoritos = () => {
  tamagoritosStore.clearAll();
};
