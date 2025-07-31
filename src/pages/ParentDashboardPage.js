import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSmile, FaMedal, FaStar, FaCheckCircle, FaPaperPlane, FaChartBar, FaTrophy } from 'react-icons/fa';
import { generateInviteCode } from '../api';
import { useUser } from '../UserContext';

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100%;
  background: var(--background);
  padding: 2rem 1rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;



const StudentSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StudentButton = styled.button`
  background: var(--surface-purple);
  color: var(--primary-purple);
  border: none;
  border-radius: 16px;
  padding: 0.7em 1.2em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 0.5em;
  transition: background 0.2s, color 0.2s;
  &:hover, &.active {
    background: var(--accent-pink);
    color: #fff;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div`
  background: var(--surface-white);
  border-radius: 18px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: 1px solid var(--surface-light);
  color: var(--text-primary);
`;

const StudentOverview = styled(Card)`
  align-items: flex-start;
`;

const StudentAvatar = styled.div`
  background: var(--accent-yellow);
  color: #fff;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: var(--shadow-sm);
`;

const StudentName = styled.h2`
  color: var(--primary-purple);
  font-size: 1.3rem;
  margin: 0.2em 0 0.1em 0;
`;

const StatRow = styled.div`
  display: flex;
  gap: 1.5em;
  margin: 0.7em 0;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  color: var(--primary-purple);
  font-weight: 600;
`;

const ProgressChart = styled(Card)`
  align-items: flex-start;
`;

const ActivityFeed = styled(Card)`
  min-height: 180px;
`;

const EncouragementCard = styled(Card)`
  align-items: flex-start;
`;

const AssignmentsCard = styled(Card)`
  align-items: flex-start;
`;



export default function ParentDashboardPage() {
  const { user, loading: userLoading } = useUser();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState('');
  const [encouragement, setEncouragement] = useState('');
  const [sent, setSent] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [newStudentLinked, setNewStudentLinked] = useState(false);
  const prevStudentCount = useRef(0);

    const fetchStudents = async () => {
    setStudentsLoading(true);
    setStudentsError('');
    try {
      const token = localStorage.getItem('codesensai_token');
      const res = await fetch('/users/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.students) {
        // Notification logic
        if (prevStudentCount.current !== undefined && data.students.length > prevStudentCount.current) {
          setNewStudentLinked(true);
          setTimeout(() => setNewStudentLinked(false), 4000);
        }
        prevStudentCount.current = data.students.length;
        setStudents(data.students);
        setSelectedStudent(data.students[0] || null);
      } else {
        setStudentsError(data.message || 'Could not fetch students.');
      }
    } catch (err) {
      setStudentsError('Could not fetch students.');
    } finally {
      setStudentsLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) fetchStudents();
  }, [user]);

  const handleStudentSwitch = (student) => setSelectedStudent(student);
  const handleSend = async () => {
    if (!selectedStudent || !encouragement.trim()) return;
    
    try {
      const token = localStorage.getItem('codesensai_token');
      const res = await fetch(`/users/students/${selectedStudent._id}/encouragement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: encouragement })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setEncouragement('');
        // Refresh students to get updated data
        fetchStudents();
      } else {
        console.error('Failed to send encouragement:', data.message);
      }
    } catch (err) {
      console.error('Error sending encouragement:', err);
    }
  };

  const handleGenerateInvite = async () => {
    setInviteLoading(true);
    setInviteError('');
    try {
      const result = await generateInviteCode();
      if (result.success) {
        setInviteCode(result.code);
      } else {
        setInviteError(result.error || 'Could not generate invite code.');
      }
    } catch (err) {
      console.error('Invite code generation error:', err);
      setInviteError('Could not generate invite code.');
    } finally {
      setInviteLoading(false);
    }
  };

  if (userLoading || studentsLoading) {
    return <div style={{padding:'3em', textAlign:'center', color:'#8B5CF6', fontSize:'1.3em'}}>Loading dashboard...</div>;
  }

  return (
    <PageBackground>
      <Container>
        {/* Notification for new student linked */}
        {newStudentLinked && (
          <div style={{
            background: 'var(--success-light)',
            color: 'var(--success)',
            padding: '1rem 1.5rem',
            borderRadius: 12,
            fontWeight: 600,
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.1rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--success)'
          }}>
            🎉 A new student has been linked to your account!
          </div>
        )}
        
        {/* Student Switcher */}
        {students.length > 1 && (
          <StudentSwitcher>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>
              Select Student:
            </span>
            {students.map((student, index) => (
              <StudentButton
                key={student._id}
                onClick={() => handleStudentSwitch(student)}
                className={selectedStudent?._id === student._id ? 'active' : ''}
              >
                {student.profile?.avatar || '👧'} {student.username}
              </StudentButton>
            ))}
          </StudentSwitcher>
        )}
        
        {/* Persistent notification if students exist */}
        {!newStudentLinked && students.length > 0 && (
          <div style={{
            background: 'var(--surface-purple)',
            color: 'var(--primary-purple)',
            padding: '1rem 1.5rem',
            borderRadius: 12,
            fontWeight: 600,
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.05rem',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--primary-purple)'
          }}>
            You have {students.length} student{students.length > 1 ? 's' : ''} linked to your account.
          </div>
        )}
        {/* Invite Code Section */}
        <Card style={{marginBottom: '1.5rem'}}>
          <h3 style={{color:'var(--primary-purple)', margin:'0 0 1rem 0', fontSize:'1.3rem'}}>🎯 Invite a Student</h3>
          <div style={{display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap'}}>
            <button
              onClick={handleGenerateInvite}
              style={{
                background:'var(--primary-purple)', 
                color:'white', 
                border:'none', 
                borderRadius:12, 
                padding:'0.8rem 1.5rem', 
                fontWeight:600, 
                cursor:'pointer', 
                fontSize:'1rem',
                transition:'all 0.2s',
                boxShadow:'var(--shadow-sm)'
              }}
              disabled={inviteLoading}
              onMouseEnter={(e) => e.target.style.background = 'var(--accent-pink)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--primary-purple)'}
            >
              {inviteLoading ? 'Generating...' : 'Generate Invite Code'}
            </button>
            {inviteCode && (
              <span style={{
                fontWeight:700, 
                color:'var(--primary-purple)', 
                fontSize:'1.1rem',
                background:'var(--surface-purple)',
                padding:'0.5rem 1rem',
                borderRadius:'8px',
                border:'2px solid var(--primary-purple)'
              }}>
                Code: {inviteCode}
              </span>
            )}
          </div>
          {inviteError && <div style={{color:'var(--error)', marginTop:'0.5rem', fontWeight:600}}>{inviteError}</div>}
          <div style={{color:'var(--text-secondary)', marginTop:'0.5rem', fontSize:'0.95rem'}}>Share this code with your student. It can only be used once.</div>
        </Card>
        {studentsError && (
          <div style={{padding:'2em', textAlign:'center', color:'#d32f2f', fontSize:'1.1em'}}>{studentsError}</div>
        )}
        <DashboardGrid>
          <LeftCol>
            {(!selectedStudent || students.length === 0) ? (
              <div style={{padding:'2em', textAlign:'center', color:'#8B5CF6', fontSize:'1.1em'}}>No students linked yet. Generate an invite code and have your student register!</div>
            ) : (
              <>
                <StudentOverview>
                  <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem'}}>
                    <StudentAvatar>{selectedStudent.profile?.avatar || '👧'}</StudentAvatar>
                    <div>
                      <StudentName>{selectedStudent.username}</StudentName>
                      <div style={{color:'var(--text-secondary)', fontWeight:500, fontSize:'1rem'}}>
                        Level: {selectedStudent.profile?.level || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <StatRow>
                    <Stat><FaStar style={{color:'var(--accent-yellow)'}} /> {selectedStudent.profile?.points || 0} pts</Stat>
                    <Stat><FaMedal style={{color:'var(--accent-orange)'}} /> {selectedStudent.profile?.badges?.length || 0} badges</Stat>
                    <Stat><FaCheckCircle style={{color:'var(--success)'}} /> {selectedStudent.profile?.completedLessons?.length || 0}/{20} lessons</Stat>
                  </StatRow>
                </StudentOverview>
                <ActivityFeed>
                  <h3 style={{color:'var(--primary-purple)', margin:'0 0 1rem 0', fontSize:'1.3rem'}}>📊 Recent Activity</h3>
                  <ul style={{padding:0, margin:0, listStyle:'none'}}>
                    {selectedStudent.profile?.recentActivity?.length > 0 ? (
                      selectedStudent.profile.recentActivity.map((item, idx) => (
                        <li key={idx} style={{
                          marginBottom:'0.8rem', 
                          display:'flex', 
                          alignItems:'center', 
                          gap:'0.5rem', 
                          color:'var(--text-primary)',
                          padding:'0.5rem',
                          background:'var(--surface-light)',
                          borderRadius:'8px',
                          fontSize:'0.95rem'
                        }}>
                          <FaCheckCircle style={{color:'var(--success)'}} /> {item}
                        </li>
                      ))
                    ) : (
                      <li style={{color:'var(--text-secondary)', fontStyle:'italic'}}>No recent activity</li>
                    )}
                  </ul>
                </ActivityFeed>
              </>
            )}
          </LeftCol>
          <RightCol>
            <ProgressChart>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 1rem 0', fontSize:'1.3rem'}}>📊 Progress</h3>
              <div style={{width:'100%', background:'var(--surface-light)', borderRadius:12, height:24, marginBottom:12, boxShadow:'var(--shadow-sm)'}}>
                <div style={{
                  width:`${selectedStudent && selectedStudent.profile?.completedLessons ? Math.round((selectedStudent.profile.completedLessons.length / 20) * 100) : 0}%`, 
                  height:'100%', 
                  background:'linear-gradient(90deg, var(--primary-purple) 0%, var(--accent-pink) 100%)', 
                  borderRadius:12, 
                  transition:'width 0.6s'
                }}></div>
              </div>
              <div style={{color:'var(--primary-purple)', fontWeight:600, fontSize:'1.1rem', textAlign:'center'}}>
                {selectedStudent && selectedStudent.profile?.completedLessons ? Math.round((selectedStudent.profile.completedLessons.length / 20) * 100) : 0}% complete
              </div>
            </ProgressChart>
            <EncouragementCard>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 1rem 0', fontSize:'1.3rem'}}>💌 Send Encouragement</h3>
              <div style={{display:'flex', gap:'0.7rem', alignItems:'center', marginBottom:'1rem', flexWrap:'wrap'}}>
                <FaSmile style={{fontSize:'1.5rem', color:'var(--accent-pink)'}} />
                <input
                  type="text"
                  value={encouragement}
                  onChange={e => setEncouragement(e.target.value)}
                  placeholder="Type a message or emoji!"
                  style={{
                    flex:1, 
                    borderRadius:12, 
                    border:'2px solid var(--surface-light)', 
                    background:'var(--surface-white)',
                    color:'var(--text-primary)',
                    padding:'0.8rem 1rem', 
                    fontSize:'1rem',
                    minWidth:'200px'
                  }}
                />
                <button
                  onClick={handleSend}
                  style={{
                    background:'var(--primary-purple)', 
                    color:'white', 
                    border:'none', 
                    borderRadius:12, 
                    padding:'0.8rem 1.5rem', 
                    fontWeight:600, 
                    cursor:'pointer', 
                    fontSize:'1rem',
                    transition:'all 0.2s',
                    boxShadow:'var(--shadow-sm)'
                  }}
                  disabled={!encouragement.trim()}
                  onMouseEnter={(e) => e.target.style.background = 'var(--accent-pink)'}
                  onMouseLeave={(e) => e.target.style.background = 'var(--primary-purple)'}
                >
                  <FaPaperPlane /> Send
                </button>
              </div>
              {sent && (
                <div style={{
                  color:'var(--success)', 
                  fontWeight:600, 
                  textAlign:'center', 
                  padding:'0.8rem', 
                  background:'var(--success-light)', 
                  borderRadius:'8px',
                  border:'1px solid var(--success)'
                }}>
                  💝 Message sent! 🎉
                </div>
              )}
            </EncouragementCard>
            <AssignmentsCard>
              <h3 style={{color:'white', margin:'0 0 0.7em 0', fontSize:'1.3rem'}}>🎯 Assignments & Recommendations</h3>
              <ul style={{padding:0, margin:0, listStyle:'none'}}>
                <li style={{marginBottom:'0.8em', display:'flex', alignItems:'center', gap:'0.5em', color:'white', fontSize:'1rem'}}>
                  <FaTrophy style={{color:'#FFD700'}} /> Try the "Advanced JavaScript" module next!
                </li>
                <li style={{marginBottom:'0.8em', display:'flex', alignItems:'center', gap:'0.5em', color:'white', fontSize:'1rem'}}>
                  <FaChartBar style={{color:'#FFD700'}} /> Take the "React Basics" quiz for extra points!
                </li>
              </ul>
            </AssignmentsCard>
          </RightCol>
        </DashboardGrid>
      </Container>
    </PageBackground>
  );
} 