import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cartAdd } from '../redux/actions';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Detail() {
  let { id } = useParams();
  let [food, setfood] = useState([]);
  const[isLoading, setIsLoading]=useState(true);
  const dispatch = useDispatch();

  console.log(food)

  //Un get aca??? no deberias usar los actions?
  useEffect(() => {
    // eslint-disable-next-line
    const getFoodDetail = async () => {
      try {
        setIsLoading(true)
        const api = await axios.get(
          `${
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3001/'
              : 'https://vino-rojo-restaurant.onrender.com/'
          }foods/${id}`
        );
       
        const response = await api.data;
         setfood(response)
      } catch (error) {
        console.log("Ha ocurrido un error", error)
      }finally{
        setIsLoading(false)
      }
    };
    getFoodDetail();
    // eslint-disable-next-line
  }, []);

  //const btn = document.querySelector("button")
  const post = document.querySelector('.post');
  const widget = document.querySelector('.star-widget');
  //const editBtn = document.querySelector(".edit")

  //"w-[750px] h-[350px] bg-white shadow-[0_8px_16px_-8px_rgba(0,0,0,0.4)] rounded-[30px] relative text-center hover:w-100% flex block"
  return (
    <div className='py-5 flex-1 flex flex-col justify-center'>
      {/**Card */}
      <div className="h-full flex justify-center items-center lg:mb-20 ">
        <div className="w-10/12 max-w-[320px] mx-auto flex flex-col items-center rounded-md bg-white md:flex-row md:max-w-none md:rounded-bl-md  lg:max-w-[680px] ">
          <div className="h-[150px] w-full rounded-md flex flex-col justify-center md:h-[178px] md:flex-1 md:rounded-bl-md">
           {isLoading ? <p className='text-center'>Cargando Imagen..</p> :  <img
              className={`rounded-t-md w-full h-full object-center ${food.type === 'Vinos' ? 'object-contain': 'object-cover'} md:rounded-bl-md md:rounded-tr-none`}
              src={food.image}
              alt="product_image"
            />}
          </div>

          <div className="m-2 flex-[2]">
            <div className="text-2xl grid justify-items-center underline underline-offset-4 font-bold text-center">
              <h1 className=" animate__animated animate__pulse animate__infinite	infinite  animate__delay-3s">
                {food.name}
              </h1>
            </div>

            <div className=" h-[60%] py-4 px-3 flex justify-center ">
              <span className="tracking-wide text-center">
                {food.description}
              </span>
            </div>

            <div className="flex justify-around items-center sm:flex-wrap gap-3 p-2">
              <div className='flex-1 flex justify-center'>
                <Link to={'/'}>
                  <button className="text-white bg-[#720f10] hover:bg-[#c51b1e] p-[5px] rounded-lg ">
                    Seguir Comprando
                  </button>
                </Link>
              </div>

              <div className="flex justify-around flex-1">
                <div className="bg-[#720f10] rounded-full text-white grid content-center px-2 ">
                  ${food.price}
                </div>

                <div className="">
                  <div>
                    <button
                      onClick={() => {
                        dispatch(cartAdd(food));
                      }}
                      className="text-white bg-[#720f10] hover:bg-[#c51b1e] p-[5px] rounded-lg"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAR */}
      <div className="hidden animate__animated animate__lightSpeedInLeft  animate__delay-2">
        <form action="#" className="container-star ">
          <div className="post">
            <div className="text">Gracias por tu calificacion!</div>
            <div
              className="edit"
              onClick={() => {
                widget.style.display = 'block';
                post.style.display = 'none';
                return false;
              }}
            >
              EDIT
            </div>
          </div>
          <div className="star-widget">
            <input value={5} type="radio" name="rate" id="rate-5" />
            <label htmlFor="rate-5">
              <FaStar />
            </label>
            <input value={4} type="radio" name="rate" id="rate-4" />
            <label htmlFor="rate-4">
              <FaStar />
            </label>
            <input value={3} type="radio" name="rate" id="rate-3" />
            <label htmlFor="rate-3">
              <FaStar />
            </label>
            <input value={2} type="radio" name="rate" id="rate-2" />
            <label htmlFor="rate-2">
              <FaStar />
            </label>
            <input value={1} type="radio" name="rate" id="rate-1" />
            <label htmlFor="rate-1">
              <FaStar />
            </label>
            <form action="#">
              <header></header>
              <div className="textarea">
                <textarea
                  cols="30"
                  placeholder="Describe que te parecio..."
                ></textarea>
              </div>
              <div className="btn">
                <button
                  type="submit"
                  onClick={() => {
                    widget.style.display = 'none';
                    post.style.display = 'block';
                    return false;
                  }}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
}

//animate__animated animate__tada animate__infinite	infinite  animate__delay-2s
