import React, { useState } from "react";
import modules from "../data/modules";
import { useUser } from "../UserContext";
import { updateUserProgress } from "../api";

// Sound effect hooks
const playSound = (src) => {
  const audio = new window.Audio(src);
  audio.volume = 0.5;
  audio.play();
};

// --- Add mascot animation helpers ---
const useMascotAnimation = () => {
  const [animation, setAnimation] = useState("");
  const trigger = (type) => {
    setAnimation(type);
    setTimeout(() => setAnimation(""), 600);
  };
  return [animation, trigger];
};

const MascotBubble = ({ message, animation }) => (
  <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
    <span
      role="img"
      aria-label="Sensai"
      style={{
        fontSize: 32,
        marginRight: 8,
        display: 'inline-block',
        transition: 'transform 0.3s',
        transform:
          animation === 'shake'
            ? 'translateX(-5px) rotate(-10deg)'
            : animation === 'bounce'
            ? 'translateY(-10px) scale(1.2)'
            : 'none',
      }}
    >🥋</span>
    <div style={{ background: '#f3e8ff', color: '#7c3aed', borderRadius: 16, padding: '0.75rem 1.25rem', fontWeight: 500, fontSize: 18, boxShadow: '0 2px 8px #e9d5ff' }}>{message}</div>
  </div>
);

const Playground = ({ code, prompt }) => {
  const [value, setValue] = useState(code);
  return (
    <div style={{ margin: '1rem 0', background: '#f1f5f9', borderRadius: 12, padding: 16 }}>
      <div style={{ marginBottom: 8, color: '#6366f1', fontWeight: 600 }}>{prompt}</div>
      <textarea value={value} onChange={e => setValue(e.target.value)} rows={3} style={{ width: '100%', fontFamily: 'monospace', fontSize: 16, borderRadius: 8, padding: 8, border: '1px solid #ddd' }} />
      <div style={{ marginTop: 8, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

// --- Refactor DragDrop ---
const DragDrop = ({ prompt, items, answer, mascotCorrect, mascotIncorrect, onAnswered }) => {
  const [dragged, setDragged] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [mascotAnim, triggerAnim] = useMascotAnimation();

  const handleDrop = () => {
    if (!dragged) {
      setFeedback("Please drag an item before dropping!");
      setShowTryAgain(true);
      triggerAnim('shake');
      if (onAnswered) onAnswered(false);
      return;
    }
    if (dragged === answer) {
      setFeedback(mascotCorrect);
      setCorrect(true);
      triggerAnim('bounce');
      if (onAnswered) onAnswered(true);
    } else {
      setFeedback(mascotIncorrect);
      setShowTryAgain(true);
      triggerAnim('shake');
      if (onAnswered) onAnswered(false);
    }
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setShowTryAgain(false);
    setDragged(null);
    if (onAnswered) onAnswered(false);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{ marginBottom: 8, fontWeight: 500 }}>{prompt}</div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        {items.map((item, i) => (
          <div key={i} draggable onDragStart={() => setDragged(item)} style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'grab', fontWeight: 600 }}>{item}</div>
        ))}
      </div>
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          minHeight: 40,
          border: correct ? '2px solid #22c55e' : showTryAgain ? '2px solid #ef4444' : '2px dashed #a5b4fc',
          borderRadius: 8,
          padding: 16,
          textAlign: 'center',
          background: '#f8fafc',
          color: '#6366f1',
          fontWeight: 600,
          transition: 'border 0.3s',
        }}
      >
        Drop here!
      </div>
      {feedback && <MascotBubble message={feedback} animation={mascotAnim} />}
      {showTryAgain && <button onClick={handleTryAgain} style={{ marginTop: 8, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer' }}>Try Again</button>}
    </div>
  );
};

// --- Refactor FillBlank ---
const FillBlank = ({ prompt, answer, mascotCorrect, mascotIncorrect, onAnswered }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [mascotAnim, triggerAnim] = useMascotAnimation();

  const handleCheck = () => {
    if (!input.trim()) {
      setFeedback("Oops! You need to enter something. Try again!");
      setShowTryAgain(true);
      triggerAnim('shake');
      if (onAnswered) onAnswered(false);
      return;
    }
    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setFeedback(mascotCorrect);
      setCorrect(true);
      triggerAnim('bounce');
      if (onAnswered) onAnswered(true);
    } else {
      setFeedback(mascotIncorrect);
      setShowTryAgain(true);
      triggerAnim('shake');
      if (onAnswered) onAnswered(false);
    }
  };

  const handleTryAgain = () => {
    setFeedback(null);
    setShowTryAgain(false);
    setInput("");
    if (onAnswered) onAnswered(false);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{ marginBottom: 8, fontWeight: 500 }}>{prompt}</div>
      <input value={input} onChange={e => setInput(e.target.value)} style={{ border: showTryAgain ? '2px solid #ef4444' : '1px solid #ddd', borderRadius: 8, padding: 8, fontSize: 16, marginRight: 8, transition: 'border 0.3s' }} />
      <button onClick={handleCheck} disabled={correct} style={{ background: '#a5b4fc', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 600, cursor: correct ? 'not-allowed' : 'pointer', opacity: correct ? 0.5 : 1 }}>Check</button>
      {feedback && <MascotBubble message={feedback} animation={mascotAnim} />}
      {showTryAgain && <button onClick={handleTryAgain} style={{ marginTop: 8, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer' }}>Try Again</button>}
    </div>
  );
};

const Reward = ({ badge, mascot }) => (
  <div style={{ margin: '2rem 0', textAlign: 'center' }}>
    <img src="/assets/images/badge_html_starter.png" alt={badge} style={{ width: 80, height: 80, marginBottom: 8 }} />
    <MascotBubble message={mascot} />
    <div style={{ fontWeight: 700, color: '#7c3aed', fontSize: 20 }}>{badge}</div>
  </div>
);

const ModuleViewer = ({ onNotify }) => {
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [step, setStep] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [canProceed, setCanProceed] = useState(true); // new state
  const { user, updateUser } = useUser();
  const module = modules.find((m) => m.id === selectedModuleId);

  const handleModuleSelect = (id) => {
    console.log('=== MODULE SELECTED ==='); // Debug log
    console.log('Module ID:', id); // Debug log
    console.log('Module:', modules.find(m => m.id === id)); // Debug log
    setSelectedModuleId(id);
    setStep(0);
    setModuleCompleted(false);
  };

  const handleCompleteModule = async () => {
    if (!user) return;
    console.log('=== MODULE COMPLETION START ==='); // Debug log
    console.log('User before completion:', user); // Debug log
    console.log('Module being completed:', module); // Debug log
    
    const completedLessons = user.profile?.completedLessons || [];
    let didComplete = false;
    let didEarnBadge = false;
    let didEarnPoints = false;
    let badgeName = module.badge;
    let pointsEarned = 0;
    
    if (!completedLessons.includes(module.id)) {
      console.log('Module not completed yet, proceeding with completion...'); // Debug log
      const badges = user.profile?.badges || [];
      if (module.badge && !badges.includes(module.badge)) {
        didEarnBadge = true;
        console.log('Will earn badge:', module.badge); // Debug log
      }
      pointsEarned = 50 + (didEarnBadge ? 50 : 0);
      console.log('Will earn points:', pointsEarned); // Debug log
      
      // Save progress to backend
      try {
        const progressData = {
          lessonId: module.id,
          completed: true,
          score: pointsEarned,
          timeSpent: 0,
          badge: module.badge // Send badge information to backend
        };
        
        console.log('Saving progress data:', progressData); // Debug log
        const result = await updateUserProgress(progressData);
        console.log('Progress save result:', result); // Debug log
        
        if (result.success) {
          // Update local state with the response from backend
          console.log('Backend response user:', result.user); // Debug log
          updateUser(result.user);
          didComplete = true;
          didEarnPoints = true;
          console.log('Progress saved successfully!'); // Debug log
          console.log('User after update:', result.user); // Debug log
        } else {
          console.error('Failed to save progress:', result.error);
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
    
    setModuleCompleted(true);
    // Notify dashboard and play sounds
    if (onNotify) {
      if (didComplete) {
        onNotify('module', `Completed module: "${module.title}"`);
        playSound('/assets/sounds/completed.mp3');
      }
      if (didEarnBadge) {
        onNotify('badge', `Earned badge: "${badgeName}"`);
        playSound('/assets/sounds/badge.mp3');
      }
      if (didEarnPoints) {
        onNotify('points', `Gained ${pointsEarned} points!`);
        playSound('/assets/sounds/points.mp3');
      }
    }
  };

  // Helper to determine if step is interactive
  const steps = module?.content || [];
  const currentStep = steps[step];
  const isInteractive = currentStep && currentStep.type === 'interactive';
  const isLastStep = step === steps.length - 1;

  // Handler for interactive steps
  const handleAnswered = (correct) => {
    setCanProceed(!!correct);
  };

  // Reset canProceed when step changes
  React.useEffect(() => {
    setCanProceed(!isInteractive); // Only require correct answer for interactive
  }, [step, selectedModuleId, isInteractive]);

  if (!selectedModuleId) {
    // Filter modules by completion
    const completedIds = user?.profile?.completedLessons || [];
    const incompleteModules = modules.filter(m => !completedIds.includes(m.id));
    const completedModules = modules.filter(m => completedIds.includes(m.id));
    return (
      <div style={{ margin: '2rem 0' }}>
        <h2 style={{ color: '#7c3aed', fontWeight: 700 }}>Choose a Module</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
          {incompleteModules.length === 0 && <div style={{ color: '#16a34a', fontWeight: 600 }}>🎉 All modules completed! Try reviewing or replaying below.</div>}
          {incompleteModules.map((m) => (
            <button key={m.id} onClick={() => handleModuleSelect(m.id)} style={{ background: '#f3e8ff', color: '#7c3aed', border: 'none', borderRadius: 16, padding: '1rem 2rem', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #e9d5ff' }}>{m.title}</button>
          ))}
        </div>
        {completedModules.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ color: '#22c55e', fontWeight: 700 }}>Completed Modules</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
              {completedModules.map((m) => (
                <button key={m.id} onClick={() => handleModuleSelect(m.id)} style={{ background: '#f0fdf4', color: '#16a34a', border: 'none', borderRadius: 16, padding: '1rem 2rem', fontWeight: 600, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #bbf7d0' }}>🔁 {m.title}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const renderStep = (stepObj, i) => {
    switch (stepObj.type) {
      case "mascot":
        return <MascotBubble key={i} message={stepObj.value} />;
      case "text":
        return <div key={i} style={{ fontSize: 18, margin: '1rem 0', color: '#374151' }}>{stepObj.value}</div>;
      case "image":
        return <img key={i} src={stepObj.value} alt={stepObj.alt || "Lesson visual"} style={{ width: '100%', maxWidth: 320, display: 'block', margin: '1rem auto', borderRadius: 12, boxShadow: '0 2px 8px #e0e7ff' }} />;
      case "code":
        return <Playground key={i} code={stepObj.value} prompt={stepObj.prompt} />;
      case "interactive":
        if (stepObj.interaction === "drag-drop")
          return <DragDrop key={i} {...stepObj} onAnswered={() => {}} />; // Placeholder for onAnswered
        if (stepObj.interaction === "fill-blank")
          return <FillBlank key={i} {...stepObj} onAnswered={() => {}} />; // Placeholder for onAnswered
        return null;
      case "quiz":
        // For now, skip in-lesson quiz (handled in quiz section)
        return null;
      case "reward":
        return <Reward key={i} badge={stepObj.badge} mascot={stepObj.mascot} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: '2rem 0', background: '#fff', borderRadius: 20, boxShadow: '0 2px 16px #ede9fe', padding: 24, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
      <button onClick={() => setSelectedModuleId(null)} style={{ background: 'none', color: '#7c3aed', border: 'none', fontWeight: 600, fontSize: 16, marginBottom: 16, cursor: 'pointer' }}>← Back to modules</button>
      <div>{
        isInteractive && currentStep.interaction === 'drag-drop' ? (
          <DragDrop {...currentStep} onAnswered={handleAnswered} />
        ) : isInteractive && currentStep.interaction === 'fill-blank' ? (
          <FillBlank {...currentStep} onAnswered={handleAnswered} />
        ) : renderStep(currentStep, step)
      }</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: '#e0e7ff', color: '#7c3aed', border: 'none', borderRadius: 12, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.5 : 1 }}>Back</button>
        {isLastStep ? (
          <button onClick={() => {
            console.log('=== FINISH MODULE BUTTON CLICKED ==='); // Debug log
            console.log('Current step:', step); // Debug log
            console.log('Total steps:', steps.length); // Debug log
            console.log('Is last step:', isLastStep); // Debug log
            handleCompleteModule();
          }} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 12, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            {moduleCompleted ? 'Module Completed!' : 'Finish Module'}
          </button>
        ) : (
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={!canProceed || step === steps.length - 1} style={{ background: '#a5b4fc', color: '#fff', border: 'none', borderRadius: 12, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: !canProceed || step === steps.length - 1 ? 'not-allowed' : 'pointer', opacity: !canProceed || step === steps.length - 1 ? 0.5 : 1 }}>Next</button>
        )}
      </div>
      {moduleCompleted && (
        <div style={{ marginTop: 24, background: '#f0fdf4', color: '#16a34a', borderRadius: 12, padding: 16, fontWeight: 600, textAlign: 'center', fontSize: 18 }}>
          🎉 Congratulations! You completed this module, earned the "{module.badge}" badge, and got 100 points!
        </div>
      )}
    </div>
  );
};

export default ModuleViewer; 