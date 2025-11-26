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
    <div className="relative    w-full flex  h-full dark:text-white text-black">
      <QuizPage />
      {/* <button
      onClick={()=>router.push(`/${locale}/opon`)}
      
      className="w-20 px-2 rounded-full flex items-center gap-x-2 border border-gray h-8 absolute bottom-2 right-2">
        <div className="h-4 w-4">
          <OponIcon />
        </div>
        <p>Opon</p>
      </button> */}
    </div>
  );
};

export default Dashboard;
