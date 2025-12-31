// @ts-nocheck

const resumes = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    yearsOfExperience: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    yearsOfExperience: 3,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "555-123-4567",
    yearsOfExperience: 8,
  },
  {
    id: 4,
    name: "Aisha Khan",
    email: "aisha.khan@example.com",
    phone: "444-987-6543",
    yearsOfExperience: 2,
  },
  {
    id: 5,
    name: "Carlos Mendes",
    email: "carlos.mendes@example.com",
    phone: "222-333-4444",
    yearsOfExperience: 10,
  },
];

export const getResumes = (req, res) => {
  res.json(resumes);
};

export const getResumeById = (req, res) => {
  const id = parseInt(req.params.id); // "2" string
  const resume = resumes.find((r) => r.id === id);

  if (resume) {
    res.status(200).json(resume);
  } else {
    res.status(404).json({ error: "Resume not found" });
  }
};

export const createResume = (req, res) => {
  const newResume = req.body;
  newResume.id = resumes.length + 1;
  resumes.push(newResume);
  res.status(201).json(newResume); // 201 Created
};

export const updateResume = (req, res) => {
  const id = parseInt(req.params.id);
  const resumeIndex = resumes.findIndex((r) => r.id === id);

  if (resumeIndex === -1) {
    return res.status(404).json({ error: "Resume not found" });
  }

  resumes[resumeIndex] = { id, ...req.body };
  res.status(200).json(resumes[resumeIndex]);
};

export const deleteResume = (req, res) => {
  const id = parseInt(req.params.id);
  const resumeIndex = resumes.findIndex((r) => r.id === id);

  if (resumeIndex === -1) {
    return res.status(404).json({ error: "Resume not found" });
  }

  resumes.splice(resumeIndex, 1);
  res.status(204).send(); // 204 No Content
};
