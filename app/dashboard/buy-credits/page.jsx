"use client"
import React, {useState, useContext} from 'react';
import {PayPalButtons} from "@paypal/react-paypal-js";
import { db } from '../../../config/db';
import { Users } from '../../../config/schema';
import { UserDetailContext } from '../../_context/UserDetailContext';
import { useRouter } from 'next/navigation';


function BuyCredits() {

    const [selectedOption, setSelectedOption]=useState([]);
    const {userDetail, setUserDetail}=useContext(UserDetailContext);
    const router=useRouter();
    const creditsOptions = [
        { 
            credits:5, 
            amount:0.99
        },
        {
            credits:10,
            amount:1.99
        },
        {
            credits:25,
            amount:3.99
        },
        {
            credits:50,
            amount:6.99 
        },
        {
            credits:100,
            amount:9.99
        },
    ]

    const onPaymentSuccess=async()=>{
        console.log("payment Success...")
        const result=await db.update(Users).set({
            credits: userDetail?.credits+selectedOption?.credits
        }).returning({id:Users.id});

        if(result)
            {
                setUserDetail(prev=>({
                    ...prev,
                    credits:userDetail?.credits+selectedOption?.credits
                }))
            router.push('/dashboard');
        }
    }
        return (
            <div>
                <div className="text-2xl font-bold text-center mb-6">
                    Buy More Credits
                </div>
                <div className="flex flex-row gap-4 justify-center">
                    {creditsOptions.map((item, index) => (
                        <div key={index} className="card bg-base-100 w-48 p-4 shadow-xl">
                            <div className="card-body p-4 place-items-center">
                                <h2 className="card-title">
                                    {item.credits} credits
                                    </h2>
                                <p>for ${item.amount}</p>
                                <button className="btn btn-primary"
                                onClick={() => setSelectedOption(item)}>
                                    Buy
                                </button>
                        </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-4 px-4">
                    {selectedOption?.amount&&
                    <PayPalButtons style={{layout:"horizontal", width:
                        "100%"}}
                        onApprove={()=>onPaymentSuccess()}
                        onCancel={()=>console.log("Payment Cancelled")}
                        createOrder={(data, actions) => {
                            return actions?.order.create({
                                purchase_units:[
                                    {
                                        amount:{
                                            value:selectedOption?.amount?.toFixed(2),
                                            currency_code:"USD"
                                        }
                                    }
                                ]
                            })
                        }} 
                        />
                    }
                </div>

            </div>
        )
    }

    export default BuyCredits;