import Link from "next/link";
import React,{FC} from "react";
// import { Image } from "antd";
import { useRouter } from "next/router";
import image from "../../../public/beAmember.jpg";
// import image from "../../../public/images/about-us.jpg";
import Image from "next/image";

interface AddBannerProps{
    image_url?: any;
    width:number;
    height:number;

}
export const AddBanner:FC<AddBannerProps> = ( {
     image_url,
     height,
     width
    //bannerItem
})=>{
    const { locale } = useRouter();

    return(
        <>
        <Link href={"#"} />
        <div className="w-full h-52" > 
        <Image className="p-4 " src={image} fill={true} alt=""/>
        </div>
        {/* <Image preview={false}  src={image} width={1096} height={200} alt=""/> */}
        </>
    )
}
