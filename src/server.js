// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import { getEnvVar } from './utils/getEnvVar.js';
// const PORT = getEnvVar('PORT');
// export const setupServer = () => {
//   const app = express();
//   app.use(express.json());
//   app.use(cors());

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );
//   app.use('*', (req, res, next) => {
//     res.status(404).json({
//       message: 'Not found',
//     });
//   });
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentById } from './services/studentsService.js';

const PORT = getEnvVar('PORT');

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json({ data: students });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  app.get('/students/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await getStudentById(studentId);

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json({ data: student });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
