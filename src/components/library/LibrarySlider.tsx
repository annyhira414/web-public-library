import {Avatar, List, Typography} from "antd";
import React, {FC} from "react";
import {InputSearch, FieldLabel, Select} from "@/components/controls";
import {ILibaryList, ILibraryDetails} from "@/lib/model/library/index";
import Link from "next/link";
import {IoIosArrowForward} from "react-icons/io";
import {BsBuildings} from "react-icons/bs";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Keyboard, Pagination, Scrollbar} from "swiper/modules";
interface ILibrarySliderProps {
  LibraryDetails: ILibraryDetails;
}

export const LibrarySlider: FC<ILibrarySliderProps> = ({LibraryDetails}) => {
  return (
    <div className="mt-1 swiperColor">
      <Swiper
        spaceBetween={0}
        modules={[Autoplay, Keyboard, Pagination, Scrollbar]}
        navigation={true}
        mousewheel={true}
        loop={true}
        pagination={{clickable: true}}
        slidesPerView={1}
        autoplay={{
          delay: 2000, // 2 seconds in miliseconds
          pauseOnMouseEnter: true,
        }}
      >
        {LibraryDetails?.library_images?.map((item, index: number) => (
          <SwiperSlide key={index}>
            <div
              className={`text-white h-[500px] w-full bg-no-repeat bg-center bg-cover`}
              style={{
                backgroundImage: item?.large
                  ? `url(${item?.large})`
                  : `url('/images/contact-us.jpg')`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
