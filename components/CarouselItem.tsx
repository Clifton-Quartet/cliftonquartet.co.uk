import { KeyTextField } from "@prismicio/client";

interface CarouselItemProps {
  artist: KeyTextField;
  song: KeyTextField;
  trackNumber: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  trackNumber,
  artist,
  song,
}) => {
  const track = trackNumber + 1;

  return (
    <div className="flex gap-2 items-center">
      <p className="ml-6 text-3xl text-white select-none">{track}.</p>
      <div className="flex justify-center">
        <p className="text-center text-white text-3xl whitespace-nowrap select-none mr-1">
          {artist}
        </p>
        <p className="mr-1 font-bold">{artist ? "-" : ""}</p>
        <p className="text-center text-white text-3xl whitespace-nowrap select-none">
          {song}
        </p>
      </div>
    </div>
  );
};

export default CarouselItem;
