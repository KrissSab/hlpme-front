import useTelegramAuth from "@use-telegram-auth/hook";
import { URL } from "../constants";
import axios from "axios";

async function handleSuccess(response) {
  localStorage.setItem("isAuthenticated", true);
  localStorage.setItem("userId", response["id"]);
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
      <div className="flex h-[123px] items-center justify-center">
        <button
          className="flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-2xl text-white duration-300 hover:bg-blue-700"
          onClick={() => onAuth()}
        >
          {isLoading ? "Authenticating..." : "Sign up with Telegram"}
        </button>
      </div>
    </>
  );
}
export default Telegram;
