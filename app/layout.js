import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import Provider from './provider';

export const metadata = {
  title: 'Interior AI',
  description: 'AI-powered interior design app',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Provider>
          {children}
          </Provider>
        </body>
    </html>
    </ClerkProvider>
  );
}


