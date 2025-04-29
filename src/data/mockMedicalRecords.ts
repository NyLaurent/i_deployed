export const getMockRecordsForCategory = (category: string) => {
  const baseRecord = {
    facility: "Healthy Family Center",
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  switch (category) {
    case "/allergies":
      return [
        { ...baseRecord, id: 1, type: "Penicillin Allergy", severity: "Severe" },
        { ...baseRecord, id: 2, type: "Pollen Allergy", severity: "Mild" },
        { ...baseRecord, id: 3, type: "Latex Allergy", severity: "Moderate" },
      ];

    case "/family-history":
      return [
        { ...baseRecord, id: 1, type: "Cardiovascular Disease", relation: "Father" },
        { ...baseRecord, id: 2, type: "Type 2 Diabetes", relation: "Mother" },
        { ...baseRecord, id: 3, type: "Hypertension", relation: "Grandfather" },
      ];

    case "/lab-tests":
      return [
        { ...baseRecord, id: 1, type: "Complete Blood Count", status: "Completed" },
        { ...baseRecord, id: 2, type: "Lipid Panel", status: "Pending" },
        { ...baseRecord, id: 3, type: "Thyroid Function", status: "In Progress" },
      ];

    case "/diagnosis":
      return [
        { ...baseRecord, id: 1, type: "Hypertension", status: "Active" },
        { ...baseRecord, id: 2, type: "Migraine", status: "Managed" },
        { ...baseRecord, id: 3, type: "Asthma", status: "Under Control" },
      ];

    case "/medications":
      return [
        { ...baseRecord, id: 1, type: "Lisinopril", dosage: "10mg daily" },
        { ...baseRecord, id: 2, type: "Metformin", dosage: "500mg twice daily" },
        { ...baseRecord, id: 3, type: "Albuterol", dosage: "As needed" },
      ];

    case "/symptoms":
      return [
        { ...baseRecord, id: 1, type: "Chronic Headache", duration: "2 weeks" },
        { ...baseRecord, id: 2, type: "Joint Pain", duration: "3 months" },
        { ...baseRecord, id: 3, type: "Fatigue", duration: "1 month" },
      ];

    case "/ai-diagnoses":
      return [
        { ...baseRecord, id: 1, type: "Risk Assessment", result: "Low Risk - Cardiovascular" },
        { ...baseRecord, id: 2, type: "Pattern Analysis", result: "Medium Risk - Diabetes" },
        { ...baseRecord, id: 3, type: "Predictive Diagnosis", result: "Monitor - Blood Pressure" },
      ];

    case "/emergency-services":
      return [
        { ...baseRecord, id: 1, type: "Emergency Room Visit", reason: "Severe Chest Pain" },
        { ...baseRecord, id: 2, type: "Urgent Care", reason: "High Fever" },
        { ...baseRecord, id: 3, type: "Ambulance Service", reason: "Accident" },
      ];

    case "/health-programs":
      return [
        { ...baseRecord, id: 1, type: "Weight Management", status: "Active" },
        { ...baseRecord, id: 2, type: "Smoking Cessation", status: "Completed" },
        { ...baseRecord, id: 3, type: "Stress Management", status: "Enrolled" },
      ];

    default:
      return [];
  }
};

export const getMockTotalRecordsForCategory = (category: string) => {
  switch (category) {
    case "/allergies":
      return {
        "Drug Allergies": { count: 2, severity: "Severe" },
        "Environmental": { count: 1, severity: "Mild" },
        "Food Allergies": { count: 1, severity: "Moderate" }
      };

    case "/family-history":
      return {
        "Cardiovascular": { count: 2 },
        "Diabetes": { count: 1 },
        "Hypertension": { count: 1 }
      };

    case "/lab-tests":
      return {
        "Blood Tests": { count: 5 },
        "Imaging": { count: 2 },
        "Pathology": { count: 1 }
      };

    case "/diagnosis":
      return {
        "Active": { count: 2 },
        "Managed": { count: 3 },
        "Resolved": { count: 1 }
      };

    case "/medications":
      return {
        "Current": { count: 3 },
        "Past": { count: 2 },
        "As Needed": { count: 1 }
      };

    case "/symptoms":
      return {
        "Acute": { count: 2 },
        "Chronic": { count: 1 },
        "Recurring": { count: 1 }
      };

    case "/ai-diagnoses":
      return {
        "Risk Assessments": { count: 2 },
        "Pattern Analysis": { count: 1 },
        "Predictions": { count: 1 }
      };

    case "/emergency-services":
      return {
        "ER Visits": { count: 1 },
        "Urgent Care": { count: 2 },
        "Ambulance": { count: 1 }
      };

    case "/health-programs":
      return {
        "Active": { count: 2 },
        "Completed": { count: 1 },
        "Enrolled": { count: 1 }
      };

    default:
      return {};
  }
}; 