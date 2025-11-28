import React, { useState } from 'react'
import Header from '../layouts/partials/header'
import { Link } from 'react-router-dom'

export default function Faqs() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      title: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
      date: "08/08/24 - 2:30 PM"
    },
    // Add more sample FAQs as needed
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [currentFaq, setCurrentFaq] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    answer: ''
  })
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpenAddModal = () => {
    setIsEditing(false)
    setIsViewing(false);
    setFormData({ title: '', answer: '' })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (faq) => {
    setIsEditing(true)
    setCurrentFaq(faq)
    setIsViewing(false);
    setFormData({ title: faq.title, answer: faq.answer })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsViewing(false);
    setCurrentFaq(null)
    setFormData({ title: '', answer: '' })
  }
  
  const handleViewModal=(faq) => {
    setIsModalOpen(true)
    setIsEditing(false);
    setCurrentFaq(faq);
    setIsViewing(true);
    setFormData({ title: faq.title, answer: faq.answer });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredFaqs = faqs.filter(faq => 
    faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing) {
      // Update existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === currentFaq.id 
          ? { ...faq, title: formData.title, answer: formData.answer }
          : faq
      ))
    } else {
      // Add new FAQ
      const newFaq = {
        id: Date.now(),
        title: formData.title,
        answer: formData.answer,
        date: new Date().toLocaleString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      setFaqs([...faqs, newFaq])
    }
    
    handleCloseModal()
  }

  return (
    <div>
      <Header header={"Manage FAQs"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-3">
          <div className="flex flex-wrap gap-4 justify-between px-4 py-2" style={{ backgroundColor: '#F7F5F3' }}>
            <div className="max-w-xs w-full">
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
                  style={{ backgroundColor: '#FFFFFF' }}
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4">
              <button 
                onClick={handleOpenAddModal}
                className="px-5 py-2 text-xs rounded-md font-medium text-white"
                style={{ backgroundColor: '#836852' }}
              >
                Add FAQ
              </button>
            </div>
          </div>
          <div className="my-3">
            <div className="relative overflow-x-auto drop-shadow-xl sm:rounded-lg" style={{ backgroundColor: '#F7F5F3' }}>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase border-b-2 bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      answer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <tr key={faq.id} className="bg-white border-b hover:bg-gray-150/30">
                        <td className="px-6 py-4">
                          {faq.title}
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          {faq.answer}
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          {faq.date}
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button onClick={()=>handleViewModal(faq)} className="font-medium text-gray-150 bg-gray-150 px-3 py-0.5 rounded-md hover:text-gray-250 bg-opacity-10">view</button>
                          <button 
                            onClick={() => handleOpenEditModal(faq)}
                            className="font-medium text-green-500 bg-green-500 px-3 py-0.5 rounded-md hover:text-green-600 bg-opacity-10"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No FAQs found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#F7F5F3' }}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {isViewing ? 'View FAQ' : isEditing ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Question/Title
                </label>
                {isViewing ? (<h2>{formData.title}</h2>) : (
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                  style={{ backgroundColor: '#FFFFFF' }}
                  placeholder="Enter FAQ question..."
                  required
                />)}
              </div>

              <div className="mb-6">
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                {isViewing ? (<p>{formData.answer}</p>) : ( 
                <textarea
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                  style={{ backgroundColor: '#FFFFFF' }}
                  placeholder="Enter FAQ answer..."
                  required
                />)}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#F7F5F3' }}
                >
                  Cancel
                </button>
                {isViewing ? null : ( 
                <button
                  type="submit"
                  className="px-5 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#836852' }}
                >
                  { isEditing ? 'Update FAQ' : 'Add FAQ'}
                </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
