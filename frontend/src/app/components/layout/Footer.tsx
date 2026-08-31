import { Link } from "react-router";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useTenant } from "../../modules/auth/context/TenantContext";

export function Footer() {
  const { tenant } = useTenant();
  const collegeName = tenant?.name || "EduPlatform";

  return (
    <footer className="bg-[#12172B] text-[#F7F5EF] border-t border-[#232D4B] relative z-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E8B93F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#E8B93F] text-[#12172B] p-2.5 rounded-xl shadow-xs flex-shrink-0">
                {tenant?.logo ? (
                  <img src={tenant.logo} alt={collegeName} className="w-6 h-6 object-contain" />
                ) : (
                  <GraduationCap className="w-6 h-6 text-[#12172B]" />
                )}
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white tracking-tight block">
                  {collegeName}
                </span>
                <span className="text-[10px] text-[#8B96B5] font-semibold uppercase tracking-widest block">
                  Higher Education & Research Institution
                </span>
              </div>
            </div>

            <p className="text-[#8B96B5] text-sm leading-relaxed max-w-sm">
              An institution dedicated to academic rigor, future-focused research, and cultivating purposeful leadership across engineering, science, and the humanities.
            </p>

            <div className="pt-2 flex items-center space-x-2">
              <span className="academic-stamp">
                Est. 1950 • Accredited Grade A++
              </span>
            </div>

            <div className="pt-3 flex space-x-2.5">
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-[#E8B93F] hover:text-[#12172B] text-[#8B96B5] transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-[#E8B93F] hover:text-[#12172B] text-[#8B96B5] transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-[#E8B93F] hover:text-[#12172B] text-[#8B96B5] transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-[#E8B93F] hover:text-[#12172B] text-[#8B96B5] transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Academics
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8B96B5]">
              <li>
                <Link to="/courses" className="hover:text-[#E8B93F] transition-colors flex items-center gap-1">
                  <span>Undergraduate Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#E8B93F] transition-colors">
                  Graduate & Masters
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-[#E8B93F] transition-colors">
                  Distinguished Faculty
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#E8B93F] transition-colors">
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#E8B93F] transition-colors">
                  Research Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* Admissions & Portal */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Admissions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8B96B5]">
              <li>
                <Link to="/admissions" className="hover:text-[#E8B93F] transition-colors">
                  How to Apply
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#E8B93F] transition-colors">
                  Tuition & Scholarships
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#E8B93F] transition-colors">
                  Campus Tours & Open Days
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#E8B93F] transition-colors flex items-center gap-1">
                  <span>Student Desk Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E8B93F]" />
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#E8B93F] transition-colors">
                  Faculty Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Desk Contact */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Campus Desk
            </h4>
            <ul className="space-y-3 text-sm text-[#8B96B5]">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#E8B93F] mt-1 flex-shrink-0" />
                <span className="text-xs leading-relaxed">123 University Ave, Education City, EC 12345</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#E8B93F] flex-shrink-0" />
                <span className="text-xs">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#E8B93F] flex-shrink-0" />
                <span className="text-xs">admissions@eduplatform.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B96B5] gap-4">
          <p>© {new Date().getFullYear()} {collegeName}. All rights reserved.</p>
          <div className="flex space-x-6 text-xs">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Campus Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

