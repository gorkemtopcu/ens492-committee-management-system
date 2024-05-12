import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './MainLayout';
import ProgramInstructor from 'feature/Report/ProgramInstructor';
import CommitteesAssignment from 'feature/Report/CommitteesAssignment';
import Committees from 'feature/Report/Committees';
import MeetingParticipation from 'feature/Report/MeetingParticipation';
import CommitteeAnnouncement from 'feature/Report/CommitteeAnnouncement';
import CommitteeAnnouncementByTerm from 'feature/Report/CommitteeAnnouncementByTerm';
import MembersManagement from 'feature/Management/MembersManagement';
import CommitteesManagement from 'feature/Management/CommitteesManagement';
import AssignmentsManagement from 'feature/Management/AssignmentsManagement';
import MailingListsManagement from 'feature/Management/MailingListsManagement';
import NotFoundPage from 'feature/NotFoundPage';
import ListMeeting from 'feature/Meeting/ListMeeting';
import CreateMeetingNotes from 'feature/Meeting/CreateMeetingNotes';
import MainCommitee from 'feature/MemberTrackingSystem/MainCommitee';
import RetirementHistory from 'feature/MemberTrackingSystem/RetirementHistory';
import AssignmentByTerm from 'feature/Management/AssignmentByTerm';
//import SelectedCommittee from 'feature/Report/SelectedCommittee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="program-instructor" element={<ProgramInstructor />} />
          <Route path="committees" element={<Committees />} />
          <Route path="committees-assignment" element={<CommitteesAssignment />} />
          <Route path="meeting-participation" element={<MeetingParticipation />} />
          <Route path="committee-announcement" element={<CommitteeAnnouncement />} />
          <Route path="committee-announcement/byterm/:term" element={<CommitteeAnnouncementByTerm />} />
          <Route path="mgmt-committees" element={<CommitteesManagement />} />
          <Route path="mgmt-members" element={<MembersManagement />} />
          <Route path="mgmt-assignments" element={<AssignmentsManagement />} />
          <Route path="mgmt-assignments/byterm/:term" element={<AssignmentByTerm />} />
          <Route path="mgmt-mailing" element={<MailingListsManagement />} />
          <Route path="list-meeting" element={<ListMeeting />} />
          <Route path="main-commitee" element={< MainCommitee/>} />
          <Route path="retirement-history" element={< RetirementHistory/>} />
          <Route path="create-meeting-notes" element={<CreateMeetingNotes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
