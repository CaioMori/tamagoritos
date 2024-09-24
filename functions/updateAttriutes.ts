import {
  TamagoritoInterface,
  UpdateTamagoritoInterface,
  deleteTamagorito,
} from '@/database/service';

const updateAttributes = (
  tamagoritoList: TamagoritoInterface[],
): UpdateTamagoritoInterface[] => {
  const nowDate = new Date();
  // funcao para atualizar os atributos dos tamagoritos no tempo passado
  const updateAttributes = tamagoritoList.map((tamagorito) => {
    console.log(tamagorito);
    const tamagoritoDate = new Date(tamagorito.updatedAt);
    const timeDifference = nowDate.getTime() - tamagoritoDate.getTime();
    const minutes = Math.floor(timeDifference / 1000);
    const life = tamagorito.life - minutes;
    const hunger = tamagorito.hunger - minutes;
    const sleep = tamagorito.sleep - minutes;
    if (life <= 0 || hunger <= 0 || sleep <= 0) {
      deleteTamagorito(tamagorito.id);
    }
    return { ...tamagorito, life, hunger, sleep, updatedAt: nowDate };
  });
  return updateAttributes;
};

export default updateAttributes;
