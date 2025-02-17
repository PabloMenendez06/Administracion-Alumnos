'use strict';

import mongoose, { mongo } from "mongoose";

export const dbConection = async () => {
    try{
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | try coneccting');
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | conected to MongoDB');
        })
        mongoose.connection.on('open', ()=>{
            console.log('MongoDB | conected to database');
        })
        mongoose.connection.on('reconnected', ()=>{
            console.log('MongoDB | reconnected to MongoDB');
        })
        mongoose.connection.on('desconected', ()=>{
            console.log('MongoDB | disconnected');
        })

        mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,

        })
    }catch(error){
        console.log('DataBase connection failed',error);
    }
}