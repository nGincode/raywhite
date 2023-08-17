/* eslint-disable @next/next/no-img-element */
export default function login({ submitLogin }: any) {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-32 rounded-xl w-auto" src="data:image/png;base64,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" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={submitLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5  px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}