import Script from "next/script";
import "./globals.css";
import { Special_Elite } from "next/font/google";

const specialElite = Special_Elite({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <Script src="https://unpkg.com/@phosphor-icons/web" />
            </head>
            <body className={`${specialElite.className} bg-gray-100 text-gray-700`}>
                {children}
            </body>
        </html>
    );
}
