import { useState } from 'react';
import { Users, UserPlus, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

function Calendar() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Team Meeting', start: new Date(2025, 9, 15, 10, 0), end: new Date(2025, 9, 15, 11, 0), color: '#667eea' },
    { id: 2, title: 'Lunch with Client', start: new Date(2025, 9, 20, 12, 0), end: new Date(2025, 9, 20, 13, 30), color: '#764ba2' }
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  }

  function isToday(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  function isSameDay(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  function getEventsForDay(date: Date) {
    return events.filter(event => isSameDay(event.start, date));
  }

  function handleDayClick(date: Date) {
    setSelectedDate(date);
    setSelectedEvent(null);
    setTitle('');
    const dateStr = date.toISOString().split('T')[0];
    setStartTime(`${dateStr}T09:00`);
    setEndTime(`${dateStr}T10:00`);
    setShowEventModal(true);
  }

  function handleEventClick(event: Event, e: React.MouseEvent) {
    e.stopPropagation();
    setSelectedEvent(event);
    setTitle(event.title);
    setStartTime(event.start.toISOString().slice(0, 16));
    setEndTime(event.end.toISOString().slice(0, 16));
    setShowEventModal(true);
  }

  function handleSubmit() {
    if (!title || !startTime || !endTime) return;
    
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, title, start: new Date(startTime), end: new Date(endTime) }
          : e
      ));
    } else {
      const newEvent: Event = {
        id: Date.now(),
        title,
        start: new Date(startTime),
        end: new Date(endTime),
        color: '#667eea'
      };
      setEvents([...events, newEvent]);
    }
    
    closeModal();
  }

  function handleDelete() {
    if (selectedEvent) {
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      closeModal();
    }
  }

  function closeModal() {
    setShowEventModal(false);
    setTitle('');
    setStartTime('');
    setEndTime('');
    setSelectedEvent(null);
    setSelectedDate(null);
  }

  function previousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const days = getDaysInMonth(currentDate);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 81px)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: 'hidden',
      background: '#1a1a1a'
    }}>
      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        flex: 1,
        overflow: 'hidden'
      }}>
      {/* Left Half - Nature Image with Overlay Buttons */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80" 
          alt="Nature"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px'
        }}>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '64px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              letterSpacing: '-2px',
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
            }}>
              {monthNames[currentDate.getMonth()]}
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '96px',
              fontWeight: '200',
              margin: 0,
              lineHeight: 1,
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
              letterSpacing: '-3px'
            }}>
              {currentDate.getFullYear()}
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '350px'
          }}>
            <button
              onClick={() => setShowEventModal(true)}
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '16px',
                padding: '20px 28px',
                color: 'white',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
            >
              <Plus size={22} strokeWidth={2.5} />
              Add Event
            </button>

            <button
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '16px',
                padding: '20px 28px',
                color: 'white',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
            >
              <UserPlus size={22} strokeWidth={2.5} />
              Add Friend
            </button>

            <button
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '16px',
                padding: '20px 28px',
                color: 'white',
                fontSize: '17px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
            >
              <Users size={22} strokeWidth={2.5} />
              Create Group
            </button>
          </div>
        </div>
      </div>

      {/* Right Half - Calendar with Darker Blurred Nature Background */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}>
        {/* Blurred and darkened background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(50px) brightness(0.4)',
          transform: 'scale(1.1)'
        }} />
        
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)'
        }} />
        
        {/* Calendar content */}
        <div style={{
          position: 'relative',
          height: '100%',
          background: 'rgba(30,30,30,0.7)',
          backdropFilter: 'blur(40px)',
          padding: '50px 60px',
          overflowY: 'auto'
        }}>
          {/* Calendar Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '35px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-1px'
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={goToToday}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Today
              </button>
              
              <button
                onClick={previousMonth}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ChevronLeft size={20} color="#ffffff" />
              </button>
              
              <button
                onClick={nextMonth}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ChevronRight size={20} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px',
            marginBottom: '10px'
          }}>
            {dayNames.map(day => (
              <div key={day} style={{
                textAlign: 'center',
                padding: '14px 0',
                fontWeight: '700',
                fontSize: '13px',
                color: '#cccccc',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px'
          }}>
            {days.map((day, idx) => {
              const dayEvents = getEventsForDay(day.date);
              const isTodayDate = isToday(day.date);
              
              return (
                <div
                  key={idx}
                  onClick={() => day.isCurrentMonth && handleDayClick(day.date)}
                  style={{
                    minHeight: '100px',
                    padding: '10px',
                    borderRadius: '14px',
                    background: isTodayDate 
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)'
                      : day.isCurrentMonth ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: isTodayDate ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
                    cursor: day.isCurrentMonth ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    opacity: day.isCurrentMonth ? 1 : 0.4,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: day.isCurrentMonth ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (day.isCurrentMonth) {
                      e.currentTarget.style.background = isTodayDate
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.35) 0%, rgba(118, 75, 162, 0.35) 100%)'
                        : 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (day.isCurrentMonth) {
                      e.currentTarget.style.background = isTodayDate
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%)'
                        : 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = day.isCurrentMonth ? '0 2px 8px rgba(0,0,0,0.3)' : 'none';
                    }
                  }}
                >
                  <div style={{
                    fontWeight: isTodayDate ? '800' : '600',
                    fontSize: '15px',
                    color: day.isCurrentMonth ? (isTodayDate ? '#667eea' : '#ffffff') : '#666',
                    marginBottom: '6px'
                  }}>
                    {day.date.getDate()}
                  </div>
                  
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(event, e)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '5px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '700',
                        marginBottom: '3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 12px rgba(102, 126, 234, 0.4)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={closeModal}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '45px',
            maxWidth: '520px',
            width: '90%',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '35px'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '30px',
                fontWeight: '700',
                color: '#1a1a1a',
                letterSpacing: '-0.5px'
              }}>
                {selectedEvent ? 'Update Event' : 'Create Event'}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={26} color="#666" />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#555', fontSize: '14px' }}>
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#555', fontSize: '14px' }}>
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#555', fontSize: '14px' }}>
                  End Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={closeModal}
                  style={{
                    background: '#f5f5f5',
                    color: '#666',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 28px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {selectedEvent ? 'Update' : 'Create'}
                </button>
                
                {selectedEvent && (
                  <button
                    onClick={handleDelete}
                    style={{
                      flex: 1,
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      boxShadow: '0 6px 20px rgba(255, 71, 87, 0.4)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Calendar;