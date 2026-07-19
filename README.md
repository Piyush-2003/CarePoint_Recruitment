# CarePoint365 — Recruitment Pipeline

Interactive Kanban-style recruitment pipeline tracker built 
with React, designed to mirror the Recruitment module of 
CarePoint365 care management software.

## 🔗 Live Demo
[View Recruitment Pipeline](https://your-vercel-link.vercel.app/)

## Features
- **Kanban board** — 6 stage pipeline from Applied to Hired
- **Advance & Reject** — move candidates through stages instantly
- **Restore** — reinstate rejected candidates back to Applied
- **Compliance badges** — DBS, Right to Work and References 
  status on every card
- **Compliance indicator** — ✅ all clear · ⚠️ checks pending
- **Role filter** — filter by Care Assistant, Senior Carer, Nurse
- **Search** — search candidates by name instantly
- **Live counts** — hired, in pipeline and checks pending in header

## Pipeline Stages
| Stage | Description |
|---|---|
| Applied | New applications received |
| Interview | Shortlisted for interview |
| DBS Check | Criminal record check in progress |
| Offered | Job offer made |
| Hired ✓ | Successfully onboarded |
| Rejected | Application unsuccessful |

## Compliance Checks Tracked
- **DBS** — Disclosure and Barring Service check
- **RTW** — Right to Work verification
- **Refs** — Reference checks

## React Concepts Used
- **useState** — manages all 12 candidates and their stages
- **Immutable state updates** — spread operator to update 
  individual candidates without mutating state
- **Component composition** — App → KanbanColumn → 
  CandidateCard → ComplianceBadge
- **Derived data** — column counts and header stats 
  calculated automatically from state
- **Conditional rendering** — Advance/Reject/Restore buttons 
  shown based on current stage

## Built For
This project was built as a demonstration for CarePoint365
(carepoint365.co.uk) — a UK care management and workforce
automation platform built on Microsoft 365.

## Tech Stack
React · Lucide React · JavaScript · CSS-in-JS

## Part of CarePoint365 Demo Portfolio
| Project | Link |
|---|---|
| Time & Attendance | [view](https://care-point-attendance.vercel.app/) |
| Recruitment Pipeline | [view](https://your-vercel-link.vercel.app/) |
| Care Home Dashboard | coming soon |
