import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './MainLayout';
import ProgramInstructor from './pages/ProgramInstructor';
import CountMembership from './pages/CountMembership';
import Committees from './pages/Committees';
import CommitteesAssignment from './pages/CommitteesAssignment';
import MeetingParticipation from './pages/MeetingParticipation';
import CommitteeAnnouncement from './pages/CommitteeAnnouncement';
import CommitteesManagement from './pages/CommitteesManagement';
import MembersManagement from './pages/MembersManagement';
import AssignmentsManagement from './pages/AssignmentsManagement';
import MailingListsManagement from './pages/MailingListsManagement';
import NotFoundPage from './pages/NotFoundPage';
import ListMeeting from './pages/ListMeeting';
import MeetingNotes from './pages/MeetingNotes';

function Dashboard() {
  return null;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="program-instructor" element={<ProgramInstructor />} />
          <Route path="count-membership" element={<CountMembership />} />
          <Route path="committees" element={<Committees />} />
          <Route path="committees-assignment" element={<CommitteesAssignment />} />
          <Route path="meeting-participation" element={<MeetingParticipation />} />
          <Route path="Reports/*" element={<div>Reports</div>}>
            <Route index element={<CommitteeAnnouncement />} />
          </Route>
          <Route path="management/*" element={<div>Management</div>}>
            <Route index element={<div>Management</div>} />
            <Route path="mgmt-committees" element={<CommitteesManagement />} />
            <Route path="mgmt-members" element={<MembersManagement />} />
            <Route path="mgmt-assignments" element={<AssignmentsManagement />} />
            <Route path="mgmt-mailing" element={<MailingListsManagement />} />
          </Route>
          <Route path="meeting/*" element={<div>Management</div>}>
            <Route index element={<div>Meeting</div>} />
            <Route path="list-meeting" element={<ListMeeting />} />
            <Route path="meeting-notes" element={<MeetingNotes />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
