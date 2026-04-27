import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, ArrowLeft } from 'lucide-react';
import { DashboardLayout } from '../admin/DashboardLayout';
import { User } from '../../types';

export function UserProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
  });

  useEffect(() => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        company: user.company || '',
      });
    }
  }, []);

  const handleSave = () => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        company: formData.company,
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      alert('Profile updated successfully! (Frontend demo)');
      setIsEditing(false);
    }
  };

  const handleChangePassword = () => {
    const currentPassword = prompt('Enter current password:');
    if (currentPassword === currentUser?.password) {
      const newPassword = prompt('Enter new password:');
      const confirmPassword = prompt('Confirm new password:');
      if (newPassword === confirmPassword && newPassword && newPassword.length >= 6) {
        alert('Password changed successfully! (Frontend demo)');
      } else {
        alert('Passwords do not match or password is too short (min 6 characters)');
      }
    } else {
      alert('Current password is incorrect');
    }
  };

  if (!currentUser) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl">{currentUser.name}</h1>
              <p className="text-gray-600">@{currentUser.username} · {currentUser.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={currentUser.username}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Role</label>
                <input
                  type="text"
                  value={currentUser.role}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600"
                  disabled
                />
              </div>

              {currentUser.role === 'Customer' && currentUser.customerNumber && (
                <div>
                  <label className="block text-sm mb-1 text-gray-700 font-medium">
                    Customer Number
                  </label>
                  <input
                    type="text"
                    value={currentUser.customerNumber}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-600 font-mono"
                    disabled
                  />
                </div>
              )}

              <div className={currentUser.role === 'Customer' ? '' : 'md:col-span-2'}>
                <label className="block text-sm mb-1 text-gray-700 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!isEditing}
                />
              </div>

              {currentUser.role === 'Customer' && (
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-gray-700 font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={!isEditing}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700 font-medium">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!isEditing}
                />
              </div>

              {currentUser.role === 'Customer' && (
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1 text-gray-700 font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={!isEditing}
                  />
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">Security</h3>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
              >
                Change Password
              </button>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: currentUser.name || '',
                        email: currentUser.email || '',
                        phone: currentUser.phone || '',
                        address: currentUser.address || '',
                        company: currentUser.company || '',
                      });
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
