import React from "react";
import { FaFacebook, FaInstagramSquare, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Facebook, X, Insta, Github } from "../Index";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t-2 border-gray-400">
        <div className="flex items-center md:block">
          <div className=" mb-4 ">
            <img
              src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
              alt=""
              className="h-[70px] w-[80px] md:h-20"
            />
          </div>
          <p className="mb-4 text-sm">© 2024 Foody Limited</p>
          <div className="flex space-x-4">
            <a href="#" className="block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                className="h-10"
              />
            </a>
            <a href="#" className="block">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/2560px-Download_on_the_App_Store_RGB_blk.svg.png"
                alt="App Store"
                className="h-10"
              />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-black">Company</h3>
          <ul className="space-y-2 text-gray-700">
            {["About Us", "News", "Careers", "Team", , ,].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline text-sm">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2  text-black">Contact us</h3>
          <ul className="space-y-2  text-gray-700">
            {["Help & Support", "Partner with us", "Ride with us"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:underline text-sm">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-black">Available in:</h3>
          <ul className="space-y-2  text-gray-700">
            {[
              "Kolkata",
              "Bangalore",
              "Gurgaon",
              "Hyderabad",
              "Delhi",
              "Mumbai",
              "Pune",
            ].map((city) => (
              <li key={city}>
                <a href="#" className="hover:underline text-sm">
                  {city}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className=" flex items-center justify-center mt-5 pt-4 text-xl gap-5">
        <div className="font-bold">Social Links:</div>
        <Facebook />
        <Insta />
        <X />
        <Github />
      </div>
    </footer>
  );
};

export default Footer;
