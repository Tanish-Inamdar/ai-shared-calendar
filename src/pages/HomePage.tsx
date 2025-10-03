import { Link } from 'react-router-dom';
import { Calendar, Zap, BrainCircuit } from 'lucide-react';

function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 81px)',
      padding: '2rem',
      background: '#1a1a1a',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(102, 126, 234, 0.5)' }}>
        Welcome to the AI Calendar!
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', textAlign: 'center', color: '#ccc' }}>
        The intelligent way to manage your schedule. Let our AI help you organize your life, so you can focus on what matters.
      </p>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          maxWidth: '300px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <Calendar size={48} style={{ marginBottom: '1rem', color: '#667eea' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Smart Scheduling</h3>
          <p style={{ color: '#ccc' }}>Our AI automatically schedules your events and appointments, finding the perfect time for you.</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          maxWidth: '300px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <Zap size={48} style={{ marginBottom: '1rem', color: '#764ba2' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Instant Reminders</h3>
          <p style={{ color: '#ccc' }}>Never miss an important event again. Get smart reminders at just the right time.</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          maxWidth: '300px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <BrainCircuit size={48} style={{ marginBottom: '1rem', color: '#667eea' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI-Powered Insights</h3>
          <p style={{ color: '#ccc' }}>Get insights into how you spend your time and how you can be more productive.</p>
        </div>
      </div>

      <Link to="/calendar">
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '10px',
          fontSize: '1.2rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
