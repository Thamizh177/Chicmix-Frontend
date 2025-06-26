import { Honk } from "next/font/google";

const honk = Honk({
  subsets: ['latin'],
  weight: ['400'],
});

const Dcoversized = () => {
  return (
    <div className={`${honk.className} flex items-center justify-center text-5xl lg:text-9xl mb-[350px] pt-[100px]`}>
      <h2>Coming soon</h2>
    </div>
  );
}

export default Dcoversized;