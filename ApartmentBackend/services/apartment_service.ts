import apartmentModel from "../models/apartment";
import image from "../models/image";

export async function createNewApartment(payload: any) {
  const knex = apartmentModel.knex();
  return await knex.transaction(async (trx) => {
    const { images, ...apartment } = payload;
    const newApartment = await apartmentModel.createApartment(apartment, {
      trx,
    });

    if (images && images.length) {
      const imageEntries = images.map((img: string) => ({
        apartment_id: newApartment.id,
        image_url: img,
      }));

      await image.createImage(imageEntries, { trx });
    }

    return newApartment;
  });
}
