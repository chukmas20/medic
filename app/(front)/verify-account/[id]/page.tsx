import { getUserById } from "@/actions/users";
import VerifyTokenForm from "@/components/frontend/VerifyTokenForm";
// import VerifyTokenForm from "@/components/VerifyTokenForm";
 
export default async function VerifyAccount({
  params: { id },
}: {
  params: { id: string };
}) {
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
              Verify Account
            </h1>
            <VerifyTokenForm role={role} userToken={userToken} id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}