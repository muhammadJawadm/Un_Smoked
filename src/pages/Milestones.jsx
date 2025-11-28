import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/partials/header";
import { ShieldCheck, Baby, Users, UserCheck, Plus, Edit2, Trash2, Filter } from "lucide-react";
import Chart from "../components/Chart";

export default function Milestones() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    ageRange: '',
    parentName: '',
    sortBy: ''
  });

  const [predefinedMilestones, setPredefinedMilestones] = useState([
    { id: 1, title: "First Words", category: "Speech", ageRange: "12-18 months", description: "Child speaks first meaningful words" },
    { id: 2, title: "Walking Independently", category: "Motor Skills", ageRange: "9-15 months", description: "Child walks without support" },
    { id: 3, title: "Social Smiling", category: "Social", ageRange: "6-8 weeks", description: "Child smiles in response to others" },
    { id: 4, title: "Object Permanence", category: "Cognitive", ageRange: "8-12 months", description: "Understanding objects exist when hidden" },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    ageRange: '',
    description: ''
  });

  const milestoneKpis = {
    totalMilestones: 18542,
    totalChildren: 2876,
    totalParents: 1245,
    activeUsers: 892,
  };

  const milestonesMonthly = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1350 },
    { name: "Mar", value: 1500 },
    { name: "Apr", value: 1600 },
    { name: "May", value: 1750 },
    { name: "Jun", value: 1800 },
    { name: "Jul", value: 1950 },
    { name: "Aug", value: 1900 },
    { name: "Sep", value: 2050 },
    { name: "Oct", value: 2150 },
    { name: "Nov", value: 2250 },
    { name: "Dec", value: 2400 },
  ];

  const [recentMilestones, setRecentMilestones] = useState([
    { id: "m1", child: "Alex Doe", parent: "Jane Doe", title: "Speech Level 2", date: "2025-11-10", age: "18 months", achievements: 5 },
    { id: "m2", child: "Mia Doe", parent: "John Doe", title: "Motor Skills Level 3", date: "2025-11-08", age: "24 months", achievements: 12 },
    { id: "m3", child: "Noah Smith", parent: "Emma Smith", title: "Cognitive Level 1", date: "2025-11-04", age: "12 months", achievements: 3 },
    { id: "m4", child: "Ava Johnson", parent: "Mark Johnson", title: "Behavior Level 2", date: "2025-11-01", age: "20 months", achievements: 8 },
  ]);

  const handleOpenAddModal = () => {
    setFormData({ title: '', category: '', ageRange: '', description: '' });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (milestone) => {
    setCurrentMilestone(milestone);
    setFormData({
      title: milestone.title,
      category: milestone.category,
      ageRange: milestone.ageRange,
      description: milestone.description
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentMilestone(null);
    setFormData({ title: '', category: '', ageRange: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showEditModal) {
      setPredefinedMilestones(predefinedMilestones.map(m => 
        m.id === currentMilestone.id ? { ...m, ...formData } : m
      ));
    } else {
      const newMilestone = {
        id: Date.now(),
        ...formData
      };
      setPredefinedMilestones([...predefinedMilestones, newMilestone]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      setPredefinedMilestones(predefinedMilestones.filter(m => m.id !== id));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredMilestones = recentMilestones.filter(milestone => {
    if (filters.parentName && !milestone.parent.toLowerCase().includes(filters.parentName.toLowerCase())) {
      return false;
    }
    if (filters.ageRange) {
      const milestoneAge = parseInt(milestone.age);
      const [min, max] = filters.ageRange.split('-').map(v => parseInt(v));
      if (milestoneAge < min || milestoneAge > max) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'fastest') {
      return b.achievements - a.achievements;
    } else if (filters.sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div>
      <Header header={"Manage Milestones"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          {/* KPI cards */}
         
          {/* Chart */}
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-gray-200 p-4 shadow" style={{ backgroundColor: '#F7F5F3' }}>
              <Chart title="Milestones Completed (Monthly)" color="#10b981" data={milestonesMonthly} />
            </div>
          </div>

          {/* Predefined Milestones Section */}
          <div className="mt-6">
            <div className="rounded-xl shadow ring-1 ring-gray-200 p-6" style={{ backgroundColor: '#F7F5F3' }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Predefined Milestones</h2>
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#836852' }}
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predefinedMilestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: '#FFFFFF' }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Category:</span> {milestone.category}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Age Range:</span> {milestone.ageRange}
                          </p>
                          <p className="text-sm text-gray-600 mt-2">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleOpenEditModal(milestone)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(milestone.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent milestones table with filters */}
          <div className="mt-6">
            <div className="rounded-xl shadow ring-1 ring-gray-200" style={{ backgroundColor: '#F7F5F3' }}>
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Milestones</h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                    style={{ backgroundColor: '#836852' }}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>
                
                {showFilters && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF' }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                      <select
                        name="ageRange"
                        value={filters.ageRange}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        style={{ backgroundColor: '#F7F5F3' }}
                      >
                        <option value="">All Ages</option>
                        <option value="0-12">0-12 months</option>
                        <option value="12-24">12-24 months</option>
                        <option value="24-36">24-36 months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                      <input
                        type="text"
                        name="parentName"
                        value={filters.parentName}
                        onChange={handleFilterChange}
                        placeholder="Search by parent name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        style={{ backgroundColor: '#F7F5F3' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                      <select
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        style={{ backgroundColor: '#F7F5F3' }}
                      >
                        <option value="">Default</option>
                        <option value="fastest">Fastest Achievers</option>
                        <option value="recent">Most Recent</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">Child</th>
                      <th className="px-6 py-3">Parent</th>
                      <th className="px-6 py-3">Milestone</th>
                      <th className="px-6 py-3">Age</th>
                      <th className="px-6 py-3">Achievements</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredMilestones.length > 0 ? (
                      filteredMilestones.map((m) => (
                        <tr key={m.id} className="bg-white hover:bg-blue-50/40 transition-colors">
                          <td className="px-6 py-4 font-medium">{m.child}</td>
                          <td className="px-6 py-4">{m.parent}</td>
                          <td className="px-6 py-4">{m.title}</td>
                          <td className="px-6 py-4">{m.age}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {m.achievements} milestones
                            </span>
                          </td>
                          <td className="px-6 py-4">{m.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          No milestones found matching your filters.
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

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-xl max-w-2xl w-full mx-4" style={{ backgroundColor: '#F7F5F3' }}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {showEditModal ? 'Edit Milestone' : 'Add New Milestone'}
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Enter milestone title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    required
                  >
                    <option value="">Select category...</option>
                    <option value="Speech">Speech</option>
                    <option value="Motor Skills">Motor Skills</option>
                    <option value="Social">Social</option>
                    <option value="Cognitive">Cognitive</option>
                    <option value="Behavior">Behavior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                  <input
                    type="text"
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="e.g., 12-18 months"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Enter milestone description..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2 border border-gray-300 text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#F7F5F3' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white text-sm rounded-md font-medium hover:opacity-80"
                  style={{ backgroundColor: '#836852' }}
                >
                  {showEditModal ? 'Update Milestone' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
