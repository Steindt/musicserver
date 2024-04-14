import Link from "next/link";
import { cookies } from "next/headers";
import { SettingOutlined } from "@ant-design/icons";
import { getWord } from "@/words";
import { userinfo } from "@/types";
import { jwtDecode } from "jwt-decode";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Gets username from either a uuid cookie generated by server or grabs it from keycloak
  const getUser = async () => {
    "use server";
    const accessToken = cookies().get("accessToken");
    const guestUUID = cookies().get("user");
    if (accessToken && accessToken.value) {
      // Access token is not opaque access token, which it means it contains data which we use here
      const user: userinfo = jwtDecode(accessToken.value);
      return user.preferred_username;
    } else if (guestUUID && guestUUID.value) {
      return getWord(guestUUID.value);
    } else {
      return "Not signed in";
    }
  };
  return (
    <>
      <nav className="m-4 flex w-screen items-center font-mono *:text-sm min-[340px]:*:text-xl sm:*:text-3xl">
        <Link
          href="/"
          className="transform transition hover:scale-105 hover:text-gray-400"
        >
          Music server
        </Link>
        <div className="absolute right-0 mr-4 flex">
          <span className="!text-lg mr-4">{await getUser()}</span>
          <Link
            href="/admin"
            className="transform transition hover:scale-105 hover:text-gray-400"
          >
            <SettingOutlined className="flex aspect-square h-full justify-center" />
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}