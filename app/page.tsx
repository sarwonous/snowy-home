import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

const data = [
    {
        title: "Transmission",
        url: "http://dash.agussarwono.com/bajakan/web/",
        name: "magnet",
    },
    {
        title: "Directories",
        url: "https://drive.agussarwono.com",
        name: "folder",
    },
    {
        title: "ayunovanti.com admin",
        url: "http://nulis.ayunovanti.com/wp-admin",
        name: "article",
    },
    {
        title: "Cloudflare",
        url: "https://dash.cloudflare.com/a64d5284b8df3720dadafc315a46eb4e",
        name: "globe",
    },
    {
        title: "Mikrotik",
        url: "https://192.168.10.1",
        name: "wifi-high",
    },
];

const url: string = process.env.NEXT_PUBLIC_SHEET_URL ?? "";

const csv2json = (csvString: string): any => {
    const json: any[] = [];
    const csvArray = csvString.split("\n") ?? [];
    const col = csvArray.shift();
    const csvColumns = col?.trim().split(",") ?? [];

    csvArray.forEach(function (csvRowString) {
        var csvRow = csvRowString.split(",");
        const jsonRow: any = new Object();
        for (var colNum = 0; colNum < csvRow.length; colNum++) {
            var colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
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
        console.log(respData);
        return csv2json(respData);
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        console.log("url", url);
        const data = await getData(url);
        console.log(data);
        return (
            <div className="p-6 mx-auto">
                <div className="p-6">
                    <h1 className="text-3xl">Welcome, {session.user?.name}</h1>
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
    return <p>Access Denied</p>;

    /*
    const session = await getServerSession()

    */
}
