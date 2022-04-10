import { extendTheme, theme as base } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `Open Sans, sans-serif, ${base.fonts?.heading}`,
    body: `Raleway, sans-serif, ${base.fonts?.body}`,
  },
  useSystemColorMode: false,
  initialColorMode: 'dark'
})

export default theme