"use client";


import { Card, CardContent,  } from "@/components/ui/card";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";

const FundWallet = ({ onBack }: { onBack: () => void }) => {
  const t = useTranslations("Wallet");
  const bt = useTranslations("BankDetails");
  const router = useRouter()
  const params = useParams();
  const locale = params.locale as string;

  // -----------------------------
  // ZOD VALIDATION SCHEMA
  // -----------------------------
  const schema = z.object({
    amount: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a number greater than 0",
      }),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: "0.00" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Fund Wallet Amount:", data.amount);
    router.push(`/${locale}/dashboard`);
  };

  const handleSkip = () => {
    // Skip funding and route directly to dashboard
    router.push(`/${locale}/dashboard`);
  };

  // Check if form is valid to enable/disable Next button
  const isFormValid = form.formState.isValid;

  return (
    <div className="flex flex-col items-center justify-center px-6 w-full">
    <div className="h-[80%] flex-col flex items-center w-full">
      <div className="flex-col flex items-center w-full h-full overflow-y-auto">
        {/* Header - Aligned with form inputs */}
        <div className="flex items-center h-max mb-8 gap-3 pt-4 w-full max-w-lg ">
          <button onClick={onBack} className="cursor-pointer text-black">
            <ArrowLeft />
          </button>
          <h2 className="text-base font-semibold textcenter text-gray-800 flex-1">
            {t("title")}
          </h2>
        </div>

          <div className="w-full max-w-lg h-[390px] overflow-scroll ">
            <Card className="p-0 gap-0 shadow-none bg-white border-0 rounded-md  pr-2 w-full">
              <CardContent className="w-full pt6 p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    {/* Amount Input */}
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="shadow-inner border border-gray-300 rounded-md px-3 py-2">
                          <FormLabel className="text-base">{t("amountLabel")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              min={0}
                              inputMode="numeric"
                              placeholder="0.00"
                              className="border-0 px-1 shadow-none focus-visible:ring-0 !text-3xl placeholder:text-3xl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <p className="text-base text-gray-600 textcenter">{t("description")}</p>

                    {/* Add spacing to match other components */}
                    <div className="h-4"></div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <hr className="w-full" />
      
      <div className="w-full flex justify-center h-[15%] min-h-[80px]">
        <div className="w-[50%] 2xl:w-[30%] flex justify-center items-center">
          <div className="flex gap-4 w-[60%] mx-auto justify-center">
            <button
              onClick={form.handleSubmit(onSubmit)}
              disabled={!isFormValid}
              className={`flex-1 py-2 rounded-md h-12 ${
                isFormValid 
                  ? "bg-black text-white" 
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {bt("next")}
            </button>

            <button 
              type="button" 
              onClick={handleSkip}
              className="flex-1 border py-2 rounded-md h-12 text-black border-gray-200 bg-white hover:bg-gray-50"
            >
              {t("skip")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;