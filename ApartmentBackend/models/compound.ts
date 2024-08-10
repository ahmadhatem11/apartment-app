import { Model } from "objection";

interface Compound {
  id: number;
  name: string;
}

class Compound extends Model {
  static tableName = "compound";

  id!: number;
  name!: string;

  static async getAllCompounds(): Promise<Compound[]> {
    return await this.query();
  }
}

export default Compound;
