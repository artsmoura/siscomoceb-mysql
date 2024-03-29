import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import "./file64.css";

const File64 = (props) => {
    const [baseImage, setBaseImage] = useState("");
    const dispatch = useDispatch();

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);

        dispatch(props.action({
            target: { name: 'image', value: base64 }
        }));

    };


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className={props.className} alt={props.alt}>
            <label htmlFor="file-upload" className={`label ${props.className}`} text={props.text}>
                {props.label && props.label}
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={(e) => {
                    uploadImage(e);
                }}
            />
            {
                baseImage ? <img src={baseImage} /> : <BiUser />
            }
        </div>
    );
};

export default File64;