import Script from "next/script";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

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
            <body className={`${nunito.className} bg-gray-200 text-gray-700`}>
                {children}
            </body>
        </html>
    );
}
