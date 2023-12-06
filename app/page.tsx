import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const private_sheet_url: string = process.env.NEXT_PUBLIC_SHEET_URL ?? "";
const public_sheet_url: string = process.env.NEXT_PUBLIC_SHEET_PUBLIC_URL;

const csv2json = (csvString: string): any => {
    const json: any[] = [];
    const csvArray = csvString.split("\n") ?? [];
    const col = csvArray.shift();
    const csvColumns = col?.trim().split(",") ?? [];

    csvArray.forEach(function (csvRowString) {
        const csvRow = csvRowString.split(",");
        const jsonRow: any = new Object();
        for (let colNum = 0; colNum < csvRow.length; colNum++) {
            const colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
            jsonRow[csvColumns[colNum]] = colData;
        }
        json.push(jsonRow);
    });
    return json;
};

const getData = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "get",
            headers: {
                "content-type": "text/csv;charset=UTF-8",
            },
            cache: "no-cache",
        });
        const respData = await response.text();
        return csv2json(respData);
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        const data = await getData(private_sheet_url);
        return (
            <div className="p-6 mx-auto">
                <div className="px-2 py-6">
                    <h1 className="text-3xl">Welcome, {session.user?.name}</h1>
                    <a
                        className="text-xs"
                        title="Logout"
                        href="/api/auth/signout"
                    >
                        Logout
                    </a>
                </div>
                <div className="flex">
                    {data.map((i: any, k: number) => (
                        <div
                            key={k}
                            className="group w-1/12 cursor-pointer p-5 shadow-sm rounded-xl border m-2 hover:border-dashed hover:scale-110 transition-all"
                        >
                            <a href={i.url} target="_blank">
                                <div className="flex items-center flex-col">
                                    <div className="p-2 group-hover:scale-150 transition-all">
                                        <i className={`ph ph-${i.name}`}></i>
                                    </div>
                                    <span className="text-center text-sm">
                                        {i.title}
                                    </span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    const data = await getData(public_sheet_url);
    return (
        <div className="m-auto w-full sm:w-[760px] min-h-screen flex">
            <div className="w-full flex justify-center items-center">
                <div className="w-full">
                    <h1 className="text-center text-5xl cursor-default">
                        @sarwonou
                        <a href="/api/auth/signin" title="Go">
                            s
                        </a>
                    </h1>
                    <div className="flex justify-center p-5">
                        {data.map((i: any, k: number) => (
                            <div
                                key={k}
                                className="group w-1/12 cursor-pointer p-2 m-2 hover:scale-110 transition-all"
                            >
                                <a href={i.url} target="_blank">
                                    <div className="flex items-center flex-col">
                                        <div className="p-1 group-hover:scale-150 transition-all">
                                            <i
                                                className={`text-3xl ph ph-${i.name}`}
                                            ></i>
                                        </div>
                                        <span className="text-center">
                                            {i.title}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    <hr className="hidden" />
                    <div className="blogs hidden py-5 text-center">
                        <div className="text-2xl py-6">Some thoughts</div>
                        <div className="flex flex-col gap-3">
                            <div className="p-3">
                                <a href="#" className="text-xl">
                                    Cast an interface/struct in golang
                                </a>
                                <div className="text-sm py-3">
                                    type casting interface in golang can be
                                    useful when you build a modular app using
                                    golang
                                </div>
                                <div className="text-xs">
                                    Oct 25, 2017 15:45 · 222 words · 2 minute
                                    read
                                </div>
                            </div>
                            <div className="p-3">
                                <a href="#" className="text-xl">
                                    Cast an interface/struct in golang
                                </a>
                                <div className="text-sm py-3">
                                    type casting interface in golang can be
                                    useful when you build a modular app using
                                    golang
                                </div>
                                <div className="text-xs">
                                    Oct 25, 2017 15:45 · 222 words · 2 minute
                                    read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
