import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";
import { metadata } from "@/constants/metadata";
import { NextSeo } from "next-seo";
import { setApiOptions } from "@skip-go/client";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  setApiOptions({
    apiUrl: "https://go.skip.build/api/skip/",
  });
  return (
    <>
      <NextSeo
        title={metadata.name}
        description={metadata.description}
        openGraph={{
          title: metadata.name,
          description: metadata.description,
          type: "website",
          site_name: metadata.name,
          images: metadata.images,
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: metadata.twitter.username,
          site: metadata.twitter.username,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Analytics />
    </>
  );
}
