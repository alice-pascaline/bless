import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHospital, FaBell, FaShieldAlt, FaSearch, FaChartLine, FaUserMd, FaUsers, FaMapMarkerAlt, FaTrophy, FaHistory, FaStethoscope, FaPlus } from 'react-icons/fa';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-4 bg-white rounded-full transform rotate-12"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">LifeLink</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">Sign in</Link>
          <Link to="/register" className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="px-4 sm:px-6 py-12 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live blood requests across hospitals</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A drop of blood. <span className="text-red-600">A lifetime saved.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              LifeLink connects verified hospitals with willing blood donors. Hospitals post requests, donors respond — no calls, no chains, no waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-center">
                Become a donor →
              </Link>
              <Link to="/register" className="border-2 border-gray-900 text-gray-900 px-4 sm:px-6 py-3 rounded-lg hover:bg-gray-50 text-center">
                Register hospital
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Doctor and patient" 
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Urgent: O- needed
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">12,480+</div>
              <div className="text-gray-600">Lives saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">8,200+</div>
              <div className="text-gray-600">Active donors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">320+</div>
              <div className="text-gray-600">Verified hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">&lt; 5 min</div>
              <div className="text-gray-600">Average response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="flex items-center gap-3">
              <FaHospital className="text-red-600 text-xl" />
              <span className="font-medium">Verified hospitals</span>
            </div>
            <div className="flex items-center gap-3">
              <FaSearch className="text-red-600 text-xl" />
              <span className="font-medium">Real-time matching</span>
            </div>
            <div className="flex items-center gap-3">
              <FaBell className="text-red-600 text-xl" />
              <span className="font-medium">Respond in minutes</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">WHAT LIFELINK DOES</h2>
          <p className="text-xl text-center text-gray-600 mb-12">An end-to-end blood donation network</p>
          
          <p className="text-lg text-center text-gray-600 mb-12 max-w-4xl mx-auto">
            From the moment a hospital posts a need to the moment a life is saved — every step is connected, tracked, and transparent.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaHospital className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hospital requests</h3>
              <p className="text-gray-600">Verified hospitals post requests with blood type, units needed and urgency.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaSearch className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart matching</h3>
              <p className="text-gray-600">We surface compatible, available donors based on blood type and location.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaBell className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Instant notifications</h3>
              <p className="text-gray-600">Donors are alerted the moment a matching request goes live near them.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaHeartbeat className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Donation tracking</h3>
              <p className="text-gray-600">Every accepted donation is logged from scheduling to fulfillment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaChartLine className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Live request status</h3>
              <p className="text-gray-600">Hospitals see real-time donor responses and update request status.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <FaShieldAlt className="text-red-600 text-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-3">Privacy & safety</h3>
              <p className="text-gray-600">Role-based access, verified accounts, and secure handling of donor data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Donor" 
              className="rounded-2xl w-full h-auto"
            />
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center mt-4">
              Donor of the Month
            </div>
          </div>
          <div>
            <div className="text-red-600 font-medium mb-4">FOR DONORS</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Donating has never felt this rewarding
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join a community that saves lives every day. Get notified when your blood type is needed, track your impact, and become a hero in your community.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaBell className="text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Real-time alerts</h4>
                  <p className="text-gray-600">Get notified the second a hospital near you needs your blood type.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Hospitals near you</h4>
                  <p className="text-gray-600">Filter requests by city and distance — donate where it matters.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaTrophy className="text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Achievements & badges</h4>
                  <p className="text-gray-600">Track your donation streak and unlock recognition for every life saved.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaHistory className="text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Donation history</h4>
                  <p className="text-gray-600">Every donation is recorded — your personal impact, beautifully visualized.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-red-600 font-medium mb-4">FOR HOSPITALS</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Find the right donor — in minutes, not days
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Replace phone trees and spreadsheets with a focused dashboard built for emergency and routine blood needs.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                <FaStethoscope className="text-red-600 text-xl" />
                <span className="font-medium">Post requests in seconds</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                <FaUsers className="text-red-600 text-xl" />
                <span className="font-medium">See live donor responses</span>
              </div>
            </div>
            <Link to="/register" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 inline-flex items-center gap-2">
              Join as a donor →
            </Link>
          </div>
          <div>
            <div className="bg-gray-100 p-6 rounded-2xl">
              <div className="text-sm text-gray-600 mb-2">ACTIVE REQUEST</div>
              <h3 className="text-xl font-bold mb-2">St. Mary Hospital</h3>
              <p className="text-gray-600 mb-4">Downtown - 2.3 km</p>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                HIGH URGENCY
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold">O+</div>
                  <div className="text-sm text-gray-600">needed</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold">O-</div>
                  <div className="text-sm text-gray-600">needed</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center">
                  <div className="text-lg font-bold">AB+</div>
                  <div className="text-sm text-gray-600">needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <div key={type} className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:border-red-600 transition-colors">
                <div className="w-2 h-2 bg-red-600 rounded-full mx-auto mb-2"></div>
                <div className="font-bold text-gray-900">{type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">LOVED BY THE COMMUNITY</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Real people. Real impact.</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-600">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "We filled an O- emergency request in under 10 minutes. LifeLink is now part of our protocol."
              </p>
              <p className="font-semibold">Dr. Amina K.</p>
              <p className="text-gray-600 text-sm">Hematologist, St. Mary</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-600">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I love getting alerts only when I'm truly needed. It feels personal — and powerful."
              </p>
              <p className="font-semibold">Daniel M.</p>
              <p className="text-gray-600 text-sm">Donor · 14 donations</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-600">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Signing up took two minutes. A week later I saved a life. I'll never stop."
              </p>
              <p className="font-semibold">Grace T.</p>
              <p className="text-gray-600 text-sm">Donor · first-time</p>
            </div>
          </div>
          
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Community" 
              className="rounded-2xl w-full max-w-4xl mx-auto h-auto"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-3 h-4 bg-white rounded-full transform rotate-12"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to save a life today?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of donors and hospitals already on LifeLink.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
              Create your account →
            </Link>
            <Link to="/login" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-gray-600">
          <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full transform rotate-12"></div>
          </div>
          <span>LifeLink · Built with care</span>
        </div>
      </footer>
    </div>
  );
}
