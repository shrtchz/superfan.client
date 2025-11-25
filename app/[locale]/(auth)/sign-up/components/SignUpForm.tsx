"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaXTwitter } from "react-icons/fa6";

// --------------------
// SignUpForm Component
// --------------------
export function SignUpForm() {
  const params = useParams();
  const locale = params.locale as string;

  const t = useTranslations("SignUp");
  const authT = useTranslations("Home");

  // Zod schema with translations
  const signUpSchema = z
    .object({
      username: z.string().min(1, t("validation_contactRequired")),
      contactType: z.enum(["email", "phone"], { message: t("validation_selectContactType") }),
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
      }

      if (data.contactType === "phone") {
        if (!/^\d+$/.test(data.contact)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("validation_invalidPhone"),
            path: ["contact"],
          });
        }
      }
    });

  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      contactType: "email",
      contact: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const contactType = form.watch("contactType");

  const onSubmit = (values: SignUpFormValues) => {
    console.log("Sign Up:", values);
    // handle signup logic here
  };

  return (
    <div className="flex flex-col justify-center  items-center h-full">
    <Card className="py-3 w-md shadow-xl gap-4 rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-">{t("title")}</CardTitle>
      </CardHeader>
      <hr />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="shadow-inner border border-gray-900 rounded-md gap-0 px-2 pt-1">
                <FormLabel>{t("username")}</FormLabel>
                <FormControl>
                  <Input {...field} className="border-0 px-0 shadow-none focus-visible:ring-0" />
                </FormControl>
              </FormItem>
            )}
            />
            <FormMessage>
              {form.formState.errors.username?.message || null}
            </FormMessage>

          {/* Contact Type + Input */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="shadow-inner border border-gray-900 h-16 rounded-md px-2 pt-1 gap-0">
                <div className="flex items-center justify-between ">
             

                  <FormField
                    control={form.control}
                    name="contactType"
                    render={({ field: selectField }) => (
                      <Select value={selectField.value} onValueChange={selectField.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-fit border-0 shadow-none px-0 py-0 !h-4 focus-visible:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">{t("emailLabel")}</SelectItem>
                          <SelectItem value="phone">{t("phoneLabel")}</SelectItem>
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
                    className="border-0 px-1 h-8 shadow-none py-0 focus-visible:ring-0"
                    // placeholder={contactType === "email" ? t("emailLabel") : t("phoneLabel")}
                  />
                </FormControl>

              </FormItem>
            )}
          />
                <FormMessage>
                  {form.formState.errors.contact?.message || null}
                </FormMessage>

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative shadow-inner border border-gray-900 rounded-md px-2 pt-1 gap-0">
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="border-0 px-1 shadow-none focus-visible:ring-0"
                      // placeholder={t("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
            />
            <FormMessage>
              {form.formState.errors.password?.message || null}
            </FormMessage>

          {/* Password Hint */}
          <p className="text-xs text-gray-500">{t("passwordHint")}</p>

          {/* Submit Button */}
          <Button type="submit" className="w-full rounded-full mt2">
            {t("submit")}
          </Button>
        </form>
      </Form>
        <hr />

  <div className="w-full mx-auto flex-col flex gap-2 items-center justify-center">
          <p className="font-medium text-gray-900 hover:text-gray-800 hoverunderline transition-colors">
            {authT("signupWithAuth")}
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
      {/* Login Link */}
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          {t("alreadyHaveAccount")}{" "}
          <Link href={`/${locale}/sign-in`} className="font-medium text-gray-900 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>

    </div>
  );
}
