import { Image, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ImageUpload = ({ callback = ()=>{}, preview, removeCallback=()=>{} }) => {
    const inputRef = useRef();
    const [ image, setImage ] = useState(null);
    const [ previewImage, setPreviewImage ] = useState(null)

    useEffect(() => {
        callback(image);
    }, [image])

    useEffect(() => {
        setPreviewImage(preview);
    }, [preview])
    
    return (
        <div className="image border h-[180px] rounded-2xl flex-center relative overflow-hidden">
            <div onClick={() => inputRef.current.click()} className="trigger h-full w-full flex-center flex-col">
                <Image size={100} strokeWidth={0.5}/>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" ref={inputRef}  className="h-0 w-0" />
                <div className="text-xs text-center font-light">Click to upload image</div>
            </div>
            
            {image && 
                <div className="absolute top-0 left-0 hw-full bg-red-400">
                    <img src={URL.createObjectURL(image)} className="object-cover hw-full" />
                    <div className="absolute top-0 right-0">
                        <div onClick={() => setImage(null)} className="h-[40px] w-[40px] scale-90 rounded-full bg-red-500 text-white flex-center">
                            <X />
                        </div>
                    </div>
                </div>
            }

            {previewImage && !image && 
                <div className="absolute top-0 left-0 hw-full bg-red-400">
                    <img src={previewImage} className="object-cover hw-full" />
                    <div className="absolute top-0 right-0">
                        <div onClick={() => {removeCallback(); setPreviewImage(null)}} className="h-[40px] w-[40px] scale-90 rounded-full bg-red-500 text-white flex-center">
                            <X />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}