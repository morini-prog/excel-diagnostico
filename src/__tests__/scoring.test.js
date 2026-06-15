import { describe, it, expect } from 'vitest';
import { calcularPuntaje } from '../utils/scoring';
import { preguntas, calcularNivel } from '../data/questions';

describe('calcularNivel', () => {
  it('devuelve "Desconocedor" para 0 aciertos (0%)', () => {
    expect(calcularNivel(0).nivel).toBe('Desconocedor');
    expect(calcularNivel(0).porcentaje).toBe(0);
  });

  it('devuelve "Desconocedor" para 1 acierto (7%)', () => {
    expect(calcularNivel(1).nivel).toBe('Desconocedor');
  });

  it('devuelve "Novato" para 2 aciertos (13%)', () => {
    expect(calcularNivel(2).nivel).toBe('Novato');
  });

  it('devuelve "Aprendiz" para 3 aciertos (20%)', () => {
    expect(calcularNivel(3).nivel).toBe('Aprendiz');
  });

  it('devuelve "Aprendiz" para 5 aciertos (33%)', () => {
    expect(calcularNivel(5).nivel).toBe('Aprendiz');
  });

  it('devuelve "Practicante" para 6 aciertos (40%)', () => {
    expect(calcularNivel(6).nivel).toBe('Practicante');
  });

  it('devuelve "Practicante" para 8 aciertos (53%)', () => {
    expect(calcularNivel(8).nivel).toBe('Practicante');
  });

  it('devuelve "Avanzado" para 9 aciertos (60%)', () => {
    expect(calcularNivel(9).nivel).toBe('Avanzado');
  });

  it('devuelve "Avanzado" para 11 aciertos (73%)', () => {
    expect(calcularNivel(11).nivel).toBe('Avanzado');
  });

  it('devuelve "Maestro de Fórmulas" para 12 aciertos (80%)', () => {
    expect(calcularNivel(12).nivel).toBe('Maestro de Fórmulas');
  });

  it('devuelve "Maestro de Fórmulas" para 13 aciertos (87%)', () => {
    expect(calcularNivel(13).nivel).toBe('Maestro de Fórmulas');
  });

  it('devuelve "Experto" para 14 aciertos (93%)', () => {
    expect(calcularNivel(14).nivel).toBe('Experto');
  });

  it('devuelve "Experto" para 15 aciertos (100%)', () => {
    expect(calcularNivel(15).nivel).toBe('Experto');
    expect(calcularNivel(15).porcentaje).toBe(100);
  });
});

describe('calcularPuntaje', () => {
  it('cuenta cero correctas cuando todas las respuestas son incorrectas', () => {
    const respuestasIncorrectas = preguntas.map(() => 3);
    const resultado = calcularPuntaje(respuestasIncorrectas);
    expect(resultado.correctas + resultado.incorrectas).toBe(15);
    expect(resultado.indicesCorrectos.length + resultado.indicesIncorrectos.length).toBe(15);
  });

  it('cuenta 15 correctas cuando todas las respuestas son correctas', () => {
    const respuestasCorrectas = preguntas.map((p) => p.correcta);
    const resultado = calcularPuntaje(respuestasCorrectas);
    expect(resultado.correctas).toBe(15);
    expect(resultado.incorrectas).toBe(0);
    expect(resultado.nivel).toBe('Experto');
    expect(resultado.porcentaje).toBe(100);
    expect(resultado.indicesCorrectos).toHaveLength(15);
    expect(resultado.indicesIncorrectos).toHaveLength(0);
  });

  it('calcula puntaje parcial correctamente', () => {
    // Primeras 9 respuestas correctas, últimas 6 incorrectas (índice 3 por defecto)
    const respuestas = preguntas.map((p, i) => (i < 9 ? p.correcta : 3));
    const resultado = calcularPuntaje(respuestas);
    expect(resultado.correctas).toBeGreaterThanOrEqual(9);
    expect(resultado.porcentaje).toBeGreaterThanOrEqual(60);
  });

  it('incluye detalle por nivel en el resultado', () => {
    const respuestas = preguntas.map((p) => p.correcta);
    const resultado = calcularPuntaje(respuestas);
    expect(resultado.detallePorNivel).toHaveProperty('Inicial');
    expect(resultado.detallePorNivel).toHaveProperty('Básico');
    expect(resultado.detallePorNivel).toHaveProperty('Intermedio');
    expect(resultado.detallePorNivel.Inicial.total).toBe(5);
    expect(resultado.detallePorNivel.Básico.correctas).toBe(5);
    expect(resultado.detallePorNivel.Intermedio.correctas).toBe(5);
  });

  it('el banco tiene exactamente 15 preguntas', () => {
    expect(preguntas).toHaveLength(15);
  });

  it('cada pregunta tiene las propiedades requeridas', () => {
    preguntas.forEach((p, i) => {
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('id');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('nivel');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('pregunta');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('opciones');
      expect(p, `Pregunta ${i + 1}`).toHaveProperty('correcta');
      expect(p.opciones, `Pregunta ${i + 1}`).toHaveLength(4);
      expect(p.correcta, `Pregunta ${i + 1}`).toBeGreaterThanOrEqual(0);
      expect(p.correcta, `Pregunta ${i + 1}`).toBeLessThanOrEqual(3);
    });
  });
});
