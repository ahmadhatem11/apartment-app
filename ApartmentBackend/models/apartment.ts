// models/Apartment.ts
import { Model } from "objection";
import Area from "./area";
import Compound from "./compound";
import Image from "./image";

interface Apartment {
  id: number;
  name: string;
  description: string;
  unit_area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  finishing?: string;
  ready_by?: Date;
  area_id: number;
  compound_id: number;
}

class Apartment extends Model {
  static tableName = "apartment";

  id!: number;
  name!: string;
  description!: string;
  unit_area!: number;
  bedrooms!: number;
  bathrooms!: number;
  price!: number;
  finishing?: string;
  ready_by?: Date;
  area_id!: number;
  compound_id!: number;

  static async getAllApartments(): Promise<Apartment[]> {
    return await this.query().withGraphFetched("[area,compound,images]");
  }

  static async getApartmentById(id: string): Promise<any> {
    return await this.query()
      .findById(id)
      .withGraphFetched("[area,compound,images]");
  }

  static async createApartment(payload: Apartment, options: any): Promise<any> {
    return await this.query(options.trx).insert(payload).returning("*");
  }

  static get relationMappings() {
    return {
      area: {
        relation: Model.BelongsToOneRelation,
        modelClass: Area,
        join: {
          from: "apartment.area_id",
          to: "area.id",
        },
      },
      compound: {
        relation: Model.BelongsToOneRelation,
        modelClass: Compound,
        join: {
          from: "apartment.compound_id",
          to: "compound.id",
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: "apartment.id",
          to: "image.apartment_id",
        },
      },
    };
  }
}

export default Apartment;
