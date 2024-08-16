let cctv: string[][] = [];
let rooms: string[] = [];

try {
    cctv = JSON.parse(process.env.NEXT_PUBLIC_CCTV as string);
    rooms = JSON.parse(process.env.NEXT_PUBLIC_ROOMS as string)
} catch (error) {
    
}
let mappedCCTV: { [key: string]: string } = {};
const mapToRoom = () => {
    for (let index = 0; index < cctv.length; index++) {
        const cctvInfo = cctv[index];
        const room = cctvInfo[0];
        mappedCCTV[room] = cctvInfo[1];
    }
};

export const getCCTVByRoom = (room: string):string => {
    if (rooms.includes(room)) {
        return mappedCCTV[room];
    }
    return ""
};

mapToRoom();

export { rooms, cctv, mappedCCTV };
