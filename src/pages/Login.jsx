
import { Link } from "react-router-dom"

export default function Login() {

  return (
    <div className="h-screen">
      <div className="h-full w-full  relative">
        <img className="h-full w-full object-cover" alt="background" src="https://images.pexels.com/photos/65911/winter-nature-season-trees-65911.jpeg" />
        <div className="absolute top-0 w-full h-full">
          <div className="bg-gray-100 w-full backdrop-blur-3xl h-full bg-opacity-30">
            <div className="w-full h-full flex justify-center items-center">
              <div className="max-w-md mx-auto bg-white bg-opacity-10 border-2 border-gray-500 border-opacity-30 drop-shadow-xl shadow-xl w-full p-5 rounded-md py-10 space-y-3 md:space-y-5">
                <h1 className="text-center text-4xl font-bold text-gray-950">Mood Prints</h1>
                {/* {error && <div className="p-4 mb-4 text-sm font-medium text-red-800 rounded-lg bg-red-200 bg-opacity-25" role="alert">
                  {error}
                </div>
                } */}
                <h2 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h2>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input
                      type="email"
                      // ref={emailRef} 
                      name="email"
                      id="email"
                      className="bg-transparent outline-none border focus:ring-1 border-gray-500 border-opacity-30 text-gray-900 placeholder:text-gray-700 sm:text-sm rounded-lg focus:ring-gray-250 focus:border-gray-250 block w-full p-2.5" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                      type="password"
                      // ref={passwordRef}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-transparent outline-none border focus:ring-1 border-gray-500 border-opacity-30 text-gray-900 placeholder:text-gray-700 sm:text-sm rounded-lg focus:ring-gray-250 focus:border-gray-250 block w-full p-2.5" required />
                  </div>
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-start">
                    </div>
                    <Link to='/forget-password' className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                  </div>
                  <Link to={'/'}>
                    <button type="button" className="w-full text-white bg-gray-250 hover:bg-gray-150 focus:ring-1 focus:outline-none focus:ring-gray-250 font-semibold rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                  </Link>
                  {/* {loading ?
                    <button disabled className="w-full text-white bg-gray-250 hover:bg-gray-150 focus:ring-1 focus:outline-none focus:ring-gray-250 font-semibold rounded-lg text-sm px-5 py-2.5 text-center">Loading...</button>
                    :
                  } */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
