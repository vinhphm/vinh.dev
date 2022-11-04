import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@/css/docsearch.css'
import '@docsearch/css'
import '@fontsource/inter/variable-full.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics analyticsConfig={siteMetadata.analytics} />
      <SearchProvider searchConfig={siteMetadata.search}>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </SearchProvider>
    </ThemeProvider>
  )
}
