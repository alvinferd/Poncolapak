import * as React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import { useRouter } from "next/dist/client/router"
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        boxShadow: "1px 2px 4px 1px rgba(0,0,0,0.4)"
    }
});

export default function CardWisata({ id, images, name, description, price, rating }) {
    const classes = useStyles();
    const router = useRouter();
    return (
        <Card className={classes.root} sx={{ maxWidth: 554 }} style={{ height: '100%', boxShadow: 3 }} onClick={() => router.push(`/products/${name}`)}>
            <CardActionArea sx={{ height: "inherit", display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', }}>
                <CardMedia
                    component="img"
                    image={images}
                    alt={name}
                    height={228}
                />
                <CardContent style={{ height: 'inherit',  width:'inherit', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                        <Typography gutterBottom variant="body1" component="div" fontWeight="500">
                            {name}
                        </Typography>
                        <Box sx={{ height: "fit-content" }}>
                            <Typography
                                sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                }}
                                varian
                                variant="body2" color="text.primary" gutterBottom>
                                {description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.quaternary" gutterBottom>
                            {price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </Typography>
                        <Box display="flex" justifyContent="flex-start" flexDirection="row">
                            <StarBorderOutlinedIcon fontSize="small" sx={{ color: "#FFF626" }} />
                            <Typography variant="body2" color="text.primary" sx={{ paddingInline: 0.5 }}>
                                {rating.toFixed(1)} / 5.0
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
