"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/useAuthStore";
import { FaXTwitter } from "react-icons/fa6";

export function SignInForm() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("Login");
  const authT = useTranslations("Home");
  const { setContactInfo } = useAuthStore();
  const router=useRouter()
  const signInSchema = z
    .object({
      contactType: z.enum(["email", "phone"], {
        message: t("validation_selectContactType"),
      }),
      contact: z.string().min(1, t("validation_contactRequired")),
      password: z.string().min(8, t("validation_passwordMin")),
    })
    .superRefine((data, ctx) => {
      if (data.contactType === "email") {
        if (!z.string().email().safeParse(data.contact).success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation_invalidEmail"),
            path: ["contact"],
          });
        }
      } else {
        if (!/^\d+$/.test(data.contact)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation_invalidPhone"),
            path: ["contact"],
          });
        }
      }
    });

  type SignInFormValues = z.infer<typeof signInSchema>;
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { contactType: "email", contact: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const contactType = form.watch("contactType");

  const onSubmit = (values: SignInFormValues) => {
    // store contact info for Forgot Password
    setContactInfo(values.contactType, values.contact);
    console.log("Sign In:", values);
    router.push(`/${locale}/dashboard`);

    // handle login
  };

  const handleContactTypeChange = (value: "email" | "phone") => {
    form.setValue("contactType", value); // update form
    const currentContact = form.getValues("contact");
    setContactInfo(value, currentContact || ""); // always set store
  };

  const handleContactChange = (value: string) => {
    form.setValue("contact", value);
    const currentType = form.getValues("contactType");
    setContactInfo(currentType, value);
  };

  return (
    <div className="">
      <Card className="py-6 w-md shadow-xl gap-4 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 mb-0">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <hr />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-6"
          >
            {/* Contact Type + Input */}
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="shadow-inner border border-gray-900 gap-0 rounded-md px-2 pt-1 h-16">
                  <div className="flex items-center justify-between mb1">
                    <FormField
                      control={form.control}
                      name="contactType"
                      render={({ field: selectField }) => (
                        <Select
                          value={selectField.value}
                          onValueChange={(v: "email" | "phone") => {
                            selectField.onChange(v); // react-hook-form updates
                            handleContactTypeChange(v); // store updates
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-fit border-0 shadow-none !h-4 px-0 py-0">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">
                              {t("emailLabel")}
                            </SelectItem>
                            <SelectItem value="phone">
                              {t("phoneLabel")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <FormControl>
                    <Input
                      {...field}
                      type={contactType === "email" ? "email" : "tel"}
                      inputMode={contactType === "phone" ? "numeric" : "email"}
                      className="border-0 px-0 shadow-none px-1 h-8 py-0 focus-visible:ring-0"
                      onChange={(e) => {
                        field.onChange(e);
                        handleContactChange(e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.contact?.message}</FormMessage>

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative shadow-inner border border-gray-900 gap-0 rounded-md px-2 pt2">
                  <FormLabel className="text-sm">{t("password")}</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      // placeholder={t("password")}
                      className="border-0 px-0 shadow-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </FormItem>
              )}
            />
            <FormMessage>{form.formState.errors.password?.message}</FormMessage>

            <div className="text-left">
              <Link
                href={`/${locale}/forgot-password`}
                className="text-sm text-gray-900 hover:text-gray-800 hover:underline transition-colors"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <Button type="submit" className="w-full rounded-full mt-2">
              {t("login")}
            </Button>
          </form>
        </Form>
        <hr />
        <div className="w-full mx-auto flex-col flex gap-2 items-center justify-center">
          <p className=" text-gray-900  transition-colors">
            {authT("loginWithAuth")}
          </p>
          <div className="w-full mx-auto flex gap-2 items-center justify-center">
          <Image
            src={"/instagram-svgrepo-com (1).svg"}
            alt="fb"
            height={40}
            width={40}
          />
          <Image
            src={"/facebook-svgrepo-com.svg"}
            alt="fb"
            height={40}
            width={40}
          />
          <Image
            src={"/snapchat-snap-chat-svgrepo-com.svg"}
            alt="fb"
            height={40}
            width={40}
          />
          {/* <Image src={""} alt="fb" height={40} width={40}/> */}
          <FaXTwitter size={40} />
          </div>
        </div>
      </Card>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t("dontHaveAccount")}{" "}
          <Link
            href={`/${locale}/sign-up`}
            className="font-medium text-gray-900 hover:text-gray-800 hover:underline transition-colors"
          >
            {t("signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
