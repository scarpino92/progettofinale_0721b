import { Provincia } from "./Provincia";

export class Comune {
  id: number;
  nome: string;
  provincia: Provincia = new Provincia();
}
