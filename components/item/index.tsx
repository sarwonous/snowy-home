"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Indicator = ({ service }: any) => {
    const [status, setStatus] = useState("");
    const timer = useRef<any>();
    const getHealth = useCallback(async (app: string) => {
        try {
            const resp = await fetch(`/api/health/${app}`);
            const data = await resp.json();
            setStatus(data.health);
        } catch (error) {
            setStatus("");
        }
    }, []);

    const createInterval = useCallback(
        async (app: string): Promise<number> => {
            getHealth(app);
            return window.setInterval(async () => {
                await getHealth(app);
            }, 20000);
        },
        [getHealth]
    );

    useEffect(() => {
        if (service.check === "y") {
            timer.current = createInterval(service.name);
        }
        return () => {
            clearInterval(timer.current);
        };
    }, [createInterval, service.check, service.name]);

    if (status === "OK") {
        return (
            <div
                className={`absolute top-2 right-2 w-2 h-2 bg-green-700 rounded-full`}
            ></div>
        );
    } else if (status === "NOTOK") {
        return (
            <div
                className={`absolute top-2 right-2 w-2 h-2 bg-red-700 rounded-full`}
            ></div>
        );
    } else {
        return (
            <div
                className={`absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full`}
            ></div>
        );
    }
};

const Item = ({ item }: { item: any }) => {
    return (
        <div className="group w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/8 p-2">
            <a
                href={item.url}
                target="_blank"
                title={item.title}
                className="max-w-sm relative block cursor-pointer justify-center rounded-lg border border-gray-200 transition-all hover:border-black hover:-translate-y-1"
            >
                <Indicator service={item} />
                <div className="flex  flex-col items-center">
                    <div className="transition-all group-hover:scale-110 pt-5">
                        <i className={`ph ph-${item.icon} text-3xl`}></i>
                    </div>
                    <p className="w-full overflow-hidden truncate text-ellipsis text-center text-sm pl-5 pr-5 pb-5">
                        {item.title}
                    </p>
                </div>
            </a>
        </div>
    );
};

export default Item;