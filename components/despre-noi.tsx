import React from "react";

export default function DespreNoi() {
  return (
    <div className="flex justify-center items-center px-36 py-12 bg-lime-950 max-md:px-5 ">
      <div className="mt-7 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
            <img
              className="shrink-0 mx-auto max-w-full rounded-xl bg-zinc-300 h-[380px] w-[568px] max-md:mt-10"
              src="\images\about-us.avif"
              alt="despre-noi"
            />
          </div>
          <div className="flex flex-col ml-12 w-[45%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col   text-white max-md:mt-10 max-md:max-w-full">
              <div className="text-4xl leading-10 max-md:max-w-full">
                Despre noi
              </div>
              <div className="mt-9 text-base leading-5 max-md:max-w-full">
                Fondată de către o echipă de pasionați de natură și tehnologia,
                Trailventure îmbină expertiza noastră în domeniile aventurii în
                aer liber și tehnologiei pentru a vă oferi o experiență completă
                și satisfăcătoare în timpul fiecărei aventuri de hiking. Suntem
                oameni obișnuiți care împărtășesc aceeași pasiune pentru
                explorare și aventură ca și dumneavoastra.
                <br />
                Trailventure nu este doar o aplicație de navigare pe trasee;
                este o comunitate și o resursă completă pentru toți cei care
                iubesc să exploreze natura. De la trasee bine documentate și
                recenzii ale utilizatorilor la sfaturi practice și instrumente
                de navigare avansate, vă punem la dispoziție tot ce aveți nevoie
                pentru a vă bucura de aventurile în aer liber în cel mai plin
                mod posibil.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
