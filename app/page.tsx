import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getData, getPrivateList, getPublicList, private_sheet_url, public_sheet_url } from "@/libs/data";
import Private from "@/components/private";
import Public from "@/components/public";

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        const data = await getPrivateList();
        return <Private data={data} session={session} />
    }
    const data = await getPublicList();
    return (
        <Public data={data} />
    );
}
