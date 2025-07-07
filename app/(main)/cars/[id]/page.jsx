import React from "react";
import { getCarById } from "@/actions/car-listing";
import CarDetails from "./_components/car-details";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server"; // ✅ USE SERVER IMPORT

export async function generateMetadata({ params }) {
  const { id } = params;
  const result = await getCarById(id);

  if (!result.success) {
    return {
      title: "Car Not Found | SmartWheelz",
      description: "The requested car could not be found",
    };
  }

  const car = result.data;

  return {
    title: `${car.year} ${car.make} ${car.model} | SmartWheelz`,
    description: car.description.substring(0, 160),
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  };
}

const CarPage = async ({ params }) => {
  const { id } = params;

  // ✅ FIXED: use server-side auth
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600">
          Please sign in to view this car’s details.
        </p>
      </div>
    );
  }

  const result = await getCarById(id);

  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <CarDetails car={result.data} testDriveInfo={result.data.testDriveInfo} />
    </div>
  );
};

export default CarPage;
