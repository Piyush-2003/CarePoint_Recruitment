import { useState } from 'react';
import { Briefcase, Clock, MapPin } from 'lucide-react';

const NAVY = '#1e3a5f';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const AMBER = '#d97706';
const PURPLE = '#7c3aed';

// ── Mock Candidates ──
const INITIAL_CANDIDATES = [
  { id: 1,  name: 'Amara Osei',       role: 'Care Assistant',   location: 'London',     applied: '01 Jul',  dbs: 'clear',   rightToWork: true,  refs: 'pending', stage: 'applied' },
  { id: 2,  name: 'Jack Brennan',     role: 'Senior Carer',     location: 'Manchester', applied: '28 Jun',  dbs: 'pending', rightToWork: true,  refs: 'clear',   stage: 'applied' },
  { id: 3,  name: 'Zoe Clarke',       role: 'Nurse',            location: 'Birmingham', applied: '25 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'interview' },
  { id: 4,  name: 'Kwame Asante',     role: 'Care Assistant',   location: 'Leeds',      applied: '24 Jun',  dbs: 'pending', rightToWork: false, refs: 'pending', stage: 'interview' },
  { id: 5,  name: 'Sophie Martin',    role: 'Senior Carer',     location: 'London',     applied: '20 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'dbs-check' },
  { id: 6,  name: 'Daniel Okafor',    role: 'Nurse',            location: 'Bristol',    applied: '18 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'dbs-check' },
  { id: 7,  name: 'Priya Nair',       role: 'Care Assistant',   location: 'London',     applied: '15 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'offered' },
  { id: 8,  name: 'Liam Hughes',      role: 'Senior Carer',     location: 'Liverpool',  applied: '10 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'offered' },
  { id: 9,  name: 'Fatima Al-Rashid', role: 'Nurse',            location: 'London',     applied: '05 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'hired' },
  { id: 10, name: 'Marcus Johnson',   role: 'Care Assistant',   location: 'Manchester', applied: '01 Jun',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'hired' },
  { id: 11, name: 'Elena Popescu',    role: 'Senior Carer',     location: 'London',     applied: '30 May',  dbs: 'clear',   rightToWork: true,  refs: 'clear',   stage: 'hired' },
  { id: 12, name: 'Tom Bradley',      role: 'Care Assistant',   location: 'Leeds',      applied: '28 May',  dbs: 'failed',  rightToWork: true,  refs: 'clear',   stage: 'rejected' },
];

const STAGES = [
  { id: 'applied',    label: 'Applied',     color: BLUE,   bg: '#dbeafe' },
  { id: 'interview',  label: 'Interview',   color: AMBER,  bg: '#fef9c3' },
  { id: 'dbs-check',  label: 'DBS Check',   color: PURPLE, bg: '#ede9fe' },
  { id: 'offered',    label: 'Offered',     color: GREEN,  bg: '#dcfce7' },
  { id: 'hired',      label: 'Hired ✓',     color: GREEN,  bg: '#dcfce7' },
  { id: 'rejected',   label: 'Rejected',    color: RED,    bg: '#fee2e2' },
];

// ── Compliance Badge ──
function ComplianceBadge({ label, status }) {
  const color = status === 'clear' || status === true ? GREEN
    : status === 'pending' ? AMBER : RED;
  const text = status === true ? '✓' : status === false ? '✗' : status;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color, background: color + '20', padding: '2px 6px', borderRadius: 10, marginRight: 4, textTransform: 'capitalize' }}>
      {label}: {text}
    </span>
  );
}

// ── Candidate Card ──
function CandidateCard({ candidate, stages, onMove }) {
  const stage = stages.find(s => s.id === candidate.stage);
  const allClear = candidate.dbs === 'clear' && candidate.rightToWork && candidate.refs === 'clear';

  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e6f0', borderRadius: 10,
      padding: 14, marginBottom: 10,
      borderLeft: `3px solid ${stage.color}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      {/* Name + compliance indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{candidate.name}</div>
          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{candidate.role}</div>
        </div>
        <div style={{ fontSize: 16 }} title={allClear ? 'All checks clear' : 'Checks pending'}>
          {allClear ? '✅' : '⚠️'}
        </div>
      </div>

      {/* Location + applied */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 3 }}>
          <MapPin size={10} /> {candidate.location}
        </span>
        <span style={{ fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Clock size={10} /> Applied {candidate.applied}
        </span>
      </div>

      {/* Compliance badges */}
      <div style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <ComplianceBadge label="DBS" status={candidate.dbs} />
        <ComplianceBadge label="RTW" status={candidate.rightToWork} />
        <ComplianceBadge label="Refs" status={candidate.refs} />
      </div>

      {/* Move buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {candidate.stage !== 'hired' && candidate.stage !== 'rejected' && (
          <>
            <button onClick={() => onMove(candidate.id, 'forward')} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: GREEN, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600
            }}>
              Advance →
            </button>
            <button onClick={() => onMove(candidate.id, 'reject')} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: '#fee2e2', color: RED, border: 'none', cursor: 'pointer', fontWeight: 600
            }}>
              Reject
            </button>
          </>
        )}
        {candidate.stage === 'rejected' && (
          <button onClick={() => onMove(candidate.id, 'restore')} style={{
            fontSize: 11, padding: '4px 10px', borderRadius: 6,
            background: '#dbeafe', color: BLUE, border: 'none', cursor: 'pointer'
          }}>
            Restore
          </button>
        )}
      </div>
    </div>
  );
}

// ── Kanban Column ──
function KanbanColumn({ stage, candidates, onMove }) {
  return (
    <div style={{ minWidth: 230, maxWidth: 260, flex: '0 0 auto' }}>
      {/* Column header */}
      <div style={{
        background: stage.bg, border: `1px solid ${stage.color}30`,
        borderRadius: 10, padding: '10px 14px', marginBottom: 12,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: stage.color }}>{stage.label}</span>
        <span style={{
          background: stage.color, color: '#fff', fontSize: 11,
          fontWeight: 700, width: 22, height: 22, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {candidates.length}
        </span>
      </div>

      {/* Cards */}
      <div style={{ minHeight: 100 }}>
        {candidates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 10px', color: '#d1d5db', fontSize: 12, border: '1px dashed #e2e6f0', borderRadius: 10 }}>
            No candidates
          </div>
        ) : (
          candidates.map(c => (
            <CandidateCard key={c.id} candidate={c} stages={STAGES} onMove={onMove} />
          ))
        )}
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [roleFilter, setRoleFilter] = useState('All');
  const [search, setSearch] = useState('');

  const stageOrder = ['applied', 'interview', 'dbs-check', 'offered', 'hired', 'rejected'];

  const moveCandidate = (id, direction) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (direction === 'reject') return { ...c, stage: 'rejected' };
      if (direction === 'restore') return { ...c, stage: 'applied' };
      const currentIndex = stageOrder.indexOf(c.stage);
      const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 2)];
      return { ...c, stage: nextStage };
    }));
  };

  const roles = ['All', ...new Set(INITIAL_CANDIDATES.map(c => c.role))];

  const filtered = candidates
    .filter(c => roleFilter === 'All' || c.role === roleFilter)
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const hired = candidates.filter(c => c.stage === 'hired').length;
  const pending = candidates.filter(c => !['hired', 'rejected'].includes(c.stage)).length;
  const compliance = candidates.filter(c => c.dbs === 'pending' || !c.rightToWork || c.refs === 'pending').length;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f6fb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: NAVY, padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>CarePoint365 — Recruitment Pipeline</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Applicant Tracking & Compliance</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: GREEN }}>{hired}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Hired</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: AMBER }}>{pending}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>In Pipeline</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: RED }}>{compliance}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Checks Pending</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e6f0', padding: '12px 28px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 14px', border: '1px solid #e2e6f0', borderRadius: 8, fontSize: 13, width: 200, outline: 'none' }}
        />
        {roles.map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} style={{
            padding: '7px 14px', borderRadius: 20, border: '1px solid',
            borderColor: roleFilter === r ? BLUE : '#e2e6f0',
            background: roleFilter === r ? BLUE : '#fff',
            color: roleFilter === r ? '#fff' : '#6b7280',
            fontSize: 12, cursor: 'pointer', fontWeight: roleFilter === r ? 600 : 400
          }}>
            {r}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#9ca3af' }}>
          {filtered.length} candidates · click Advance to move through pipeline
        </span>
      </div>

      {/* Kanban Board */}
      <div style={{ padding: '20px 28px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 14, minWidth: 'max-content' }}>
          {STAGES.map(stage => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              candidates={filtered.filter(c => c.stage === stage.id)}
              onMove={moveCandidate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}