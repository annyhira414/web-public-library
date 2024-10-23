import React, {FC} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {ISlider} from "@/lib/model/slider";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Keyboard, Pagination, Scrollbar} from "swiper/modules";
import {useMediaQuery} from "usehooks-ts";

interface sliderItemProps {
  sliderData: ISlider[];
}

const Slider: FC<sliderItemProps> = ({sliderData}) => {
  const width = useMediaQuery("(min-width: 768px)");

  return (
    <>
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
            delay: 3000, // 3 seconds in miliseconds
            pauseOnMouseEnter: true,
            // disableOnInteraction: false,
          }}
        >
          {sliderData?.map((item: ISlider, index: number) => {
            const BGImg = width
              ? item?.image_url?.desktop_image
              : item?.image_url?.tab_image;

            return (
              <SwiperSlide key={index} className="">
                {BGImg !== null && (
                  <div className="text-white h-[500px] w-full relative">
                    <Image
                      src={BGImg}
                      alt={`Slider Image ${index + 1}`}
                      fill
                      priority={true}
                    />
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
