import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PlayersBio`.
 */
export type PlayersBioProps = SliceComponentProps<Content.PlayersBioSlice>;

/**
 * Component for "PlayersBio" Slices.
 */
const PlayersBio: FC<PlayersBioProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for players_bio (variation: {slice.variation})
      Slices
    </section>
  );
};

export default PlayersBio;
