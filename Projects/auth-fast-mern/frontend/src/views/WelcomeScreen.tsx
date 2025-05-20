import { LogoutIcon } from "../assets";
import { useAuth } from "../hooks/useAuth";
const WelcomeScreen = () => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-700 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <img
        src={LogoutIcon}
        alt=""
        className="absolute top-0 right-0 m-4 invert cursor-pointer"
        onClick={logout}
      />
      <div className="w-full max-w-7xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left side - Hero content */}
        <div className="w-full lg:w-1/2 bg-white p-8 lg:p-16 relative z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-90 z-0"></div>
          <div className="relative z-10">
            <div className="mb-10">
              <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
                Connect Instantly
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience real-time communication with a modern, secure
                messaging platform designed for today's connected world.
              </p>

              <div className="space-y-5 mb-12">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">
                    Lightning-fast messaging across devices
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">
                    End-to-end encryption for total privacy
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">
                    Seamless group conversations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Interactive demo */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">ChatApp</h3>
                    <p className="text-indigo-200 text-xs">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div className="bg-white/20 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-white">
                      Hey! Have you tried the new ChatApp yet?
                    </p>
                    <p className="text-xs text-indigo-200 mt-1">11:42 AM</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                    <p className="text-white">
                      I'm using it right now! The UI is beautiful.
                    </p>
                    <p className="text-xs text-indigo-100 mt-1">11:44 AM</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div className="bg-white/20 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-white">
                      The end-to-end encryption makes it super secure too!
                    </p>
                    <p className="text-xs text-indigo-200 mt-1">11:45 AM</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                    <p className="text-white">
                      Absolutely! Let's invite the others to join.
                    </p>
                    <p className="text-xs text-indigo-100 mt-1">11:47 AM</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    B
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-white/10 border border-indigo-300/30 rounded-full py-3 px-5 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
