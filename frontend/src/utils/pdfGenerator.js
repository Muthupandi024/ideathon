import { jsPDF } from 'jspdf';

export const generateRegistrationPDF = (registrationData) => {
  const doc = new jsPDF();
  const reg = registrationData;
  
  // Colors
  const primaryColor = [11, 15, 25]; // Dark Cyber
  const accentCyan = [0, 150, 200];
  const accentGold = [212, 160, 23];
  
  // Background Header Bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 42, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('AAA COLLEGE OF ENGINEERING AND TECHNOLOGY', 105, 12, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('AN AUTONOMOUS INSTITUTION | DEPARTMENT OF INFORMATION TECHNOLOGY', 105, 19, { align: 'center' });

  doc.setTextColor(0, 240, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text("IDEATHON '26 - REGISTRATION SLIP", 105, 30, { align: 'center' });

  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text('Theme: AI & Emerging Intelligent Tech. For a Smarter Future', 105, 37, { align: 'center' });

  let y = 50;

  // Registration Summary Box
  doc.setDrawColor(...accentCyan);
  doc.setFillColor(245, 250, 255);
  doc.roundedRect(12, y, 186, 25, 3, 3, 'FD');

  doc.setTextColor(0, 80, 140);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`REGISTRATION ID: ${reg.registration_id}`, 18, y + 10);
  doc.text(`STATUS: ${reg.payment_status || 'PENDING'}`, 130, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`Date Registered: ${new Date(reg.created_at || Date.now()).toLocaleDateString()}`, 18, y + 19);
  doc.text(`Transaction Reference: ${reg.payment_reference}`, 130, y + 19);

  y += 33;

  // Section 1: Team Overview
  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, 186, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('1. TEAM DETAILS', 16, y + 5);

  y += 12;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);

  const teamInfo = [
    [`Team Name:`, reg.team_name, `Team Size:`, `${reg.team_size} Members`],
    [`College:`, reg.college_name, `Department:`, reg.department],
    [`Year of Study:`, reg.year, `Fee Paid:`, `₹${reg.team_size * 200} (₹200/head)`]
  ];

  teamInfo.forEach((row) => {
    doc.setFont('helvetica', 'bold');
    doc.text(row[0], 16, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[1], 45, y);

    doc.setFont('helvetica', 'bold');
    doc.text(row[2], 120, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[3], 150, y);
    y += 7;
  });

  y += 4;

  // Section 2: Team Roster
  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, 186, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('2. TEAM MEMBERS ROSTER', 16, y + 5);

  y += 12;

  if (reg.members && reg.members.length > 0) {
    reg.members.forEach((m, idx) => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 100, 160);
      doc.text(`${m.role.replace('_', ' ')}:`, 16, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      doc.text(`${m.full_name}`, 50, y);
      doc.text(`Email: ${m.email}`, 100, y);
      doc.text(`Ph: ${m.mobile}`, 160, y);
      y += 7;
    });
  }

  y += 4;

  // Section 3: Project Idea
  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, 186, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. PROJECT PROPOSAL SUBMISSION', 16, y + 5);

  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('Technology / AI Stack:', 16, y);
  doc.setFont('helvetica', 'normal');
  doc.text(reg.technology_stack || 'N/A', 60, y);
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text('Problem Statement:', 16, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  const splitProblem = doc.splitTextToSize(reg.problem_statement || 'N/A', 178);
  doc.text(splitProblem, 16, y);
  y += (splitProblem.length * 5) + 3;

  doc.setFont('helvetica', 'bold');
  doc.text('Proposed Solution:', 16, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  const splitSolution = doc.splitTextToSize(reg.proposed_solution || 'N/A', 178);
  doc.text(splitSolution, 16, y);
  y += (splitSolution.length * 5) + 5;

  // Event Venue Footer Box
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(12, 255, 186, 25, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 100, 150);
  doc.text('EVENT VENUE & DATE INFORMATION', 18, 263);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text('Date: 15.09.2026 (Tuesday)', 18, 271);
  doc.text('Venue: SIR CV RAMAN SEMINAR HALL', 85, 271);
  doc.text('Cash Prize: ₹10,000 Worth of Glory!', 150, 271);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('AAA College of Engineering and Technology | Department of Information Technology', 105, 287, { align: 'center' });

  // Save File
  doc.save(`IDEATHON26_Ticket_${reg.registration_id}.pdf`);
};
