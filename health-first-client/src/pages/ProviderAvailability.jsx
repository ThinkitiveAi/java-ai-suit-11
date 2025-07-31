import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox, Select } from '../components';

export default function ProviderAvailability() {
  // View state
  const [currentView, setCurrentView] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({
    provider: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'America/New_York',
    isRecurring: false,
    recurrencePattern: 'daily',
    recurrenceEndDate: '',
    slotDuration: 30,
    breakDuration: 0,
    maxAppointments: 1,
    appointmentType: 'consultation',
    locationType: 'clinic',
    address: '',
    roomNumber: '',
    baseFee: '',
    insuranceAccepted: false,
    currency: 'USD',
    notes: '',
    specialRequirements: []
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data
  const [availabilitySlots, setAvailabilitySlots] = useState([
    {
      id: 1,
      provider: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:00',
      timezone: 'America/New_York',
      slotDuration: 30,
      breakDuration: 15,
      maxAppointments: 1,
      appointmentType: 'consultation',
      locationType: 'clinic',
      address: '123 Medical Center Dr',
      roomNumber: 'A101',
      baseFee: 150.00,
      insuranceAccepted: true,
      currency: 'USD',
      notes: 'General consultations available',
      specialRequirements: ['wheelchair accessible'],
      isRecurring: true,
      recurrencePattern: 'weekly'
    },
    {
      id: 2,
      provider: 'Dr. Sarah Johnson',
      date: '2024-01-16',
      startTime: '10:00',
      endTime: '16:00',
      timezone: 'America/New_York',
      slotDuration: 45,
      breakDuration: 0,
      maxAppointments: 1,
      appointmentType: 'follow_up',
      locationType: 'telemedicine',
      address: '',
      roomNumber: '',
      baseFee: 120.00,
      insuranceAccepted: true,
      currency: 'USD',
      notes: 'Follow-up appointments only',
      specialRequirements: [],
      isRecurring: false,
      recurrencePattern: 'daily'
    }
  ]);

  // Options for dropdowns
  const PROVIDER_OPTIONS = [
    { value: '', label: 'Select Provider' },
    { value: 'dr-sarah-johnson', label: 'Dr. Sarah Johnson' },
    { value: 'dr-michael-chen', label: 'Dr. Michael Chen' },
    { value: 'dr-emily-rodriguez', label: 'Dr. Emily Rodriguez' }
  ];

  const TIMEZONE_OPTIONS = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' }
  ];

  const RECURRENCE_OPTIONS = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const DURATION_OPTIONS = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '60 minutes' }
  ];

  const APPOINTMENT_TYPE_OPTIONS = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow_up', label: 'Follow-up' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'telemedicine', label: 'Telemedicine' }
  ];

  const LOCATION_TYPE_OPTIONS = [
    { value: 'clinic', label: 'Clinic' },
    { value: 'hospital', label: 'Hospital' },
    { value: 'telemedicine', label: 'Telemedicine' },
    { value: 'home_visit', label: 'Home Visit' }
  ];

  const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' }
  ];

  const SPECIAL_REQUIREMENTS_OPTIONS = [
    'wheelchair accessible',
    'interpreter needed',
    'pediatric friendly',
    'quiet environment',
    'parking available'
  ];

  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getWeekDays = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };

  const getMonthDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getDayHours = () => {
    const hours = [];
    for (let i = 8; i <= 18; i++) {
      hours.push(i);
    }
    return hours;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (time) => {
    return time;
  };

  const getSlotsForDate = (date) => {
    const dateStr = formatDate(date);
    return availabilitySlots.filter(slot => slot.date === dateStr);
  };

  const getSlotsForDateAndTime = (date, hour) => {
    const dateStr = formatDate(date);
    return availabilitySlots.filter(slot => {
      if (slot.date !== dateStr) return false;
      const startHour = parseInt(slot.startTime.split(':')[0]);
      const endHour = parseInt(slot.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  // Navigation handlers
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else if (currentView === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === 'month') {
      newDate.setMonth(currentDate.getMonth() + 1);
    } else if (currentView === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (currentView === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecialRequirementsChange = (requirement, checked) => {
    setFormData(prev => ({
      ...prev,
      specialRequirements: checked
        ? [...prev.specialRequirements, requirement]
        : prev.specialRequirements.filter(req => req !== requirement)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.provider) {
      newErrors.provider = 'Provider is required.';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required.';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required.';
    }
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time.';
    }
    
    if (formData.locationType !== 'telemedicine' && !formData.address) {
      newErrors.address = 'Address is required for physical locations.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSlot = {
        id: Date.now(),
        ...formData,
        date: formData.date
      };
      
      if (editingSlot) {
        setAvailabilitySlots(prev => 
          prev.map(slot => slot.id === editingSlot.id ? newSlot : slot)
        );
        setShowEditForm(false);
        setEditingSlot(null);
      } else {
        setAvailabilitySlots(prev => [...prev, newSlot]);
        setShowAddForm(false);
      }
      
      setSuccessMessage(editingSlot ? 'Availability updated successfully!' : 'Availability added successfully!');
      setFormData({
        provider: '',
        date: '',
        startTime: '',
        endTime: '',
        timezone: 'America/New_York',
        isRecurring: false,
        recurrencePattern: 'daily',
        recurrenceEndDate: '',
        slotDuration: 30,
        breakDuration: 0,
        maxAppointments: 1,
        appointmentType: 'consultation',
        locationType: 'clinic',
        address: '',
        roomNumber: '',
        baseFee: '',
        insuranceAccepted: false,
        currency: 'USD',
        notes: '',
        specialRequirements: []
      });
      
    } catch (error) {
      setErrorMessage('Failed to save availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setFormData({
      provider: slot.provider,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      timezone: slot.timezone,
      isRecurring: slot.isRecurring,
      recurrencePattern: slot.recurrencePattern,
      recurrenceEndDate: slot.recurrenceEndDate || '',
      slotDuration: slot.slotDuration,
      breakDuration: slot.breakDuration,
      maxAppointments: slot.maxAppointments,
      appointmentType: slot.appointmentType,
      locationType: slot.locationType,
      address: slot.address,
      roomNumber: slot.roomNumber || '',
      baseFee: slot.baseFee || '',
      insuranceAccepted: slot.insuranceAccepted,
      currency: slot.currency,
      notes: slot.notes || '',
      specialRequirements: slot.specialRequirements || []
    });
    setShowEditForm(true);
  };

  const handleDelete = async (slotId) => {
    if (!confirm('Are you sure you want to delete this availability slot?')) {
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAvailabilitySlots(prev => prev.filter(slot => slot.id !== slotId));
      setSuccessMessage('Availability deleted successfully!');
    } catch (error) {
      setErrorMessage('Failed to delete availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSlots.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedSlots.length} availability slots?`)) {
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAvailabilitySlots(prev => prev.filter(slot => !selectedSlots.includes(slot.id)));
      setSelectedSlots([]);
      setSuccessMessage(`${selectedSlots.length} availability slots deleted successfully!`);
    } catch (error) {
      setErrorMessage('Failed to delete availability slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelection = (slotId) => {
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  // Clear messages after timeout
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="primary"
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
              >
                Add Availability
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full px-4 sm:px-6 lg:px-0 py-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-600 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 font-medium">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Calendar Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToToday}
                  disabled={loading}
                >
                  Today
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric',
                  ...(currentView === 'day' && { day: 'numeric' })
                })}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={currentView === 'month' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('month')}
                className={currentView === 'month' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Month
              </Button>
              <Button
                variant={currentView === 'week' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('week')}
                className={currentView === 'week' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Week
              </Button>
              <Button
                variant={currentView === 'day' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('day')}
                className={currentView === 'day' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedSlots.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-yellow-800">
                {selectedSlots.length} slot(s) selected
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                disabled={loading}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {currentView === 'month' && (
            <div className="p-6">
              <div className="grid grid-cols-7 gap-px bg-gray-200">
                {getWeekDays().map(day => (
                  <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {getMonthDays().map((day, index) => {
                  const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                  const slots = date ? getSlotsForDate(date) : [];
                  const isToday = date && date.toDateString() === new Date().toDateString();
                  const isSelected = selectedSlots.some(slotId => 
                    slots.some(slot => slot.id === slotId)
                  );
                  
                  return (
                    <div
                      key={index}
                      className={`bg-white p-2 min-h-[100px] relative ${
                        isToday ? 'ring-2 ring-blue-500' : ''
                      } ${isSelected ? 'bg-blue-50' : ''}`}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {day}
                          </div>
                          <div className="space-y-1">
                            {slots.map(slot => (
                              <div
                                key={slot.id}
                                className="text-xs p-1 bg-green-100 text-green-800 rounded cursor-pointer hover:bg-green-200"
                                onClick={() => handleEdit(slot)}
                              >
                                {slot.startTime} - {slot.endTime}
                              </div>
                            ))}
                          </div>
                          <input
                            type="checkbox"
                            className="absolute top-2 right-2"
                            checked={isSelected}
                            onChange={() => slots.forEach(slot => handleSlotSelection(slot.id))}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentView === 'week' && (
            <div className="p-6">
              <div className="grid grid-cols-8 gap-px bg-gray-200">
                <div className="bg-gray-50 p-2"></div>
                {getWeekDates().map(day => (
                  <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
                    {day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                ))}
                
                {getDayHours().map(hour => (
                  <React.Fragment key={hour}>
                    <div className="bg-gray-50 p-2 text-sm text-gray-500">
                      {hour}:00
                    </div>
                    {getWeekDates().map(day => {
                      const slots = getSlotsForDateAndTime(day, hour);
                      return (
                        <div key={day} className="bg-white p-1 min-h-[60px]">
                          {slots.map(slot => (
                            <div
                              key={slot.id}
                              className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200"
                              onClick={() => handleEdit(slot)}
                            >
                              {slot.appointmentType}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {currentView === 'day' && (
            <div className="p-6">
              <div className="grid grid-cols-2 gap-px bg-gray-200">
                <div className="bg-gray-50 p-2 text-sm font-medium text-gray-500">Time</div>
                <div className="bg-gray-50 p-2 text-sm font-medium text-gray-500">Availability</div>
                
                {getDayHours().map(hour => {
                  const slots = getSlotsForDateAndTime(currentDate, hour);
                  return (
                    <React.Fragment key={hour}>
                      <div className="bg-gray-50 p-2 text-sm text-gray-500">
                        {hour}:00
                      </div>
                      <div className="bg-white p-2 min-h-[60px]">
                        {slots.map(slot => (
                          <div
                            key={slot.id}
                            className="text-sm p-2 bg-green-100 text-green-800 rounded cursor-pointer hover:bg-green-200 mb-1"
                            onClick={() => handleEdit(slot)}
                          >
                            <div className="font-medium">{slot.startTime} - {slot.endTime}</div>
                            <div className="text-xs">{slot.appointmentType} • {slot.locationType}</div>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {(showAddForm || showEditForm) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingSlot ? 'Edit Availability' : 'Add Availability'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditForm(false);
                      setEditingSlot(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Select
                      label="Provider"
                      value={formData.provider}
                      onChange={(e) => handleInputChange('provider', e.target.value)}
                      error={errors.provider}
                      required
                      disabled={loading}
                      options={PROVIDER_OPTIONS}
                    />
                    
                    <Input
                      label="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      error={errors.date}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Input
                      label="Start Time"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      error={errors.startTime}
                      required
                      disabled={loading}
                    />
                    
                    <Input
                      label="End Time"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      error={errors.endTime}
                      required
                      disabled={loading}
                    />
                    
                    <Select
                      label="Timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      disabled={loading}
                      options={TIMEZONE_OPTIONS}
                    />
                  </div>

                  {/* Recurring Settings */}
                  <div className="border-t pt-6">
                    <Checkbox
                      label="Is Recurring?"
                      checked={formData.isRecurring}
                      onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                      disabled={loading}
                    />
                    
                    {formData.isRecurring && (
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <Select
                          label="Recurrence Pattern"
                          value={formData.recurrencePattern}
                          onChange={(e) => handleInputChange('recurrencePattern', e.target.value)}
                          disabled={loading}
                          options={RECURRENCE_OPTIONS}
                        />
                        
                        <Input
                          label="Recurrence End Date"
                          type="date"
                          value={formData.recurrenceEndDate}
                          onChange={(e) => handleInputChange('recurrenceEndDate', e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    )}
                  </div>

                  {/* Slot Settings */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Slot Settings</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Select
                        label="Slot Duration"
                        value={formData.slotDuration}
                        onChange={(e) => handleInputChange('slotDuration', parseInt(e.target.value))}
                        disabled={loading}
                        options={DURATION_OPTIONS}
                      />
                      
                      <Input
                        label="Break Duration (minutes)"
                        type="number"
                        value={formData.breakDuration}
                        onChange={(e) => handleInputChange('breakDuration', parseInt(e.target.value))}
                        disabled={loading}
                        min="0"
                        max="60"
                      />
                      
                      <Input
                        label="Max Appointments Per Slot"
                        type="number"
                        value={formData.maxAppointments}
                        onChange={(e) => handleInputChange('maxAppointments', parseInt(e.target.value))}
                        disabled={loading}
                        min="1"
                        max="10"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Select
                        label="Appointment Type"
                        value={formData.appointmentType}
                        onChange={(e) => handleInputChange('appointmentType', e.target.value)}
                        disabled={loading}
                        options={APPOINTMENT_TYPE_OPTIONS}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Select
                        label="Location Type"
                        value={formData.locationType}
                        onChange={(e) => handleInputChange('locationType', e.target.value)}
                        disabled={loading}
                        options={LOCATION_TYPE_OPTIONS}
                      />
                      
                      <Input
                        label="Room Number"
                        value={formData.roomNumber}
                        onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                        disabled={loading}
                        placeholder="Optional"
                      />
                    </div>
                    
                    {formData.locationType !== 'telemedicine' && (
                      <div className="mt-4">
                        <Input
                          label="Address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          error={errors.address}
                          required
                          disabled={loading}
                          placeholder="Enter full address"
                        />
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing (Optional)</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Input
                        label="Base Fee"
                        type="number"
                        value={formData.baseFee}
                        onChange={(e) => handleInputChange('baseFee', parseFloat(e.target.value))}
                        disabled={loading}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                      />
                      
                      <Select
                        label="Currency"
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        disabled={loading}
                        options={CURRENCY_OPTIONS}
                      />
                      
                      <div className="flex items-center">
                        <Checkbox
                          label="Insurance Accepted"
                          checked={formData.insuranceAccepted}
                          onChange={(e) => handleInputChange('insuranceAccepted', e.target.checked)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          disabled={loading}
                          rows={3}
                          maxLength={500}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Additional notes about this availability..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.notes.length}/500 characters
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requirements
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {SPECIAL_REQUIREMENTS_OPTIONS.map(requirement => (
                            <Checkbox
                              key={requirement}
                              label={requirement}
                              checked={formData.specialRequirements.includes(requirement)}
                              onChange={(e) => handleSpecialRequirementsChange(requirement, e.target.checked)}
                              disabled={loading}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="border-t pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      >
                        {loading ? 'Saving...' : (editingSlot ? 'Update Availability' : 'Add Availability')}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setShowAddForm(false);
                          setShowEditForm(false);
                          setEditingSlot(null);
                        }}
                        disabled={loading}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 