import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserTie, FaSmile, FaMedal, FaStar, FaCheckCircle, FaPaperPlane, FaChartBar, FaTrophy } from 'react-icons/fa';

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #fbc2eb 0%, #a18cd1 50%, #fcb69f 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2.5rem 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  background: var(--surface-white);
  border-radius: 28px;
  box-shadow: var(--shadow-xl);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ParentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2em;
`;

const ParentAvatar = styled.div`
  background: var(--accent-pink);
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: var(--shadow-md);
`;

const Title = styled.h1`
  color: var(--primary-purple);
  font-size: 2.1rem;
  font-family: 'Poppins', Arial, sans-serif;
  margin: 0;
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
  grid-template-columns: 1.2fr 1fr;
  gap: 2.5rem;
  @media (max-width: 900px) {
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
  background: var(--surface-purple);
  border-radius: 18px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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

const mockParent = {
  name: 'Mrs. Amina',
  avatar: <FaUserTie />,
};

const mockStudents = [
  {
    id: 1,
    name: 'Zara',
    avatar: '🦄',
    level: 'Beginner',
    points: 320,
    badges: 3,
    lessons: 12,
    totalLessons: 20,
    recentActivity: [
      'Completed "JavaScript Basics" quiz',
      'Earned badge: Fast Learner',
      'Finished Module: HTML & CSS',
    ],
  },
  {
    id: 2,
    name: 'Sam',
    avatar: '🤖',
    level: 'Intermediate',
    points: 480,
    badges: 5,
    lessons: 18,
    totalLessons: 20,
    recentActivity: [
      'Completed "React Components" lesson',
      'Earned badge: Code Master',
      'Took a quiz: Python Loops',
    ],
  },
];

export default function ParentDashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);
  const [encouragement, setEncouragement] = useState('');
  const [sent, setSent] = useState(false);

  const handleStudentSwitch = (student) => setSelectedStudent(student);
  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 1500);
    setEncouragement('');
  };

  const progressPercent = Math.round((selectedStudent.lessons / selectedStudent.totalLessons) * 100);

  return (
    <PageBackground>
      <Container>
        <Header>
          <ParentInfo>
            <ParentAvatar>{mockParent.avatar}</ParentAvatar>
            <Title>Welcome, {mockParent.name}!</Title>
          </ParentInfo>
          <StudentSwitcher>
            {mockStudents.map((student) => (
              <StudentButton
                key={student.id}
                className={selectedStudent.id === student.id ? 'active' : ''}
                onClick={() => handleStudentSwitch(student)}
              >
                <span style={{fontSize:'1.3em'}}>{student.avatar}</span> {student.name}
              </StudentButton>
            ))}
          </StudentSwitcher>
        </Header>
        <DashboardGrid>
          <LeftCol>
            <StudentOverview>
              <StudentAvatar>{selectedStudent.avatar}</StudentAvatar>
              <StudentName>{selectedStudent.name}</StudentName>
              <div style={{color:'var(--text-secondary)', fontWeight:500}}>
                Level: {selectedStudent.level}
              </div>
              <StatRow>
                <Stat><FaStar /> {selectedStudent.points} pts</Stat>
                <Stat><FaMedal /> {selectedStudent.badges} badges</Stat>
                <Stat><FaCheckCircle /> {selectedStudent.lessons}/{selectedStudent.totalLessons} lessons</Stat>
              </StatRow>
            </StudentOverview>
            <ActivityFeed>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 0.7em 0'}}>Recent Activity</h3>
              <ul style={{padding:0, margin:0, listStyle:'none'}}>
                {selectedStudent.recentActivity.map((item, idx) => (
                  <li key={idx} style={{marginBottom:'0.5em', display:'flex', alignItems:'center', gap:'0.5em', color:'var(--primary-purple)'}}>
                    <FaCheckCircle /> {item}
                  </li>
                ))}
              </ul>
            </ActivityFeed>
          </LeftCol>
          <RightCol>
            <ProgressChart>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 0.7em 0'}}>Progress</h3>
              <div style={{width:'100%', background:'var(--surface-white)', borderRadius:12, height:22, marginBottom:10, boxShadow:'var(--shadow-sm)'}}>
                <div style={{width:`${progressPercent}%`, height:'100%', background:'linear-gradient(90deg, #8B5CF6 60%, #F59E0B 100%)', borderRadius:12, transition:'width 0.6s'}}></div>
              </div>
              <div style={{color:'var(--primary-purple)', fontWeight:600}}>{progressPercent}% complete</div>
            </ProgressChart>
            <EncouragementCard>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 0.7em 0'}}>Send Encouragement</h3>
              <div style={{display:'flex', gap:'0.7em', alignItems:'center', marginBottom:'0.7em'}}>
                <FaSmile style={{fontSize:'1.5em', color:'var(--accent-pink)'}} />
                <input
                  type="text"
                  value={encouragement}
                  onChange={e => setEncouragement(e.target.value)}
                  placeholder="Type a message or emoji!"
                  style={{flex:1, borderRadius:12, border:'1px solid var(--accent-pink)', padding:'0.5em 1em', fontSize:'1rem'}}
                />
                <button
                  onClick={handleSend}
                  style={{background:'var(--accent-pink)', color:'#fff', border:'none', borderRadius:12, padding:'0.5em 1.2em', fontWeight:600, cursor:'pointer', fontSize:'1rem'}}
                  disabled={!encouragement.trim()}
                >
                  <FaPaperPlane /> Send
                </button>
              </div>
              {sent && <div style={{color:'var(--success)', fontWeight:600}}>Message sent! 🎉</div>}
            </EncouragementCard>
            <AssignmentsCard>
              <h3 style={{color:'var(--primary-purple)', margin:'0 0 0.7em 0'}}>Assignments & Recommendations</h3>
              <ul style={{padding:0, margin:0, listStyle:'none'}}>
                <li style={{marginBottom:'0.5em', display:'flex', alignItems:'center', gap:'0.5em'}}>
                  <FaTrophy style={{color:'var(--accent-yellow)'}} /> Try the "Advanced JavaScript" module next!
                </li>
                <li style={{marginBottom:'0.5em', display:'flex', alignItems:'center', gap:'0.5em'}}>
                  <FaChartBar style={{color:'var(--primary-purple)'}} /> Take the "React Basics" quiz for extra points!
                </li>
              </ul>
            </AssignmentsCard>
          </RightCol>
        </DashboardGrid>
      </Container>
    </PageBackground>
  );
} 