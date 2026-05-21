"use client";

import React, { useState, useContext } from 'react';
import ImageSelection from './_components/ImageSelection';
import RoomType from './_components/RoomType';
import DesignType from './_components/DesignType';
import AdditionalReq from './_components/AdditionalReq';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebaseConfig";
import { useUser } from "@clerk/nextjs";
import CustomLanding from './_components/CustomLanding';
import AiOutputDialog from './_components/AiOutputDialog';
import { db } from '../../../config/db';
import { Users } from '../../../config/schema';
import { UserDetailContext } from '../../_context/UserDetailContext';

function CreateNew() {
    const { user } = useUser();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [aiOutputImage, setAiOutputImage] = useState();
    const [openOutputDialog, setOpenOutputDialog] = useState(false);
    const [orgImage, setOrgImage] = useState();
    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    const onHandleInputChange = (value, fieldName) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    };

    const generateAIImage = async () => {
        setLoading(true);

        try {
            const rawImageUrl = await saveRawImageToFirebase();

            const result = await axios.post('/api/interior-ai', {
                imageUrl: rawImageUrl,
                roomType: formData?.roomType,
                designType: formData?.designType,
                additionalReq: formData?.additionalReq,
                userEmail: user?.primaryEmailAddress?.emailAddress
            });

            setAiOutputImage(result.data.result)
            await updateUserCredits();
            setOpenOutputDialog(true);
            setLoading(false);
            console.log("result", result.data);
        } catch (error) {
            console.error("Error generating AI image:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveRawImageToFirebase = async () => {
        const fileName = `${Date.now()}_raw.png`;
        const imageRef = ref(storage, `interior-ai/${fileName}`);

        await uploadBytes(imageRef, formData.image);
        console.log('File uploaded...')
        const downloadUrl = await getDownloadURL(imageRef);
        console.log(downloadUrl);
        setOrgImage(downloadUrl);
        return downloadUrl;
    };

    const updateUserCredits=async()=>{
        const result=await db.update(Users).set({
            credits:userDetail?.credits-1
        }).returning({id:Users.id});

        if(result)
            {
                setUserDetail(prev=>({
                    ...prev,
                    credits:userDetail?.credits-1
                }))
                return result[0].id
            }
        }

    return (
        <div>
            <h2
                style={{
                    color: 'purple',
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    textAlign: 'center'
                }}
            >
                Create AI Interior
            </h2>

            {loading?(<CustomLanding />)
            :(

            <div className="grid grid-cols-2 gap-8 p-6">
                <div className="p-4...">
                    <ImageSelection
                        selectedFile={(value) =>
                            onHandleInputChange(value, 'image')
                        }
                    />
                </div>

                <div className="rounded-lg...">
                    <RoomType
                        selectedRoomType={(value) =>
                            onHandleInputChange(value, 'roomType')
                        }
                    />

                    <DesignType
                        selectedDesignType={(value) =>
                            onHandleInputChange(value, 'designType')
                        }
                    />

                    <AdditionalReq
                        AdditionalReqInput={(value) =>
                            onHandleInputChange(value, 'additionalReq')
                        }
                    />

                    <button
                        onClick={generateAIImage}
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? "Generating..." : "Generate"}
                    </button>

                    <p className="text-gray-500">
                        Each generation costs one credit
                    </p>
                </div>
                <AiOutputDialog
                    openDialog={openOutputDialog}
                    setOpenDialog={setOpenOutputDialog}
                    orgImage={orgImage}
                    aiImage={aiOutputImage}
                />
            </div>
            )}
            </div>
    );
}

export default CreateNew;