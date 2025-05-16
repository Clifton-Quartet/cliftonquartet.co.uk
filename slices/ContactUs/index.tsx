import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>;

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs: FC<ContactUsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for contact_us (variation: {slice.variation}) Slices
    </section>
  );
};

export default ContactUs;
