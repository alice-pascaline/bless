// Mock data for frontend-only demonstration
export const mockUsers = {
  donor: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "donor",
    bloodType: "O+",
    phone: "+1234567890",
    address: "123 Main St, City, State",
    donations: 5,
    lastDonation: "2024-01-15",
    totalDonations: 5
  },
  hospital: {
    id: 2,
    name: "St. Mary Hospital",
    email: "admin@stmary.com",
    role: "hospital",
    phone: "+1234567890",
    address: "456 Hospital Ave, City, State",
    license: "HOSP-12345"
  },
  admin: {
    id: 3,
    name: "Admin User",
    email: "admin@lifelink.com",
    role: "admin"
  }
};

export const mockBloodRequests = [
  {
    id: 1,
    hospitalName: "St. Mary Hospital",
    bloodType: "O+",
    unitsNeeded: 5,
    urgency: "high",
    location: "Downtown - 2.3 km",
    postedDate: "2024-01-20T10:00:00Z",
    status: "active",
    description: "Emergency surgery requires immediate blood supply"
  },
  {
    id: 2,
    hospitalName: "City General Hospital",
    bloodType: "A-",
    unitsNeeded: 3,
    urgency: "medium",
    location: "Uptown - 5.1 km",
    postedDate: "2024-01-20T08:30:00Z",
    status: "active",
    description: "Routine transfusion needed for patient"
  },
  {
    id: 3,
    hospitalName: "Memorial Medical Center",
    bloodType: "AB+",
    unitsNeeded: 2,
    urgency: "low",
    location: "Westside - 8.7 km",
    postedDate: "2024-01-19T16:45:00Z",
    status: "active",
    description: "Scheduled procedure preparation"
  }
];

export const mockDonations = [
  {
    id: 1,
    date: "2024-01-15",
    hospitalName: "St. Mary Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
    impact: "Saved a life in emergency surgery"
  },
  {
    id: 2,
    date: "2023-12-20",
    hospitalName: "City General Hospital",
    bloodType: "O+",
    units: 1,
    status: "completed",
    impact: "Helped in routine transfusion"
  },
  {
    id: 3,
    date: "2023-11-10",
    hospitalName: "Memorial Medical Center",
    bloodType: "O+",
    units: 1,
    status: "completed",
    impact: "Supported scheduled procedure"
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: "urgent",
    title: "Urgent: O+ blood needed",
    message: "St. Mary Hospital needs 5 units of O+ blood immediately",
    timestamp: "2024-01-20T10:00:00Z",
    read: false
  },
  {
    id: 2,
    type: "match",
    title: "New blood request match",
    message: "Your blood type matches a request at City General Hospital",
    timestamp: "2024-01-20T08:30:00Z",
    read: false
  },
  {
    id: 3,
    type: "donation",
    title: "Donation confirmed",
    message: "Your donation on Jan 15 has been recorded",
    timestamp: "2024-01-15T14:30:00Z",
    read: true
  }
];

export const mockStats = {
  totalDonors: 8200,
  totalHospitals: 320,
  totalDonations: 12480,
  avgResponseTime: 5,
  activeRequests: 12,
  completedDonations: 12480
};

export const mockAchievements = [
  {
    id: 1,
    title: "First Donation",
    description: "Completed your first blood donation",
    icon: "🎯",
    earned: true,
    date: "2023-11-10"
  },
  {
    id: 2,
    title: "Life Saver",
    description: "Saved 5 lives through donations",
    icon: "💉",
    earned: true,
    date: "2024-01-15"
  },
  {
    id: 3,
    title: "Regular Donor",
    description: "Donated 3 times in 6 months",
    icon: "⭐",
    earned: true,
    date: "2024-01-15"
  },
  {
    id: 4,
    title: "Hero Status",
    description: "Donated 10 times",
    icon: "🏆",
    earned: false,
    date: null
  }
];
