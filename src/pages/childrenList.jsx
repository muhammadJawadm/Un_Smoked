import Header from '../layouts/partials/header'

export default function ChildrenList() {
  return (
    <div>
      <Header header={"User Details"} link={'/users'} arrow={true} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-3">
          <div className='space-y-1.5'>
            <div className='bg-white px-4 rounded-md'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-sm py-2 cursor-pointer border-b border-gray-250 font-medium'>Artist Information</h3>
                  {/* <h3 className='text-sm py-2 cursor-pointer hover:border-b hover:text-gray-250 hover:border-b-gray-250'>Shows</h3>
                  <h3 className='text-sm py-2 cursor-pointer hover:border-b hover:text-gray-250 hover:border-b-gray-250'>Chats</h3> */}
                </div>
                <div>
                  <button className='px-5 py-1 border text-sm text-gray-250 rounded-md font-semibold'>Block</button>
                </div>
              </div>
            </div>
            <div className='bg-white max-w-2xl px-4 xl:px-6 py-5'>
              <div className='flex items-center gap-4'>
                <div>
                  <img className='w-16 h-16 rounded-full ring-2 ring-gray-250 object-cover border' src='https://images.pexels.com/photos/7289120/pexels-photo-7289120.jpeg?auto=compress&cs=tinysrgb&w=600' alt='users' />
                </div>
                <div>
                  <h2 className='text-xl font-semibold'>Jane Doe</h2>
                  <p className='text-xs text-gray-600'>Jane@singit.com</p>
                </div>
              </div>
            </div>
            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <div>
                  <h5 className='uppercase text-xl font-bold'>Personal Information</h5>
                </div>
              </div>
              <div className='px-4 xl:px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
                <div>
                  <p className='text-xs text-gray-600'>Date of Birth</p>
                  <h6 className='text-sm font-medium'>October 22, 2023</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Address</p>
                  <h6 className='text-sm font-medium'>Florida, California</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Insurance</p>
                  <h6 className='text-sm font-medium'>None</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Gender</p>
                  <h6 className='text-sm font-medium'>Male</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Phone Number</p>
                  <h6 className='text-sm font-medium'>+546736748565</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Registered On</p>
                  <h6 className='text-sm font-medium'>October 22, 2023</h6>
                </div>
              </div>
            </div>
            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <div>
                  <h5 className='uppercase text-xl font-bold'>Therapist Information</h5>
                </div>
              </div>
              <div className='px-4 xl:px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
                <div>
                  <p className='text-xs text-gray-600'>First Name</p>
                  <h6 className='text-sm font-medium'>Jane</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Last Name</p>
                  <h6 className='text-sm font-medium'>Doe</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Country</p>
                  <h6 className='text-sm font-medium'>Netherland</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>State</p>
                  <h6 className='text-sm font-medium'>Netherland</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>City</p>
                  <h6 className='text-sm font-medium'>Netherland</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Registered On</p>
                  <h6 className='text-sm font-medium'>October 22, 2023</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
