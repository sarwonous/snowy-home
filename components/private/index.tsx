"use client";
import { Session } from "next-auth";
import { useCallback, useEffect, useRef, useState } from "react";

const Indicator = ({
    service,
}: any) => {
    const [status, setStatus] = useState('');
    const timer = useRef<any>();
    const getHealth = useCallback(async (app: string) => {
        try {
            const resp = await fetch(`/api/health/${app}`);
            const data = await resp.json();
            setStatus(data.health);
        } catch (error) {
            setStatus('');
        }
    }, []);
    
    const createInterval = useCallback(async (app: string): Promise<number> => {
        getHealth(app);
        return window.setInterval(async () => {
            await getHealth(app);
        }, 20000);
    }, [getHealth]);

    useEffect(() => {
        if (service.check === 'y') {
            timer.current = createInterval(service.name);
        }
        return () => {
            clearInterval(timer.current);
        }
    }, [createInterval, service.check, service.name]);

    if (status === 'OK') {
        return <div className={`absolute top-2 right-2 w-2 h-2 bg-green-700 rounded-full`}></div>;
    } else if (status === 'NOTOK') {
        return <div className={`absolute top-2 right-2 w-2 h-2 bg-red-700 rounded-full`}></div>;
    } else {
        return <div className={`absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full`}></div>;
    }
}

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
                    <div key={k} className="group w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/12 p-2">
                        <a
                            href={i.url}
                            target="_blank"
                            title={i.title}
                            className="max-w-sm relative block cursor-pointer justify-center rounded-lg border border-gray-200 p-5 transition-all hover:bg-slate-800 hover:text-white"
                        >
                            <Indicator service={i} />
                            <div className="flex  flex-col items-center">
                                <div className="p-2 transition-all group-hover:scale-150">
                                    <i className={`ph ph-${i.icon}`}></i>
                                </div>
                                <p className="w-full overflow-hidden truncate text-ellipsis text-center text-sm">
                                    {i.title}
                                </p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Private;
