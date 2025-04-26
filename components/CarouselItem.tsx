import { KeyTextField } from "@prismicio/client";

interface CarouselItemProps {
  artist: KeyTextField;
  song: KeyTextField;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ artist, song }) => {
  return (
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center">
        <p className="text-center text-white text-3xl whitespace-nowrap select-none">
          {artist}
        </p>
        <p className="text-center text-white text-6xl whitespace-nowrap select-none">
          {song}
        </p>
      </div>
      <div className="mr-6 text-3xl select-none">&#9830;</div>
    </div>
  );
};

export default CarouselItem;
