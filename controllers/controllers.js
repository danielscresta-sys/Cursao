import { prisma } from './models.js';

// 1. Buscar um Curso por ID (Coloque este código abaixo do listCourses)
export async function getCourseById(request, reply) {
  const { id } = request.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      return reply.status(404).send({ error: 'Curso não encontrado.' });
    }

  } catch (error) {
    console.error(error); // <-- Adicione esta linha aqui
    return reply.status(500).send({ error: 'Erro ao buscar o curso.' });
  }
}

/// 2. Atualizar Curso
export async function updateCourse(request, reply) {
  const { id } = request.params;
  const { title, description, duration } = request.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { title, description, duration }
    });
    return reply.status(200).send(updatedCourse);
  } catch (error) {
    console.error(error);
    return reply.status(404).send({ error: 'Curso não encontrado para atualização.' });
  }
}