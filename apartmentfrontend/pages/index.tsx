/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import AddApartmentModal from "../components/AddApartmentModal";

type Image = {
  id: number;
  image_url: string;
};

type Compound = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  city: string;
  district: string;
};
type Apartment = {
  id: number;
  name: string;
  description: string;
  unit_area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  finishing: string;
  ready_by: Date;
  area_id: number;
  compound_id: number;
  images: [Image];
  compound: Compound;
  area: Area;
};

type Props = {
  apartments: Apartment[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://backend:3000/api/apartment");
  const apartments: Apartment[] = (await res.json()).apartments;

  return {
    props: {
      apartments,
    },
  };
};

const Home: NextPage<Props> = ({ apartments }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [apartmentList, setApartmentList] = useState(apartments);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveApartment = async (data: any) => {
    const response = await fetch("http://localhost:3000/api/apartment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setModalOpen(false);
      const res = await fetch("http://localhost:3000/api/apartment");
      const apartments: Apartment[] = (await res.json()).apartments;
      setApartmentList(apartments);
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div
          style={{
            width: "100%",
            height: 80,
          }}
        >
          <button onClick={handleOpenModal} className={styles.addButton}>
            Add Apartment
          </button>
        </div>
        <div className={styles.grid}>
          {apartmentList.map((apt) => (
            <Link
              key={apt.id}
              href={`/apartments/${apt.id}`}
              passHref
              className={styles.card}
            >
              <img src={apt.images?.[0]?.image_url} alt={apt.name} />
              <div className={styles.cardContent}>
                <h2>
                  {apt.name} - {apt.unit_area} m2
                </h2>
                <p>{apt.description}</p>
                <p>Price: {apt.price} EGP</p>
                <p>
                  Bedrooms: {apt.bedrooms} / Bathrooms: {apt.bathrooms}
                </p>
                <p>Available in {new Date(apt.ready_by).getFullYear()}</p>
              </div>
            </Link>
          ))}
        </div>
        {modalOpen && (
          <AddApartmentModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveApartment}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;
