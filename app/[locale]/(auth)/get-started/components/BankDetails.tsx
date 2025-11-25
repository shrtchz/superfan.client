"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const BankDetails = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  const t = useTranslations("BankDetails");

  // ---------------------
  // ZOD VALIDATION SCHEMA
  // ---------------------
  const schema = z.object({
    accountName: z.string().min(1, t("validation_required") || "Required"),
    bankName: z.string().min(1, t("validation_required") || "Required"),

    accountNumber: z
      .string()
      .regex(/^\d+$/, t("validation_onlyNumbers") || "Account number must be digits only"),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountName: "",
      bankName: "",
      accountNumber: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Bank details submitted:", data);
    onNext(); // Call onNext after successful submission
  };

  const handleSkip = () => {
    // Skip validation and go directly to next step
    onNext();
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
            <h2 className=" font-semibold textcenter text-gray-800 flex-1">
              {t("title")}
            </h2>
          </div>

          {/* Form content - aligned with header padding */}
          <div className="w-full max-w-lg h-[390px] overflow-scroll ">
            <Card className="p-0 shadow-none bg-white border-0 rounded-md  pr-2 w-full">
              <CardContent className="w-full pt6 p-0">
                <Form {...form}>
                  <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                    
                    {/* ACCOUNT NAME */}
                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem className="shadow-inner border border-gray-300 rounded-md px-3 py-1">
                          <FormLabel className="text-base text-black dark:text-white">{t("accountName")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-1 shadow-none focus-visible:ring-0 text-base"
                              // placeholder={t("placeholderAccountName")}
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />

                    {/* BANK NAME */}
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem className="shadow-inner border border-gray-300 rounded-md px-3 py-1">
                          <FormLabel className="text-base text-black dark:text-white">{t("bankName")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 px-1 shadow-none focus-visible:ring-0 text-base"
                              // placeholder={t("placeholderBankName")}
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />

                    {/* ACCOUNT NUMBER (digits only) */}
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem className="shadow-inner border border-gray-300 rounded-md px-3 py-1">
                          <FormLabel className="text-base text-black dark:text-white">{t("accountNumber")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              inputMode="numeric"
                              pattern="\d*"
                              className="border-0 px-1 shadow-none focus-visible:ring-0 text-base"
                              // placeholder={t("placeholderAccountNumber")}
                            />
                          </FormControl>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />

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
              {t("next")}
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

export default BankDetails;