# Component Props & Usage Documentation

## 📦 Reusable Components

### StatCard Component

**Location:** `src/components/StatCard.jsx`

**Props:**
```typescript
interface StatCardProps {
  title: string;          // Card title (e.g., "Total Users")
  value: string | number; // Main value to display
  icon: ReactNode;        // Icon component (from lucide-react)
  color: string;          // Background color class (e.g., "bg-blue-500")
  growth?: string;        // Optional growth indicator (e.g., "+2.3%")
}
```

**Usage Example:**
```jsx
import StatCard from "../components/StatCard";
import { Users } from "lucide-react";

<StatCard
  title="Total Users"
  value={15847}
  icon={<Users className="size-6" />}
  color="bg-blue-500"
  growth="+2.3%"
/>
```

**Available Colors:**
- `bg-blue-500` - Blue (Users, General Info)
- `bg-green-500` - Green (Active, Success)
- `bg-red-500` - Red (Banned, Errors)
- `bg-yellow-500` - Yellow (Medals, Warnings)
- `bg-purple-500` - Purple (Challenges)
- `bg-orange-500` - Orange (Activity)
- `bg-indigo-500` - Indigo (Community)

---

## 🎨 Common UI Patterns

### Search Input
```jsx
<div className="flex-1 relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
  <input
    type="text"
    placeholder="Search users by name or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#836852]"
  />
</div>
```

### Filter Dropdown
```jsx
<div className="relative">
  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#836852] appearance-none bg-white"
  >
    <option value="all">All Status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
    <option value="banned">Banned</option>
  </select>
</div>
```

### Status Badge
```jsx
<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
  status === 'active' ? 'bg-green-100 text-green-800' :
  status === 'banned' ? 'bg-red-100 text-red-800' :
  'bg-gray-100 text-gray-800'
}`}>
  {status}
</span>
```

### Action Button (Primary)
```jsx
<button className="px-4 py-2 bg-[#836852] text-white rounded-lg hover:bg-[#6b5442] transition-colors">
  Action Button
</button>
```

### Action Button (Danger)
```jsx
<button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
  Delete
</button>
```

### Card Container
```jsx
<div className="bg-white rounded-lg shadow p-6">
  {/* Content */}
</div>
```

### Link Card (Hover Effect)
```jsx
<Link to="/path" className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-2 border-gray-100">
  <div className="flex items-center gap-3">
    <div className="p-3 bg-blue-100 rounded-lg">
      <Icon className="size-6 text-blue-600" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">Title</h3>
      <p className="text-sm text-gray-600">Description</p>
    </div>
  </div>
</Link>
```

---

## 📋 Table Pattern

### Standard Table
```jsx
<div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Column Name
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            Content
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Pagination
```jsx
<div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
  <div className="text-sm text-gray-700">
    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
    <span className="font-medium">{endIndex}</span> of{" "}
    <span className="font-medium">{total}</span> results
  </div>
  <div className="flex gap-2">
    <button
      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
    >
      <ChevronLeft className="size-5" />
    </button>
    <span className="px-4 py-1 bg-[#836852] text-white rounded-lg">
      {page} / {totalPages}
    </span>
    <button
      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
    >
      <ChevronRight className="size-5" />
    </button>
  </div>
</div>
```

---

## 🎭 Modal Pattern

### Confirmation Modal
```jsx
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div className="flex items-center gap-3 text-red-600 mb-4">
        <AlertCircle className="size-6" />
        <h3 className="text-xl font-bold">Confirm Action</h3>
      </div>
      <p className="text-gray-600 mb-6">
        Are you sure you want to perform this action?
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}
```

---

## 🎨 Color System

### Primary Colors
```jsx
// Main brand color
"#836852" // Brown
"#6b5442" // Dark brown (hover)

// Background
"#F7F5F3" // Light cream
```

### Status Colors
```jsx
// Success/Active
"bg-green-100 text-green-800" // Light
"bg-green-500" // Medium
"bg-green-600" // Dark (hover)

// Error/Danger/Banned
"bg-red-100 text-red-800" // Light
"bg-red-500" // Medium
"bg-red-600" // Dark (hover)

// Warning
"bg-yellow-100 text-yellow-800" // Light
"bg-orange-500" // Medium
"bg-orange-600" // Dark (hover)

// Info
"bg-blue-100 text-blue-800" // Light
"bg-blue-500" // Medium
"bg-blue-600" // Dark (hover)

// Neutral/Inactive
"bg-gray-100 text-gray-800" // Light
"bg-gray-500" // Medium
"bg-gray-600" // Dark (hover)
```

### Accent Colors
```jsx
"bg-purple-500" // Challenges
"bg-indigo-500" // Community
"bg-yellow-500" // Medals/Rewards
"bg-emerald-500" // Progress
```

---

## 🎯 Icon System

### Icons from Lucide React
```jsx
import {
  Users,           // User management
  UserCheck,       // Active users
  UserX,           // Banned users
  TrendingUp,      // Streaks, growth
  TrendingDown,    // Decline, broken streaks
  Trophy,          // Rewards, medals
  Award,           // Achievements
  Medal,           // Specific medals
  Target,          // Challenges
  MessageSquare,   // Community, posts
  Flag,            // Reports
  AlertCircle,     // Warnings
  Ban,             // Ban action
  CheckCircle,     // Success, approve
  RotateCcw,       // Reset
  Activity,        // Activity logs
  Flame,           // Streak fire
  Eye,             // View
  Search,          // Search
  Filter,          // Filter
  Download,        // Export
  Plus,            // Add/Create
  ChevronLeft,     // Previous
  ChevronRight,    // Next
  ChevronDown,     // Expand
  BarChart3,       // Analytics
  Settings,        // Settings
  HelpCircle,      // Help, FAQs
  Lock,            // Security
  Bell,            // Notifications
  Calendar         // Dates
} from "lucide-react";
```

### Icon Usage
```jsx
// Standard size
<Icon className="size-5" />

// Large size
<Icon className="size-6" />

// Extra large
<Icon className="size-8" />

// With color
<Icon className="size-6 text-blue-600" />
```

---

## 📱 Responsive Grid System

### 1 Column on Mobile, 2 on Tablet, 3+ on Desktop
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Stats Grid (4 columns)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stats Cards */}
</div>
```

### Two Column Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Left and Right columns */}
</div>
```

---

## 🔄 Loading States

### Skeleton Loader
```jsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

### Spinner
```jsx
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#836852]"></div>
</div>
```

---

## ⚠️ Error States

### Error Message
```jsx
<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
  <div className="flex items-center gap-3">
    <AlertCircle className="size-5 text-red-600" />
    <p className="text-red-700">Error message here</p>
  </div>
</div>
```

### Empty State
```jsx
<div className="flex flex-col items-center justify-center py-12">
  <Icon className="size-16 text-gray-400 mb-4" />
  <h3 className="text-lg font-semibold text-gray-700 mb-2">No data found</h3>
  <p className="text-gray-500">Try adjusting your filters</p>
</div>
```

---

## 🎨 Text Styles

### Headers
```jsx
<h1 className="text-3xl font-bold text-gray-800">Main Header</h1>
<h2 className="text-2xl font-bold text-gray-800">Section Header</h2>
<h3 className="text-xl font-semibold text-gray-800">Subsection Header</h3>
```

### Body Text
```jsx
<p className="text-gray-600">Regular text</p>
<p className="text-sm text-gray-600">Small text</p>
<p className="text-xs text-gray-500">Extra small text</p>
```

### Links
```jsx
<Link to="/path" className="text-[#836852] hover:text-[#6b5442]">
  Link Text
</Link>
```

---

## 🎯 Best Practices

### 1. Consistent Spacing
- Use `gap-6` for grid spacing
- Use `mb-6` or `mb-8` for section spacing
- Use `p-6` for card padding

### 2. Responsive Design
- Always use responsive classes: `md:`, `lg:`
- Test on mobile, tablet, and desktop
- Use `overflow-x-auto` for tables

### 3. Accessibility
- Use semantic HTML
- Include aria-labels
- Proper button types
- Focus states with `focus:ring-2`

### 4. Performance
- Use `loading` states for async operations
- Implement pagination for large lists
- Optimize images
- Lazy load when possible

### 5. Consistency
- Follow the established color scheme
- Use the same icon sizes
- Maintain spacing patterns
- Keep button styles consistent

---

## 📝 Quick Reference

### Button Variants
```jsx
// Primary
"bg-[#836852] text-white hover:bg-[#6b5442]"

// Success
"bg-green-500 text-white hover:bg-green-600"

// Danger
"bg-red-500 text-white hover:bg-red-600"

// Warning
"bg-orange-500 text-white hover:bg-orange-600"

// Secondary
"border border-gray-300 text-gray-700 hover:bg-gray-50"

// Ghost
"text-[#836852] hover:bg-[#836852]/10"
```

### Card Variants
```jsx
// Standard
"bg-white rounded-lg shadow p-6"

// With border
"bg-white rounded-lg shadow p-6 border-2 border-gray-100"

// Hoverable
"bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
```

---

## 🚀 Ready to Use!

All patterns are battle-tested and ready for production. Copy and paste as needed!
