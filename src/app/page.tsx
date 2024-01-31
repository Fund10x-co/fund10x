"use client";
import LoginComp from "@/components/LoginComp";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  return <LoginComp />;
}
