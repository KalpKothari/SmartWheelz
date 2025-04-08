import { getSavedCars } from "@/actions/car-listing";
import  SavedCarsList  from "./_components/saved-cars-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Saved Cars | SmartWheelz",
  description: "View your saved cars and favorites",
};

const SavedCarsPage = async () => {
  // Check authentication on server
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in?redirect=/saved-cars");
  }

  // Fetch saved cars on the server
  const savedCarsResult = await getSavedCars();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Your Saved Cars</h1>
      <SavedCarsList initialData={savedCarsResult} />
    </div>
  );
}

export default SavedCarsPage;