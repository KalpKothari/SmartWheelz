import AddCarForm  from "../_components/add-car-form";
import React from "react";

export const metadata = {
  title: "Add New Car | SmartWheelz Admin",
  description: "Add a new car to the marketplace",
};

const AddCarPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
      <AddCarForm />
    </div>
  );
};

export default AddCarPage;