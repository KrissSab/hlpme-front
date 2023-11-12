import useTelegramAuth from "@use-telegram-auth/hook";
import TelegramLogo from "./telegram-logo.svg";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

async function handleSuccess(response) {
  localStorage.setItem("isAuthenticated", true);
  localStorage.setItem("userId", response["id"]);
  toast.success("Successfully authenticated!", {
    duration: 5000,
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  document.getElementById("redirect").click();
}

function Telegram() {
  const BOT_ID = "6932897811";
  const handlers = {
    onSuccess: async (response) => await handleSuccess(response),
    onError: (err) => {
      console.log(err);
    },
  };
  const { onAuth, isLoading } = useTelegramAuth(
    BOT_ID,
    { requestAccess: "write" },
    handlers,
  );

  return (
    <>
      <div>
        <Toaster />
      </div>

      <div className="flex h-[123px] items-center justify-center">
        <button
          className="flex items-center justify-center 
          rounded-xl border-2 bg-white px-4 py-2 text-2xl
        text-slate-500/25 duration-300 hover:scale-125 
        hover:border-slate-500/25 hover:bg-slate-500/25 hover:text-white
        active:scale-100
        "
          onClick={() => onAuth()}
        >
          {isLoading ? (
            "Authenticating..."
          ) : (
            <span className="flex gap-3">
              <img
                className="w-[32px]"
                src={TelegramLogo}
                alt="Telegram logo"
              />
              Sign in with Telegram{" "}
            </span>
          )}
        </button>
      </div>
      <Link to="/" id="redirect" hidden>
        Go to New Route
      </Link>
    </>
  );
}

export default Telegram;
