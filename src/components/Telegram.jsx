import useTelegramAuth from "@use-telegram-auth/hook";
import axios from "axios";
import { URL } from "../constants"

async function handleSuccess(response) {
  console.log(response);
  const url = "https://http.cat/200";
  const body = JSON.stringify(response);
  console.log(body);
  try {
    let apiResponse = await axios.get(URL + "/docs");
    if (apiResponse.status === 200) {
      localStorage.setItem("isAuthentifited", true)
    }
  } catch (err) {
    console.log(err);
  }
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
