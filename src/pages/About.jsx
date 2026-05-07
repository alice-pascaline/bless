import { FaHeartbeat, FaUsers, FaHospital, FaShieldAlt, FaGlobe, FaAward, FaHandshake, FaLightbulb } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-3 h-4 bg-white rounded-full transform rotate-12"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">LifeLink</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/about" className="text-red-600 font-medium">About</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-600 hover:text-gray-900">Sign in</a>
          <a href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Get started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeartbeat className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About LifeLink
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're on a mission to save lives by connecting blood donors with hospitals in real-time. 
            Every drop counts, every second matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
              Join our mission →
            </a>
            <a href="#contact" className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50">
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                LifeLink was founded with a simple yet powerful goal: eliminate the gap between blood donors 
                and hospitals in need. We believe that nobody should lose their life waiting for blood that's 
                already available nearby.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Through our innovative platform, we've created a seamless connection system that matches 
                willing donors with verified hospitals in real-time, reducing response times from hours to minutes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">12,480+</div>
                  <div className="text-gray-600">Lives Saved</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">&lt;5 min</div>
                  <div className="text-gray-600">Avg Response Time</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Medical professionals" 
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeartbeat className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Life First</h3>
              <p className="text-gray-600">Every decision we make prioritizes saving lives and improving healthcare outcomes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trust & Safety</h3>
              <p className="text-gray-600">We ensure verified hospitals and secure handling of all donor information.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">Continuously improving our technology to make blood donation faster and more efficient.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">Building a network of heroes who save lives through the gift of donation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-red-600 text-3xl" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">8,200+</div>
              <div className="text-lg text-gray-600 mb-2">Active Donors</div>
              <p className="text-gray-600">Heroes ready to save lives in their communities</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHospital className="text-red-600 text-3xl" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">320+</div>
              <div className="text-lg text-gray-600 mb-2">Partner Hospitals</div>
              <p className="text-gray-600">Trusted healthcare facilities across the region</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-red-600 text-3xl" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-lg text-gray-600 mb-2">Cities Served</div>
              <p className="text-gray-600">Growing network of communities saving lives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="CEO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-red-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">Former ER physician with 15+ years in emergency medicine</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="CTO" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-red-600 mb-2">CTO</p>
              <p className="text-gray-600">Tech visionary focused on healthcare innovation</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                alt="Head of Operations" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Emily Rodriguez</h3>
              <p className="text-red-600 mb-2">Head of Operations</p>
              <p className="text-gray-600">Expert in healthcare logistics and donor relations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Recognition & Awards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <FaAward className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Healthcare Innovation Award</h3>
              <p className="text-gray-600">2024 Digital Health Excellence</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <FaAward className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Social Impact Prize</h3>
              <p className="text-gray-600">Tech for Good Summit 2023</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <FaAward className="text-red-600 text-3xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Startup of the Year</h3>
              <p className="text-gray-600">Healthcare Innovation Challenge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about LifeLink? Want to partner with us? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@lifelink.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">1-800-LIFELINK</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Health Street, Medical District, CA 90210</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
              Join as Donor
            </a>
            <a href="/register" className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50">
              Register Hospital
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-gray-600">
          <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full transform rotate-12"></div>
          </div>
          <span>LifeLink · Built with care · © 2024</span>
        </div>
      </footer>
    </div>
  );
}
