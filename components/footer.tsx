import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <footer className="bg-lime-950 text-white w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-36 py-6">
        <div className="flex justify-center md:justify-start w-full mb-6 md:mb-0">
          <img className="h-6" src="images/logo.svg" alt="Logo" />
        </div>

        <div className="flex flex-col items-center md:items-start w-full mb-6 md:mb-0">
          <h4 className="text-lg pb-4">Urmărește-ne</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="YouTube">
              <YouTubeIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start w-full">
          <h4 className="text-lg pb-4">Linkuri utile</h4>
          <ul className="list-none">
            <li>
              <a href="#">Termeni și condiții</a>
            </li>
            <li>
              <a href="#">Politică de cookies</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center py-3">
        © <span id="currentYear">2024</span> Trailventure. Toate drepturile
        rezervate.
      </div>
    </footer>
  );
}
