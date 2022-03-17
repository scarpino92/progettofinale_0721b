import { Comune } from "./Comune";
import { Provincia } from "./Provincia";

export class Sede {
  id!: number;
  via!: string;
  civico!: string;
  cap!: string;
  localita!: string;
  comune: Comune = new Comune();
}
