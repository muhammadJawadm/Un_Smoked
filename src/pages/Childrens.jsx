import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import Header from "../layouts/partials/header";

export default function Childrens() {
  const [children, setChildren] = useState([
    { id: 'c1', childName: 'Alex Doe', parentName: 'Jane Doe', age: 6, gender: 'Male', milestones: 12, avatar: 'https://images.pexels.com/photos/3662556/pexels-photo-3662556.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c2', childName: 'Mia Doe', parentName: 'John Doe', age: 4, gender: 'Female', milestones: 9, avatar: 'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c3', childName: 'Noah Smith', parentName: 'Emma Smith', age: 7, gender: 'Male', milestones: 15, avatar: 'https://images.pexels.com/photos/5083011/pexels-photo-5083011.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c4', childName: 'Ava Johnson', parentName: 'Mark Johnson', age: 5, gender: 'Female', milestones: 11, avatar: 'https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c5', childName: 'Liam Brown', parentName: 'Sophia Brown', age: 6, gender: 'Male', milestones: 13, avatar: 'https://images.pexels.com/photos/4148866/pexels-photo-4148866.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c6', childName: 'Ella Davis', parentName: 'Olivia Davis', age: 3, gender: 'Female', milestones: 8, avatar: 'https://images.pexels.com/photos/3662838/pexels-photo-3662838.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 'c7', childName: 'Henry Wilson', parentName: 'Lucas Wilson', age: 7, gender: 'Male', milestones: 16, avatar: 'https://images.pexels.com/photos/3662555/pexels-photo-3662555.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ])
  const [searchQuery , setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredChildren = children.filter(child =>
    child.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header header={"Manage Children"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4">
          <div className="flex flex-wrap gap-4 justify-between bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-200">
            <div className="max-w-xs w-full">
              {/* <button className="rounded-md w-full sm:w-auto bg-orange-150 text-white px-6 py-2 text-lg font-medium capitalize">Add category</button> */}
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
                  placeholder="Search children"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  // required
                />
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4">
              <button className="px-5 py-2 text-sm rounded-md font-medium text-white  shadow-sm" style={{ backgroundColor: '#836852' }}>Download CSV</button>
              {/* <Filterdropdown /> */}
            </div>
          </div>
          <div className="my-4">
            <div className="relative overflow-x-auto bg-white sm:rounded-xl shadow ring-1 ring-gray-200">
              <table className="w-full min-w-[800px] text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3">Child Name</th>
                    <th className="px-4 md:px-6 py-3">Parent Name</th>
                    <th className="px-3 md:px-4 py-3 text-center hidden lg:table-cell">Age</th>
                    <th className="px-3 md:px-4 py-3 hidden xl:table-cell">Gender</th>
                    <th className="px-3 md:px-4 py-3 text-center">Milestones</th>
                    <th className="px-4 md:px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredChildren.length > 0 ? (
                  filteredChildren.map((row) => (
                    <tr key={row.id} className="bg-white odd:bg-white even:bg-gray-50 hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={row.avatar} 
                            alt={row.childName} 
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-white shadow flex-shrink-0" 
                          />
                          <div className="min-w-0">
                            <h1 className="font-medium text-gray-900 truncate">{row.childName}</h1>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-gray-700 truncate block">{row.parentName}</span>
                      </td>
                      <td className="px-3 md:px-4 py-4 text-center hidden lg:table-cell">
                        <span className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-700 w-7 h-7 text-xs font-semibold">
                          {row.age}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-4 hidden xl:table-cell">
                        <span className="text-gray-700">{row.gender}</span>
                      </td>
                      <td className="px-3 md:px-4 py-4 text-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-700 w-7 h-7 text-xs font-semibold">
                          {row.milestones}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <Link 
                            to={`/ChildView`} 
                            className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-10 hidden md:block">
                              View Profile
                            </span>
                          </Link>
                          <Link 
                            to={`/ChildEdit`} 
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
                  ))):(<tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No Children found matching your search.
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
