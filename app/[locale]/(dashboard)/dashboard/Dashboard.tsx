/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import QuizPage from "../Components/QuizPage";
import OponIcon from "@/public/icons/OponIcon";
import { useParams, useRouter} from "next/navigation";

const Dashboard = () => {
    const params=useParams();
    const locale=params.locale;
    // cocnnfhf
    
    // const router=useRouter()
  return (
    <div className="relative -translate-x-3.5 bg-red-900 2xl:-translate-x-18   w-full flex  h-full dark:text-white text-black">
      <QuizPage />
     
    </div>
  );
};

export default Dashboard;
