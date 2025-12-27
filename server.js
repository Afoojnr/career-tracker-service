// @ts-nocheck
import http from "http";

const PORT = process.env.PORT || 8080;

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

const jsonHeaderMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const getResumes = (req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(resumes));
};

const getResumeById = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const resume = resumes.find((r) => r.id === id);
  if (resume) {
    res.statusCode = 200;
    res.end(JSON.stringify(resume));
  } else {
    notFound(req, res);
  }
};

const createResume = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newResume = JSON.parse(body);
    newResume.id = resumes.length + 1;
    resumes.push(newResume);
    res.statusCode = 201; // 201 Created
    res.end(JSON.stringify(newResume));
  });
};

const updateResume = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const resumeIndex = resumes.findIndex((r) => r.id === id);
  console.log(resumeIndex);
  if (resumeIndex === -1) {
    notFound(req, res);
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const updatedResume = JSON.parse(body);
    updatedResume.id = id; //Ensure the ID remains the same
    resumes[resumeIndex] = updatedResume;

    res.statusCode = 200;
    res.end(JSON.stringify(updatedResume));
  });
};

const deleteResume = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const resumeIndex = resumes.findIndex((r) => r.id === id);
  if (resumeIndex === -1) {
    notFound(req, res);
    return;
  }
  resumes.splice(resumeIndex, 1);
  res.statusCode = 204; // 204 No Content
  res.end();
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Not Found" }));
};

const server = http.createServer((req, res) => {
  loggerMiddleware(req, res, () => {
    jsonHeaderMiddleware(req, res, () => {
      try {
        if (req.method === "GET") {
          if (req.url === "/resumes") {
            getResumes(req, res);
          } else if (req.url?.match(/^\/resumes\/\d+$/)) {
            getResumeById(req, res);
          } else {
            notFound(req, res);
          }
        } else if (req.method === "POST") {
          if (req.url === "/resumes") {
            createResume(req, res);
          } else {
            notFound(req, res);
          }
        } else if (req.method === "PUT") {
          if (req.url?.match(/^\/resumes\/\d+$/)) {
            updateResume(req, res);
          }
        } else if (req.method === "DELETE") {
          if (req.url?.match(/^\/resumes\/\d+$/)) {
            deleteResume(req, res);
          }
        }
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
