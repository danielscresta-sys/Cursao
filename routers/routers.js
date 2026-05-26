import {
  createCourse,
  listCourses,
  getCourseById, 
  updateCourse,
  deleteCourse,
  registerUser,
  loginUser
} from '../controllers/controllers.js';

export async function courserRoutes(fastify) {
  
  // Esse é para o público aberto
  fastify.post('/register', registerUser);
  fastify.post('/login', loginUser);

  // Para o público fechado
  await fastify.register(async function (protectedRoutes) {
    // Esse hook verifica o JWT em todas as rotas dentro deste bloco
  protectedRoutes.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch { // <-- Mudado aqui (removido o "(error)")
        reply.status(401).send({ error: 'Token inválido ou ausente.' });
      }
    });
    // Rotas de cursos protegidas
    protectedRoutes.post('/courses', createCourse);
    protectedRoutes.get('/courses', listCourses);
    protectedRoutes.get('/courses/:id', getCourseById);   // Adicionado: Buscar por ID
    protectedRoutes.put('/courses/:id', updateCourse);     // Adicionado: Atualizar Curso
    protectedRoutes.delete('/courses/:id', deleteCourse);
  });
}