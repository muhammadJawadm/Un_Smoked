import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { RiSoundModuleLine } from 'react-icons/ri'

export default function ChartFilter() {
  return (
    <div className=''>
      <Menu as="div" className="relative inline-block w-full sm:w-auto text-left">
        <div className='w-full'>
          <Menu.Button className="inline-flex w-full justify-center items-center space-x-2 rounded-md font-semibold bg-gray-250 px-4 py-2 text-sm  text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <RiSoundModuleLine className='' />
            <p>Filter</p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {/* <MdViewWeek className='mr-1' /> */}
                    Listings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {/* <MdViewWeek className='mr-1' /> */}
                    Captains
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Exploreres
                  </button>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    
                  </button>
                )}
              </Menu.Item> */}
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    All Time - all time
                  </button>
                )}
              </Menu.Item> */}
            </div>
            {/* <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                Search by Email
              </button>
            )}
          </Menu.Item>
        </div> */}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
