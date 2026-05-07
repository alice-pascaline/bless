// Mock API service for frontend-only demonstration
import { mockUsers, mockBloodRequests, mockDonations, mockNotifications, mockStats, mockAchievements } from './mockData.js';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication
export const mockAuth = {
  login: async (email, password) => {
    await delay(1000);
    
    // Simple mock authentication logic
    if (email === 'donor@example.com' && password === 'password') {
      return {
        success: true,
        user: mockUsers.donor,
        token: 'mock-token-donor'
      };
    } else if (email === 'hospital@example.com' && password === 'password') {
      return {
        success: true,
        user: mockUsers.hospital,
        token: 'mock-token-hospital'
      };
    } else if (email === 'admin@example.com' && password === 'password') {
      return {
        success: true,
        user: mockUsers.admin,
        token: 'mock-token-admin'
      };
    } else {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }
  },

  register: async (userData) => {
    await delay(1000);
    return {
      success: true,
      user: { ...mockUsers.donor, ...userData },
      token: 'mock-token-new-user'
    };
  },

  logout: async () => {
    await delay(500);
    return { success: true };
  }
};

// Mock blood requests API
export const mockBloodRequestsApi = {
  getAll: async () => {
    await delay(800);
    return mockBloodRequests;
  },

  getById: async (id) => {
    await delay(500);
    return mockBloodRequests.find(req => req.id === parseInt(id));
  },

  create: async (requestData) => {
    await delay(1000);
    const newRequest = {
      id: mockBloodRequests.length + 1,
      ...requestData,
      postedDate: new Date().toISOString(),
      status: 'active'
    };
    mockBloodRequests.push(newRequest);
    return newRequest;
  },

  update: async (id, updateData) => {
    await delay(800);
    const index = mockBloodRequests.findIndex(req => req.id === parseInt(id));
    if (index !== -1) {
      mockBloodRequests[index] = { ...mockBloodRequests[index], ...updateData };
      return mockBloodRequests[index];
    }
    return null;
  }
};

// Mock donations API
export const mockDonationsApi = {
  getAll: async (userId) => {
    await delay(600);
    return mockDonations;
  },

  create: async (donationData) => {
    await delay(1000);
    const newDonation = {
      id: mockDonations.length + 1,
      ...donationData,
      date: new Date().toISOString(),
      status: 'completed'
    };
    mockDonations.push(newDonation);
    return newDonation;
  }
};

// Mock notifications API
export const mockNotificationsApi = {
  getAll: async (userId) => {
    await delay(400);
    return mockNotifications;
  },

  markAsRead: async (notificationId) => {
    await delay(300);
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return notification;
    }
    return null;
  }
};

// Mock statistics API
export const mockStatsApi = {
  getDashboardStats: async () => {
    await delay(600);
    return mockStats;
  },

  getDonorStats: async (userId) => {
    await delay(400);
    return {
      totalDonations: mockUsers.donor.totalDonations,
      lastDonation: mockUsers.donor.lastDonation,
      livesSaved: mockUsers.donor.donations,
      achievements: mockAchievements
    };
  },

  getHospitalStats: async (hospitalId) => {
    await delay(500);
    return {
      totalRequests: mockBloodRequests.length,
      activeRequests: mockBloodRequests.filter(req => req.status === 'active').length,
      fulfilledRequests: 8,
      averageResponseTime: 5
    };
  }
};

// Mock user profile API
export const mockProfileApi = {
  getProfile: async (userId) => {
    await delay(400);
    return mockUsers.donor;
  },

  updateProfile: async (userId, updateData) => {
    await delay(800);
    return { ...mockUsers.donor, ...updateData };
  }
};

// Mock matches API
export const mockMatchesApi = {
  getMatches: async (userId) => {
    await delay(600);
    return mockBloodRequests.filter(req => req.status === 'active');
  },

  acceptMatch: async (requestId, userId) => {
    await delay(1000);
    return { success: true, message: 'Match accepted successfully' };
  }
};

// Mock hospitals API
export const mockHospitalsApi = {
  getAll: async () => {
    await delay(500);
    return [
      {
        id: 1,
        name: "St. Mary Hospital",
        address: "456 Hospital Ave, City, State",
        phone: "+1234567890",
        email: "info@stmary.com",
        license: "HOSP-12345",
        verified: true
      },
      {
        id: 2,
        name: "City General Hospital",
        address: "789 Medical Blvd, City, State",
        phone: "+1234567891",
        email: "info@citygeneral.com",
        license: "HOSP-67890",
        verified: true
      }
    ];
  }
};

// Mock admin API
export const mockAdminApi = {
  getAllUsers: async () => {
    await delay(800);
    return [
      mockUsers.donor,
      mockUsers.hospital,
      mockUsers.admin,
      {
        id: 4,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "donor",
        bloodType: "A+",
        verified: true
      }
    ];
  },

  getSystemStats: async () => {
    await delay(600);
    return {
      totalUsers: 8250,
      totalDonors: 8200,
      totalHospitals: 320,
      totalDonations: 12480,
      activeRequests: 12,
      pendingVerifications: 5
    };
  }
};
