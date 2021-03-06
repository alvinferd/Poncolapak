import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseApi from '../../api';
import { loadingSet } from './loading';
import { alertSetError, alertSetMessage, alertSetSuccess } from './alert';
import router from 'next/router';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        makeOrder: [],
        lastConfirmedOrder: [],
        allMyOrder: [],
        myFinishedOrder: [],
        allMyItemOrder: [],
    },
    reducers: {
        makeOrderSet: (state, action) => ({
            ...state,
            makeOrder: action.payload ?? [],
        }),
        lastConfirmedOrderSet: (state, action) => ({
            ...state,
            lastConfirmedOrder: action.payload ?? [],
        }),
        allMyOrderSet: (state, action) => ({
            ...state,
            allMyOrder: action.payload ?? [],
        }),
        myFinishedOrderSet: (state, action) => ({
            ...state,
            myFinishedOrder: action.payload ?? [],
        }),
        allMyItemOrderSet: (state, action) => ({
            ...state,
            allMyItemOrder: action.payload ?? [],
        }),
    }
});

export const { makeOrderSet, lastConfirmedOrderSet, allMyOrderSet, myFinishedOrderSet, allMyItemOrderSet } = orderSlice.actions;
export default orderSlice.reducer;

export const createNewOrder = createAsyncThunk(
    'order/createNewOrder',
    async (data, { dispatch }) => {
        dispatch(loadingSet(true));
        return baseApi
            .post("/api/v1/order/makeOrder", data)
            .then((res) => {
                dispatch(lastConfirmedOrderSet(res));
                router.push("/profile");
                dispatch(alertSetSuccess(true));
                dispatch(alertSetMessage("Pemesanan Berhasil, silahkan upload bukti pembayaran pada Laman Profile!"))
            })
            .catch((err) => {
                dispatch(alertSetError(true));
                dispatch(alertSetMessage(err.message));
            })
            .finally(() => {
                dispatch(loadingSet(false));
            })
    }
)

export const getAllMyOrder = createAsyncThunk(
    'order/getAllMyOrder',
    async (_, { dispatch }) => {
        dispatch(loadingSet(true));
        return baseApi
            .get("/api/v1/order/UserOrder",)
            .then((res) => {
                // console.log(res);
                dispatch(allMyOrderSet(res.Orders));
            })
            .catch((err) => {
                dispatch(alertSetError(true));
                dispatch(alertSetMessage(err.message));
            })
            .finally(() => {
                dispatch(loadingSet(false));
            })
    }
)

export const getMyFinishedOrder = createAsyncThunk(
    'order/getMyFinishedOrder',
    async (_, { dispatch }) => {
        dispatch(loadingSet(true));
        return baseApi
            .get("/api/v1/order/UserOrderItemPerStatus/4",)
            .then((res) => {
                // console.log(res);
                dispatch(myFinishedOrderSet(res.OrderItems));
            })
            .catch((err) => {
                dispatch(alertSetError(true));
                dispatch(alertSetMessage(err.message));
            })
            .finally(() => {
                dispatch(loadingSet(false));
            })
    }
)

export const getMyItemOrder = createAsyncThunk(
    'order/getMyItemOrder',
    async (_, { dispatch }) => {
        dispatch(loadingSet(true));
        return baseApi
            .get("/api/v1/order/UserOrderItem",)
            .then((res) => {
                console.log(res);
                dispatch(allMyItemOrderSet(res.OrderItems))
            })
            .catch((err) => {
                dispatch(alertSetError(true));
                dispatch(alertSetMessage(err.message));
            })
            .finally(() => {
                dispatch(loadingSet(false));
            })
    }
)