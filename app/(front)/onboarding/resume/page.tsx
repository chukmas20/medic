import { getUserById } from "@/actions/users";
import TrackingForm from "@/components/frontend/TrackingForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// import VerifyTokenForm from "@/components/VerifyTokenForm";
 
export default async function VerifyTrackingNumber({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions)
  // const sid = session?.user.id
  // if(sid){
  //     redirect(`/onboarding/${id}`)
  // }
  //Get a User from DB
  const user = await getUserById(id);
  const userToken = user?.token;
  const role = user?.role;
  return (
    <section className="bg-yellow-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
               Enter your 10 digit unique code
            </h1>
            <TrackingForm  />
          </div>
        </div>
      </div>
    </section>
  );
}