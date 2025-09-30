const Footer = () => {
  return (
    <footer className="container mx-auto text-center p-6">
      <div className="flex flex-col items-center justify-evenly md:flex-row">
        <a href="index.html">
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
              fontSize="32"
              textAnchor="middle"
              fill="url(#grad)">
              JobHunt
            </text>
          </svg>
        </a>
        <p className="text-xl text-gray-400">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
