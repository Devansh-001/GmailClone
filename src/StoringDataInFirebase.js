import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

const mails = [
    {
        "message": "Quick question about the meeting schedule",
        "subject": "Meeting on Friday",
        "from": "alice.smith@company.com"
    },
    {
        "message": "Just checking in on the project status.",
        "subject": "Project Update",
        "from": "bob.jones@workplace.org"
    },
    {
        "message": "We need to discuss the new feature in the app.",
        "subject": "New Feature Discussion",
        "from": "carol.white@example.com"
    },
    {
        "message": "Don't forget the presentation tomorrow!",
        "subject": "Reminder: Presentation",
        "from": "david.miller@company.net"
    },
    {
        "message": "Can you review the attached document?",
        "subject": "Document Review Request",
        "from": "eve.green@workplace.com"
    },
    {
        "message": "Here’s the summary of the last meeting.",
        "subject": "Meeting Summary",
        "from": "frank.king@business.org"
    },
    {
        "message": "Let's catch up over coffee next week!",
        "subject": "Catch-Up Invitation",
        "from": "george.brown@social.com"
    },
    {
        "message": "I'm attaching the final draft for approval.",
        "subject": "Final Draft Submission",
        "from": "hannah.perez@corporate.com"
    },
    {
        "message": "Did you get a chance to review the proposal?",
        "subject": "Proposal Review Reminder",
        "from": "ian.morris@company.org"
    },
    {
        "message": "Reminder: Submit your reports by the end of today.",
        "subject": "Report Submission Reminder",
        "from": "jane.doe@workplace.com"
    },
    {
        "message": "Let's schedule a meeting to finalize the details.",
        "subject": "Finalization Meeting",
        "from": "kevin.brown@company.org"
    },
    {
        "message": "Important update regarding the project timeline.",
        "subject": "Project Timeline Update",
        "from": "lily.davis@workplace.net"
    },
    {
        "message": "Please confirm your availability for the workshop.",
        "subject": "Workshop Availability",
        "from": "michael.taylor@company.net"
    },
    {
        "message": "Thank you for your contribution to the report.",
        "subject": "Thank You!",
        "from": "natalie.wilson@corporate.org"
    },
    {
        "message": "Can you please send me the updated budget?",
        "subject": "Budget Update Request",
        "from": "oliver.martin@workplace.com"
    },
    {
        "message": "I'm attaching the feedback you requested.",
        "subject": "Feedback on the Document",
        "from": "paula.white@business.com"
    },
    {
        "message": "Hope you're doing well. Let's catch up soon.",
        "subject": "Catch-Up Soon?",
        "from": "quincy.johnson@company.net"
    },
    {
        "message": "Here's the proposal document for your review.",
        "subject": "Proposal Document Submission",
        "from": "rachel.harris@business.com"
    },
    {
        "message": "Could you please provide the status of the deliverables?",
        "subject": "Deliverables Status Update",
        "from": "stephen.clark@company.org"
    },
    {
        "message": "Important: Deadline approaching for project submission.",
        "subject": "Deadline Reminder",
        "from": "tina.martinez@workplace.net"
    },
    {
        "message": "The meeting has been rescheduled. Please check your calendar.",
        "subject": "Meeting Reschedule Notice",
        "from": "luke.davis@workplace.com"
    },
    {
        "message": "The report you requested is now ready for review.",
        "subject": "Report for Review",
        "from": "nina.jones@business.com"
    },
    {
        "message": "Please find attached the latest financial forecast.",
        "subject": "Financial Forecast Report",
        "from": "olga.perez@company.org"
    }
];


const sendData = async () => {
    for (const mail of mails) {
        try {
            await addDoc(collection(db, "receivedMails"), { ...mail, createdAt: serverTimestamp() });
        }
        catch (err) {
            console.log(err);
        }
    }
}

sendData();