import React, { useState, useMemo } from 'react';

// ðŸ¥‹ LP DOJO V3.4
// NEW: Full Tarot System (16 cards), Creative Move, Rewards, Penalties
// Flow: Level Select â†’ Strategy â†’ Mission Board â†’ Outcomes â†’ STAR â†’ Badge

// ============================================
// ðŸŽ¨ STANDALONE COMPONENT: Task Card
// ============================================
const TaskCard = ({ task, onUpdate, onDelete, leadershipPrinciples, fulfillmentTypes, satisfactionOptions }) => {
  const [isExpanded, setIsExpanded] = useState(!task.name);

  const handleLPToggle = (lpId) => {
    const current = task.lpTags || [];
    const updated = current.includes(lpId)
      ? current.filter(id => id !== lpId)
      : [...current, lpId];
    onUpdate(task.id, 'lpTags', updated);
  };

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`rounded-xl border transition-all
      ${task.status === 'completed' ? 'bg-green-500/20 border-green-500/50' :
        task.status === 'missed' ? 'bg-red-500/20 border-red-500/50' :
        task.status === 'in-progress' ? 'bg-blue-500/20 border-blue-500/50' :
        'bg-white/5 border-white/20'}`}>
      
      {/* Header - only this toggles expansion */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer select-none"
        onClick={handleHeaderClick}
      >
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
            ${task.type === 'main' ? 'bg-amber-500/30' : 'bg-blue-500/30'}`}>
            {task.type === 'main' ? 'â­' : 'ðŸ“Œ'}
          </span>
          <div>
            <p className="text-white font-medium">{task.name || 'New Task (click to expand)'}</p>
            <div className="flex items-center gap-2">
              <p className="text-white/50 text-xs capitalize">{task.type} Task</p>
              <span className={`text-xs px-2 py-0.5 rounded-full
                ${task.status === 'draft' ? 'bg-gray-500/30 text-gray-300' :
                  task.status === 'in-progress' ? 'bg-blue-500/30 text-blue-300' :
                  task.status === 'completed' ? 'bg-green-500/30 text-green-300' :
                  task.status === 'missed' ? 'bg-red-500/30 text-red-300' : ''}`}>
                {task.status === 'draft' ? 'ðŸ“ Draft' :
                 task.status === 'in-progress' ? 'ðŸ”„ In Progress' :
                 task.status === 'completed' ? 'âœ… Completed' :
                 task.status === 'missed' ? 'âŒ Missed' : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-lg">{isExpanded ? 'â–¼' : 'â–¶'}</span>
        </div>
      </div>

      {/* Expanded Content - clicks here do NOT toggle */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Task Name */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Task Name *</label>
            <input
              type="text"
              value={task.name || ''}
              onChange={(e) => onUpdate(task.id, 'name', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Enter task name..."
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          {/* Description */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Task Description</label>
            <textarea
              value={task.description || ''}
              onChange={(e) => onUpdate(task.id, 'description', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Describe the task..."
              rows={2}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Application */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Application (Where will this be used?)</label>
            <input
              type="text"
              value={task.application || ''}
              onChange={(e) => onUpdate(task.id, 'application', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder="e.g., Work project, Portfolio, Interview prep..."
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Leadership Skills - Multi-select */}
          <div>
            <label className="text-white/60 text-xs mb-2 block">Leadership Skills (Multi-select)</label>
            <div className="flex flex-wrap gap-2">
              {leadershipPrinciples.map(lp => (
                <button
                  key={lp.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLPToggle(lp.id);
                  }}
                  className={`text-xs px-2 py-1 rounded-full transition-all
                    ${task.lpTags?.includes(lp.id)
                      ? `bg-gradient-to-r ${lp.color} text-white`
                      : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                >
                  {lp.icon} {lp.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fulfillment Type - Dropdown */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Fulfillment Type</label>
            <select
              value={task.fulfillmentType || ''}
              onChange={(e) => onUpdate(task.id, 'fulfillmentType', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select type...</option>
              {fulfillmentTypes.map(ft => (
                <option key={ft.id} value={ft.id}>{ft.name}</option>
              ))}
            </select>
          </div>

          {/* Completion Date */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Completion Date</label>
            <input
              type="date"
              value={task.completionDate || ''}
              onChange={(e) => onUpdate(task.id, 'completionDate', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Satisfaction - Dropdown */}
          <div>
            <label className="text-white/60 text-xs mb-1 block">Satisfaction</label>
            <select
              value={task.satisfaction || ''}
              onChange={(e) => onUpdate(task.id, 'satisfaction', e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Select...</option>
              {satisfactionOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.icon} {opt.name}</option>
              ))}
            </select>
          </div>

          {/* Status Buttons - 4 status flow */}
          <div className="pt-2">
            <label className="text-white/60 text-xs mb-2 block">Task Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(task.id, 'status', 'draft');
                }}
                className={`py-2 rounded-lg text-sm font-medium transition-all
                  ${task.status === 'draft'
                    ? 'bg-gray-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-gray-500/30'}`}
              >
                ðŸ“ Draft
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(task.id, 'status', 'in-progress');
                }}
                className={`py-2 rounded-lg text-sm font-medium transition-all
                  ${task.status === 'in-progress'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-blue-500/30'}`}
              >
                ðŸ”„ In Progress
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(task.id, 'status', 'completed');
                }}
                className={`py-2 rounded-lg text-sm font-medium transition-all
                  ${task.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-green-500/30'}`}
              >
                âœ… Complete
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(task.id, 'status', 'missed');
                }}
                className={`py-2 rounded-lg text-sm font-medium transition-all
                  ${task.status === 'missed'
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-red-500/30'}`}
              >
                âŒ Missed
              </button>
            </div>
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="w-full py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/20 transition-all"
          >
            ðŸ—‘ï¸ Delete Task
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// ðŸŽ® MAIN APP COMPONENT
// ============================================
const GrowthMonsterApp = () => {
  // ============================================
  // ðŸ“¦ MASTER STATE
  // ============================================
  
  const [levels, setLevels] = useState([
    { id: 1, unlocked: true, currentStep: 'strategy', completed: false },
    { id: 2, unlocked: false, currentStep: null, completed: false },
    { id: 3, unlocked: false, currentStep: null, completed: false },
    { id: 4, unlocked: false, currentStep: null, completed: false },
    { id: 5, unlocked: false, currentStep: null, completed: false },
    { id: 6, unlocked: false, currentStep: null, completed: false },
    { id: 7, unlocked: false, currentStep: null, completed: false },
    { id: 8, unlocked: false, currentStep: null, completed: false }
  ]);
  
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [activeScreen, setActiveScreen] = useState('levelSelect');
  
  // Strategy State per level
  const [strategies, setStrategies] = useState({});
  
  // Mission Board Tasks per level
  const [tasks, setTasks] = useState({});
  
  // STAR Stories per level
  const [starStories, setStarStories] = useState({});
  
  // Badges
  const [badges, setBadges] = useState([]);
  
  // Monster
  const [monsterXP, setMonsterXP] = useState(0);
  const [monsterMood, setMonsterMood] = useState('happy');
  
  // UI State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showMonsterReaction, setShowMonsterReaction] = useState(false);
  const [reactionType, setReactionType] = useState('');
  
  // Consequence State
  const [outcomeType, setOutcomeType] = useState(null);
  const [penaltyReflection, setPenaltyReflection] = useState('');
  
  // STAR Form State
  const [newStory, setNewStory] = useState({
    title: '', situation: '', task: '', action: '', result: '', reflection: '', lpTags: []
  });

  // ============================================
  // ðŸƒ TAROT DECK (16 LP Cards)
  // ============================================
  const tarotDeck = [
    { id: 1, lp: 'Customer Obsession', lpId: 'customer-obsession', subtitle: 'The Mirror Card', icon: 'ðŸªž', wisdom: 'See the world through their eyes, not yours', quest: 'Interview 3 users/customers about their pain points', miniChallenge: 'Watch a customer use your product or a competitor\'s', color: 'from-blue-500 to-cyan-500' },
    { id: 2, lp: 'Ownership', lpId: 'ownership', subtitle: 'The Crown Card', icon: 'ðŸ‘‘', wisdom: 'Act as if everything depends on you, because it does', quest: 'Take ownership of one neglected project/task', miniChallenge: 'Fix something broken that "isn\'t your job"', color: 'from-yellow-500 to-orange-500' },
    { id: 3, lp: 'Invent and Simplify', lpId: 'invent-simplify', subtitle: 'The Lightbulb Card', icon: 'ðŸ’¡', wisdom: 'Complexity is easy; simplicity requires genius', quest: 'Take something complex and make it 10x simpler', miniChallenge: 'Explain a technical concept to a 10-year-old', color: 'from-purple-500 to-pink-500' },
    { id: 4, lp: 'Are Right, A Lot', lpId: 'are-right', subtitle: 'The Archer Card', icon: 'ðŸŽ¯', wisdom: 'Seek diverse perspectives, then trust your judgment', quest: 'Make a decision based on data, defend it, track outcome', miniChallenge: 'Argue BOTH sides of a decision you need to make', color: 'from-red-500 to-rose-500' },
    { id: 5, lp: 'Learn and Be Curious', lpId: 'learn-curious', subtitle: 'The Explorer Card', icon: 'ðŸ“š', wisdom: 'Every day is a chance to know nothing and learn everything', quest: 'Deep dive into something you know nothing about (4 hours)', miniChallenge: 'Ask "why?" five times about something you understand', color: 'from-green-500 to-emerald-500' },
    { id: 6, lp: 'Hire and Develop the Best', lpId: 'hire-develop', subtitle: 'The Gardener Card', icon: 'ðŸŒ±', wisdom: 'Talent is everywhere; your job is to help it bloom', quest: 'Mentor someone for 1 hour, teach them something valuable', miniChallenge: 'Write a growth plan for a colleague or friend', color: 'from-lime-500 to-green-500' },
    { id: 7, lp: 'Insist on Highest Standards', lpId: 'highest-standards', subtitle: 'The Diamond Card', icon: 'â­', wisdom: 'Excellence isn\'t an act, it\'s a habit', quest: 'Take something "done" and make it exceptional', miniChallenge: 'Add one unexpected quality touch to your current work', color: 'from-indigo-500 to-purple-500' },
    { id: 8, lp: 'Think Big', lpId: 'think-big', subtitle: 'The Cosmos Card', icon: 'ðŸš€', wisdom: 'Small thinking yields small results; dream impossibly', quest: 'Design a solution 10x bigger than the current approach', miniChallenge: 'Write your "impossible" vision for 5 years from now', color: 'from-violet-500 to-fuchsia-500' },
    { id: 9, lp: 'Bias for Action', lpId: 'bias-action', subtitle: 'The Lightning Card', icon: 'âš¡', wisdom: 'Speed matters; perfection is the enemy of progress', quest: 'Start something TODAY you\'ve been planning for weeks', miniChallenge: 'Make a decision in 5 minutes you\'d normally spend days on', color: 'from-amber-500 to-yellow-500' },
    { id: 10, lp: 'Frugality', lpId: 'frugality', subtitle: 'The Alchemist Card', icon: 'ðŸ’°', wisdom: 'Constraints breed resourcefulness and innovation', quest: 'Build something valuable with ZERO budget', miniChallenge: 'Find 3 free alternatives to paid tools you use', color: 'from-teal-500 to-cyan-500' },
    { id: 11, lp: 'Earn Trust', lpId: 'earn-trust', subtitle: 'The Bridge Card', icon: 'ðŸ¤', wisdom: 'Trust is built in drops and lost in buckets', quest: 'Have a vulnerable, honest conversation with someone', miniChallenge: 'Admit a mistake publicly and share what you learned', color: 'from-blue-500 to-indigo-500' },
    { id: 12, lp: 'Dive Deep', lpId: 'dive-deep', subtitle: 'The Ocean Card', icon: 'ðŸ¤¿', wisdom: 'Surface-level understanding breeds surface-level results', quest: 'Investigate root cause of something, go 5 levels deep', miniChallenge: 'Spend 2 hours understanding ONE thing completely', color: 'from-sky-500 to-blue-500' },
    { id: 13, lp: 'Have Backbone; Disagree and Commit', lpId: 'backbone-disagree', subtitle: 'The Shield Card', icon: 'ðŸ›¡ï¸', wisdom: 'Speak your truth, then commit fully once decided', quest: 'Voice an unpopular opinion, then support final decision', miniChallenge: 'Challenge something you disagree with respectfully', color: 'from-slate-500 to-gray-600' },
    { id: 14, lp: 'Deliver Results', lpId: 'deliver-results', subtitle: 'The Champion Card', icon: 'ðŸ†', wisdom: 'Good intentions don\'t matter; outcomes do', quest: 'Complete one overdue deliverable to 100%', miniChallenge: 'Ship something today, even if imperfect', color: 'from-orange-500 to-red-500' },
    { id: 15, lp: 'Strive to be Earth\'s Best Employer', lpId: 'best-employer', subtitle: 'The Hearth Card', icon: 'â¤ï¸', wisdom: 'Create conditions where others thrive, not just survive', quest: 'Do something that improves someone else\'s work life', miniChallenge: 'Give genuine, specific appreciation to 3 people', color: 'from-pink-500 to-rose-500' },
    { id: 16, lp: 'Success and Scale Bring Broad Responsibility', lpId: 'responsibility', subtitle: 'The Atlas Card', icon: 'ðŸŒ', wisdom: 'With great power comes great responsibility to all', quest: 'Consider the broader impact of your current project', miniChallenge: 'Make one decision considering sustainability/ethics', color: 'from-emerald-500 to-teal-500' },
  ];

  // ============================================
  // ðŸŽ¨ CREATIVE MOVE TEMPLATES
  // ============================================
  const creativeMoveTemplates = [
    { id: 'c1', type: 'creative', name: 'Build a mini-product in a weekend', icon: 'ðŸŽ¨', description: 'App, tool, or game' },
    { id: 'c2', type: 'creative', name: 'Write a technical blog post', icon: 'âœï¸', description: 'Explain something you learned' },
    { id: 'c3', type: 'creative', name: 'Create a YouTube video or LinkedIn post', icon: 'ðŸ“¹', description: 'Teach something' },
    { id: 'c4', type: 'creative', name: 'Design a system architecture', icon: 'ðŸ—ï¸', description: 'For a fictional product' },
    { id: 'n1', type: 'connection', name: 'Coffee chat with someone in target role', icon: 'â˜•', description: 'Network and learn' },
    { id: 'n2', type: 'connection', name: 'Contribute to open source', icon: 'ðŸŒ', description: 'Give back to community' },
    { id: 'n3', type: 'connection', name: 'Attend a tech meetup or webinar', icon: 'ðŸ‘¥', description: 'Expand your network' },
    { id: 'n4', type: 'connection', name: 'Help someone on Reddit/StackOverflow', icon: 'ðŸ¤', description: 'Share your knowledge' },
    { id: 'e1', type: 'exploration', name: 'Deep dive into new technology', icon: 'ðŸ”', description: '3 hours max' },
    { id: 'e2', type: 'exploration', name: 'Take a bonus Coursera course', icon: 'ðŸŽ“', description: 'Something completely new' },
    { id: 'e3', type: 'exploration', name: 'Build with unfamiliar tool/language', icon: 'ðŸ”§', description: 'Stretch your skills' },
    { id: 'e4', type: 'exploration', name: 'Shadow someone at work', icon: 'ðŸ‘€', description: 'Different function' },
    { id: 'w1', type: 'wellness', name: 'Learn and cook a new recipe', icon: 'ðŸ³', description: 'Fuel for growth!' },
    { id: 'w2', type: 'wellness', name: 'Try new exercise or movement', icon: 'ðŸƒ', description: 'Body and mind' },
    { id: 'w3', type: 'wellness', name: 'Read fiction for 2 hours', icon: 'ðŸ“–', description: 'Creativity boost' },
    { id: 'w4', type: 'wellness', name: 'Digital detox evening', icon: 'ðŸŒ™', description: 'No screens after 7pm' },
  ];

  // ============================================
  // ðŸƒ TAROT STATE
  // ============================================
  const [availableDeck, setAvailableDeck] = useState([...tarotDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentDrawnCard, setCurrentDrawnCard] = useState(null);
  const [showTarotModal, setShowTarotModal] = useState(false);
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  const [tarotDrawReason, setTarotDrawReason] = useState('');
  const [deckCycles, setDeckCycles] = useState(0);
  const [lpProgress, setLpProgress] = useState(
    tarotDeck.reduce((acc, card) => ({ ...acc, [card.lpId]: 0 }), {})
  );

  // ============================================
  // ðŸŽ¨ CREATIVE MOVE STATE
  // ============================================
  const [activeCreativeMoves, setActiveCreativeMoves] = useState([]);
  const [showCreativeMovePicker, setShowCreativeMovePicker] = useState(false);

  // ðŸŽ´ ACTIVE TAROT QUESTS - with documentation
  const [activeTarotQuests, setActiveTarotQuests] = useState([]);
  const [showQuestDetailModal, setShowQuestDetailModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [questReflection, setQuestReflection] = useState({ whatIDid: '', howDemonstrated: '' });

  // ============================================
  // ðŸ“Š LEVEL CONFIGURATIONS
  // ============================================
  const levelConfigs = [
    { id: 1, name: 'Foundation I', group: 'Foundation', months: '1-2', icon: 'ðŸŒ±', color: 'from-emerald-500 to-green-600', 
      lps: ['learn-curious', 'ownership', 'deliver-results'], skills: ['Cloud basics', 'Project management'], description: 'Build technical foundation' },
    { id: 2, name: 'Foundation II', group: 'Foundation', months: '1-2', icon: 'ðŸŒ¿', color: 'from-green-500 to-teal-600',
      lps: ['customer-obsession', 'invent-simplify', 'bias-action'], skills: ['AI/ML fundamentals', 'Certifications'], description: 'Deepen core skills' },
    { id: 3, name: 'Competency I', group: 'Competency', months: '3-4', icon: 'ðŸ“ˆ', color: 'from-blue-500 to-cyan-600',
      lps: ['invent-simplify', 'customer-obsession', 'think-big'], skills: ['System design', 'Portfolio building'], description: 'Build portfolio' },
    { id: 4, name: 'Competency II', group: 'Competency', months: '3-4', icon: 'ðŸ”§', color: 'from-cyan-500 to-blue-600',
      lps: ['dive-deep', 'highest-standards', 'are-right'], skills: ['Product roadmapping', 'Stakeholder mgmt'], description: 'Master design' },
    { id: 5, name: 'Proficiency I', group: 'Proficiency', months: '5-6', icon: 'ðŸš€', color: 'from-purple-500 to-violet-600',
      lps: ['earn-trust', 'backbone-disagree', 'hire-develop'], skills: ['Influencing', 'Technical writing'], description: 'Lead initiatives' },
    { id: 6, name: 'Proficiency II', group: 'Proficiency', months: '5-6', icon: 'âš¡', color: 'from-violet-500 to-purple-600',
      lps: ['highest-standards', 'dive-deep', 'frugality'], skills: ['Strategic thinking', 'Deep dives'], description: 'Write content' },
    { id: 7, name: 'Mastery I', group: 'Mastery', months: '7-8', icon: 'ðŸ‘‘', color: 'from-amber-500 to-orange-600',
      lps: ['deliver-results', 'best-employer', 'responsibility'], skills: ['Executive communication', 'Mock interviews'], description: 'Interview prep' },
    { id: 8, name: 'Mastery II', group: 'Mastery', months: '7-8', icon: 'ðŸ†', color: 'from-orange-500 to-red-600',
      lps: ['think-big', 'ownership', 'customer-obsession'], skills: ['Scalable thinking', 'Long-term vision'], description: 'Complete portfolio' }
  ];

  // ============================================
  // ðŸ·ï¸ LEADERSHIP PRINCIPLES
  // ============================================
  const leadershipPrinciples = [
    { id: 'customer-obsession', name: 'Customer Obsession', icon: 'ðŸªž', color: 'from-pink-500 to-rose-500' },
    { id: 'ownership', name: 'Ownership', icon: 'ðŸ‘‘', color: 'from-yellow-500 to-amber-500' },
    { id: 'invent-simplify', name: 'Invent and Simplify', icon: 'ðŸ’¡', color: 'from-cyan-500 to-blue-500' },
    { id: 'are-right', name: 'Are Right, A Lot', icon: 'ðŸŽ¯', color: 'from-green-500 to-emerald-500' },
    { id: 'learn-curious', name: 'Learn and Be Curious', icon: 'ðŸ“š', color: 'from-purple-500 to-violet-500' },
    { id: 'hire-develop', name: 'Hire and Develop', icon: 'ðŸŒ±', color: 'from-lime-500 to-green-500' },
    { id: 'highest-standards', name: 'Highest Standards', icon: 'â­', color: 'from-amber-500 to-yellow-500' },
    { id: 'think-big', name: 'Think Big', icon: 'ðŸš€', color: 'from-indigo-500 to-purple-500' },
    { id: 'bias-action', name: 'Bias for Action', icon: 'âš¡', color: 'from-orange-500 to-red-500' },
    { id: 'frugality', name: 'Frugality', icon: 'ðŸ’°', color: 'from-emerald-500 to-teal-500' },
    { id: 'earn-trust', name: 'Earn Trust', icon: 'ðŸ¤', color: 'from-blue-500 to-indigo-500' },
    { id: 'dive-deep', name: 'Dive Deep', icon: 'ðŸ¤¿', color: 'from-teal-500 to-cyan-500' },
    { id: 'backbone-disagree', name: 'Have Backbone', icon: 'ðŸ›¡ï¸', color: 'from-red-500 to-pink-500' },
    { id: 'deliver-results', name: 'Deliver Results', icon: 'ðŸ†', color: 'from-yellow-500 to-orange-500' },
    { id: 'best-employer', name: 'Best Employer', icon: 'â¤ï¸', color: 'from-rose-500 to-pink-500' },
    { id: 'responsibility', name: 'Broad Responsibility', icon: 'ðŸŒ', color: 'from-sky-500 to-blue-500' }
  ];

  const fulfillmentTypes = [
    { id: 'personal', name: 'Personal Interest' },
    { id: 'career', name: 'Career Growth' },
    { id: 'study', name: 'Study / Learning' }
  ];

  const satisfactionOptions = [
    { id: 'satisfied', name: 'Satisfied', icon: 'ðŸ˜Š' },
    { id: 'not-satisfied', name: 'Not Satisfied', icon: 'ðŸ˜' }
  ];

  // ============================================
  // ðŸƒ TAROT SYSTEM
  // ============================================
  const tarotQuests = {
    'customer-obsession': { quest: 'Interview 3 users about pain points', mini: 'Watch a customer use a product' },
    'ownership': { quest: 'Take ownership of a neglected task', mini: 'Fix something not your job' },
    'invent-simplify': { quest: 'Make something 10x simpler', mini: 'Explain a concept to a 10-year-old' },
    'are-right': { quest: 'Make a data-based decision', mini: 'Argue both sides of a decision' },
    'learn-curious': { quest: 'Deep dive into something new (4 hours)', mini: 'Ask "why" 5 times' },
    'hire-develop': { quest: 'Mentor someone for 1 hour', mini: 'Write a growth plan for someone' },
    'highest-standards': { quest: 'Make something done exceptional', mini: 'Add quality touch to work' },
    'think-big': { quest: 'Design a 10x bigger solution', mini: 'Write 5-year impossible vision' },
    'bias-action': { quest: 'Start something you\'ve been planning', mini: 'Make a 5-minute decision' },
    'frugality': { quest: 'Build something with zero budget', mini: 'Find 3 free tool alternatives' },
    'earn-trust': { quest: 'Have a vulnerable conversation', mini: 'Admit a mistake publicly' },
    'dive-deep': { quest: 'Investigate root cause - 5 levels', mini: 'Spend 2 hours on one thing' },
    'backbone-disagree': { quest: 'Voice an unpopular opinion', mini: 'Challenge something respectfully' },
    'deliver-results': { quest: 'Complete one overdue deliverable', mini: 'Ship something today' },
    'best-employer': { quest: 'Improve someone\'s work life', mini: 'Give appreciation to 3 people' },
    'responsibility': { quest: 'Consider broader project impact', mini: 'Make an ethical decision' }
  };

  // ============================================
  // ðŸ‘¹ MONSTER SYSTEM
  // ============================================
  const monsterEvolutions = [
    { stage: 1, name: 'Baby Monster', minXP: 0, maxXP: 200, emoji: 'ðŸ‘¶', expressions: { happy: 'ðŸ˜Š', excited: 'ðŸ¤©', proud: 'ðŸ˜Ž', sad: 'ðŸ˜¢', angry: 'ðŸ˜ ', mystical: 'ðŸ”®' }},
    { stage: 2, name: 'Teen Monster', minXP: 201, maxXP: 500, emoji: 'ðŸ˜ˆ', expressions: { happy: 'ðŸ˜Š', excited: 'ðŸ¤©', proud: 'ðŸ˜Ž', sad: 'ðŸ˜¢', angry: 'ðŸ˜ ', mystical: 'ðŸ”®' }},
    { stage: 3, name: 'Adult Monster', minXP: 501, maxXP: 800, emoji: 'ðŸ‘¹', expressions: { happy: 'ðŸ˜Š', excited: 'ðŸ¤©', proud: 'ðŸ˜Ž', sad: 'ðŸ˜¢', angry: 'ðŸ˜ ', mystical: 'ðŸ”®' }},
    { stage: 4, name: 'Mega Monster', minXP: 801, maxXP: 1000, emoji: 'ðŸ‘¿', expressions: { happy: 'ðŸ˜Š', excited: 'ðŸ¤©', proud: 'ðŸ˜Ž', sad: 'ðŸ˜¢', angry: 'ðŸ˜ ', mystical: 'ðŸ”®' }}
  ];

  const currentMonster = useMemo(() => {
    return monsterEvolutions.find(m => monsterXP >= m.minXP && monsterXP <= m.maxXP) || monsterEvolutions[0];
  }, [monsterXP]);

  const xpProgress = useMemo(() => {
    const range = currentMonster.maxXP - currentMonster.minXP;
    const progress = monsterXP - currentMonster.minXP;
    return Math.round((progress / range) * 100);
  }, [monsterXP, currentMonster]);

  // ============================================
  // ðŸŽ¯ CURRENT LEVEL DATA
  // ============================================
  const currentLevel = levels.find(l => l.id === currentLevelId) || levels[0];
  const currentLevelConfig = levelConfigs.find(c => c.id === currentLevelId) || levelConfigs[0];
  
  const defaultStrategy = {
    title: '', objective: '', deadline: '', timeline: '',
    focusLPs: [], skills: [], risks: '', metrics: '',
    sections: { context: '', problem: '', solution: '', execution: '', resources: '', success: '' },
    completed: false
  };
  
  const currentStrategy = strategies[currentLevelId] || defaultStrategy;
  const currentTasks = tasks[currentLevelId] || [];
  const currentStars = starStories[currentLevelId] || [];

  // ============================================
  // ðŸŽ® HELPER FUNCTIONS
  // ============================================
  
  const showSuccessMsg = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const gainXP = (amount) => {
    const newXP = Math.min(1000, monsterXP + amount);
    const oldStage = currentMonster.stage;
    setMonsterXP(newXP);
    
    const newMonster = monsterEvolutions.find(m => newXP >= m.minXP && newXP <= m.maxXP);
    if (newMonster && newMonster.stage > oldStage) {
      setReactionType('evolution');
      setShowMonsterReaction(true);
    }
  };

  const getLPById = (lpId) => leadershipPrinciples.find(lp => lp.id === lpId);

  // ============================================
  // ðŸƒ TAROT FUNCTIONS
  // ============================================
  
  const drawTarotCard = (reason = 'random') => {
    console.log('Drawing card...', reason); // Debug
    setIsDrawingCard(true);
    setTarotDrawReason(reason);
    setMonsterMood('mystical');
    
    setTimeout(() => {
      let cardToDraw;
      
      if (availableDeck.length === 0) {
        // Reshuffle deck - all 16 cards drawn!
        setAvailableDeck([...tarotDeck]);
        setDeckCycles(prev => prev + 1);
        setBadges(prev => [...prev, { 
          id: Date.now(), 
          name: `Full Deck Master #${deckCycles + 1}! ðŸŽ´`, 
          icon: 'ðŸ”®',
          earnedAt: new Date().toISOString()
        }]);
        cardToDraw = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
      } else {
        const randomIndex = Math.floor(Math.random() * availableDeck.length);
        cardToDraw = availableDeck[randomIndex];
        setAvailableDeck(prev => prev.filter((_, i) => i !== randomIndex));
      }
      
      const drawnCardWithMeta = {
        ...cardToDraw,
        reason,
        drawnAt: new Date().toISOString(),
        levelId: currentLevelId
      };
      
      console.log('Card drawn:', drawnCardWithMeta); // Debug
      setCurrentDrawnCard(drawnCardWithMeta);
      setDrawnCards(prev => [...prev, drawnCardWithMeta]);
      setShowTarotModal(true);
      setIsDrawingCard(false);
      setMonsterMood('excited');
    }, 1500); // Reduced from 2000ms to 1500ms
  };

  const acceptTarotQuest = () => {
    if (!currentDrawnCard) return;
    
    // Add to active quests for tracking
    const newQuest = {
      id: Date.now(),
      type: 'tarot-quest',
      card: currentDrawnCard,
      questText: currentDrawnCard.quest,
      lpId: currentDrawnCard.lpId,
      lpName: currentDrawnCard.lp,
      lpIcon: currentDrawnCard.icon,
      status: 'active',
      levelId: currentLevelId,
      acceptedAt: new Date().toISOString(),
      completedAt: null,
      reflection: { whatIDid: '', howDemonstrated: '' }
    };
    
    setActiveTarotQuests(prev => [...prev, newQuest]);
    gainXP(10); // Small XP for accepting, more on completion
    showSuccessMsg(`ðŸŽ´ Quest Added: ${currentDrawnCard.quest.substring(0, 40)}...`);
    setShowTarotModal(false);
    setMonsterMood('proud');
    setTimeout(() => setMonsterMood('happy'), 2000);
  };

  const acceptMiniChallenge = () => {
    if (!currentDrawnCard) return;
    
    // Add mini challenge to active quests
    const newQuest = {
      id: Date.now(),
      type: 'mini-challenge',
      card: currentDrawnCard,
      questText: currentDrawnCard.miniChallenge,
      lpId: currentDrawnCard.lpId,
      lpName: currentDrawnCard.lp,
      lpIcon: currentDrawnCard.icon,
      status: 'active',
      levelId: currentLevelId,
      acceptedAt: new Date().toISOString(),
      completedAt: null,
      reflection: { whatIDid: '', howDemonstrated: '' }
    };
    
    setActiveTarotQuests(prev => [...prev, newQuest]);
    gainXP(5); // Small XP for accepting
    showSuccessMsg(`âš¡ Mini Challenge Added: ${currentDrawnCard.miniChallenge.substring(0, 40)}...`);
    setShowTarotModal(false);
    setMonsterMood('happy');
  };

  const absorbWisdom = () => {
    gainXP(5);
    showSuccessMsg(`âœ¨ Wisdom absorbed: "${currentDrawnCard.wisdom}"`);
    setShowTarotModal(false);
    setMonsterMood('happy');
  };

  // ============================================
  // ðŸŽ¨ CREATIVE QUEST FUNCTIONS
  // ============================================
  
  const addCreativeMove = (move) => {
    const newMove = { 
      ...move, 
      id: Date.now(), 
      status: 'active', 
      addedAt: new Date().toISOString(),
      completedAt: null,
      reflection: { whatIDid: '', impact: '', lpTags: [] }
    };
    setActiveCreativeMoves(prev => [...prev, newMove]);
    setShowCreativeMovePicker(false);
    showSuccessMsg(`ðŸŽ¨ Creative Move Added: ${move.name}`);
  };

  const openCreativeMoveDetail = (move) => {
    setSelectedQuest({ ...move, isCreativeMove: true }); // Reuse quest detail modal
    setQuestReflection(move.reflection || { whatIDid: '', impact: '', lpTags: [] });
    setShowQuestDetailModal(true);
  };

  const completeCreativeMove = (moveId) => {
    const move = activeCreativeMoves.find(m => m.id === moveId);
    if (!move) return;
    
    setActiveCreativeMoves(prev => prev.map(m => 
      m.id === moveId 
        ? { ...m, status: 'completed', completedAt: new Date().toISOString() } 
        : m
    ));
    gainXP(25);
    showSuccessMsg('ðŸŽ‰ Creative Move Completed! +25 XP');
    setMonsterMood('excited');
    setTimeout(() => setMonsterMood('happy'), 2000);
  };

  // ============================================
  // ðŸŽ´ TAROT QUEST TRACKER FUNCTIONS
  // ============================================
  
  const openQuestDetail = (quest) => {
    setSelectedQuest(quest);
    setQuestReflection(quest.reflection || { whatIDid: '', howDemonstrated: '' });
    setShowQuestDetailModal(true);
  };

  const saveQuestReflection = () => {
    if (!selectedQuest) return;
    
    if (selectedQuest.isCreativeMove) {
      setActiveCreativeMoves(prev => prev.map(m => 
        m.id === selectedQuest.id 
          ? { ...m, reflection: questReflection }
          : m
      ));
    } else {
      setActiveTarotQuests(prev => prev.map(q => 
        q.id === selectedQuest.id 
          ? { ...q, reflection: questReflection }
          : q
      ));
    }
    showSuccessMsg('ðŸ’¾ Reflection saved!');
  };

  const completeQuest = () => {
    if (!selectedQuest) return;
    if (!questReflection.whatIDid.trim()) {
      alert('Please describe what you did before completing');
      return;
    }
    
    if (selectedQuest.isCreativeMove) {
      // Complete Creative Move
      setActiveCreativeMoves(prev => prev.map(m => 
        m.id === selectedQuest.id 
          ? { ...m, status: 'completed', completedAt: new Date().toISOString(), reflection: questReflection }
          : m
      ));
      gainXP(25);
      showSuccessMsg('ðŸŽ‰ Creative Move Completed! +25 XP');
    } else {
      // Complete Tarot Quest
      const xpReward = selectedQuest.type === 'tarot-quest' ? 30 : 15;
      const lpIncrease = selectedQuest.type === 'tarot-quest' ? 1 : 0.5;
      
      // Update LP progress
      if (selectedQuest.lpId) {
        setLpProgress(prev => ({
          ...prev,
          [selectedQuest.lpId]: Math.min(8, (prev[selectedQuest.lpId] || 0) + lpIncrease)
        }));
      }
      
      setActiveTarotQuests(prev => prev.map(q => 
        q.id === selectedQuest.id 
          ? { ...q, status: 'completed', completedAt: new Date().toISOString(), reflection: questReflection }
          : q
      ));
      gainXP(xpReward);
      showSuccessMsg(`ðŸŽ‰ Quest Completed! +${xpReward} XP`);
    }
    
    setShowQuestDetailModal(false);
    setSelectedQuest(null);
    setQuestReflection({ whatIDid: '', howDemonstrated: '', impact: '' });
    setMonsterMood('excited');
    setTimeout(() => setMonsterMood('happy'), 2000);
  };

  const abandonQuest = () => {
    if (!selectedQuest) return;
    if (!confirm('Are you sure you want to abandon this quest?')) return;
    
    if (selectedQuest.isCreativeMove) {
      setActiveCreativeMoves(prev => prev.map(m => 
        m.id === selectedQuest.id 
          ? { ...m, status: 'abandoned', abandonedAt: new Date().toISOString() }
          : m
      ));
    } else {
      setActiveTarotQuests(prev => prev.map(q => 
        q.id === selectedQuest.id 
          ? { ...q, status: 'abandoned', abandonedAt: new Date().toISOString() }
          : q
      ));
    }
    
    showSuccessMsg('Quest abandoned. You can always pick a new one!');
    setShowQuestDetailModal(false);
    setSelectedQuest(null);
  };

  // ============================================
  // ðŸ”™ BACK NAVIGATION
  // ============================================
  const goBack = () => {
    const stepOrder = ['strategy', 'missionBoard', 'outcomes', 'starReflection', 'badge'];
    const currentIdx = stepOrder.indexOf(currentLevel.currentStep);
    
    if (currentIdx === 0) {
      setActiveScreen('levelSelect');
    } else {
      goToStep(stepOrder[currentIdx - 1]);
    }
  };

  const goToLevelSelect = () => {
    setActiveScreen('levelSelect');
  };

  // ============================================
  // ðŸ”„ STEP NAVIGATION
  // ============================================
  
  const goToStep = (step) => {
    setLevels(prev => prev.map(l => 
      l.id === currentLevelId ? { ...l, currentStep: step } : l
    ));
  };

  // ============================================
  // ðŸ“ STRATEGY FUNCTIONS
  // ============================================
  
  const updateStrategy = (updates) => {
    setStrategies(prev => ({
      ...prev,
      [currentLevelId]: { ...(prev[currentLevelId] || defaultStrategy), ...updates }
    }));
  };

  const updateStrategySection = (sectionId, value) => {
    setStrategies(prev => ({
      ...prev,
      [currentLevelId]: {
        ...(prev[currentLevelId] || defaultStrategy),
        sections: { ...(prev[currentLevelId]?.sections || defaultStrategy.sections), [sectionId]: value }
      }
    }));
  };

  const toggleStrategyLP = (lpId) => {
    const current = currentStrategy.focusLPs || [];
    const updated = current.includes(lpId) 
      ? current.filter(id => id !== lpId)
      : [...current, lpId];
    updateStrategy({ focusLPs: updated });
  };

  const toggleStrategySkill = (skill) => {
    const current = currentStrategy.skills || [];
    const updated = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    updateStrategy({ skills: updated });
  };

  const completeStrategy = () => {
    if (!currentStrategy.title || !currentStrategy.objective) {
      alert('Please fill in Title and Objective');
      return;
    }
    if ((currentStrategy.focusLPs || []).length < 2) {
      alert('Please select at least 2 Leadership Principles');
      return;
    }
    
    updateStrategy({ completed: true });
    goToStep('missionBoard');
    gainXP(30);
    showSuccessMsg('âš”ï¸ Strategy Complete! Proceed to Mission Board!');
    setMonsterMood('proud');
  };

  // ============================================
  // ðŸ“‹ MISSION BOARD FUNCTIONS
  // ============================================

  const addTask = (type) => {
    const existingTasks = currentTasks;
    const mainCount = existingTasks.filter(t => t.type === 'main').length;
    const subCount = existingTasks.filter(t => t.type === 'sub').length;
    
    if (type === 'main' && mainCount >= 3) {
      alert('Maximum 3 main tasks allowed');
      return;
    }
    if (type === 'sub' && subCount >= 4) {
      alert('Maximum 4 sub tasks allowed');
      return;
    }

    const newTask = {
      id: Date.now(),
      type,
      name: '',
      description: '',
      application: '',
      lpTags: [],
      fulfillmentType: '',
      completionDate: '',
      status: 'draft',  // draft â†’ in-progress â†’ completed / missed
      satisfaction: ''
    };

    setTasks(prev => ({
      ...prev,
      [currentLevelId]: [...(prev[currentLevelId] || []), newTask]
    }));
  };

  const updateTask = (taskId, field, value) => {
    setTasks(prev => ({
      ...prev,
      [currentLevelId]: (prev[currentLevelId] || []).map(t => 
        t.id === taskId ? { ...t, [field]: value } : t
      )
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => ({
      ...prev,
      [currentLevelId]: (prev[currentLevelId] || []).filter(t => t.id !== taskId)
    }));
  };

  const completeMissionBoard = () => {
    const taskList = currentTasks;
    const mainTasks = taskList.filter(t => t.type === 'main');
    const subTasks = taskList.filter(t => t.type === 'sub');
    
    if (mainTasks.length < 1) {
      alert('You need at least 1 Main task');
      return;
    }
    if (subTasks.length < 2) {
      alert('You need at least 2 Sub tasks');
      return;
    }

    const completedTasks = taskList.filter(t => t.status === 'completed');
    const missedTasks = taskList.filter(t => t.status === 'missed');
    const unfinishedTasks = taskList.filter(t => t.status === 'draft' || t.status === 'in-progress');

    if (unfinishedTasks.length > 0) {
      alert('Please mark all tasks as either Completed âœ… or Missed âŒ before proceeding');
      return;
    }

    if (missedTasks.length > 0) {
      setOutcomeType('penalty');
    } else {
      setOutcomeType('reward');
    }
    
    goToStep('outcomes');
    gainXP(completedTasks.length * 15);
    showSuccessMsg('ðŸ“‹ Mission Board Complete!');
  };

  // ============================================
  // ðŸŽ CONSEQUENCE FUNCTIONS
  // ============================================

  const completeConsequence = () => {
    if (outcomeType === 'penalty' && !penaltyReflection.trim() && !currentDrawnCard) {
      alert('Please complete a penalty option (draw tarot or write reflection)');
      return;
    }
    
    goToStep('starReflection');
    gainXP(20);
    showSuccessMsg(outcomeType === 'reward' ? 'ðŸŽ‰ Reward Claimed!' : 'ðŸ’ª Penalty Completed!');
    setMonsterMood('proud');
  };

  const skipConsequence = () => {
    goToStep('starReflection');
  };

  // ============================================
  // â­ STAR FUNCTIONS
  // ============================================

  const addStarStory = () => {
    if (!newStory.title || !newStory.situation || !newStory.action || !newStory.result) {
      alert('Please fill in Title, Situation, Action, and Result');
      return;
    }
    
    setStarStories(prev => ({
      ...prev,
      [currentLevelId]: [...(prev[currentLevelId] || []), { ...newStory, id: Date.now() }]
    }));
    
    setNewStory({ title: '', situation: '', task: '', action: '', result: '', reflection: '', lpTags: [] });
    gainXP(25);
    showSuccessMsg('â­ STAR Story Added!');
    setMonsterMood('excited');
  };

  const toggleStoryLP = (lpId) => {
    const current = newStory.lpTags || [];
    const updated = current.includes(lpId)
      ? current.filter(id => id !== lpId)
      : [...current, lpId];
    setNewStory(prev => ({ ...prev, lpTags: updated }));
  };

  const completeLevel = () => {
    if (currentStars.length < 1) {
      alert('Please add at least 1 STAR reflection');
      return;
    }

    setLevels(prev => prev.map(l => {
      if (l.id === currentLevelId) {
        return { ...l, completed: true, currentStep: 'badge' };
      }
      if (l.id === currentLevelId + 1) {
        return { ...l, unlocked: true, currentStep: 'strategy' };
      }
      return l;
    }));

    const newBadge = {
      id: Date.now(),
      name: `Level ${currentLevelId} Complete`,
      icon: currentLevelConfig.icon,
      levelId: currentLevelId,
      earnedAt: new Date().toISOString()
    };
    setBadges(prev => [...prev, newBadge]);
    
    goToStep('badge');
    gainXP(50);
    setReactionType('levelComplete');
    setShowMonsterReaction(true);
  };

  const proceedToNextLevel = () => {
    if (currentLevelId < 8) {
      setCurrentLevelId(currentLevelId + 1);
    }
    setActiveScreen('levelSelect');
    setOutcomeType(null);
    setDrawnTarotCard(null);
    setPenaltyReflection('');
    setMonsterMood('happy');
  };

  // ============================================
  // ðŸŽ¨ COMPONENT: Monster Display
  // ============================================
  const MonsterDisplay = ({ size = 'medium' }) => {
    const sizeClasses = { small: 'text-5xl', medium: 'text-7xl', large: 'text-9xl' };
    
    return (
      <div className="text-center">
        <div className={`${sizeClasses[size]} animate-bounce`}>
          {currentMonster.expressions[monsterMood] || currentMonster.emoji}
        </div>
        <p className="text-white/70 text-sm mt-2">{currentMonster.name}</p>
        <div className="w-32 mx-auto mt-2">
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-white/50 text-xs mt-1">{monsterXP} XP</p>
        </div>
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ COMPONENT: Back Button
  // ============================================
  const BackButton = ({ onClick, label = 'Back' }) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
    >
      <span>â†</span>
      <span className="text-sm">{label}</span>
    </button>
  );

  // ============================================
  // ðŸŽ¨ COMPONENT: Progress Steps
  // ============================================
  const ProgressSteps = () => {
    const steps = [
      { key: 'strategy', label: 'Strategy' },
      { key: 'missionBoard', label: 'Mission' },
      { key: 'outcomes', label: 'Outcomes' },
      { key: 'starReflection', label: 'STAR' },
      { key: 'badge', label: 'Badge' }
    ];
    const currentIdx = steps.findIndex(s => s.key === currentLevel.currentStep);

    return (
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((step, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={step.key} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${isPast ? 'bg-green-500 text-white' : isCurrent ? 'bg-amber-500 text-white' : 'bg-white/20 text-white/50'}`}>
                {isPast ? 'âœ“' : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${isCurrent ? 'text-amber-400' : 'text-white/40'}`}>
                {step.label}
              </span>
              {i < steps.length - 1 && <div className={`w-4 h-0.5 shrink-0 ${isPast ? 'bg-green-500' : 'bg-white/20'}`} />}
            </div>
          );
        })}
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ RENDER: Level Select
  // ============================================
  const renderLevelSelect = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">LP Dojo</h1>
            <p className="text-white/60 mt-1">Leadership Principles Mastery â€¢ 8 Levels</p>
          </div>
          <MonsterDisplay size="medium" />
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-6">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{levels.filter(l => l.completed).length}</div>
            <div className="text-white/50 text-xs">Levels</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{drawnCards.length}</div>
            <div className="text-white/50 text-xs">Cards</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{badges.length}</div>
            <div className="text-white/50 text-xs">Badges</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-white">{monsterXP}</div>
            <div className="text-white/50 text-xs">XP</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-white/80 font-bold mb-4">ðŸ—ºï¸ Select Level</h2>
        <div className="space-y-2">
          {levelConfigs.map(config => {
            const state = levels.find(l => l.id === config.id);
            const isCompleted = state.completed;
            const isLocked = !state.unlocked;
            const isExpanded = currentLevelId === config.id && activeScreen === 'levelSelect';
            
            return (
              <div key={config.id} className={`rounded-2xl border-2 transition-all overflow-hidden
                ${isCompleted ? 'border-green-500 bg-green-500/10' : 
                  isLocked ? 'border-white/10 bg-white/5 opacity-50' :
                  isExpanded ? 'border-amber-500/50 bg-white/10' :
                  'border-white/20 bg-white/10 hover:bg-white/15'}`}>
                
                {/* Level Header - Always Visible */}
                <button
                  onClick={() => {
                    if (!isLocked) {
                      setCurrentLevelId(isExpanded ? null : config.id);
                    }
                  }}
                  disabled={isLocked}
                  className="w-full p-4 text-left flex items-center gap-3"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-2xl shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">L{config.id}: {config.name}</h3>
                      {isCompleted && <span className="text-green-400">âœ…</span>}
                      {isLocked && <span className="text-white/40">ðŸ”’</span>}
                    </div>
                    <p className="text-white/60 text-xs">{config.group} â€¢ {config.months}</p>
                  </div>
                  <span className="text-white/40 text-lg shrink-0">
                    {isExpanded ? 'â–¼' : 'â–¶'}
                  </span>
                </button>
                
                {/* Expanded Details */}
                {isExpanded && !isLocked && (
                  <div className="px-4 pb-4 pt-0 space-y-3 border-t border-white/10">
                    {/* Focus LPs */}
                    <div>
                      <p className="text-white/50 text-xs mb-2">ðŸŽ¯ Focus LPs:</p>
                      <div className="flex flex-wrap gap-1">
                        {config.lps.map(lpId => {
                          const lp = leadershipPrinciples.find(l => l.id === lpId);
                          return lp ? (
                            <span key={lpId} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              {lp.icon} {lp.shortName || lp.name.split(' ').slice(0, 2).join(' ')}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    {/* Skills to Build */}
                    <div>
                      <p className="text-white/50 text-xs mb-2">ðŸ› ï¸ Skills to Build:</p>
                      <div className="flex flex-wrap gap-1">
                        {config.skills.map((skill, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${config.color} text-white`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Enter Level Button */}
                    <button
                      onClick={() => setActiveScreen('inLevel')}
                      className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2`}
                    >
                      â–¶ Enter Level {config.id}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-white/40 text-xs text-center mt-3">ðŸ’¡ Tip: Skills can be practiced from any level - pick what energizes you!</p>
      </div>

      {/* Quick Action Buttons - BELOW Level Select */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
        <h2 className="text-white font-bold mb-4">âš¡ Quick Actions</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => drawTarotCard('random')} 
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            ðŸŽ´ Draw LP Tarot
          </button>
          <button 
            onClick={() => setShowCreativeMovePicker(true)} 
            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            ðŸŽ¨ Creative Move
          </button>
        </div>
      </div>

      {/* My Active Quests - Combined Tarot + Creative */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
        <h2 className="text-white font-bold mb-4">
          ðŸ“‹ My Active Quests 
          <span className="text-white/50 text-sm font-normal ml-2">
            ({activeTarotQuests.filter(q => q.status === 'active').length + activeCreativeMoves.filter(m => m.status === 'active').length} active)
          </span>
        </h2>
        {(activeTarotQuests.filter(q => q.status === 'active').length === 0 && activeCreativeMoves.filter(m => m.status === 'active').length === 0) ? (
          <p className="text-white/40 text-sm text-center py-4">No active quests. Draw a Tarot card or pick a Creative Move!</p>
        ) : (
          <div className="space-y-2">
            {/* Tarot Quests */}
            {activeTarotQuests.filter(q => q.status === 'active').map(quest => (
              <div key={quest.id} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{quest.lpIcon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{quest.questText.substring(0, 50)}...</p>
                    <p className="text-white/50 text-xs">{quest.type === 'tarot-quest' ? 'ðŸŽ´ Quest' : 'âš¡ Mini'} â€¢ {quest.lpName}</p>
                  </div>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); openQuestDetail(quest); }} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">ðŸ“ Open</button>
              </div>
            ))}
            {/* Creative Moves */}
            {activeCreativeMoves.filter(m => m.status === 'active').map(move => (
              <div key={move.id} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{move.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{move.name}</p>
                    <p className="text-white/50 text-xs">ðŸŽ¨ Creative â€¢ {move.type}</p>
                  </div>
                </div>
                <button type="button" onClick={(e) => { e.stopPropagation(); openCreativeMoveDetail(move); }} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm">ðŸ“ Open</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quest Log - Completed Quests */}
      {(activeTarotQuests.filter(q => q.status === 'completed').length > 0 || activeCreativeMoves.filter(m => m.status === 'completed').length > 0) && (
        <details className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
          <summary className="p-6 cursor-pointer text-white font-bold flex items-center justify-between">
            <span>ðŸ“œ Quest Log ({activeTarotQuests.filter(q => q.status === 'completed').length + activeCreativeMoves.filter(m => m.status === 'completed').length} completed)</span>
            <span className="text-white/50">â–¼</span>
          </summary>
          <div className="px-6 pb-6 space-y-2">
            {activeTarotQuests.filter(q => q.status === 'completed').map(quest => (
              <div key={quest.id} className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span>{quest.lpIcon}</span>
                  <span className="text-green-400 font-medium text-sm">{quest.lpName}</span>
                  <span className="text-white/40 text-xs ml-auto">{new Date(quest.completedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-white/70 text-sm">{quest.questText}</p>
                {quest.reflection?.whatIDid && (
                  <p className="text-white/50 text-xs mt-2 italic">"{quest.reflection.whatIDid.substring(0, 100)}..."</p>
                )}
              </div>
            ))}
            {activeCreativeMoves.filter(m => m.status === 'completed').map(move => (
              <div key={move.id} className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span>{move.icon}</span>
                  <span className="text-teal-400 font-medium text-sm">{move.name}</span>
                  <span className="text-white/40 text-xs ml-auto">ðŸŽ¨ Creative</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Collapsible: Tarot Collection */}
      <details className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
        <summary className="p-6 cursor-pointer text-white font-bold flex items-center justify-between">
          <span>ðŸŽ´ LP Tarot Collection ({drawnCards.length} drawn)</span>
          <span className="text-white/50">â–¼</span>
        </summary>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-8 gap-2">
            {tarotDeck.map(card => {
              const count = drawnCards.filter(dc => dc.id === card.id).length;
              return (
                <div key={card.id} className={`aspect-square rounded-lg flex items-center justify-center text-xl relative ${count > 0 ? `bg-gradient-to-br ${card.color}` : 'bg-white/5 opacity-40'}`} title={card.lp}>
                  {card.icon}
                  {count > 1 && <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
                </div>
              );
            })}
          </div>
          <p className="text-white/50 text-xs mt-2 text-center">Deck: {availableDeck.length}/16 â€¢ {deckCycles} full cycles</p>
        </div>
      </details>

      {/* Collapsible: LP Progress */}
      <details className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
        <summary className="p-6 cursor-pointer text-white font-bold flex items-center justify-between">
          <span>ðŸ“Š LP Progress</span>
          <span className="text-white/50">â–¼</span>
        </summary>
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-2">
            {leadershipPrinciples.map(lp => (
              <div key={lp.id} className="bg-white/5 rounded-lg p-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{lp.icon}</span>
                  <span className="text-white/80 text-xs flex-1 truncate">{lp.name}</span>
                  <span className="text-white/50 text-xs">{lpProgress[lp.id] || 0}/8</span>
                </div>
                <div className="bg-white/10 rounded-full h-1.5">
                  <div className="bg-green-500 rounded-full h-1.5" style={{ width: `${((lpProgress[lp.id] || 0) / 8) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>

      {badges.length > 0 && (
        <details className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
          <summary className="p-6 cursor-pointer text-white font-bold flex items-center justify-between">
            <span>ðŸ… Badges ({badges.length})</span>
            <span className="text-white/50">â–¼</span>
          </summary>
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-3">
              {badges.map(badge => (
                <div key={badge.id} className="bg-amber-500/30 border border-amber-500/50 rounded-xl px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-white text-sm">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </details>
      )}
    </div>
  );

  // ============================================
  // ðŸŽ¨ RENDER: Strategy (Battlefield)
  // ============================================
  const renderStrategy = () => {
    const strategySections = [
      { id: 'context', title: 'Context', icon: 'ðŸ“', prompt: 'Why this level now? What tension or opportunity does it address?' },
      { id: 'problem', title: 'Problem', icon: 'â“', prompt: 'What challenge are you trying to solve?' },
      { id: 'solution', title: 'Solution', icon: 'ðŸ’¡', prompt: 'What is your approach to solve this?' },
      { id: 'execution', title: 'Execution Plan', icon: 'ðŸ“‹', prompt: 'What are the specific steps and timeline?' },
      { id: 'resources', title: 'Resources Needed', icon: 'ðŸ› ï¸', prompt: 'What tools, time, or support do you need?' },
      { id: 'success', title: 'Success Criteria', icon: 'ðŸŽ¯', prompt: 'How will you know you succeeded?' }
    ];

    return (
      <div className="space-y-6">
        <BackButton onClick={goToLevelSelect} label="Back to Levels" />
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentLevelConfig.color} flex items-center justify-center text-2xl`}>
              {currentLevelConfig.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Level {currentLevelId}: {currentLevelConfig.name}</h2>
              <p className="text-white/60 text-sm">{currentLevelConfig.description}</p>
            </div>
          </div>
          <ProgressSteps />
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">âš”ï¸</span> Battlefield Strategy (AWS 6-Pager)
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-white/70 text-sm mb-2 block">ðŸ“ Strategy Title *</label>
              <input
                type="text"
                value={currentStrategy.title}
                onChange={(e) => updateStrategy({ title: e.target.value })}
                placeholder="e.g., Foundation Level - Q1 2025"
                className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label className="text-white/70 text-sm mb-2 block">ðŸŽ¯ Level Objective *</label>
              <textarea
                value={currentStrategy.objective}
                onChange={(e) => updateStrategy({ objective: e.target.value })}
                placeholder="What is the ultimate goal for this level?"
                rows={2}
                className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 text-sm mb-2 block">â° Deadline</label>
                <input
                  type="date"
                  value={currentStrategy.deadline}
                  onChange={(e) => updateStrategy({ deadline: e.target.value })}
                  className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">ðŸ“… Timeline</label>
                <input
                  type="text"
                  value={currentStrategy.timeline}
                  onChange={(e) => updateStrategy({ timeline: e.target.value })}
                  placeholder="e.g., 8 weeks"
                  className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white/70 text-sm mb-3 block">ðŸ·ï¸ Focus LPs (Select 2-3) *</label>
            <div className="grid grid-cols-2 gap-2">
              {leadershipPrinciples.map(lp => (
                <button
                  key={lp.id}
                  type="button"
                  onClick={() => toggleStrategyLP(lp.id)}
                  className={`p-3 rounded-xl text-left text-sm transition-all flex items-center gap-2
                    ${currentStrategy.focusLPs?.includes(lp.id)
                      ? `bg-gradient-to-r ${lp.color} text-white`
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}`}
                >
                  <span>{lp.icon}</span>
                  <span className="truncate">{lp.name}</span>
                  {currentStrategy.focusLPs?.includes(lp.id) && <span className="ml-auto">âœ“</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white/70 text-sm mb-3 block">ðŸ› ï¸ Skills to Build</label>
            <div className="flex flex-wrap gap-2">
              {currentLevelConfig.skills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleStrategySkill(skill)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all
                    ${currentStrategy.skills?.includes(skill)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-white/70 text-sm mb-2 block">âš ï¸ Risks & Mitigations</label>
            <textarea
              value={currentStrategy.risks}
              onChange={(e) => updateStrategy({ risks: e.target.value })}
              placeholder="What might derail this level? How will you adapt?"
              rows={2}
              className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-white/70 text-sm mb-2 block">ðŸ“Š Success Metrics</label>
            <textarea
              value={currentStrategy.metrics}
              onChange={(e) => updateStrategy({ metrics: e.target.value })}
              placeholder="How will you measure success?"
              rows={2}
              className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-white/70 text-sm block">ðŸ“„ 6-Pager Sections</label>
            {strategySections.map(section => (
              <div key={section.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span>{section.icon}</span>
                  <span className="text-white font-medium text-sm">{section.title}</span>
                  {currentStrategy.sections?.[section.id]?.trim() && <span className="text-green-400 text-xs">âœ“</span>}
                </div>
                <p className="text-white/40 text-xs mb-2">{section.prompt}</p>
                <textarea
                  value={currentStrategy.sections?.[section.id] || ''}
                  onChange={(e) => updateStrategySection(section.id, e.target.value)}
                  placeholder={`Write your ${section.title.toLowerCase()}...`}
                  rows={3}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            ))}
          </div>

          <button
            onClick={completeStrategy}
            className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all"
          >
            âœ… Complete Strategy â†’ Mission Board
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ RENDER: Mission Board
  // ============================================
  const renderMissionBoard = () => {
    const mainTasks = currentTasks.filter(t => t.type === 'main');
    const subTasks = currentTasks.filter(t => t.type === 'sub');
    
    // Status counts for summary
    const draftCount = currentTasks.filter(t => t.status === 'draft').length;
    const inProgressCount = currentTasks.filter(t => t.status === 'in-progress').length;
    const completedCount = currentTasks.filter(t => t.status === 'completed').length;
    const missedCount = currentTasks.filter(t => t.status === 'missed').length;

    return (
      <div className="space-y-6">
        <BackButton onClick={goBack} label="Back to Strategy" />
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>ðŸ“‹</span> Mission Board
              </h2>
              <p className="text-white/60 text-sm">Level {currentLevelId}: {currentLevelConfig.name}</p>
            </div>
            <div className="text-right">
              <p className="text-amber-400 text-sm font-medium">Min: 1 Main + 2 Sub</p>
              <p className="text-white/50 text-xs">{currentTasks.length} tasks added</p>
            </div>
          </div>
          
          {/* Task Status Summary */}
          {currentTasks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {draftCount > 0 && (
                <span className="text-xs bg-gray-500/30 text-gray-300 px-2 py-1 rounded-full">ðŸ“ {draftCount} Draft</span>
              )}
              {inProgressCount > 0 && (
                <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-1 rounded-full">ðŸ”„ {inProgressCount} In Progress</span>
              )}
              {completedCount > 0 && (
                <span className="text-xs bg-green-500/30 text-green-300 px-2 py-1 rounded-full">âœ… {completedCount} Completed</span>
              )}
              {missedCount > 0 && (
                <span className="text-xs bg-red-500/30 text-red-300 px-2 py-1 rounded-full">âŒ {missedCount} Missed</span>
              )}
            </div>
          )}
          
          <ProgressSteps />
        </div>

        <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl p-4">
          <p className="text-amber-400 text-sm font-medium">ðŸŽ¯ Objective:</p>
          <p className="text-white/80 text-sm">{currentStrategy.objective}</p>
        </div>

        {/* Main Tasks */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span>â­</span> Main Tasks ({mainTasks.length})
            </h3>
            <button
              onClick={() => addTask('main')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              + Add Main
            </button>
          </div>
          
          {mainTasks.length === 0 ? (
            <div className="text-center py-6 text-white/40">
              <p>No main tasks yet. Add your primary goals!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mainTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onUpdate={updateTask} 
                  onDelete={deleteTask}
                  leadershipPrinciples={leadershipPrinciples}
                  fulfillmentTypes={fulfillmentTypes}
                  satisfactionOptions={satisfactionOptions}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sub Tasks */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span>ðŸ“Œ</span> Sub Tasks ({subTasks.length})
            </h3>
            <button
              onClick={() => addTask('sub')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              + Add Sub
            </button>
          </div>
          
          {subTasks.length === 0 ? (
            <div className="text-center py-6 text-white/40">
              <p>No sub tasks yet. Add supporting activities!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {subTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onUpdate={updateTask} 
                  onDelete={deleteTask}
                  leadershipPrinciples={leadershipPrinciples}
                  fulfillmentTypes={fulfillmentTypes}
                  satisfactionOptions={satisfactionOptions}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              showSuccessMsg('ðŸ’¾ Progress saved! You can continue anytime.');
              setActiveScreen('levelSelect');
            }}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl border border-white/20"
          >
            ðŸ’¾ Save & Continue Later
          </button>
          <button
            onClick={completeMissionBoard}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl"
          >
            âœ… Complete â†’ Outcomes
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ RENDER: Outcomes
  // ============================================
  const renderOutcomes = () => {
    const missedTasks = currentTasks.filter(t => t.status === 'missed');
    const completedTasks = currentTasks.filter(t => t.status === 'completed');

    return (
      <div className="space-y-6">
        <BackButton onClick={goBack} label="Back to Mission Board" />
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{outcomeType === 'reward' ? 'ðŸŽ‰' : 'âš¡'}</span>
            {outcomeType === 'reward' ? 'Reward Time!' : 'Penalty Zone'}
          </h2>
          <p className="text-white/60 text-sm mt-1">Level {currentLevelId}</p>
          
          <div className="flex gap-4 mt-4">
            <div className="bg-green-500/20 rounded-xl px-4 py-2">
              <span className="text-green-400 font-bold">{completedTasks.length}</span>
              <span className="text-white/60 text-sm ml-2">Completed</span>
            </div>
            {missedTasks.length > 0 && (
              <div className="bg-red-500/20 rounded-xl px-4 py-2">
                <span className="text-red-400 font-bold">{missedTasks.length}</span>
                <span className="text-white/60 text-sm ml-2">Missed</span>
              </div>
            )}
          </div>
          <ProgressSteps />
        </div>

        {outcomeType === 'reward' && (
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-3xl p-6 text-center">
            <div className="text-6xl mb-4">ðŸ†</div>
            <h3 className="text-2xl font-bold text-white">All Tasks Completed!</h3>
            <p className="text-white/70 mt-2">Draw a Victory Card or pick a Creative Move!</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => drawTarotCard('reward')}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl"
              >
                ðŸŽ´ Victory Card
              </button>
              <button
                onClick={() => setShowCreativeMovePicker(true)}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl"
              >
                ðŸŽ¨ Creative Move
              </button>
            </div>
          </div>
        )}

        {outcomeType === 'penalty' && (
          <div className="space-y-4">
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
              <h3 className="text-white font-bold mb-2">ðŸ“ Missed Tasks:</h3>
              <ul className="space-y-1">
                {missedTasks.map(task => (
                  <li key={task.id} className="text-white/80 text-sm">â€¢ {task.name || 'Unnamed task'}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 border border-white/20 text-center">
              <div className="text-6xl mb-2">ðŸ¥º</div>
              <p className="text-white/80">Let's learn from this together.</p>
            </div>

            <div className="bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-bold mb-4">Choose Your Path:</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white font-medium mb-2">ðŸŽ´ Option A: Draw Penalty Tarot</p>
                  <p className="text-white/60 text-xs mb-3">Complete a mini-challenge to grow from this</p>
                  <button 
                    onClick={() => drawTarotCard('penalty')} 
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm"
                  >
                    Draw Penalty Card
                  </button>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white font-medium mb-2">ðŸ“ Option B: Reflection</p>
                  <p className="text-white/60 text-xs mb-2">Write about what happened and what you learned</p>
                  <textarea
                    value={penaltyReflection}
                    onChange={(e) => setPenaltyReflection(e.target.value)}
                    placeholder="What happened? What did you learn? What will you do differently?"
                    rows={4}
                    className="w-full bg-slate-800 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={skipConsequence}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white/70 py-3 rounded-xl"
          >
            Skip
          </button>
          <button
            onClick={completeConsequence}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl"
          >
            âœ… Complete â†’ STAR
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ RENDER: STAR Reflection
  // ============================================
  const renderStarReflection = () => {
    return (
      <div className="space-y-6">
        <BackButton onClick={goBack} label="Back to Outcomes" />
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>â­</span> STAR Reflection
          </h2>
          <p className="text-amber-400 text-sm mt-1">{currentStars.length} stories â€¢ Need at least 1</p>
          <ProgressSteps />
        </div>

        {currentStars.length > 0 && (
          <div className="bg-white/10 rounded-3xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4">ðŸ“š Your Stories</h3>
            <div className="space-y-2">
              {currentStars.map(story => (
                <div key={story.id} className="bg-white/5 rounded-xl p-3">
                  <p className="text-white font-medium">{story.title}</p>
                  <p className="text-white/60 text-xs">S: {story.situation.substring(0, 40)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <h3 className="text-white font-bold mb-4">âœï¸ Add New STAR Story</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              value={newStory.title}
              onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Story Title..."
              className="w-full bg-slate-800 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <div className="bg-yellow-500/10 rounded-xl p-4">
              <label className="text-yellow-400 font-bold text-sm mb-2 block">S - Situation</label>
              <textarea
                value={newStory.situation}
                onChange={(e) => setNewStory(prev => ({ ...prev, situation: e.target.value }))}
                placeholder="Context and background..."
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              />
            </div>

            <div className="bg-green-500/10 rounded-xl p-4">
              <label className="text-green-400 font-bold text-sm mb-2 block">T - Task</label>
              <textarea
                value={newStory.task}
                onChange={(e) => setNewStory(prev => ({ ...prev, task: e.target.value }))}
                placeholder="Your responsibility..."
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div className="bg-blue-500/10 rounded-xl p-4">
              <label className="text-blue-400 font-bold text-sm mb-2 block">A - Action</label>
              <textarea
                value={newStory.action}
                onChange={(e) => setNewStory(prev => ({ ...prev, action: e.target.value }))}
                placeholder="What YOU did (use 'I')..."
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="bg-pink-500/10 rounded-xl p-4">
              <label className="text-pink-400 font-bold text-sm mb-2 block">R - Result</label>
              <textarea
                value={newStory.result}
                onChange={(e) => setNewStory(prev => ({ ...prev, result: e.target.value }))}
                placeholder="Outcome with numbers..."
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
            </div>

            <div className="bg-purple-500/10 rounded-xl p-4">
              <label className="text-purple-400 font-bold text-sm mb-2 block">ðŸ’­ Reflection (Optional)</label>
              <textarea
                value={newStory.reflection}
                onChange={(e) => setNewStory(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder="What would you do differently?"
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">ðŸ·ï¸ LP Tags</label>
              <div className="flex flex-wrap gap-2">
                {leadershipPrinciples.map(lp => (
                  <button
                    key={lp.id}
                    type="button"
                    onClick={() => toggleStoryLP(lp.id)}
                    className={`text-xs px-2 py-1 rounded-full transition-all
                      ${newStory.lpTags?.includes(lp.id)
                        ? `bg-gradient-to-r ${lp.color} text-white`
                        : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  >
                    {lp.icon} {lp.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addStarStory}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl"
            >
              ðŸ’¾ Save STAR Story
            </button>
          </div>
        </div>

        <button
          onClick={completeLevel}
          disabled={currentStars.length < 1}
          className={`w-full font-bold py-4 rounded-xl ${currentStars.length >= 1
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
        >
          âœ… Complete Level â†’ Earn Badge
        </button>
      </div>
    );
  };

  // ============================================
  // ðŸŽ¨ RENDER: Badge
  // ============================================
  const renderBadge = () => (
    <div className="space-y-6">
      <div className="bg-amber-500/30 border border-amber-500/50 rounded-3xl p-8 text-center">
        <div className="text-8xl mb-4 animate-bounce">ðŸŽ‰</div>
        <h2 className="text-3xl font-black text-white mb-2">LEVEL {currentLevelId} COMPLETE!</h2>
        <p className="text-white/70">{currentLevelConfig.name}</p>
        
        <MonsterDisplay size="large" />
        
        <div className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 rounded-2xl">
          <span className="text-4xl">{currentLevelConfig.icon}</span>
          <span className="text-white font-bold">Level {currentLevelId} Badge</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{currentTasks.filter(t => t.status === 'completed').length}</div>
            <div className="text-white/50 text-xs">Tasks Done</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{currentStars.length}</div>
            <div className="text-white/50 text-xs">Stories</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">+{30 + (currentTasks.filter(t => t.status === 'completed').length * 15) + 45 + (currentStars.length * 25)}</div>
            <div className="text-white/50 text-xs">XP</div>
          </div>
        </div>
      </div>

      {currentLevelId < 8 && (
        <div className="bg-white/10 rounded-3xl p-6 border border-white/20">
          <h3 className="text-white font-bold mb-4">ðŸ”œ Next Up:</h3>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${levelConfigs[currentLevelId].color} flex items-center justify-center text-3xl`}>
              {levelConfigs[currentLevelId].icon}
            </div>
            <div>
              <p className="text-white font-bold">Level {currentLevelId + 1}: {levelConfigs[currentLevelId].name}</p>
              <p className="text-white/60 text-sm">{levelConfigs[currentLevelId].description}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={proceedToNextLevel}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl"
      >
        {currentLevelId < 8 ? `ðŸš€ Proceed to Level ${currentLevelId + 1}` : 'ðŸ† View Results'}
      </button>
    </div>
  );

  // ============================================
  // ðŸŽ¨ MAIN RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-4 pb-20">
        {showSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
            {successMessage}
          </div>
        )}

        {showMonsterReaction && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-amber-500/30 border border-amber-500/50 rounded-3xl p-8 max-w-sm w-full text-center">
              <div className="text-9xl mb-4">{reactionType === 'evolution' ? 'âœ¨' : 'ðŸŽ‰'}</div>
              <h2 className="text-2xl font-black text-white">
                {reactionType === 'evolution' ? 'MONSTER EVOLVED!' : 'LEVEL COMPLETE!'}
              </h2>
              <MonsterDisplay size="large" />
              <button
                onClick={() => setShowMonsterReaction(false)}
                className="mt-6 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Tarot Drawing Animation */}
        {isDrawingCard && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <div className="text-8xl animate-spin mb-4">ðŸŽ´</div>
              <p className="text-white text-xl font-bold">Drawing your fate...</p>
              <div className="flex gap-2 justify-center mt-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Tarot Card Modal */}
        {showTarotModal && currentDrawnCard && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2">
            <div className="max-w-md w-full max-h-[95vh] flex flex-col">
              <div className={`bg-gradient-to-br ${currentDrawnCard.color} p-1 rounded-3xl shadow-2xl flex flex-col max-h-full`}>
                <div className="bg-slate-900 rounded-3xl p-4 flex flex-col max-h-full relative">
                  {/* Close Button */}
                  <button 
                    onClick={() => setShowTarotModal(false)} 
                    className="absolute top-2 right-2 text-white/60 hover:text-white text-2xl z-10"
                  >
                    âœ•
                  </button>
                  
                  {/* Header - fixed */}
                  <div className="text-center mb-3 flex-shrink-0">
                    <div className="text-5xl mb-1">{currentDrawnCard.icon}</div>
                    <h2 className="text-xl font-bold text-white">{currentDrawnCard.lp}</h2>
                    <p className="text-white/60 italic text-sm">"{currentDrawnCard.subtitle}"</p>
                  </div>
                  
                  {/* Scrollable content */}
                  <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                    <div className="bg-white/10 rounded-xl p-3">
                      <p className="text-white/80 text-center italic text-sm">"{currentDrawnCard.wisdom}"</p>
                    </div>
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3">
                      <p className="text-amber-400 text-xs font-bold mb-1">ðŸŽ¯ Quest:</p>
                      <p className="text-white text-sm">{currentDrawnCard.quest}</p>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-3">
                      <p className="text-purple-400 text-xs font-bold mb-1">âš¡ Mini Challenge:</p>
                      <p className="text-white text-sm">{currentDrawnCard.miniChallenge}</p>
                    </div>
                    <div className="text-center">
                      <span className={`text-xs px-3 py-1 rounded-full ${tarotDrawReason === 'reward' ? 'bg-green-500/30 text-green-300' : tarotDrawReason === 'penalty' ? 'bg-red-500/30 text-red-300' : 'bg-blue-500/30 text-blue-300'}`}>
                        {tarotDrawReason === 'reward' ? 'ðŸ† Victory Draw' : tarotDrawReason === 'penalty' ? 'âš¡ Penalty Draw' : 'ðŸŽ² Random Draw'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Buttons - fixed at bottom */}
                  <div className="space-y-2 pt-3 flex-shrink-0">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); acceptTarotQuest(); }} 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2.5 rounded-xl text-sm"
                    >
                      ðŸŽ´ Accept Quest (+10 XP now, +30 on complete)
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); acceptMiniChallenge(); }} 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2.5 rounded-xl text-sm"
                    >
                      âš¡ Mini Challenge (+5 XP now, +15 on complete)
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); absorbWisdom(); }} 
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm"
                    >
                      âœ¨ Absorb Wisdom (+5 XP)
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs text-center mt-2 flex-shrink-0">Cards: {availableDeck.length}/16 â€¢ Cycles: {deckCycles}</p>
            </div>
          </div>
        )}

        {/* Creative Move Picker */}
        {showCreativeMovePicker && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-2 pt-8 overflow-y-auto">
            <div className="bg-slate-900 rounded-3xl p-4 max-w-lg w-full my-auto">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-white">ðŸŽ¨ Choose Creative Move</h2>
                <button onClick={() => setShowCreativeMovePicker(false)} className="text-white/60 hover:text-white text-2xl">âœ•</button>
              </div>
              
              {/* Guidance */}
              <div className="bg-white/5 rounded-xl p-3 mb-4 text-sm">
                <p className="text-white/70 mb-2">ðŸ’¡ <strong>How to choose?</strong></p>
                <ul className="text-white/50 text-xs space-y-1">
                  <li>â€¢ <strong>ðŸŽ¨ Creative:</strong> Build something, write, teach</li>
                  <li>â€¢ <strong>ðŸ¤ Connection:</strong> Network, help others, collaborate</li>
                  <li>â€¢ <strong>ðŸ” Exploration:</strong> Learn new tech, stretch skills</li>
                  <li>â€¢ <strong>ðŸ§˜ Wellness:</strong> Recharge body & mind</li>
                </ul>
                <p className="text-white/40 text-xs mt-2 italic">Pick what energizes you today!</p>
              </div>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {['creative', 'connection', 'exploration', 'wellness'].map(type => (
                  <div key={type}>
                    <h3 className="text-white/80 font-bold mb-2 capitalize sticky top-0 bg-slate-900 py-1">
                      {type === 'creative' ? 'ðŸŽ¨ Creative' : type === 'connection' ? 'ðŸ¤ Connection' : type === 'exploration' ? 'ðŸ” Exploration' : 'ðŸ§˜ Wellness'}
                    </h3>
                    <div className="space-y-2">
                      {creativeMoveTemplates.filter(q => q.type === type).map(quest => (
                        <button 
                          key={quest.id} 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); addCreativeMove(quest); }} 
                          className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-3 text-left transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{quest.icon}</span>
                            <div>
                              <p className="text-white font-medium text-sm">{quest.name}</p>
                              <p className="text-white/50 text-xs">{quest.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quest Detail Modal - for completing quests with documentation */}
        {showQuestDetailModal && selectedQuest && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2">
            <div className="bg-slate-900 rounded-3xl p-4 max-w-lg w-full max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h2 className="text-xl font-bold text-white">
                  {selectedQuest.isCreativeMove ? 'ðŸŽ¨' : selectedQuest.type === 'tarot-quest' ? 'ðŸŽ´' : 'âš¡'} 
                  {selectedQuest.isCreativeMove ? ' Creative Move' : ' Quest Details'}
                </h2>
                <button onClick={() => setShowQuestDetailModal(false)} className="text-white/60 hover:text-white text-2xl">âœ•</button>
              </div>
              
              <div className="overflow-y-auto flex-1 pr-2 space-y-4">
                {/* Quest/Move Info */}
                <div className={`bg-gradient-to-r ${selectedQuest.isCreativeMove ? 'from-teal-500 to-cyan-500' : selectedQuest.card?.color || 'from-purple-500 to-pink-500'} p-0.5 rounded-xl`}>
                  <div className="bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{selectedQuest.isCreativeMove ? selectedQuest.icon : selectedQuest.lpIcon}</span>
                      <div>
                        <p className="text-white font-bold">{selectedQuest.isCreativeMove ? selectedQuest.name : selectedQuest.lpName}</p>
                        <p className="text-white/60 text-xs">
                          {selectedQuest.isCreativeMove 
                            ? `${selectedQuest.type} â€¢ ${selectedQuest.description}` 
                            : selectedQuest.type === 'tarot-quest' ? 'Full Quest' : 'Mini Challenge'}
                        </p>
                      </div>
                    </div>
                    {!selectedQuest.isCreativeMove && (
                      <p className="text-white/90 text-sm">{selectedQuest.questText}</p>
                    )}
                  </div>
                </div>

                {/* What I Did (Mini STAR: Situation + Task + Action) */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">ðŸ“ What I Did * (Situation â†’ Action â†’ Result)</label>
                  <textarea
                    value={questReflection.whatIDid}
                    onChange={(e) => setQuestReflection(prev => ({ ...prev, whatIDid: e.target.value }))}
                    placeholder="Describe what you did: the context, your actions, and the outcome..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* How Demonstrated LP (for Tarot) OR Impact (for Creative Move) */}
                {selectedQuest.isCreativeMove ? (
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">ðŸ’¡ Impact & Learnings</label>
                    <textarea
                      value={questReflection.impact || ''}
                      onChange={(e) => setQuestReflection(prev => ({ ...prev, impact: e.target.value }))}
                      placeholder="What impact did this have? What did you learn? How will you apply this?"
                      rows={3}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">ðŸŽ¯ How This Demonstrated {selectedQuest.lpName}</label>
                    <textarea
                      value={questReflection.howDemonstrated || ''}
                      onChange={(e) => setQuestReflection(prev => ({ ...prev, howDemonstrated: e.target.value }))}
                      placeholder="Explain how your actions showed this Leadership Principle..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>
                )}

                {/* Meta info */}
                <div className="bg-white/5 rounded-xl p-3 text-xs text-white/50">
                  <p>ðŸ“… Started: {new Date(selectedQuest.addedAt || selectedQuest.acceptedAt).toLocaleDateString()}</p>
                  {!selectedQuest.isCreativeMove && <p>ðŸ“Š Level: {selectedQuest.levelId}</p>}
                  <p>ðŸŽ Reward: +{selectedQuest.isCreativeMove ? '25' : selectedQuest.type === 'tarot-quest' ? '30' : '15'} XP</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 pt-4 space-y-2">
                <button 
                  type="button"
                  onClick={saveQuestReflection}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl"
                >
                  ðŸ’¾ Save Progress
                </button>
                <button 
                  type="button"
                  onClick={completeQuest}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl"
                >
                  âœ… Complete (+{selectedQuest.isCreativeMove ? '25' : selectedQuest.type === 'tarot-quest' ? '30' : '15'} XP)
                </button>
                <button 
                  type="button"
                  onClick={abandonQuest}
                  className="w-full text-red-400 hover:bg-red-500/20 py-2 rounded-xl text-sm"
                >
                  âŒ Abandon
                </button>
              </div>
            </div>
          </div>
        )}

        {activeScreen === 'levelSelect' && renderLevelSelect()}
        
        {activeScreen === 'inLevel' && (
          <>
            {currentLevel.currentStep === 'strategy' && renderStrategy()}
            {currentLevel.currentStep === 'missionBoard' && renderMissionBoard()}
            {currentLevel.currentStep === 'outcomes' && renderOutcomes()}
            {currentLevel.currentStep === 'starReflection' && renderStarReflection()}
            {currentLevel.currentStep === 'badge' && renderBadge()}
          </>
        )}

        {/* Footer with Quote */}
        <div className="text-center mt-8 space-y-3">
          <div className="bg-white/5 rounded-2xl p-4 mx-auto max-w-xl">
            <p className="text-white/60 text-sm italic leading-relaxed">
              "Stay hungry, stay curious and stand corrected as we all see the same crystal ball from different angles; yet we all play a role to mold and shape it."
            </p>
            <p className="text-white/40 text-xs mt-2">â€” Davis, AWS</p>
          </div>
          <p className="text-white/30 text-xs">ðŸ¥‹ LP Dojo v3.6 â€¢ Built with ðŸ’œ for my Mentor</p>
        </div>
      </div>
    </div>
  );
};

export default GrowthMonsterApp;
