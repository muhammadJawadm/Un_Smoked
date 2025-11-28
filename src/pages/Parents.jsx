import { Link } from "react-router-dom";
import Header from "../layouts/partials/header";
import { Eye, User, Edit , Trash2} from "lucide-react"; 
import { useState } from "react";

export default function Parents() {
  const [parents, setParents] = useState([
  {
    id: 1,
    fullName: "Ahmed Raza",
    email: "ahmed.raza@gmail.com",
    phone: "+92 300 1234567",
    childrenCount: 2,
    milestonesCount: 15,
    gender: "Male",
  },
  {
    id: 2,
    fullName: "Fatima Noor",
    email: "fatima.noor@gmail.com",
    phone: "+92 321 9876543",
    childrenCount: 1,
    milestonesCount: 8,
    gender: "Female",
  },
  {
    id: 3,
    fullName: "Usman Ali",
    email: "usman.ali@gmail.com",
    phone: "+92 312 4567890",
    childrenCount: 3,
    milestonesCount: 22,
    gender: "Male",
  },
  {
    id: 4,
    fullName: "Ayesha Khan",
    email: "ayesha.khan@gmail.com",
    phone: "+92 333 1122334",
    childrenCount: 2,
    milestonesCount: 14,
    gender: "Female",
  },
  {
    id: 5,
    fullName: "Bilal Siddiqui",
    email: "bilal.s@gmail.com",
    phone: "+92 345 6677889",
    childrenCount: 1,
    milestonesCount: 6,
    gender: "Male",
  },
])
const [searchQuery , setSearchQuery] = useState("");

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const filteredParents = parents.filter(parent =>
  parent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  parent.email.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div>
      <Header header={"Manage Parents"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4">
          <div className="flex flex-wrap gap-4 justify-between bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-xs w-full">
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                  placeholder="Search users"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  //
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4">
              <button className="px-5 py-2 text-sm rounded-md font-medium text-white  shadow-sm" style={{ backgroundColor: '#836852' }}>Download CSV</button>
            </div>
          </div>
          <div className="my-4">
            <div className="relative overflow-x-auto bg-white sm:rounded-xl shadow ring-1 ring-gray-200">
              <table className="w-full min-w-[900px] text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Full Name
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3 hidden lg:table-cell">
                      Phone No
                    </th>
                    <th scope="col" className="px-3 md:px-4 py-3 text-center">
                      Children
                    </th>
                    <th scope="col" className="px-3 md:px-4 py-3 text-center hidden md:table-cell">
                      Milestones
                    </th>
                    <th scope="col" className="px-3 md:px-4 py-3 hidden xl:table-cell">
                      Gender
                    </th>
                    <th scope="col" className="px-4 md:px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredParents.length > 0 ? (
                  filteredParents.map((parent) => (
                    <tr key={parent.id} className="bg-white odd:bg-white even:bg-gray-50 hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                            alt="avatar" 
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-white shadow flex-shrink-0" 
                          />
                          <div className="min-w-0">
                            <h1 className="font-medium text-gray-900 truncate">{parent.fullName}</h1>
                            <p className="text-xs text-gray-500">Parent</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 max-w-full truncate">
                          {parent.email}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                          {parent.phone}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 w-7 h-7 text-xs font-semibold">
                          {parent.childrenCount}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-4 text-center hidden md:table-cell">
                        <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 w-7 h-7 text-xs font-semibold">
                          {parent.milestonesCount}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-4 hidden xl:table-cell">
                        <span className="text-gray-700">{parent.gender}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <Link 
                            to="/ParentProfile" 
                            className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 hidden md:block">
                              View Profile
                            </span>
                          </Link>
                          <Link 
                            to="/ParentEdit" 
                            className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 shadow-sm transition-all"
                          >
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 hidden md:block">
                              Edit Profile
                            </span>
                          </Link>
                           <button 
                            type="button" 
                            className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 shadow-sm transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 hidden md:block">
                              Delete Profile
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No parents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
