import { getCarById } from "@/actions/car-listings";
import { notFound } from "next/navigation";
import React from "react";
import TestDriveForm from "./_component/test-drive-form";

export async function generateMetadata() {
  return {
    title: `Book Test Drive 📑 | AIxCAR`,
    description: `Schedule a test drive in few seconds`,
  };
}

const TestDrivePage = async ({ params }) => {
  // Fetch car details
  const { id } = await params;
  const result = await getCarById(id);

  // If car not found, show 404
  if (!result.success) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Book a Test Drive</h1>
      <TestDriveForm
        car={result.data}
        testDriveInfo={result.data.testDriveInfo}
      />
    </div>
  );
};

export default TestDrivePage;
