"use client"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

const CCTVPage = () => {
    const [rooms, setRooms] = useState([]);
    const [cctvURL, setCctvURL] = useState("");

    useEffect(() => {
        const getRooms = async () => {
            try {
                const resp = await fetch("/api/cctv", {
                    method: 'GET'
                });
                const rooms = await resp.json();
                setRooms(rooms.rooms);
            } catch (error) {

            }
        }

        getRooms();
    }, []);

    const getCCTV = async(kelas: string) => {
        try {
            const resp = await fetch("/api/cctv/" + kelas);
            const cctv = await resp.json();
            setCctvURL(cctv.cctv);
        } catch (error) {
            
        }
    }

    const onRoomChange:ChangeEventHandler<HTMLSelectElement> = (e:ChangeEvent<HTMLSelectElement>) => {
        getCCTV(e.target.value);
    }

    return (
        <div className="bg-slate-200 p-5 rounded max-w-lg m-auto flex flex-col gap-5 mt-20">
            <div className="flex gap-2">
                <label htmlFor="room">Room</label>
                <div>:</div>
                <select className="w-full" id="room" onChange={onRoomChange}>
                    <option>Select Room</option>
                    {rooms.map(r => (
                        <option value={r} key={r}>{r}</option>
                    ))}
                </select>
            </div>
            {cctvURL === "" ? null :
                <div className="p-2 border rounded border-black">
                    <a href={cctvURL} target="_blank">{cctvURL}</a>
                </div>
            }
        </div>
    )
};

export default CCTVPage;