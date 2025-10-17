import {
  FaAndroid,
  FaApple,
  FaFacebook,
  FaX,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="border-[1px] border-gray-100 my-20"></div>
      <div className="flex flex-col items-center justify-evenly gap-4 md:flex-row">
        <a className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 120"
            width="200"
            height="120"
            role="img"
            aria-label="JobHunt logo">
            <defs>
              <linearGradient
                id="grad"
                x1="0"
                x2="1">
                <stop
                  offset="0"
                  stopColor="#0ea5e9"
                />
                <stop
                  offset="1"
                  stopColor="#bae6fd"
                />
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="50%"
              fontFamily="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight="700"
              fontSize="44"
              textAnchor="middle"
              fill="url(#grad)">
              JobHunt
            </text>
          </svg>
        </a>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-xl">JobHunt</li>
            <li className="capitalize hover:underline">About /Press</li>
            <li className="capitalize hover:underline">Awards</li>
            <li className="capitalize hover:underline">Blog</li>
            <li className="capitalize hover:underline">Contact</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-xl">Employers</li>
            <li className="capitalize hover:underline">
              Ge a FREE employer account
            </li>
            <li className="capitalize hover:underline">Employer Center</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-xl">Information</li>
            <li className="capitalize hover:underline">Help</li>
            <li className="capitalize hover:underline">Guidelines</li>
            <li className="capitalize hover:underline">Term of Use</li>
            <li className="capitalize hover:underline">
              Privacy and Ad Choices
            </li>
            <li className="capitalize hover:underline">Do not sell or share</li>
            <li className="capitalize hover:underline">My information</li>
            <li className="capitalize hover:underline">Cookie consent tool</li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li className="font-bold text-xl">Work with Us</li>
            <li className="capitalize hover:underline">Careers</li>
          </ul>
        </div>
      </div>
      <div className="border-[2px] border-gray-200 mt-20"></div>
      <div className="flex flex-col items-center justify-center gap-2 py-6 md:flex-row">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-slate-500">Download the App</h2>
          <FaAndroid size={22} />
          <FaApple size={22} />
        </div>
        <div className="flex items-center justify-center gap-3"></div>
      </div>
    </footer>
  );
};

export default Footer;
