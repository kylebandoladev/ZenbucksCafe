import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="my-5 flex flex-row items-center justify-between mx-30">
      <p>© 2025 Zenbucks. All Rights reserved.</p>
      <div className="flex gap-2">
        <a href="#">
          <Facebook />
        </a>
        <a href="#">
          <Instagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
