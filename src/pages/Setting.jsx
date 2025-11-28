import React, { useState } from 'react'
import Header from '../layouts/partials/header'
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import UserFeedBack from './UserFeedBack';

export default function Content() {
  const [activeTab, setActiveTab] = useState('privacy');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header header={"Manage Setting"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-3">
          <div className="flex flex-wrap gap-4 justify-start px-4 py-2" style={{ backgroundColor: '#F7F5F3' }}>
            <button 
              onClick={() => handleTabChange('privacy')} 
              className={`rounded-md w-full sm:w-auto text-sm px-6 py-2 font-medium capitalize transition-colors ${
                activeTab === 'privacy' 
                  ? 'text-white' 
                  : 'border border-gray-300 text-gray-700 hover:opacity-80'
              }`}
              style={activeTab === 'privacy' ? { backgroundColor: '#836852' } : { backgroundColor: '#F7F5F3' }}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleTabChange('terms')} 
              className={`rounded-md w-full sm:w-auto text-sm px-6 py-2 font-medium capitalize transition-colors ${
                activeTab === 'terms' 
                  ? 'text-white' 
                  : 'border border-gray-300 text-gray-700 hover:opacity-80'
              }`}
              style={activeTab === 'terms' ? { backgroundColor: '#836852' } : { backgroundColor: '#F7F5F3' }}
            >
              Terms and Conditions
            </button>
            <button 
              onClick={() => handleTabChange('feedback')} 
              className={`rounded-md w-full sm:w-auto text-sm px-6 py-2 font-medium capitalize transition-colors ${
                activeTab === 'feedback' 
                  ? 'text-white' 
                  : 'border border-gray-300 text-gray-700 hover:opacity-80'
              }`}
              style={activeTab === 'feedback' ? { backgroundColor: '#836852' } : { backgroundColor: '#F7F5F3' }}
            >
              Feedback
            </button>
          </div>
        </div>
        
        {activeTab === 'privacy' && <PrivacyPolicy />}
        {activeTab === 'terms' && <TermsAndConditions />}
        {activeTab === 'feedback' && <UserFeedBack />}
      </div>
    </div>
  )
}
