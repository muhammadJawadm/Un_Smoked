import { Mail, Calendar, MapPin, User, Users, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../layouts/partials/header'

export default function ChildProfile() {
  const child = {
    id: 'c1',
    name: 'Alex Doe',
    age: 6,
    gender: 'Male',
    dob: 'May 12, 2019',
    parentName: 'Jane Doe',
    email: 'alex@family.com',
    address: 'Florida, California',
    milestones: 12,
    avatar: 'https://images.pexels.com/photos/3662556/pexels-photo-3662556.jpeg?auto=compress&cs=tinysrgb&w=600',
  }

  return (
    <div>
      <Header header={'Child Profile'} link={'/TotalChildren'} arrow={true} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-4 space-y-4">
          {/* Header card */}
          <div className='bg-white px-5 py-5 rounded-xl shadow ring-1 ring-gray-200'>
            <div className='flex items-center gap-4'>
              <img className='w-16 h-16 rounded-full ring-2 ring-white object-cover shadow' src={child.avatar} alt='child' />
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>{child.name}</h2>
                <div className='mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-700'>
                  <span className='inline-flex items-center gap-1'><Users className='w-4 h-4' /> Parent: {child.parentName}</span>
                  <span className='inline-flex items-center gap-1'><BadgeCheck className='w-4 h-4' /> Milestones: {child.milestones}</span>
                </div>
              </div>
              <div className='ml-auto'>
                <Link 
                  to={`/children/${child.id}/edit`} 
                  className="px-4 py-2 text-sm rounded-md font-medium text-white hover:opacity-80 shadow-sm"
                  style={{ backgroundColor: '#836852' }}
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className='mt-5 grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Age</p>
                <div className='mt-1 text-sm font-medium text-gray-900'>{child.age}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Gender</p>
                <div className='mt-1 text-sm font-medium text-gray-900'>{child.gender}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Date of Birth</p>
                <div className='mt-1 flex items-center gap-1 text-sm font-medium text-gray-900'><Calendar className='w-4 h-4' /> {child.dob}</div>
              </div>
              <div className='rounded-lg bg-gray-50 p-3'>
                <p className='text-xs text-gray-600'>Address</p>
                <div className='mt-1 flex items-center gap-1 text-sm font-medium text-gray-900'><MapPin className='w-4 h-4' /> {child.address}</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className='bg-white rounded-xl shadow ring-1 ring-gray-200'>
            <div className='border-b px-5 py-3 flex items-center gap-2'>
              <User className='w-5 h-5 text-gray-700' />
              <h5 className='uppercase text-sm tracking-wide font-bold text-gray-900'>Child Information</h5>
            </div>
            <div className='px-5 py-6 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
              <div>
                <p className='text-xs text-gray-600'>Parent Name</p>
                <h6 className='text-sm font-medium'>{child.parentName}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Email</p>
                <h6 className='text-sm font-medium'>{child.email}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Total Milestones</p>
                <h6 className='text-sm font-medium'>{child.milestones}</h6>
              </div>
              <div>
                <p className='text-xs text-gray-600'>Address</p>
                <h6 className='text-sm font-medium'>{child.address}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
