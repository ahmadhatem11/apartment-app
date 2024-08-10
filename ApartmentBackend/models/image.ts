import { Model } from "objection";

interface Image {
  apartment_id: number;
  image_url: string;
}

class Image extends Model {
  static tableName = "image";

  id!: number;
  image_url!: string;
  apartment_id!: number;

  static async createImage(
    payload: {
      image_url: string;
      apartment_id: number;
    },
    options: any
  ): Promise<any> {
    return await this.query(options.trx).insert(payload);
  }
}

export default Image;
