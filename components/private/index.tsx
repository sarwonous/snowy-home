import { Session } from "next-auth";
import Item from "../item";

export const Private = ({
    session,
    data
}: { data: any[], session: Session }) => {
    return (
        <div className="mx-auto p-6">
            <div className="px-2 py-6">
                <h1 className="text-3xl">Welcome, {session.user?.name}</h1>
                <a className="text-xs" title="Logout" href="/api/auth/signout">
                    Logout
                </a>
            </div>
            <div className="flex flex-wrap justify-start">
                {data.map((i: any, k: number) => (
                    <Item key={k} item={i} />
                ))}
            </div>
        </div>
    );
};

export default Private;
