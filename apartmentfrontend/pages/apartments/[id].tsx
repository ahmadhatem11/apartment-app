import React, { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import styles from "../../styles/Single.module.css";
import Layout from "../../components/Layout";

type Apartment = {
  id: string;
  name: string;
  description: string;
  unit_area: number;
  compound: { name: string };
  images: [{ image_url: string }];
  price: number;
  bedrooms: number;
  bathrooms: number;
  ready_by: Date;
};

type Props = {
  apartment: Apartment;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const res = await fetch(`http://backend:3000/api/apartment/${id}`);
  const apartment: Apartment = (await res.json()).apartment;

  return {
    props: {
      apartment,
    },
  };
};

const ApartmentDetails: NextPage<Props> = ({ apartment }) => {
  const [mainImage, setMainImage] = useState(apartment.images?.[0]?.image_url);

  return (
    <Layout>
      <div className={styles.container}>
        <img
          src={mainImage}
          alt={apartment.name}
          className={styles.mainImage}
        />
        <div className={styles.thumbnailContainer}>
          {apartment.images.map((img: any, index) => (
            <img
              key={index}
              src={img.image_url}
              alt={`Thumbnail ${index}`}
              className={styles.thumbnail}
              onClick={() => setMainImage(img.image_url)}
            />
          ))}
        </div>
        <div className={styles.cardContent}>
          <h2>
            {apartment.name} - {apartment.unit_area} m2
          </h2>
          <p>{apartment.description}</p>
          <p>Price: {apartment.price} EGP</p>
          <p>
            Bedrooms: {apartment.bedrooms} / Bathrooms: {apartment.bathrooms}
          </p>
          <p>Available in {new Date(apartment.ready_by).getFullYear()}</p>
        </div>
      </div>
    </Layout>
  );
};
export default ApartmentDetails;
