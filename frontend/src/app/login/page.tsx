// app/login/page.tsx
import Image from "next/image";
import { AuthHeader } from "@/views/auth/AuthViews";
import { AuthForm } from "@/views/auth/components/AuthForm";

export default function LoginView({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const mode = searchParams.mode === "register" ? "register" : "login";

  return (
    <div className="relative h-screen">
      <div className="min-[500px]:absolute min-[500px]:left-60 min-[500px]:top-60 w-60 h-60 bg-[#94a6ff] z-0 rounded-full max-[1200px]:hidden"></div>

      <div className="min-[990px]:hidden">
        <div className="rounded-lg mt-20 scale-150 w-full h-full flex flex-row justify-center items-center">
          <Image
            src="/profile/man.svg"
            alt="Profile Picture"
            width={350}
            height={300}
          />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 min-[1200px]:backdrop-blur-3xl z-10 flex items-center justify-center max-[500px]:scale-95 max-[500px]:w-screen max-[500px]:h-full max-[1200px]:mx-20 max-[500px]:mt-64 max-[990px]:mt-64">
        <AuthHeader />
        <div className="relative flex justify-start items-start max-[1200px]:flex max-[1200px]:justify-center max-[1200px]:items-center max-[1200px]:right-[70px]">
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}
