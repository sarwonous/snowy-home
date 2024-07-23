
export const private_sheet_url: string = process.env.NEXT_PUBLIC_SHEET_URL ?? "";
export const public_sheet_url: string = process.env.NEXT_PUBLIC_SHEET_PUBLIC_URL ?? "";

export const blogApiUrl: string = process.env.NEXT_PUBLIC_BLOG_API_URL ?? "";

const csv2json = (csvString: string): any => {
    const json: any[] = [];
    const csvArray = csvString.split("\n").filter(Boolean);
    const csvColumns = (csvArray.shift()?.trim().split(",") ?? []).map(a => a.toLowerCase());

    csvArray.forEach(function (csvRowString) {
        const csvRow = csvRowString.split(",");
        const jsonRow: any = {};
        for (let colNum = 0; colNum < csvRow.length; colNum++) {
            const colData = csvRow[colNum].replace(/^['"]|['"]$/g, "").trim();
            jsonRow[csvColumns[colNum]] = colData;
        }
        json.push(jsonRow);
    });
    return json;
};

export const getData = async (url: string, reload: boolean = false):Promise<any[]> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "text/csv;charset=UTF-8",
            },
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const respData = await response.text();
        return csv2json(respData);
    } catch (error) {
        console.log(error);
        return [];
    }
};

let tools:null | any[] = null;

export const getPrivateList = async (reload: boolean = false) => {
    console.log(`\x1b[42m ${JSON.stringify(tools)} \x1b[0m`);
    if (!reload && tools !== null) {
        return tools;
    }
    tools = await getData(private_sheet_url);
    return tools;
}

let publicLinks:null | any[] = null;

export const getPublicList = async (reload: boolean = false) => {
    console.log(`\x1b[42m ${JSON.stringify(publicLinks)} \x1b[0m`);
    if (!reload && publicLinks !== null) {
        return publicLinks;
    }
    publicLinks = await getData(public_sheet_url);
    return publicLinks;
}

export const getHealth = async (type: string, name: string) => {
    const data = type === 'private' ? await getPrivateList() : await getPublicList();
    const entry = (data ?? []).find(a => a.name === name);
    const urlHealth = entry?.['health check'];
    console.log(`\x1b[44m ${name} ${JSON.stringify(entry)} \x1b[0m`);
    
    if (urlHealth && urlHealth !== "") {
        try {
            const resp = await fetch(urlHealth);
            console.log(`\x1b[45m ${JSON.stringify(resp.status)} \x1b[0m`);
            return "OK";
        } catch (error) {
            console.log('a', error);
            return "NOTOK";
        }
    } else {
        return null;
    }
}