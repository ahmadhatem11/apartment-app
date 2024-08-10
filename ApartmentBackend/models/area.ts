import { Model } from "objection";

interface Area {
  id: number;
  name: string;
}

class Area extends Model {
  static tableName = "area";

  id!: number;
  name!: string;

  static async getAllAreas(): Promise<Area[]> {
    return await this.query();
  }
}

export default Area;
