import { ThemeProvider } from '@emotion/react'
import { Container, Typography, Link as MUILink, Box } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import GridCategory from '../components/gridCategory'
import ListCardProduct from '../components/listCardProducts'
import ListCardWisata from '../components/listCardWisata'
import Layout from '../layout/default'
import theme from '../themes/default'
import { CarouselItems } from '../utils/dummy/Carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Head>
          <title>Poncolapak</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="1788px" id="carousel-images" sx={{ height: { xl: "668px" }, width: { xl: "1788px" }, marginY: 4 }}>
          <Carousel autoPlay infiniteLoop interval={3000} showStatus={false} showThumbs={false} >
            {CarouselItems.map(item => {
              return (
                <div key={item.id} style={{ position: 'relative', borderRadius: '50px', overflow: 'hidden' }}>
                  <Image src={item.img}
                    alt={item.name}
                    height={668}
                    width={1788}
                  />
                  <div className={styles.legend}>
                    <Typography fontSize="36px" fontFamily="Poppins" color="#FFFFFF">
                      {item.name}
                    </Typography>
                    <Typography fontSize="28px" fontFamily="Poppins" color="#FFFFFF">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              )
            })}
          </Carousel>
        </Container>
        <Container maxWidth="1920" id="list-product" sx={{ width: "fit-content", marginX: 4, marginY: 4 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Produk
          </Typography>
          <ListCardProduct />
          <Box display="flex" flexDirection="row" justifyContent="right">
            <Link href="/products" passHref >
              <MUILink variant="h6" underline="none" color="text.tertiary">
                Lihat lebih banyak
              </MUILink>
            </Link>
          </Box>
        </Container>
        <Container maxWidth="1920" id="list-kategori" sx={{ width: "fit-content", marginX: 4, marginTop: 4, marginBottom: 8 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Kategori
          </Typography>
          <GridCategory />
        </Container>
        <Container maxWidth="1920" id="list-wisata" sx={{ width: "fit-content", marginX: 4, marginY: 4 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            Wisata
          </Typography>
          <ListCardWisata />
          <Box display="flex" flexDirection="row" justifyContent="right">
            <Link href="/wisata" passHref >
              <MUILink variant="h6" underline="none" color="text.tertiary">
                Lihat lebih banyak
              </MUILink>
            </Link>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  )
}