'use client';

import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Lock, Bell, Shield,
  Palette, Globe, CreditCard, Store, Package, Truck,
  Settings as SettingsIcon, Save, Upload, Camera, Eye,
  EyeOff, AlertCircle, CheckCircle, Smartphone, Laptop
} from 'lucide-react';

// Types
interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Admin User',
    email: 'admin@store.com',
    phone: '+234 801 234 5678',
    address: 'Lagos, Nigeria',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    storeName: 'My Awesome Store',
    storeEmail: 'info@store.com',
    storePhone: '+234 801 234 5678',
    storeAddress: '123 Business Street, Lagos',
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    language: 'en'
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    smsOrders: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true
  });

  const settingSections: SettingSection[] = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Password and authentication settings'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences'
    },
    {
      id: 'store',
      title: 'Store Settings',
      icon: Store,
      description: 'Business and store information'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme and display preferences'
    },
    {
      id: 'payments',
      title: 'Payment Methods',
      icon: CreditCard,
      description: 'Manage payment gateways'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='bg-gradient-to-t from-blue-100 via-white to-purple-200 min-h-screen w-full mt-4 p-3 rounded-lg shadow-md'>
      <section className='bg-white min-h-screen rounded-lg shadow-md p-5'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 text-sm">Manage your account and store preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-gray-100 sticky top-4">
              <nav className="space-y-1">
                {settingSections.map((section) => {
                  const SectionIcon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveTab(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === section.id
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <SectionIcon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{section.title}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          formData.fullName.charAt(0)
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-md">
                        <Camera className="w-4 h-4 text-white" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{formData.fullName}</h3>
                      <p className="text-sm text-gray-600">{formData.email}</p>
                      <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                    <Shield className="w-4 h-4" />
                    Update Password
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">SMS Authentication</p>
                          <p className="text-sm text-gray-500">Receive codes via SMS</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Authenticator App</p>
                          <p className="text-sm text-gray-500">Use Google Authenticator or similar</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Setup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'emailOrders', label: 'Email - New Orders', desc: 'Get notified when new orders are placed' },
                    { key: 'emailMarketing', label: 'Email - Marketing', desc: 'Receive marketing emails and updates' },
                    { key: 'smsOrders', label: 'SMS - Order Updates', desc: 'Receive SMS for important order updates' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications for real-time updates' },
                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Get weekly performance summary emails' },
                    { key: 'monthlyReports', label: 'Monthly Reports', desc: 'Receive detailed monthly analytics reports' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={() => handleNotificationChange(item.key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <button className="mt-6 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            )}

            {/* Store Settings */}
            {activeTab === 'store' && (
              <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Store Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Name
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="storeEmail"
                        value={formData.storeEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="storePhone"
                        value={formData.storePhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="GBP">British Pound (£)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="storeAddress"
                        value={formData.storeAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                  <Save className="w-4 h-4" />
                  Update Store Info
                </button>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition-all"
                        >
                          <div className={`w-full h-20 rounded mb-2 ${
                            theme === 'Light' ? 'bg-white border border-gray-300' :
                            theme === 'Dark' ? 'bg-gray-900' :
                            'bg-gradient-to-br from-white to-gray-900'
                          }`} />
                          <p className="text-sm font-medium text-gray-900">{theme}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Accent Color
                    </label>
                    <div className="flex gap-3">
                      {['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-6 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium">
                  <Save className="w-4 h-4" />
                  Apply Changes
                </button>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Gateways</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Paystack', desc: 'Accept payments via cards and bank transfers', enabled: true },
                      { name: 'Flutterwave', desc: 'Multi-currency payment processing', enabled: false },
                      { name: 'Stripe', desc: 'Global payment infrastructure', enabled: false },
                      { name: 'Bank Transfer', desc: 'Direct bank account transfers', enabled: true }
                    ].map((gateway, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-gray-900">{gateway.name}</p>
                            <p className="text-sm text-gray-500">{gateway.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {gateway.enabled && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </span>
                          )}
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                            {gateway.enabled ? 'Configure' : 'Enable'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;