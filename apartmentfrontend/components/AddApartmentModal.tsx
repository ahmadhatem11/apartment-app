// components/AddApartmentModal.tsx
import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";

type Option = {
  id: number;
  name: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
};

const AddApartmentModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [apartmentData, setApartmentData] = useState({
    name: "",
    description: "",
    unit_area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    finishing: "Finished",
    ready_by: "",
    area_id: "",
    compound_id: "",
    images: [],
  });
  const [areas, setAreas] = useState<Option[]>([]);
  const [compounds, setCompounds] = useState<Option[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/area")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.areas);
        if (data.areas.length > 0) {
          setApartmentData((prev) => ({
            ...prev,
            area_id: data.areas[0].id,
          }));
        }
      });

    fetch("http://localhost:3000/api/compound")
      .then((res) => res.json())
      .then((data) => {
        setCompounds(data.compounds);
        if (data.compounds.length > 0) {
          setApartmentData((prev) => ({
            ...prev,
            compound_id: data.compounds[0].id,
          }));
        }
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "images") {
      setApartmentData((prev: any) => ({
        ...prev,
        images: e.target.value.split(",").map((url) => url.trim()),
      }));
    } else {
      setApartmentData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(apartmentData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={apartmentData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={apartmentData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="unit_area"
            placeholder="Unit Area"
            value={apartmentData.unit_area}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={apartmentData.bedrooms}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={apartmentData.bathrooms}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={apartmentData.price}
            onChange={handleChange}
            required
          />
          <select
            name="finishing"
            value={apartmentData.finishing}
            onChange={handleChange}
            required
          >
            <option value="Finished">Finished</option>
            <option value="Not Finished">Not Finished</option>
          </select>
          <input
            type="date"
            name="ready_by"
            placeholder="Ready By"
            value={apartmentData.ready_by}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="images"
            placeholder="Add image URLs, separated by commas"
            value={apartmentData.images.join(", ")}
            onChange={handleChange}
          />
          <select
            name="area_id"
            value={apartmentData.area_id}
            onChange={handleChange}
            required
          >
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
          <select
            name="compound_id"
            value={apartmentData.compound_id}
            onChange={handleChange}
            required
          >
            {compounds.map((compound) => (
              <option key={compound.id} value={compound.id}>
                {compound.name}
              </option>
            ))}
          </select>
          <input type="submit" value="Add Apartment" />
        </form>
      </div>
    </div>
  );
};

export default AddApartmentModal;
