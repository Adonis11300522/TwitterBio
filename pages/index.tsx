import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogBody,
  Card,
  CardBody,
} from "@material-tailwind/react";


const Home: NextPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenRegister = () => setOpenRegister(!openRegister);
  const handleOpenLogin = () => setOpenLogin(!openLogin);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>ChefTalk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="sm:text-4xl text-2xl max-w-[708px] font-bold text-slate-900">
          10X Faster Meals with AI
        </h1>
        <div className="my-10 flex items-center justify-around max-w-md w-full">
          <Button className="bg-amber-600" onClick={handleOpenRegister}>Create Account</Button>
          <Button className="bg-amber-600" onClick={handleOpenLogin}>Login</Button>
        </div>
        <div className="max-w-md w-full">
          <img src="/banner.png" alt="banner" height={300} className="w-full rounded" />
        </div>
      </main>

      {/* Create Account Dialog Start*/}
      <Dialog open={openRegister} handler={handleOpenRegister} size="xs">
        <DialogBody>
          <div className="text-xl font-semibold text-gray-800 mb-5">Create Account</div>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 mb-2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Full Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Adonis Dev" />
              </div>
              <div className="w-full md:w-1/2 mb-2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="adonis11300522@gmail.com" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  Password
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  City
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                  State
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Zip
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
              </div>
            </div>
          </form>
          <div className="flex items-center justify-around">
          <Button className="border bg-white text-gray-500" onClick={handleOpenRegister}>Cancel</Button>
          <Button className="bg-amber-600" onClick={handleOpenRegister}>Register</Button>
          </div>
        </DialogBody>
      </Dialog>
      {/* Create Account Dialog End*/}

      {/* Login Dialog Start*/}
      <Dialog open={openLogin} handler={handleOpenLogin}>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
          reprehenderit omnis perspiciatis aut odit! Unde architecto
          perspiciatis, dolorum dolorem iure quia saepe autem accusamus eum
          praesentium magni corrupti explicabo!
        </DialogBody>
      </Dialog>
      {/* Login Dialog End*/}
      <Footer />
    </div>
  );
};

export default Home;
