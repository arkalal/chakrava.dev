import { Inter } from "next/font/google";
import "./globals.scss";
import StyleRegistry from "../../utils/StyleRegistry";
import { Provider } from "../../Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chakrava.Dev",
  description: "Generative AI and UI Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleRegistry>
          <Provider>{children}</Provider>
        </StyleRegistry>
      </body>
    </html>
  );
}
