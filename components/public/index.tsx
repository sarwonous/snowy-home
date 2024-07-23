"use client";

export const Public = ({
    data
}: { data: any[] }) => {
    console.log('[data]', data)
    return (
        <div className="m-auto flex min-h-screen w-full sm:w-[760px]">
            <div className="flex w-full items-center justify-center">
                <div className="w-full">
                    <h1 className="cursor-default text-center text-5xl">
                        @sarwonou<a href="/api/auth/signin" title="Go">s</a>
                    </h1>
                    <div className="flex justify-center p-5">
                        {data.map((i: any, k: number) => (
                            <div
                                key={k}
                                className="group m-2 w-1/12 cursor-pointer p-2 transition-all hover:scale-110"
                            >
                                <a href={i.url} target="_blank">
                                    <div className="flex flex-col items-center">
                                        <div className="p-1 transition-all group-hover:scale-150">
                                            <i
                                                className={`ph text-3xl ph-${i.name}`}
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
                </div>
            </div>
        </div>
    );
};

export default Public;
