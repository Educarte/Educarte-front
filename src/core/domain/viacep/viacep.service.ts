import axios from 'axios';
import { ViaCepData } from './viacep.types';
const viaCepInstance = axios.create({ baseURL: 'https://viacep.com.br/ws/' });

export const viaCepServices = {
  async addressByCep(cep: string) {
    const result = await viaCepInstance.get<ViaCepData>(`/${cep}/json`);

    return result.data;
  },
};
