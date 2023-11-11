import useTelegramAuth from "@use-telegram-auth/hook";

function Telegram() {
  const BOT_ID = "6932897811";

  const { onAuth, isLoading } = useTelegramAuth(
    BOT_ID,
    {},
    {
      onSuccess: (response) => {
        console.log(response);
        return response;
      },
      onError: (err) => {
        console.log(err);
      },
    },
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
