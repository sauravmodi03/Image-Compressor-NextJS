import { useEffect, useState } from "react"

export default function ImagePreview({imageFile} : {imageFile : any}) {
  
    const [imageURL, setImageURL] = useState<any>();

    useEffect(() => {
        if(!imageFile) return;
        const url = URL.createObjectURL(imageFile);
        setImageURL(url);
        return () => { url && URL.revokeObjectURL(url)};
    }, [imageFile]);
  
    return imageFile ? (
        <div className="flex flex-col p-2 text-white justify-center items-center">
          <img className="w-10 h-10 duration-200" src={imageURL} alt="" />
          <p className="">{`${(imageFile.size / 1024 / 1024).toFixed(2)} MB`}</p>
        </div>
  ) : null
}
