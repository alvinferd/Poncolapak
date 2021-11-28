import * as React from 'react'
import { Box, Card, CardContent, Checkbox, Grid, IconButton, Typography, Link as MUILink, Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import MyCart from '../utils/dummy/MyCart'
import { AllCheckerCheckbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import styles from '../styles/cart.module.css'
import { green } from '@mui/material/colors'
import { Checkbox as GRCheckBox } from '@createnl/grouped-checkboxes';
import Image from 'next/image'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useRouter } from "next/router"
import { useSelector } from "react-redux";
import ApiURL from '../utils/constant'
import { dispatch } from '../utils/redux/store';
import { cartCentangCheckout, cartGetData, cartGetDataCheck, cartDeleteProduct, cartUnCentangCheckout } from '../utils/redux/slice/cart';

const useStyles = makeStyles({
    root: {
        boxShadow: "1px 2px 4px 1px rgba(0,0,0,0.4)"
    }
});

const label = { inputProps: { 'aria-label': 'Checkbox Keranjang' } };



export default function CartCard() {
    const MyCart = useSelector((state) => state.cart.data.Carts);
    const MyCartCheckout = useSelector((state) => state.cart.dataCheck);
    // console.log(MyCartCheckout);

    // OBJEK JUMLAH BARANG
    const firstJumlahBarang = {};
    MyCart.map(item => {
        firstJumlahBarang[item.id] = 1;
    });
    // console.log(firstJumlahBarang)

    const [jumlahBarang, setJumlahBarang] = React.useState(firstJumlahBarang);

    const inc = (event, id, price) => {
        let newJumlahBarang = { ...jumlahBarang };
        newJumlahBarang[id] += 1;
        setJumlahBarang(newJumlahBarang);

        if (checkedArray[id] == true) {
            setTotalHarga(totalHarga + price)
        }
        // console.log(newJumlahBarang);
    }

    const dec = (event, id, price) => {
        let newJumlahBarang = { ...jumlahBarang };
        if (jumlahBarang[id] > 1) {
            newJumlahBarang[id] -= 1;
        }

        if (checkedArray[id] == true) {
            setTotalHarga(totalHarga - price)
        }
        setJumlahBarang(newJumlahBarang);
        // console.log(newJumlahBarang);
    }

    const handleChange = (event, id, price) => {
        let newJumlahBarang = { ...jumlahBarang };

        if (Number(event.target.value) < 1) {
            newJumlahBarang[id] = 1;
        } else {
            newJumlahBarang[id] = Number(event.target.value);
        }
        setJumlahBarang(newJumlahBarang);

        if (checkedArray[id] == true) {
            setTotalHarga(totalHarga - price * (jumlahBarang[id] - Number(event.target.value)))
        }
        // console.log(newJumlahBarang);
    }

    // OBJEK CHECKBOX BARANG
    const [checkedArray, setCheckedArray] = React.useState({});
    // const data = useSelector((state) => state.cart.data)

    const toggleCheckbox = (e, id) => {
        const ch = e.target.checked;
        if (id == 'allcheck') {
            if (ch) {
                let newCheckedArray = { ...checkedArray };
                let newTotalHarga = totalHarga;
                MyCart.map(item => {
                    if (newCheckedArray[item.id] != true) {
                        newTotalHarga += item.price * jumlahBarang[item.id];
                        newCheckedArray[item.id] = true;
                    }
                });
                setCheckedArray(newCheckedArray);
                setTotalHarga(newTotalHarga);
                // console.log(checkedArray);
            } else {
                let newCheckedArray = { ...checkedArray };
                let newTotalHarga = totalHarga;
                MyCart.map(item => {
                    newCheckedArray[item.id] = false;
                    newTotalHarga -= item.price * jumlahBarang[item.id];
                });
                setCheckedArray(newCheckedArray);
                setTotalHarga(newTotalHarga);
                // console.log(checkedArray);

            }
        } else {
            if (ch) {
                dispatch(cartCentangCheckout(id));
                // dispatch(cartGetDataCheck());
                // let newCheckedArray = { ...checkedArray };
                // newCheckedArray[id] = true;
                // setCheckedArray(newCheckedArray);
                // setTotalHarga(totalHarga + price * jumlahBarang[id]);
                // console.log(checkedArray);
            } else {
                dispatch(cartUnCentangCheckout(id));
                // dispatch(cartGetDataCheck());
                // let newCheckedArray = { ...checkedArray };
                // newCheckedArray[id] = false;
                // setCheckedArray(newCheckedArray);
                // setTotalHarga(totalHarga - price * jumlahBarang[id]);
                // console.log(checkedArray);
            }
        }
        // dispatch(cartGetData());
    }

    const deleteProduct = (id) => {
        // console.log(data);
        dispatch(cartDeleteProduct(id));
    };

    // OBJEK TOTAL HARGA
    const [totalHarga, setTotalHarga] = React.useState(0);

    const router = useRouter();
    const classes = useStyles();

    return (
        <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12} md={8} lg={8}>
                <Card className={classes.root} sx={{ maxWidth: 1151 }} style={{ height: '100%', boxShadow: 3 }} >
                    <CardContent style={{ height: '100%' }}>
                        <Grid container rowSpacing={{ xs: 4, xl: 5 }} columnSpacing={2}>
                            <CheckboxGroup>
                                <Grid item xs={12}>
                                    <Grid container spacing={0} direction="row" alignItems="center">
                                        <Grid item xs={0.75}>
                                            <Grid container spacing={0} justifyContent="center">
                                                <AllCheckerCheckbox className={styles.cb}
                                                    onChange={(e) => {
                                                        toggleCheckbox(e, 'allcheck');
                                                    }} />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography variant="h6">
                                                Semua barang
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {MyCart.map((product) => {
                                    return (
                                        <Grid item xs={12} key={product.id}>
                                            {/* <ItemCart id={product.id} images={product.images[0]} name={product.name} price={product.price} seller={product.seller} /> */}
                                            <Grid container columnSpacing={2} direction="row">
                                                <Grid item xs={1} >
                                                    <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                                                        <GRCheckBox
                                                            id={product.id}
                                                            checked={product.checkout}
                                                            onChange={(e) => {
                                                                toggleCheckbox(e, product.id);
                                                            }}
                                                            className={styles.cb} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} lg={2.5} xl={1.75} sx={{ position: 'relative' }}>
                                                    <Image
                                                        src={ApiURL + product.imageUrl}
                                                        alt={product.namaItem}
                                                        // height={175}
                                                        // width={175}
                                                        layout='fill'
                                                        objectFit='fill'
                                                    />
                                                </Grid>
                                                <Grid item xs={6.75} lg={7} xl={8.25}>
                                                    <Grid container columnSpacing={2} direction="column" >
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                <b>{product.namaItem}</b>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1" gutterBottom>
                                                                {product.namaToko}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1" color="text.quaternary" gutterBottom>
                                                                {product.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container spacing={0} direction="row" alignItems="center">
                                                                <Grid item>
                                                                    <IconButton aria-label="add" color="success"
                                                                        onClick={(e) => {
                                                                            dec(e, product.id, product.totalPrice);
                                                                        }}
                                                                        disabled={product.quantity <= 1}>
                                                                        <RemoveCircleIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Box sx={{ width: 70, maxWidth: '100%' }}>
                                                                        <TextField id="product-count" type="number" variant="outlined" size="small" color="secondary" fullWidth value={product.quantity}
                                                                            onChange={(e) => {
                                                                                handleChange(e, product.id, product.totalPrice);
                                                                            }}
                                                                            // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                            InputLabelProps={{
                                                                                style: { color: '#000000' },
                                                                            }} />
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item>
                                                                    <IconButton aria-label="add" color="success"
                                                                        onClick={(e) => {
                                                                            inc(e, product.id, product.totalPrice);
                                                                        }}>
                                                                        <AddCircleIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={1.25} lg={1}>
                                                    <IconButton aria-label="remove from cart" color='error' sx={{ paddingTop: 0 }}
                                                        onClick={() => deleteProduct(product.id)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </CheckboxGroup>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.root} sx={{ maxWidth: 461 }} style={{ height: 'fit-content', boxShadow: 3 }} >
                    <CardContent style={{ height: 'fit-content', display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "center" }}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom>
                                    <b> Checkout Barang</b>
                                </Typography>
                            </Grid>
                            {MyCartCheckout.Carts.map(item => {
                                return (
                                    <Grid item key={item.id} display={item.checkout}>
                                        <Typography>
                                            {item.namaItem} (x{item.quantity})
                                        </Typography>
                                    </Grid>
                                )
                            })}
                            <Grid item>
                                <Box sx={{ width: '100%', height: 3, backgroundColor: '#000000' }}>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography>
                                            <b>Total Harga</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="text.quaternary">
                                            <b>{MyCartCheckout.totalHarga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="center">
                                    <Button variant="contained" color="secondary" size="large" onClick={() => router.push(`/cart/pay`)} disabled={MyCartCheckout.totalHarga == 0}>
                                        Bayar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    )
}