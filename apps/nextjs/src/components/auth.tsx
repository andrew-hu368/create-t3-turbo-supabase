import type { ComponentProps } from "react";

export function SignIn(props: ComponentProps<"button">) {
  return (
    <form action={`/api/auth/sign-in`} method="post">
      <button {...props} />
    </form>
  );
}

export function SignOut(props: ComponentProps<"button">) {
  return (
    <form action="/api/auth/sign-out" method="post">
      <button {...props} />
    </form>
  );
}
