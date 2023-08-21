"use client";

import { useSearchParams } from "next/navigation";

export function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </>
  );
}
