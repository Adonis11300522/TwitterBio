import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState, Fragment } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
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
import { Chat } from "../components/Chat";

const channelData = [
  { address: "160 Park Ave, New York, NY", name: "Eleven Madison Park", count: "3", url: "https://www.elevenmadisonpark.com/" },
  { address: "115 Rua das Flores, Porto, Portugal", name: "Casa de Chá da Boa Nova", count: "2", url: "https://www.casadechadaboanova.pt/" },
  { address: "19/F, The Balcony, 535 Jaffe Rd, Causeway Bay, Hong Kong", name: "Ta Vie", count: "2", url: "https://tavie.hk/" },
  { address: "Pl. Brugmann 21, 1050 Ixelles, Belgium", name: "Bon-Bon", count: "2", url: "http://www.bon-bon.be/index.php" },
  { address: "Rua do Almada 151, 4050-037 Porto, Portugal", name: "Antiqvvm", count: "1", url: "https://antiqvvm.pt/en/" }
];

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [open, setOpen] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [showList, setShowList] = useState(false);
  const [visit, setVisit] = useState(false);

  const handleOpenDialog = () => setOpenDialog(!openDialog);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 1 : value);
  };

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `List the top 3 best recipes for ${bio}${bio.slice(-1) === "." ? "" : "."}
    `;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>ChefTalk</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="sm:text-4xl text-2xl max-w-[708px] font-bold text-slate-900">
          What are you eating?
        </h1>
        <div className="flex max-w-xl w-full items-center flex-col sm:flex-row mt-5">
          <div className="flex-auto w-full sm:w-80 sm:mr-5">
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-md border px-2 border-gray-300 focus:border-gray-600 focus-visible:border-gray-600 my-5 py-2"
            />
          </div>
          <div className="flex-auto w-full sm:w-20">
            {!loading && (
              <button
                className="bg-amber-500 rounded-md text-white font-medium py-2  hover:bg-amber-600/80 w-full"
                onClick={(e) => generateBio(e)}
              >
                Generate Recipes
              </button>
            )}
            {loading && (
              <Button
                className="bg-amber-500 rounded-md text-white font-medium py-2  hover:bg-amber-600/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </Button>
            )}
          </div>

        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="flex max-w-xl w-full items-center flex-col mt-5">
          <Fragment>
            {generatedBios
              .substring(generatedBios.indexOf("1") + 3)
              .split(/(?=\d)/)
              .filter(Boolean)
              .map((generatedBio, index) => {
                const firstWord = generatedBio.split(":")[0];
                const restOfBio = generatedBio.substring(
                  generatedBio.indexOf(":") + 1
                );
                return (
                  <Accordion open={open === index + 1} className="shadow-xl rounded-2xl my-5 px-2 t-accordion border">
                    <AccordionHeader className="relative w-full border-b-0 flex justify-between">
                      {open == index + 1 ? (
                        <span className="absolute top-0 left-5 py-2 px-2 bg-amber-600 font-semibold text-sm text-white rounded-b-full">{index > 9 ? index + 1 : ("0" + (index + 1).toString())}</span>
                      ) : (
                        <span className="absolute top-0 left-5 py-2 px-2 bg-purple-700 font-semibold text-sm text-white rounded-b-full">{index > 9 ? index + 1 : ("0" + (index + 1).toString())}</span>
                      )}
                      <div className="mt-5 text-base sm:text-lg text-left ml-2 w-80 accordion-header-title">{firstWord}</div>
                      {open == index + 1 ? (
                        <Button className="bg-amber-600 py-2 px-3 rounded-full text-white text-sm mr-2" onClick={() => handleOpen(0)}>Show Less</Button>
                      ) : (
                        <Button className="bg-purple-700 py-2 px-3 rounded-full text-white text-sm mr-2" onClick={() => handleOpen(index + 1)}>Learn More</Button>
                      )}
                    </AccordionHeader>
                    <AccordionBody className="px-5">
                      <div className="text-base sm:text-lg text-left ml-2 text-gray-800 font-semibold">About</div>
                      <div className="text-left mx-2 mt-2">{restOfBio}</div>
                      <div className="mt-5 mx-2 text-left flex flex-col sm:flex-row">
                        <Button className="bg-purple-700 py-2 px-3 rounded-md text-white text-sm mr-4 font-semibold my-1 sm:w-48 w-full" onClick={handleOpenDialog}>Find Nearby Restaurant</Button>
                        <Button className="bg-purple-700 py-2 px-3 rounded-md text-white text-sm mr-4 font-semibold my-1 sm:w-48 w-full" onClick={() => setShowList(!showList)}>Talk To Chef</Button>
                      </div>
                      {showList == true && (
                        <div className="mt-10">
                          <div className="text-base sm:text-lg text-left ml-2 text-gray-800 font-semibold mb-5">Discovery Channels</div>
                          <div>
                            {channelData.map((item, idx) => (
                              <Card className="max-w-full border relative my-5" key={`s${idx}`}>
                                <span className="absolute top-0 left-5 py-2 px-2 bg-amber-600 text-sm text-white rounded-b-full font-semibold">{idx > 9 ? idx + 1 : ("0" + (idx + 1).toString())}</span>
                                <CardBody className="flex justify-between items-center">
                                  <div className="mt-3 text-left">
                                    <small className="text-gray-500">Address : {item.address}</small>
                                    <div className="text-gray-800">{item.name}</div>
                                    <small className="text-gray-500">Review Count : {item.count}</small>
                                  </div>
                                  <Button className="bg-amber-600 py-2 px-3 rounded-lg text-white text-sm mt-5" onClick={() => setVisit(!visit)}>Visit</Button>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                      {visit == true && (
                        <div className="mt-10">
                          <div className="flex justify-between items-center mb-5">
                            <div className="text-base sm:text-lg text-left ml-2 text-gray-800 font-semibold">Talk to Chef</div>
                            <Button className="bg-purple-700 py-2 px-3 rounded-md text-white text-sm font-semibold" >Generate New Chef</Button>
                          </div>
                          <Chat />
                        </div>
                      )}
                    </AccordionBody>
                  </Accordion>
                );
              })}
          </Fragment>
        </div>
      </main>
      <Footer />
      <Dialog open={openDialog} handler={handleOpenDialog} size="xs">
        <DialogBody>
          <div className="text-xl font-semibold text-gray-800 mb-5">Upgrade to access Chefs & Ingredients</div>
          <div className="mt-80 mb-10">
            <Button className="bg-purple-700 py-2 px-3 rounded-md text-white text-sm mr-4 font-semibold" onClick={handleOpenDialog}>
              <span>Upgrade</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default Home;
