import React from "react";
import "./Tutor.css";
import logo from "../../assets/logo.svg";
import key from "../../assets/key.svg";
import Bar from "../Bar/Bar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import phone1 from '../../assets/phone-1.png'
import phone from '../../assets/Phone.svg'
import ProfileHint from '../../assets/ProfileHint.svg'
import FindHint from '../../assets/FindHint.svg'
import Profile from '../../assets/Профиль.svg'
import arrow from '../../assets/arrowProfile.svg'
import woman from '../../assets/woman.png'

const Tutor = () => {
  return (
    <div className="container">
      <Swiper
        className="sample-slider"
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}

      >
        <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <div className="welcome-container">
            <h1 className="welcome">Добро пожаловать в Younite</h1>
            <img src={key} alt="" className="welcome-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
        <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <h4 className="hint-1">
            Что бы запустить поиск, надо создать хотя бы один профиль
          </h4>
          <a href="/createprofile"><button className="button">Создать аккаунт</button></a>
          </SwiperSlide>
          <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <img src={phone1} className="phone" />
          <p className="textPhone">Поисковой профиль это данные о вашей команде (пати), с которой вы собираетесь запустить поиск</p>
          </SwiperSlide>
          <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <img src={phone} alt="" className="phone"/>
          <p className="textPhone">Поисковой профиль находится на вкладке профиль</p>
          <img src={ProfileHint} className="ProfileHint" />
          </SwiperSlide>
          <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <img src={phone} alt="" className="phone"/>
          <p className="textPhone">После создания профиля жми на вкладку “Поиск”</p>
          <img src={FindHint} className="FindHint" />
          </SwiperSlide>
          <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <p className="textPhone">Данные поиска автоматически заполнятся на основе профиля, но так же можно изменить данные поиска</p>
          <img src={Profile} className="phone1"/>
          <img src={arrow} className="arrow" />
          </SwiperSlide>
          <SwiperSlide className="slide">
          <h2 className="title">Туториал</h2>
          <img src={logo} alt="logo  younite" className="logo-younite" />
          <img src={woman} className="bg" />
          <h1 className="h1">
          Good luck! <br />Have fun!
          </h1>
          </SwiperSlide>
      </Swiper>
      <Bar />
    </div>
  );
};

export default Tutor;
